# Research Gap & Kerangka Metodologi Tesis S2

**Judul Resmi Proposal Tesis (Bab 1):**
> ### **"DETEKSI SELF-ADMITTED TECHNICAL DEBT MULTI ARTEFAK DOMAIN MENGGUNAKAN DISTILASI CODEBERT"**
*English:* *“Multi-Artifact Domain Self-Admitted Technical Debt Detection Using Distilled CodeBERT”*

---

## 1. Kesenjangan Riset Empiris (Research Gap)

1. **Akumulasi Utang Teknis pada Continuous Integration (CI/CD):**
   * Xiao et al. (2021) dan Karelin et al. (2026) membuktikan bahwa kompromi teknis yang lolos tanpa deteksi dini pada integrasi berkelanjutan meningkatkan biaya pemeliharaan sistem hingga 40%.
   * Perez et al. (2023) menemukan adanya kesenjangan (*gap*) tajam antara utang teknis yang diakui pengembang secara sukarela (*admitted*) dan utang yang terukur secara statis (*measured*).

2. **Kelemahan Model Konvensional (*Shortcut Learning*):**
   * Studi atribusi gradien Zhuang et al. (2022) dan temuan empiris Gu et al. (2024) mengungkap bahwa model klasifikasi *deep learning* konvensional (TextCNN, BiLSTM) sangat rentan terhadap *shortcut learning*.
   * Model hanya mengasosiasikan label utang dengan kehadiran token pemicu eksplisit tertentu (seperti `TODO`, `FIXME`, `HACK`). Ketika pengembang menuliskan utang secara implisit (*implicit SATD*) tanpa penanda formal, tingkat kegagalan deteksi (*False Negative*) melonjak tinggi.

3. **Trade-off Kapasitas Model vs Efisiensi Lingkungan CI/CD:**
   * *Large Language Models* (LLM) seperti DeepSeek-Coder memiliki kapasitas penalaran kontekstual yang tinggi, namun kebutuhan memorinya besar (>16 GB VRAM) dan latensi inferensinya tinggi (>1.000 ms), sehingga mustahil diintegrasikan pada *runner* CI/CD CPU standar (seperti GitHub Actions).

---

## 2. Solusi Usulan: Knowledge Distillation

Menerapkan *response-based knowledge distillation* (Gou et al., 2021; Xu et al., 2023):
* **Teacher Model:** `deepseek-ai/deepseek-coder-1.3b-instruct` (1,3 Miliar parameter, FP16 Native, ~3 GB VRAM) mentransfer representasi penalaran semantik (*soft logits*, $T = 2.0$) ke model Student.
* **Student Model:** `microsoft/codebert-base` (125 Juta parameter) dioptimasi menggunakan fungsi objektif gabungan ($L_{\text{total}} = \alpha \cdot L_{\text{CE}} + (1 - \alpha) \cdot T^2 \cdot L_{\text{KD}}$).
* **Hasil yang Ditargetkan:** Model Student tetap ringkas (125M), memiliki akurasi tinggi pada utang implisit lintas artefak (D1–D3), dan mampu dieksekusi dengan latensi rendah pada CPU tunggal ($\tau < 30$ ms, RAM $< 500$ MB).

---

## 3. Rumusan Masalah (Research Questions) — Verbatim Bab 1

* **RQ1:**  
  Bagaimana pengaruh penerapan distilasi pengetahuan pada arsitektur CodeBERT terhadap peningkatan kemampuan deteksi *Self-Admitted Technical Debt* dibandingkan model baseline?  
  *(Evaluasi: Macro-F1, MCC, AUC-PR dengan uji statistika non-parametrik Wilcoxon Signed-Rank Test & Cliff's Delta, Abdu et al., 2024)*.

* **RQ2:**  
  Sejauh mana *Distilled CodeBERT* efektif dalam mendeteksi *Self-Admitted Technical Debt* yang bersifat implisit ketika kata kunci eksplisit disamarkan atau dihilangkan?  
  *(Evaluasi: Stabilitas skor pada korpus bertopeng D4 Implicit Masked Suite, Zhuang et al., 2022)*.

* **RQ3:**  
  Bagaimana perbandingan kinerja *Distilled CodeBERT* dengan model pembanding ditinjau dari akurasi deteksi dan efisiensi komputasi pada skenario implementasi CI/CD?  
  *(Evaluasi: Ukuran model, throughput, latensi inferensi $\tau < 30$ ms, dan memori $M_{\text{peak}} < 500$ MB pada CPU tunggal via format ONNX Runtime)*.
