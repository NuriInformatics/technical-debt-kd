# technical-debt-kd

> **DETEKSI SELF-ADMITTED TECHNICAL DEBT MENGGUNAKAN DISTILASI CODEBERT UNTUK MITIGASI SHORTCUT LEARNING**  
> *Self-Admitted Technical Debt Detection Using CodeBERT Distillation for Shortcut Learning Mitigation*

---

## 📌 Ringkasan Tesis & Tautan Cepat

* 📊 **Dashboard Progres & Audit Naskah:** Buka [`progress/index.html`](progress/index.html) di browser.
* 🎯 **Research Gap & 3 Rumusan Masalah:** Baca [`Gap-research.md`](Gap-research.md).
* 📁 **Dataset Primer Terfokus:** [`dataset/D1_code_comments.csv`](dataset/D1_code_comments.csv) (Komentar Kode Java Maldonado, 62.275 baris).

---

## 📁 Struktur Repositori

```text
technical-debt-kd/
├── dataset/         # Korpus primer D1 (62.275 komentar kode sumber Java)
├── models/          # Tempat penyimpanan bobot model & artefak evaluasi PyTorch
├── progress/        # Dashboard web statis progres & audit naskah
│   ├── css/         # Stylesheet terpadu (style.css)
│   ├── js/          # Script controller modular (checklist.js, references.js)
│   ├── history/     # Arsip snapshot harian
│   ├── index.html   # Halaman 1: Rumusan Masalah (RQ1–RQ3) & Ringkasan Tesis
│   ├── dataset.html # Halaman 2: Kesiapan Dataset Empiris (D1 Maldonado)
│   ├── references.html # Halaman 3: Daftar Pustaka Jurnal Ilmiah
│   └── checklist.html  # Halaman 4: Checklist Temuan Audit Draf Bab
├── references/      # Arsip file PDF rujukan primer (Scopus Q1/Q2 & SINTA 1/2)
├── Gap-research.md  # Kesenjangan riset empiris & perumusan 3 RQ Bab 1 & Bab 3
├── references.json  # Database referensi terstruktur
└── README.md        # Ringkasan repositori
```

---

## 🎖️ Korpus Dataset Terfokus (Dataset Acknowledgements)

Sesuai arahan revisi dosen pembimbing, penelitian ini membatasi ruang lingkup secara terfokus pada artefak **Komentar Kode Sumber Perangkat Lunak** tanpa memperluas ke data sintetis adversarial maupun domain multi-artefak:

* **Dataset D1 (Java Code Comments Benchmark - 62.275 baris):**
  * **Peneliti/Asal Riset:** Maldonado & da Silva (IEEE SANER 2017 / TSE 2017) *"Detecting Technical Debt through Source Code Comments"*. Menjadi tolak ukur baku (*golden benchmark*) pada Qu et al. (2023) dan Gu et al. (2024).
  * **Cakupan Proyek:** 10 proyek open-source Java bereputasi (Ant, ArgoUML, Columba, EMF, Hibernate, JEdit, JFreeChart, JMeter, JRuby, dan SQuirrel SQL).
  * **Karakteristik Data:** Ketimpangan kelas ekstrem (*class imbalance* 1 : 14,36) dengan 4.053 sampel SATD (6,51%) dan 58.222 sampel Non-SATD (93,49%).

---

## 🔬 Kerangka Kerja Model Usulan (Distilled-CodeBERT)

* **Teacher Model:** `microsoft/codebert-base` (12-layer Transformer Encoder, 125M parameter, bobot ~490 MB).
* **Student Model:** `Distilled-CodeBERT` (6-layer Transformer Encoder, 66M parameter, bobot ~260 MB, inisialisasi lapisan berseling dari Teacher).
* **Fungsi Objektif:** *Joint Loss* (Kombinasi *Cross-Entropy Loss* untuk label keras dan *Kullback-Leibler Divergence* dengan suhu $T = 2.0$ untuk *soft logits*).
* **Target Metrik:**
  - Rasio kompresi parameter: $CR = 1{,}89\times$ (pengurangan bobot fisik 47,2%).
  - Toleransi penurunan Macro-F1: $\Delta F_1 \le 1{,}50\%$.
  - Kecepatan inferensi CPU: $\tau \le 30$ ms / komentar.

---

## 🚀 Quickstart

1. **Buka Dashboard Progres (Lokal):**
   Buka file `progress/index.html` pada browser Anda (statis murni, tanpa dependensi server).

2. **Evaluasi Inferensi PyTorch (Simulasi CPU Runner):**
   Model dievaluasi menggunakan PyTorch runtime murni (`torch.no_grad()`) pada arsitektur CPU untuk mengukur latensi inferensi dan konsumsi RAM.
