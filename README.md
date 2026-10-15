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
├── references/      # Arsip 23 file PDF rujukan primer (Scopus Q1/Q2 & SINTA 1/2)
├── Gap-research.md  # Kesenjangan riset empiris & perumusan 3 RQ
├── references.txt   # Daftar referensi teks terstandar APA 7th
└── README.md        # Ringkasan repositori
```

---

## 🚀 Quickstart

1. **Buka Dashboard Progres (Lokal):**
   Cukup klik dua kali file `progress/index.html` pada browser Anda (statis murni, tanpa dependensi server).

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
