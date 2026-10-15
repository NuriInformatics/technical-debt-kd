# Research Gap: Deteksi SATD Implisit & Ringan pada CI/CD

Rangkuman kesenjangan riset (*research gap*) empiris yang mendasari usulan metodologi distilasi pengetahuan (*Knowledge Distillation*) pada *CodeBERT*:

---

## 1. Latar Belakang & Kesenjangan Empiris

1. **Akumulasi Utang Teknis pada Pipeline CI/CD:**
   * Xiao et al. (2021) dan Karelin et al. (2026) membuktikan bahwa kompromi teknis yang lolos tanpa deteksi dini pada integrasi berkelanjutan (CI/CD) meningkatkan biaya pemeliharaan sistem hingga 40%.
   * Perez et al. (2023) menemukan adanya kesenjangan tajam (*gap*) antara utang teknis yang diakui pengembang secara sukarela (*admitted*) dan utang yang terukur secara statis (*measured*).

2. **Kelemahan Model Konvensional (*Shortcut Learning*):**
   * Studi atribusi gradien Zhuang et al. (2022) dan temuan empiris Gu et al. (2024) mengungkap bahwa model klasifikasi *deep learning* konvensional (TextCNN, BiLSTM) sangat rentan terhadap *shortcut learning*.
   * Model hanya menghafal kata kunci eksplisit (seperti `TODO`, `FIXME`, `HACK`). Ketika pengembang menuliskan utang secara implisit (*implicit SATD*) tanpa kata kunci formal, tingkat kegagalan deteksi (*False Negative*) melonjak tinggi.

3. **Bottleneck Penerapan LLM pada Runner CI/CD:**
   * *Large Language Models* (LLM) seperti DeepSeek-Coder memiliki kapasitas penalaran semantik yang unggul, namun membutuhkan VRAM besar (>16 GB) dan latensi inferensi tinggi (>1.000 ms), sehingga mustahil diintegrasikan pada lingkungan *runner* CI/CD CPU gratis/standar (GitHub Actions).

---

## 2. Solusi Usulan: Knowledge Distillation

Menerapkan *response-based knowledge distillation* (Gou et al., 2021; Xu et al., 2023):
* **Teacher:** `deepseek-ai/deepseek-coder-1.3b-instruct` (1,3 Miliar parameter) mentransfer pemahaman konteks implisit (*dark knowledge*) melalui probabilitas lembut (*soft logits* dengan temperatur $T = 2.0$).
* **Student:** `microsoft/codebert-base` (125 Juta parameter) dilatih dengan *Joint Loss* ($L_{\text{total}} = \alpha \cdot L_{\text{CE}} + (1 - \alpha) \cdot T^2 \cdot L_{\text{KD}}$).
* **Target:** Model Student kompak, akurat mendeteksi utang implisit, dan beroperasi sangat cepat di CPU ($\tau < 30$ ms, RAM $< 500$ MB).

---

## 3. Rumusan Masalah (Research Questions)

* **RQ1 (Efektivitas Klasifikasi Multi-Artefak):**  
  Seberapa besar peningkatan akurasi (*Macro-F1*, *MCC*, *AUC-PR*) model Distilled-CodeBERT dibandingkan model *baseline* (TextCNN, BiLSTM, CodeBERT standar) pada korpus multi-artefak (D1, D2, D3)? *(Uji statistik Wilcoxon & Cliff's Delta, Abdu et al., 2024)*.
* **RQ2 (Ketahanan Terhadap Shortcut Learning):**  
  Apakah model terdistilasi mampu mempertahankan stabilitas performa saat diuji pada korpus bertopeng D4 di mana kata kunci pemicu eksplisit dihilangkan? *(Zhuang et al., 2022)*.
* **RQ3 (Kelayakan Komputasi CI/CD):**  
  Apakah model hasil distilasi memenuhi kriteria efisiensi latensi ($\tau < 30$ ms) dan jejak memori ($M_{\text{peak}} < 500$ MB) pada lingkungan simulasi CPU *single-core* tanpa akselerator GPU? *(Mounika et al., 2024)*.
