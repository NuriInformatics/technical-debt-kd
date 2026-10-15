# Dataset Korpus Empiris (D1 - D4) & Kredit Repositori

Repositori ini memuat seluruh korpus pengujian SATD (*Self-Admitted Technical Debt*) multi-artefak yang bersumber dari publikasi internasional terkemuka:

---

## 1. Kredit & Asal Repositori Sumber

### 📁 Dataset D1: Java Source Code Comments Benchmark (62.275 baris)
* **Asal Riset:** Maldonado & da Silva (IEEE SANER 2017) *"Detecting Technical Debt through Source Code Comments"*.
* **Repositori Asal:** [`yikun-li/satd-different-sources-data`](https://github.com/yikun-li/satd-different-sources-data/blob/main/satd-dataset-code_comments.csv)
* **Mirror SANER 2024:** [`zscszndxdxs/2023-MT-BERT-SATD`](https://github.com/zscszndxdxs/2023-MT-BERT-SATD/tree/main/dataset_four_artifacts)
* **Cakupan:** 10 sistem open-source Java besar (Ant, ArgoUML, Columba, EMF, Hibernate, JEdit, JFreeChart, JMeter, JRuby, SQuirrel SQL).

### 📁 Dataset D2: Multi-Source Artifacts Corpus (17.000 baris teranotasi)
* **Asal Riset:** Li, Soliman, & Avgeriou (2023) *"Automatic identification of self-admitted technical debt from four different sources"*, *Empirical Software Engineering* (Springer EMSE, Vol. 28, No. 3). DOI: [10.1007/s10664-023-10297-9](https://doi.org/10.1007/s10664-023-10297-9).
* **Repositori Resmi:** [`https://github.com/yikun-li/satd-different-sources-data`](https://github.com/yikun-li/satd-different-sources-data)
* **File di Repositori Ini:**
  * `D2_commit_messages.csv` (5.000 sampel pesan commit Git)
  * `D2_issues.csv` (7.000 sampel tiket Jira issue trackers)
  * `D2_pull_requests.csv` (5.000 sampel diskusi pull request GitHub)

### 📁 Dataset D3: Scientific Software Corpus (900.358 baris)
* **Asal Riset:** Melin, Eisty, Watson, & Malviya-Thakur (2026) *"Multi-Artifact Analysis of Self-Admitted Technical Debt in Scientific Software"*, *ACM PASC '26* (Oak Ridge National Laboratory & Boise State University). DOI: [10.1145/3815572.3815759](https://doi.org/10.1145/3815572.3815759).
* **Repositori Resmi:** [`https://github.com/MelinHead225/PASC26-Replication-Package`](https://github.com/MelinHead225/PASC26-Replication-Package)
* **File di Repositori Ini:**
  * `D3_scientific_master.csv` (Master 4-artifact dataset dari 23 software saintifik dan simulasi DOE/ORNL)

### 📁 Dataset D4: Implicit SATD Masked Test Suite (4.000 baris seimbang)
* **Dasar Metodologi:** Zhuang, Qu, & Chen (2022) *"An empirical study of gradient-based explainability techniques for self-admitted technical debt detection"*, *Journal of Information Technology* (Scopus Q1).
* **Pembuatan:** Disintesis lokal menggunakan `generate_d4_masked.py`. Kata kunci eksplisit penanda utang (`TODO`, `FIXME`, `HACK`, `BUG`, `WORKAROUND`) disamarkan menjadi token `[MASK]` untuk mengukur ketahanan model terhadap bias *shortcut learning*.

---

## 2. Ringkasan Format & Kolom Data

| File Dataset | Jumlah Baris | Kolom Utama | Tipe Label |
|---|---|---|---|
| `D1_code_comments.csv` | 62.275 | `project`, `text`, `classification` | Multi-class & Binary |
| `D2_commit_messages.csv` | 5.000 | `project`, `sha`, `text`, `classification`, `indicator` | Multi-class & Binary |
| `D2_issues.csv` | 7.000 | `project`, `issue_number`, `issue_type`, `text`, `classification` | Multi-class & Binary |
| `D2_pull_requests.csv` | 5.000 | `project`, `pull_number`, `pull_type`, `id`, `text`, `classification` | Multi-class & Binary |
| `D3_scientific_master.csv` | 900.358 | `status`, `project`, `text`, `label`, `artifact_source` | Domain Science Debt |
| `D4_implicit_masked_test.csv` | 4.000 | `project`, `text`, `text_masked`, `removed_keywords`, `label` | Biner Seimbang (50% / 50%) |

---

## 3. Menjalankan Sintesis D4
```bash
python3 generate_d4_masked.py
```
Menghasilkan korpus uji bertopeng seimbang tanpa merusak data asli.
