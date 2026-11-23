# Pilah — Panduan Pilah Sampah Rumah Tangga

**Pilah** adalah aplikasi web statis berbahasa Indonesia yang membantu rumah tangga memilah sampah dengan benar: cari barangnya, tahu tongnya, latih kemampuan lewat kuis, dan hitung dampaknya.

> Short English summary: Pilah is a static Indonesian-language web app that teaches household waste sorting — a searchable 80-item guide (Organic / Recyclable / Hazardous / Residual), a 10-question quiz, an impact calculator (kg diverted from landfill + CO₂e avoided), and a guide to community waste banks (bank sampah). No backend, no account, no tracking; works offline once loaded. Built for Arbiter Hacks V1, Theme track "Rethinking Waste".

## Fitur

1. **Panduan barang (80 barang)** — cari berdasarkan nama, saring berdasarkan kategori. Klik barangnya untuk melihat cara membuang (1–3 langkah) dan tipsnya.
2. **Kuis "Tong yang mana?"** — 10 barang acak per ronde, pilih tong yang benar, dapat skor + pesan di akhir.
3. **Kalkulator dampak** — masukkan jumlah anggota rumah tangga + berapa hari seminggu memilah → perkiraan kg sampah yang dialihkan dari TPA per bulan, CO₂e yang dihindari, dan total per tahun. Asumsi ditulis terbuka di halaman.
4. **Bank sampah** — cara kerja bank sampah, apa yang diterima, perkiraan harga per kilo (indikatif), dan kenapa memilah itu penting.
5. **Masalah sampah** — angka masalah sampah Indonesia + cara Pilah mengukur dampaknya (kg dialihkan + akurasi kuis).

## Kategori

| Kategori | Tong | Isi |
|---|---|---|
| Organik | Hijau | Sisa makanan dan sampah kebun (bisa dikompos) |
| Daur Ulang | Biru | Plastik, kaca, logam, kertas, karton yang bersih dan kering |
| Berbahaya (B3) | Merah | Baterai, elektronik, obat, bahan kimia, barang bermerkuri |
| Residu | Abu-abu | Sisanya: terkontaminasi, bahan campuran, tidak bisa didaur ulang |

## Teknologi

HTML + CSS + JavaScript polos. Tanpa build step, tanpa backend, tanpa dependensi, tanpa pelacakan. Cukup buka `index.html` atau hosting statis apa pun (GitHub Pages, Netlify, dll.).

## Struktur

- `index.html` — struktur halaman
- `style.css` — gaya (mobile-first)
- `data.js` — basis data 80 barang + definisi kategori
- `app.js` — logika pencarian, filter, kuis, dan kalkulator

## Asumsi kalkulator dampak

- Rata-rata sampah rumah tangga: **0,7 kg per orang per hari** (kisaran umum Indonesia; KLHK memakai 0,68–0,7 kg/kapita/hari).
- Bagian yang bisa dialihkan saat memilah: **60%** (organik yang bisa dikompos + daur ulang).
- CO₂ yang dihindari: **1 kg CO₂e per kg sampah yang dialihkan** — perkiraan campuran yang konservatif (faktor US EPA WARM untuk daur ulang campuran jauh lebih tinggi; angka 1 kg dipakai sebagai batas bawah yang aman).

## Kompetisi

Dibangun untuk **Arbiter Hacks V1**, jalur tema "Rethinking Waste". Deadline 21 Desember 2026. Satu submisi per tim, satu jalur saja; entri solo.

## Lisensi

MIT
