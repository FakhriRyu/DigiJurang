# DIGI JURANG (Digital Papan Jurang)
### Media Pembelajaran Interaktif Nilai Tempat & Operasi Bilangan Konkret Berbasis Web

**DIGI JURANG** adalah aplikasi web edukasi interaktif (EdTech) yang mengalihmediakan alat peraga matematika konvensional **"Papan Jurang"** ke dalam media digital. Dirancang khusus untuk siswa Sekolah Dasar (fokus kelas rendah/awal pemahaman nilai tempat & operasi hitung) serta Guru Matematika.

---

## 🌟 Fitur Utama

1. **Halaman Pendahuluan & Capaian Pembelajaran**
   - Penjelasan tujuan pembelajaran matematika SD (Kurikulum Merdeka).
   - Pengantar konsep dasar nilai tempat: **Ratusan (100)**, **Puluhan (10)**, dan **Satuan (1)**.
   - Panduan 4 langkah mudah penggunaan media.

2. **Wadah Sumber Pipet (Pipette Reservoir)**
   - Mendukung **Drag and Drop** dan tombol aksi cepat **+ Ke Kotak 1** / **+ Ke Kotak 2**.
   - Pembeda visual nyata:
     - 🥢 **Pipet Satuan**: Pipet belang warna-warni tunggal (nilai 1).
     - 🪢 **Ikat Puluhan**: Bundel 10 pipet diikat pita emas (nilai 10).
     - 📦 **Wadah Ratusan**: Kotak akrilik memuat 100 pipet (nilai 100).

3. **Matriks Papan Jurang 3x3 Interaktif**
   - **Kolom Nilai Tempat**: Ratusan (Hijau), Puluhan (Biru), Satuan (Oranye).
   - **Baris 1 (Kotak 1)**: Bilangan pertama dengan live counter otomatis.
   - **Baris 2 (Kotak 2)**: Bilangan kedua dengan live counter otomatis.
   - **Operasi**: Mendukung mode Penjumlahan (+) dan Pengurangan (−).
   - **Animasi Meluncur (Sliding Chute)**: Pipet meluncur secara visual dari baris 1 & 2 menyatu ke baris 3.
   - **Fitur Regrouping / Menyimpan**: Otomatis mendeteksi jika satuan $\ge 10$ atau puluhan $\ge 10$ dengan tombol 1-klik untuk mengikat ke nilai tempat yang lebih tinggi.

4. **Panggung Pembuktian & Berhitung Konkret (Modal Interaktif)**
   - Saat **Kotak 3 (Hasil)** ditekan, panggung meja hitung virtual akan terbuka di tengah layar.
   - Seluruh pipet keluar dan berjejer rapi:
     - Kelompok Ratusan berjejer dalam wadah (100, 200, 300...).
     - Kelompok Puluhan berjejer dalam ikatan (10, 20, 30...).
     - Kelompok Satuan berjejer rapi satu per satu untuk dihitung secara konkret.
   - **Mode Hitung Interaktif**: Siswa dapat mengklik satu per satu pipet dengan efek suara lonceng ding dan highlight bersinar.
   - **Mode Hitung Otomatis**: Memutar hitungan langkah demi langkah disertai narasi audio.
   - Efek kembang api / confetti perayaan saat seluruh pipet selesai dibuktikan.

5. **Modul Pengayaan**
   - **Materi Interaktif**: Eksperimen mengikat 10 pipet satuan langsung di layar.
   - **Kuis & Soal Cerita SD**: Soal-soal matematika SD dengan tombol 1-klik "Pasang Soal ke Papan Jurang".
   - **Preset Contoh Cepat**: Guru dapat langsung memilih contoh soal untuk demonstrasi di depan kelas.
   - **Audio Synthesizer & Voice**: Menggunakan Web Audio API dan Web Speech API bahasa Indonesia (tanpa memerlukan aset MP3 eksternal).
   - **Tanpa Database**: 100% berjalan mandiri di sisi klien (*client-side*).

---

## 🚀 Cara Menjalankan

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Jalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Buka browser pada alamat yang ditampilkan di terminal (biasanya `http://localhost:5173`).

### 3. Build untuk Produksi
```bash
npm run build
```

---

## 🛠️ Teknologi yang Digunakan
- **React 19 & TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Framer Motion** (Animasi meluncur & transisi dinamis)
- **Canvas-Confetti** (Efek perayaan kemenangan)
- **Lucide React** (Ikonografi UI)
- **Web Audio API & Web Speech API** (Sintesis suara dan narasi edukatif)
