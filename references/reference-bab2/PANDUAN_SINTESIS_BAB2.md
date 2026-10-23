# PANDUAN STRUKTUR & SINTESIS NARASI BAB II MENUJU UTS

Dokumen ini memetakan 15 referensi jurnal terverifikasi (2021–2026) ke dalam struktur subbab BAB II:

## 2.1 Landasan Teori Formal & Formulasi Matematis
- **Konsep SATD & Taksonomi:** Rujuk Abdulaziz et al. [1], Cassee et al. [2], dan Li et al. [4], [6].
- **Representasi Transformer Kode:** Uraikan arsitektur multi-head self-attention pada CodeBERT, embedding token semantik vs token sintaksis (Sun et al. [9], Chen et al. [10]).
- **Teori Shortcut Learning & Korelasi Semu:** Rumuskan representasi $P(Y|X_{\text{core}})$ vs $P(Y|X_{\text{shortcut}})$ dan bagaimana model mengeksploitasi kata kunci pemicu (Tantithamthavorn et al. [14], Mitchell et al. [15]).
- **Formulasi Knowledge Distillation:**
  $$L_{\text{total}} = \alpha L_{\text{CE}}(y, \sigma(z_s)) + (1-\alpha) \tau^2 L_{\text{KL}}(\sigma(z_s/\tau), \sigma(z_t/\tau))$$
  Rujuk Sun et al. [9], Mahouachi [11], dan Dong & Chen [13].
- **Metrik Evaluasi Imbalanced & Effort-Aware:** Macro-F1, MCC, AUC-PR (Maldonado D1 memiliki rasio 1:14,36) sesuai catatan dosen pengampu.

## 2.2 Tinjauan Penelitian Terdahulu (State-of-the-Art)
Salin langsung **Tabel 2.1** dari berkas `TABEL_2_1_MATRIKS_STATE_OF_THE_ART.md`. Buat narasi pengantar yang mengelompokkan 15 paper tersebut ke dalam 3 klaster tematik:
1. *Klaster Evolusi & Deteksi SATD (Paper [1]-[8])*
2. *Klaster Kompresi Model & Knowledge Distillation dalam Rekayasa Perangkat Lunak (Paper [9]-[13])*
3. *Klaster Robustness & Mitigasi Shortcut Bias dalam AI4SE (Paper [14]-[15])*

## 2.3 Analisis Kritis Komparatif & Pemetaan Research Gap
1. **Theoretical Gap:** Sebagian besar model SATD mengasumsikan distribusi fitur identik (I.I.D.), padahal representasi fitur utang teknis menderita korelasi semu terhadap kata kunci penanda eksplisit (TODO/FIXME), menyebabkan model buta terhadap semantik implisit.
2. **Methodological Gap:** Upaya kompresi model transformer dalam software engineering umumnya hanya fokus pada pruning acak atau evaluasi task umum tanpa mekanisme transfer ketahanan representasi terhadap data bertopeng/adversarial.
3. **Empirical/Practical Gap:** Model skala penuh (125M parameter) terlalu boros memori (sekitar 490 MB) untuk integrasi CI/CD harian, sementara model kecil konvensional mengalami degradasi performa drastis (>3,50%) dan gagal pada data implisit.

## 2.4 Novelty Statement & Posisi Kontribusi Penelitian
Merumuskan kerangka kerja *Response-Based Knowledge Distillation* pertama pada deteksi SATD yang secara bersamaan memangkas parameter arsitektur sebesar 47,2% (12L -> 6L) sekaligus bertindak sebagai regularisasi semantik untuk memitigasi ketergantungan jalan pintas (*shortcut learning*), dibuktikan dengan retensi F1-score >= 82% pada suite pengujian komentar bertopeng (*implicit masked test*).
