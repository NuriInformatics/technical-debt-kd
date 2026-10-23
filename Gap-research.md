# Research Gap & Kerangka Metodologi Tesis S2

**Judul Resmi Proposal Tesis:**
> ### **"DETEKSI SELF-ADMITTED TECHNICAL DEBT MENGGUNAKAN DISTILASI CODEBERT UNTUK MITIGASI SHORTCUT LEARNING"**
*English:* *“Self-Admitted Technical Debt Detection Using CodeBERT Distillation for Shortcut Learning Mitigation”*

---

## 1. Kesenjangan Riset Empiris (Research Gap)

1. **Akumulasi Utang Teknis pada Continuous Integration (CI/CD):**
   * Xiao et al. (2022) dan Karelin et al. (2026) membuktikan bahwa kompromi mutu perangkat lunak yang dibiarkan pada sistem integrasi berkelanjutan dapat berakumulasi menjadi defisit teknis jangka panjang dan meningkatkan beban pemeliharaan sistem.
   * Perez et al. (2022) menemukan kesenjangan (*gap*) signifikan antara utang teknis yang diakui pengembang secara eksplisit (*admitted*) dan utang yang terukur secara statis (*measured*).

2. **Ketergantungan Jalan Pintas (*Shortcut Learning*):**
   * Studi atribusi gradien Zhuang et al. (2022) dan Gu et al. (2024) mengungkap bahwa model *deep learning* konvensional (TextCNN, BiLSTM) sangat rentan terhadap *shortcut learning*.
   * Model cenderung mengasosiasikan label utang semata-mata dengan kemunculan kata kunci penanda eksplisit tertentu (seperti `TODO`, `FIXME`, atau `HACK`). Ketika pengembang mendeskripsikan utang teknis secara implisit menggunakan bahasa alami biasa tanpa penanda formal, tingkat kegagalan deteksi (*False Negative*) meningkat tajam.

3. **Dilema Kapasitas Model vs Efisiensi Komputasi:**
   * Model representasi transformer penuh seperti CodeBERT-base 12-layer (125M parameter, bobot ~490 MB) menghasilkan representasi semantik yang komprehensif, namun membutuhkan alokasi memori dan latensi komputasi yang tinggi (~85 ms per sampel), sehingga kurang realistis untuk pemindaian berkala pada lingkungan CPU terbatas.
   * Sebaliknya, pemangkasan layer secara naif tanpa bimbingan Teacher menyebabkan hilangnya kapasitas representasi semantik dan memicu penurunan performa deteksi secara drastis.

---

## 2. Solusi Usulan: Response-Based Knowledge Distillation

Menerapkan kerangka kerja *Response-Based Knowledge Distillation* (Gou et al., 2021; Hinton et al., 2015):
* **Teacher Model:** `microsoft/codebert-base` (12-layer Transformer Encoder, 125M parameter, bobot ~490 MB).
* **Student Model:** `Distilled-CodeBERT` (6-layer Transformer Encoder, 66M parameter, bobot ~260 MB) yang diinisialisasi berseling dari lapisan bobot Teacher (lapisan 1, 3, 5, 7, 9, 11).
* **Fungsi Objektif Gabungan (*Joint Loss*):**
  $$L_{\text{total}} = \alpha L_{\text{CE}}(y, \sigma(z_s)) + (1 - \alpha) T^2 L_{\text{KL}}(\sigma(z_s/T), \sigma(z_t/T))$$
  dengan parameter suhu $T = 2.0$ dan bobot keseimbangan $\alpha = 0{,}4$.
* **Hasil yang Ditargetkan:** Model Student memangkas bobot fisik sebesar 47,2% ($CR = 1{,}89\times$), mempertahankan retensi performa tinggi (toleransi penurunan $\Delta F_1 \le 1{,}50\%$), dan dapat dieksekusi cepat pada CPU single-core ($\tau \le 30$ ms per sampel komentar).

---

## 3. Rumusan Masalah (Research Questions) — Revisi Sesuai Arahan Dosen

* **RQ1 (Efektivitas Kinerja Deteksi):**  
  Bagaimana efektivitas kinerja klasifikasi deteksi *Self-Admitted Technical Debt* (Macro-F1, MCC, AUC-PR) model *Distilled-CodeBERT* (Student 6-layer) dibandingkan model *Teacher* (CodeBERT-base 12-layer) serta model *baseline* pembanding (TextCNN, BiLSTM, dan Student 6-layer tanpa distilasi) pada dataset komentar kode Java?

* **RQ2 (Efisiensi Kompresi Arsitektur & Throughput):**  
  Sejauh mana efisiensi kompresi arsitektur dari 12 layer ke 6 layer pada *Distilled-CodeBERT* mampu mereduksi parameter fisik, ukuran memori penyimpanan, serta mempercepat waktu inferensi komputasi pada CPU tunggal?

* **RQ3 (Analisis Trade-off Kompresi vs Retensi F1 & Atribusi Semantik XAI):**  
  Bagaimana perbandingan *trade-off* antara rasio kompresi parameter terhadap toleransi degradasi skor Macro-F1 ($\Delta F_1 \le 1{,}50\%$) pada *Distilled-CodeBERT*, serta bagaimana analisis atribusi fitur berbasis *Explainable AI* (Integrated Gradients) membuktikan bahwa model terkompresi tetap mempertahankan fokus pada konteks semantik kalimat utang teknis?
