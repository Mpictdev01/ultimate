
# Ketentuan Batas Data & Biaya Upgrade Server

Dokumen ini menjelaskan batasan kapasitas penyimpanan (storage) dan database untuk website **Ultimate Autoshop**, serta estimasi biaya jika diperlukan upgrade di masa depan.

Saat ini, website menggunakan layanan **Supabase (Free Tier)**.

---

## 1. Batas Kapasitas Saat Ini (Free Tier)

Layanan gratis memiliki batasan sumber daya sebagai berikut:

| Jenis Resource | Kapasitas Gratis | Penjelasan |
| :--- | :--- | :--- |
| **Database Size** | **500 MB** | Tempat menyimpan teks (artikel, data klien, tulisan portofolio). |
| **Storage Size** | **1 GB** | Tempat menyimpan file gambar (foto mobil, galeri, banner). |
| **Bandwidth** | **2 GB / bulan** | Batas transfer data keluar (saat pengunjung melihat gambar/web). |

> **Kesimpulan**: Isu utama biasanya ada di **Storage (1 GB)** untuk gambar. Database (Teks) 500MB sangat besar dan jarang habis untuk website profil.

---

## 2. Estimasi Jumlah Data Maksimal

Agar tetap dalam paket gratis (1 GB Storage), berikut adalah estimasi jumlah data yang disarankan. Asumsi rata-rata ukuran 1 gambar yang sudah dioptimasi adalah **500 KB - 1 MB**.

### A. Rekomendasi Alokasi (Safe Limit)
Kami menyarankan pembagian penggunaan sebagai berikut agar website tetap ringan dan hemat storage:

1.  **Artikel / Berita**
    *   **Maksimal**: Tidak terbatas (Teks).
    *   **Gambar Cover**: Disarankan maks **50-100 Artikel** (jika setiap artikel pakai foto baru).
    *   *Saran*: Gunakan gambar kompresi (WebP/JPG) max 300KB per gambar.

2.  **Portfolio Project**
    *   **Maksimal**: **50 - 80 Proyek**.
    *   Asumsi: 1 Proyek = 3-5 Foto Dokumentasi.
    *   Total foto: ~400 foto (estimasi 400MB).

3.  **Gallery (Galeri Foto)**
    *   **Maksimal**: **100 - 150 Foto**.
    *   Estimasi: 150MB - 300MB.

4.  **Layanan & Testimoni**
    *   **Maksimal**: ~50 item (Gambar kecil/Icon tidak memakan banyak tempat).

### B. Tips Menghemat Storage
*   **Wajib Kompres Foto**: Sebelum upload, kompres foto menggunakan tools seperti [TinyPNG](https://tinypng.com) atau simpan dalam format WebP.
*   **Hindari Upload Raw**: Jangan upload foto langsung dari kamera DSLR/HP (biasanya 5MB+ per foto). Resize dulu ke lebar max 1200px-1920px (per foto jadi hanya ~300KB).
*   **Hapus Data Lama**: Hapus portfolio atau artikel yang sudah sangat lama jika storage hampir penuh.

---

## 3. Ketentuan Upgrade (Jika Penuh)

Jika kapasitas 1 GB dirasa kurang atau bisnis berkembang pesat, Anda dapat melakukan upgrade server ke paket **Pro**.

### Supabase Pro Plan
*   **Biaya**: Sekitar **$25 USD / bulan** (Estimasi kurs Rp 16.000 = **± Rp 400.000 / bulan**).
*   *Harga dapat berubah mengikuti kebijakan Supabase dan kurs Dollar.*

### Keuntungan Upgrade:
1.  **Storage**: Naik drastis menjadi **100 GB** (Bisa tampung ribuan/puluhan ribu foto HD).
2.  **Database**: Naik menjadi **8 GB**.
3.  **Bandwidth**: Naik menjadi **50 GB / bulan**.
4.  **Backup**: Backup harian otomatis (7 hari retensi).
5.  **Support**: Layanan prioritas email support.

### Cara Pembayaran
Pembayaran dilakukan langsung ke pihak penyedia server (Supabase) menggunakan Kartu Kredit (Credit Card) atau Jenius/Bank Jago (Visa/Mastercard).

---

**Ringkasan untuk Klien:**
Untuk penggunaan normal (profil bengkel, update mingguan), paket **GRATIS** saat ini diperkirakan cukup untuk **1-2 tahun pertama**, asalkan foto yang diupload selalu dikompres/dikecilkan ukurannya. Jika storage penuh, cukup upgrade ke paket Pro dengan biaya ±Rp 400rb/bulan.

---

## 4. Biaya Jasa Maintenance & Penambahan Fitur

Selain biaya sewa server (yang dibayarkan langsung ke pihak Supabase), berikut adalah ketentuan **Biaya Jasa Developer (Maintenance Fee)** jika Anda membutuhkan bantuan teknis dari kami di kemudian hari:

### A. Jasa Bantuan Upgrade Server
Jika Anda membutuhkan bantuan kami untuk melakukan proses upgrade akun ke Pro Plan (setup pembayaran, migrasi data, dan konfigurasi ulang server) saat kuota penuh:
*   **Biaya Jasa**: **Rp 500.000** (Satu kali bayar per kejadian).
*   *Catatan*: Biaya langganan bulanan server tetap dibayarkan menggunakan kartu jenius/kredit milik klien.

### B. Penambahan / Perubahan Fitur (Custom Request)
Apabila Anda ingin menambah fitur baru yang belum ada saat ini, atau merubah desain/sistem yang sudah disepakati (Change Request):
*   **Biaya**: **Mulai dari Rp 500.000 s/d Rp 5.000.000+** (Tergantung tingkat kesulitan fitur).
*   **Contoh Kasus**:
    *   Menambah halaman baru / menu baru.
    *   Mengubah tata letak (layout) halaman utama.
    *   Menambah fitur WhatsApp API otomatis.
    *   Integrasi sistem pembayaran (Payment Gateway).

### C. Maintenance & Perbaikan Error (Bug Fix)
*   **Garansi**: Gratis perbaikan error (bug) selama **1 Bulan** setelah serah terima, asalkan kode tidak diubah oleh pihak lain.
*   **Setelah Masa Garansi**: Jika terjadi error atau butuh perbaikan teknis setelah masa garansi habis, akan dikenakan biaya perbaikan (**Service Fee**) sesuai kompleksitas masalah.
