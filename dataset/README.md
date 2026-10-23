# Korpus Empiris Dataset Tesis S2 (Fokus Eksklusif Komentar Kode)

Repositori ini secara ketat difokuskan pada dataset primer **Komentar Kode Sumber Java (Dataset D1)** sesuai arahan evaluasi dan pembatasan ruang lingkup penelitian tesis magister:

---

## 📁 Dataset Primer: D1_code_comments.csv

* **Nama Korpus:** Java Code Comments SATD Benchmark (Maldonado & da Silva, IEEE SANER 2017 / TSE 2017)
* **Format:** Berkas CSV terstruktur (`D1_code_comments.csv`)
* **Total Sampel:** 62.275 baris komentar kode sumber
* **Bahasa Pemrograman:** Java
* **Cakupan Proyek:** 10 proyek perangkat lunak Java open-source terkemuka (Ant, ArgoUML, Columba, EMF, Hibernate, JEdit, JFreeChart, JMeter, JRuby, dan SQuirrel SQL).
* **Distribusi Kelas:**
  - **Positif SATD:** 4.053 sampel (6,51%)
  - **Negatif Non-SATD:** 58.222 sampel (93,49%)
  - **Rasio Ketimpangan (*Class Imbalance*):** 1 : 14,36
* **Labeling:**
  - Biner: `SATD` (1) vs `Non-SATD` (0)
  - Klasifikasi Tipe: *Design Debt, Defect Debt, Requirement Debt, Test Debt, Documentation Debt*.
* **Peran dalam Penelitian:**
  Menjadi satu-satunya korpus pelatihan, validasi, dan pengujian (*Stratified Cross-Project Split*) untuk menguji efektivitas *Response-Based Knowledge Distillation* dari Teacher (CodeBERT-base 12-layer) ke Student (Distilled-CodeBERT 6-layer).

---

## 📌 Catatan Penyesuaian Ruang Lingkup (Revisi Dosen Pembimbing)

Sesuai arahan dosen pembimbing, ruang lingkup penelitian difokuskan secara mendalam pada masalah utama:
1. **Peniadaan Dataset Multi-Artefak (D2) & Domain Saintifik (D3):** Seluruh data commit messages, pull requests, issue trackers, dan HPC ilmiah ditiadakan agar evaluasi representasi model terfokus murni pada komentar kode sumber.
2. **Peniadaan Korpus Sintetis Adversarial (D4):** Pengujian ablasi data sintetis bertopeng ditangguhkan untuk memastikan fokus riset terarah pada arsitektur kompresi distilasi CodeBERT, rasio kompresi parameter ($1{,}89\times$), retensi skor Macro-F1 ($\Delta F_1 \le 1{,}50\%$), dan latensi inferensi CPU.
