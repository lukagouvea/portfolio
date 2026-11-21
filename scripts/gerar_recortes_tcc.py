"""Gera recortes 128x128 para a página do TCC no portfólio.

Experimento 1 (milho): RGB mediano + máscara de milho, a partir dos .npz dos relatórios.
Experimento 2 (todas as culturas): mapa de erros (acerto, FP, FN, ignorado) das máscaras
antes e depois do CascadePSP, nos cinco recortes sorteados pelo próprio experimento.

Só lê os dados; não altera nada nas pastas dos experimentos.
Uso: python3 -I gerar_recortes_tcc.py <pasta_algoritmos> <pasta_saida> [<pasta_experimento_culturas>]
"""

import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ALG = Path(sys.argv[1])
OUT = Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)

AMARELO = np.array([246, 199, 68], dtype=np.float32)


def rgb_uint8(rgb):
    rgb = np.asarray(rgb)
    if rgb.dtype != np.uint8:
        rgb = np.clip(rgb * (255.0 if rgb.max() <= 1.0 else 1.0), 0, 255).astype(np.uint8)
    return rgb


def sobreposicao(rgb, mascara):
    base = rgb_uint8(rgb).astype(np.float32) * 0.55
    alfa = 0.9
    base[mascara] = base[mascara] * (1 - alfa) + AMARELO * alfa
    return base.astype(np.uint8)


def salvar(arr, nome):
    caminho = OUT / nome
    Image.fromarray(arr).save(caminho, optimize=True)
    return caminho


resumo = {}

# Patch 30052: máscaras iniciais dos três segmentadores
a = np.load(ALG / "figuras_tcc/dados/amostra_30052.npz", allow_pickle=False)
salvar(rgb_uint8(a["rgb_mediano"]), "30052_rgb.png")
salvar(sobreposicao(a["rgb_mediano"], a["mascara_milho"]), "30052_referencia.png")
for origem in ["utae", "unet3d", "unet2d"]:
    salvar(sobreposicao(a["rgb_mediano"], a[f"coarse_{origem}"]), f"30052_inicial_{origem}.png")


def iou(pred, alvo):
    uniao = np.logical_or(pred, alvo).sum()
    return float(np.logical_and(pred, alvo).sum() / uniao) if uniao else 1.0


resumo["30052_iniciais"] = {
    o: round(100 * iou(a[f"coarse_{o}"], a["mascara_milho"]), 2) for o in ["utae", "unet3d", "unet2d"]
}

# Painel de comparação: cinco patches de teste, mesma máscara inicial U-Net 2D
p = np.load(
    ALG / "pastis-refinement/reports/refinement_comparison_20261008/data/refiners_comparison_panel.npz",
    allow_pickle=False,
)
meta = json.load(
    open(ALG / "pastis-refinement/reports/refinement_comparison_20261008/data/refiners_comparison_panel_metadata.json")
)
refinadores = ["cascadepsp_rgb", "cascadepsp_10bands", "segrefiner"]
casos = []
for i, pid in enumerate(p["patch_ids"].tolist()):
    rgb = p["rgb"][i]
    salvar(rgb_uint8(rgb), f"{pid}_rgb.png")
    salvar(sobreposicao(rgb, p["target"][i]), f"{pid}_referencia.png")
    salvar(sobreposicao(rgb, p["coarse"][i]), f"{pid}_inicial.png")
    caso = meta["cases"][i]
    assert caso["patch_id"] == pid
    linha = {
        "patch": pid,
        "cenario": caso["scenario"],
        "selecionado_por": caso.get("selection_refiner"),
        "pixels_milho": int(p["target"][i].sum()),
        "iou_inicial": round(100 * iou(p["coarse"][i], p["target"][i]), 2),
    }
    for r in refinadores:
        salvar(sobreposicao(rgb, p[f"{r}_refined"][i]), f"{pid}_{r}.png")
        linha[r] = round(100 * iou(p[f"{r}_refined"][i], p["target"][i]), 2)
        registrado = caso["refiners"][r]["metrics"]
        linha[r + "_registrado"] = round(100 * registrado["refined_iou"], 2)
        linha["iou_inicial_registrado"] = round(100 * registrado["coarse_iou"], 2)
    casos.append(linha)
