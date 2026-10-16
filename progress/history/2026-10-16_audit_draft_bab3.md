# Log History Revisi & Audit Naskah Bab 3
**Tanggal Audit:** 16 Oktober 2026  
**Objek Audit:** `Draft Naskah Bab 3.pdf` (23 Halaman)  
**Tipe Catatan:** Anomali Naskah, Typo, Cacat Sitasi, dan Formula Matematika

---

## 1. Daftar Temuan Typo & Kesalahan Administratif
* **[Typo/Placeholder] Judul Tesis Belum Diisi:**
  * *Lokasi:* Halaman 1 Cover Bab 3.
  * *Teks Awal:* `JUDUL RENCANA TESIS S2: [ Tuliskan Judul Rencana Tesis S2 yang telah disetujui / direvisi pada Tugas 01 & 02 ]`
  * *Koreksi/Tindakan:* Ganti menjadi: *"Deteksi Utang Teknis Implisit dan Ringan pada Pipeline CI/CD Menggunakan Distilasi CodeBERT"*.
  * *Status:* Tercatat untuk diekspor ke naskah Word.

* **[Typo] Inkonsistensi Angka NIM Mahasiswa:**
  * *Lokasi:* Halaman 1 Cover Bab 3.
  * *Teks Awal:* `NIM: 14250028` (Kelebihan digit `4`).
  * *Teks Valid (Bab 1):* `NIM: 1250028`.
  * *Koreksi/Tindakan:* Hapus angka `4` di awal NIM agar konsisten dengan naskah Bab 1 dan sistem kampus.

---

## 2. Daftar Temuan Inkonsistensi Teknis
* **[Kontradiksi Parameter] Ukuran Parameter Model Teacher:**
  * *Lokasi:* Halaman 7 (Subbab 3.2 poin 5) vs Halaman 14 (Tabel Konfigurasi).
  * *Teks Awal Halaman 7:* *"Model Teacher berskala 7 miliar parameter menghasilkan vektor logit..."*
  * *Teks Tabel Halaman 14:* `deepseek-ai/deepseek-coder-1.3b-instruct (1,3 Miliar Parameter)`.
  * *Koreksi/Tindakan:* Teks di Halaman 7 diselaraskan menjadi 1,3 Miliar parameter agar konsisten dengan batasan VRAM GPU Colab T4 (16 GB).

---

## 3. Daftar Temuan Sitasi & Daftar Pustaka
* **[Sitasi Hantu] Chicco et al. (2021) Hilang dari Daftar Pustaka:**
  * *Lokasi:* Halaman 16 (Subbab 3.5.1 Metrik MCC).
  * *Teks di Naskah:* *"Berdasarkan pembuktian matematis Chicco, Starovoitov, dan Jurman (2021) dalam IEEE Access..."*
  * *Cacat:* Rujukan ini tidak ada pada Daftar Pustaka Halaman 20–22.
  * *Koreksi/Tindakan:* Memasukkan entri resmi Chicco et al. (2021) ke dalam Daftar Pustaka naskah Word.

* **[Mismatched Citation] Salah Sasaran Nomor Sitasi:**
  * *Lokasi Halaman 16:* *"kebal terhadap pembengkakan nilai TN pada data jarang (rare events) [5]"*. Nomor `[5]` adalah Melin et al. (PASC '26, riset sains), bukan rujukan metrik AUC-PR.
  * *Lokasi Halaman 17:* *"domain komputasi sains [5][11]"*. Nomor `[11]` adalah Gu et al. (SANER '24, komentar Apache Java), bukan komputasi sains.
  * *Koreksi/Tindakan:* Menukar dan meluruskan nomor indeks sitasi.

---

## 4. Daftar Temuan Kerusakan Formula Matematika
* **[Broken Equation] Formula q_k(T) Terputus:**
  * *Lokasi:* Halaman 11 ke 12.
  * *Cacat:* Pembilang $\exp(z_k/T)$ terpotong batas bawah halaman, menyisakan penyebut $\sum \exp(z_j/T)$.
  * *Koreksi/Tindakan:* Gunakan formula Word Equation satu baris utuh.

* **[Broken Equation] Indeks F1_macro dan Kurung Himpunan Hilang:**
  * *Lokasi Halaman 12:* Tertulis `(k in 0, 1)`, seharusnya himpunan biner bertanda kurung kurawal `(k \in {0, 1})`.
  * *Lokasi Halaman 16:* Indeks rumus bertumpuk `k in F1macro = (F1_SATD + F1_Non-SATD)/2`.
  * *Koreksi/Tindakan:* Pisahkan rumus F1-kelas dan F1-macro menjadi dua baris independen.
