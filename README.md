# 🇮🇩 Resep Nusantara

Website kumpulan resep masakan autentik Indonesia — dibangun dengan **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS**. Situs ini di-*export* sebagai HTML statis sehingga mudah di-*deploy* ke mana saja, termasuk Vercel.

Fitur:

- 🔍 Pencarian resep langsung (berdasarkan nama, bahan, atau daerah)
- 🏷️ Filter kategori: Makanan Utama, Lauk, Sayur, Sambal, Jajanan & Dessert, Minuman
- 📖 Halaman detail tiap resep: bahan (bisa dicoret), langkah memasak, waktu, porsi, tingkat kesulitan
- 📱 Tampilan responsif, nyaman dibuka di HP maupun laptop

## Menjalankan di komputer sendiri

Pastikan [Node.js](https://nodejs.org/) versi 18 atau lebih baru sudah terinstal.

```bash
# 1. Masuk ke folder proyek
cd resep-nusantara

# 2. Instal dependensi
npm install

# 3. Jalankan mode pengembangan
npm run dev
```

Buka http://localhost:3000 di browser.

Untuk membuat versi produksi (hasilnya ada di folder `out/`):

```bash
npm run build
```

## Mengunggah ke GitHub

```bash
# 1. Inisialisasi git (kalau belum)
git init
git add .
git commit -m "Website Resep Nusantara"

# 2. Buat repository baru di github.com (jangan centang "Add a README"),
#    lalu hubungkan. Ganti USERNAME dan NAMA-REPO sesuai milikmu:
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git

# 3. Push ke GitHub
git push -u origin main
```

## Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com) dan login (bisa pakai akun GitHub).
2. Klik **Add New… → Project**, lalu pilih repository yang baru kamu push.
3. Vercel otomatis mendeteksi proyek Next.js — **tidak perlu mengubah apa pun**, biarkan semua pengaturan default.
4. Klik **Deploy**. Tunggu 1–2 menit, websitemu akan online dengan alamat seperti `https://nama-repo.vercel.app`.

Setiap kali kamu `git push` perubahan baru ke GitHub, Vercel akan otomatis me-*deploy* ulang. 🎉

## Struktur proyek

```
resep-nusantara/
├── src/
│   ├── app/
│   │   ├── page.tsx            # Beranda (hero, pencarian, filter, daftar resep)
│   │   ├── layout.tsx          # Layout + metadata berbahasa Indonesia
│   │   ├── not-found.tsx       # Halaman 404
│   │   └── resep/[slug]/       # Halaman detail tiap resep (dibuat statis)
│   ├── components/             # RecipeBrowser, RecipeCard
│   └── data/recipes.ts         # Database resep (tambah resep baru di sini!)
├── next.config.ts              # output: "export" (static export)
└── README.md
```

### Menambah resep baru

Buka `src/data/recipes.ts` dan tambahkan objek resep baru ke array `recipes` dengan format yang sama (nama, daerah, kategori, tingkat kesulitan, waktu, porsi, bahan, langkah). Halaman detailnya akan otomatis dibuat saat `npm run build`.