resumo["painel"] = casos

# Experimento 2: todas as culturas contra o fundo (alvo: 0 fundo, 1 interior, 2 margem, 19 ignorado)
if len(sys.argv) > 3:
    CV = Path(sys.argv[3])
    cores = {
        "fundo": (20, 35, 49),
        "acerto": (81, 184, 147),
        "fp": (242, 170, 70),
        "fn": (228, 109, 150),
        "ignorado": (162, 170, 179),
    }

    def rgb_bandas(bruto):
        bandas = bruto[[2, 1, 0]].astype(np.float32)
        baixo, alto = np.percentile(bandas, [2, 98], axis=(1, 2), keepdims=True)
        return (np.clip((bandas - baixo) / np.maximum(alto - baixo, 1e-6), 0, 1).transpose(1, 2, 0) * 255).astype(np.uint8)

    def mapa_erros(mascara, alvo):
        verdade, valido = alvo == 1, alvo != 19
        img = np.zeros((*alvo.shape, 3), dtype=np.uint8)
        img[:] = cores["fundo"]
        img[mascara & verdade & valido] = cores["acerto"]
        img[mascara & ~verdade & valido] = cores["fp"]
        img[~mascara & verdade & valido] = cores["fn"]
        img[~valido] = cores["ignorado"]
        return img

    def referencia(alvo):
        img = np.zeros((*alvo.shape, 3), dtype=np.uint8)
        img[:] = cores["fundo"]
        img[alvo == 1] = cores["acerto"]
        img[alvo == 19] = cores["ignorado"]
        return img

    def iou_valido(mascara, alvo):
        verdade, valido = alvo == 1, alvo != 19
        inter = (mascara & verdade & valido).sum()
        uniao = ((mascara | verdade) & valido).sum()
        return float(inter / uniao) if uniao else 1.0

    resumo_cv = json.load(open(CV / "summary.json"))
    prov = json.load(open(CV / "visuals/provenance.json"))
    config = json.load(open(CV / "config.json"))
    culturas = []
    for caso in prov["patches"]:
        pid, split = caso["id"], str(caso["split"])
        raiz_caso = Path(resumo_cv["folds"][split]["root"])
        cache = Path(config["producers"]["hrnet"])
        imagem = np.load(cache / f"inputs/images/{pid}.npy", allow_pickle=False)
        alvo = np.load(cache / f"inputs/targets/{pid}.npy", allow_pickle=False)
        salvar(rgb_bandas(imagem), f"culturas_{pid}_rgb.png")
        salvar(referencia(alvo), f"culturas_{pid}_referencia.png")
        linha = {"patch": pid, "fold": caso["fold"]}
        for produtor in ["hrnet", "unet2d"]:
            antes = np.load(Path(config["producers"][produtor]) / f"coarse/official_out_of_fold/masks/{pid}.npy", allow_pickle=False).astype(bool)
            depois = np.load(raiz_caso / f"test/{produtor}/evaluation/masks/{pid}.npy", allow_pickle=False).astype(bool)
            for etapa, mascara in [("antes", antes), ("depois", depois)]:
                salvar(mapa_erros(mascara, alvo), f"culturas_{pid}_{produtor}_{etapa}.png")
                calculado = round(100 * iou_valido(mascara, alvo), 2)
                registrado = round(100 * caso["metrics"][f"{produtor}_{'before' if etapa == 'antes' else 'after'}"]["iou"], 2)
                assert calculado == registrado, (pid, produtor, etapa, calculado, registrado)
                linha[f"{produtor}_{etapa}"] = calculado
        culturas.append(linha)
    resumo["culturas"] = culturas

print(json.dumps(resumo, indent=1, ensure_ascii=False))
