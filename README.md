# technical-debt-kd

> **Deteksi Utang Teknis Implisit dan Ringan pada Pipeline CI/CD Menggunakan Distilasi CodeBERT**  
> *Lightweight & Implicit SATD Detection in CI/CD via Knowledge Distillation (DeepSeek-Coder-1.3B &rarr; CodeBERT 125M)*

---

## 📌 Ringkasan Tesis & Tautan Cepat

* **Peneliti:** Hanief Fathul Bahri Ahmad (NIM: 1250028)
* **Program Studi:** Magister Ilmu Komputer (S2)
* **Dosen Pengampu:** Dr. Irwansyah Saputra, M.Kom.
* 📊 **Dashboard Progres & Audit Naskah:** Buka [`progress/index.html`](progress/index.html) di browser.
* 🎯 **Research Gap & Rumusan Masalah:** Baca [`Gap-research.md`](Gap-research.md).
* 📚 **Daftar 21 Pustaka Empiris (APA 7th):** Lihat [`references.txt`](references.txt).

---

## 📁 Struktur Direktori

```text
technical-debt-kd/
├── dataset/         # Korpus D1, D2, D3 terunduh & skrip generator D4
├── models/          # Tempat bobot model & skrip ekspor ONNX untuk CPU CI/CD
├── progress/        # Dashboard web statis progres & audit revisi naskah
│   └── history/     # Log riwayat koreksi typo, sitasi, dan naskah Bab 3
├── references/      # Arsip 23 file PDF rujukan primer (Scopus Q1/Q2 & SINTA 1/2)
├── Gap-research.md  # Kesenjangan riset empiris & perumusan 3 RQ
├── references.txt   # Daftar referensi teks terstandar APA 7th
└── README.md        # Ringkasan repositori
```

---

## 🎖️ Sumber & Kredit Dataset (Dataset Acknowledgements)

Seluruh dataset yang digunakan dalam penelitian ini bersumber dari repositori riset *open science* terkurasi:

1. **Dataset D1 (Java Code Comments Benchmark - 62.275 baris):**
   * **Peneliti/Asal Riset:** Maldonado & da Silva (IEEE SANER 2017) *"Detecting Technical Debt through Source Code Comments"*. Menjadi *golden benchmark* pada Qu et al. (2023) dan Gu et al. (2024).
   * **Repositori Sumber:** [`yikun-li/satd-different-sources-data`](https://github.com/yikun-li/satd-different-sources-data) & mirror [`zscszndxdxs/2023-MT-BERT-SATD`](https://github.com/zscszndxdxs/2023-MT-BERT-SATD).

2. **Dataset D2 (Multi-Source Apache Artifacts - 17.000 baris):**
   * **Peneliti/Asal Riset:** Li, Soliman, & Avgeriou (2023) *"Automatic identification of self-admitted technical debt from four different sources"*, *Empirical Software Engineering* (Springer EMSE, Scopus Q1). DOI: [10.1007/s10664-023-10297-9](https://doi.org/10.1007/s10664-023-10297-9).
   * **Repositori Resmi:** [`https://github.com/yikun-li/satd-different-sources-data`](https://github.com/yikun-li/satd-different-sources-data).
   * **Artefak:** Git Commit Messages (5.000), Jira Issue Trackers (7.000), dan GitHub Pull Requests (5.000) dari 103 proyek open-source Apache.

3. **Dataset D3 (Scientific Software Corpus - 900.358 baris):**
   * **Peneliti/Asal Riset:** Melin, Eisty, Watson, & Malviya-Thakur (2026) *"Multi-Artifact Analysis of Self-Admitted Technical Debt in Scientific Software"*, *ACM PASC '26* (Oak Ridge National Laboratory & Boise State University). DOI: [10.1145/3815572.3815759](https://doi.org/10.1145/3815572.3815759).
   * **Repositori Resmi:** [`https://github.com/MelinHead225/PASC26-Replication-Package`](https://github.com/MelinHead225/PASC26-Replication-Package).
   * **Artefak:** Komputasi saintifik & HPC (Cantera, Spack, Deal.II, PETSc, QMCPACK) lintas 4 artefak.

4. **Dataset D4 (Implicit SATD Masked Evaluation Suite - 4.000 baris seimbang):**
   * **Metodologi:** Sintesis terstruktur mengadopsi protokol atribusi gradien Zhuang, Qu, & Chen (2022) (*Journal of Information Technology*, Scopus Q1).
   * **Generator:** Dihasilkan secara lokal melalui `dataset/generate_d4_masked.py` dengan menyamarkan kata kunci penanda eksplisit (`TODO`, `FIXME`, `HACK`, dll.) menjadi token `[MASK]`.

---

## 🚀 Quickstart

1. **Buka Dashboard Progres (Lokal):**
   Klik dua kali file `progress/index.html` pada browser Anda (statis murni, tanpa dependensi server).

2. **Generate Ulang Dataset D4 (Implicit Masked Test):**
   ```bash
   cd dataset
   python3 generate_d4_masked.py
   ```

3. **Ekspor Model ke ONNX (Simulasi Latensi CPU CI/CD):**
   ```bash
   cd models
   python3 export_onnx.py
   ```
