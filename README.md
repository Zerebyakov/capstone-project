# Zenin News

Zenin News adalah aplikasi berita berbasis web yang mengambil artikel dari **New York Times Article Search API**. Pengguna dapat menjelajahi berita berdasarkan topik, mencari artikel, dan menyimpan berita pilihan.

## Fitur

- **Berita Indonesia** — menampilkan artikel hasil pencarian topik `indonesia`.
- **Berita Programming** — menampilkan artikel hasil pencarian topik `programming`.
- **Pencarian artikel** — mencari artikel New York Times menggunakan kata kunci.
- **Urutan terbaru** — hasil pencarian diminta dengan urutan `newest`.
- **Daftar tersimpan** — menyimpan atau menghapus artikel dari daftar pilihan.
- **Tampilan responsif** — antarmuka React dan Tailwind CSS untuk layar desktop dan mobile.

## Teknologi

| Bagian | Teknologi |
| --- | --- |
| UI | React, Tailwind CSS |
| Build tool | Vite |
| State management | Redux Toolkit, React Redux |
| Navigasi | React Router |
| HTTP client | Axios |
| Sumber berita | New York Times Article Search API |

## Halaman aplikasi

| Rute | Konten |
| --- | --- |
| `/` | Berita bertopik Indonesia |
| `/programming` | Berita bertopik programming |
| `/search/:query` | Hasil pencarian berdasarkan kata kunci |
| `/saved` | Artikel yang disimpan selama sesi aplikasi |

## Menjalankan secara lokal

### Prasyarat

- Node.js dan npm
- API key dari New York Times Developer Network

### Instalasi

```bash
git clone https://github.com/Zerebyakov/capstone-project.git
cd capstone-project
npm install
```

Buat file `.env` di direktori utama proyek dan isi API key:

```env
VITE_API_KEY=masukkan_api_key_anda
```

Jalankan server pengembangan:

```bash
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal.

## Perintah yang tersedia

```bash
npm run dev      # Menjalankan server pengembangan
npm run build    # Membuat build produksi di dist/
npm run preview  # Meninjau build produksi secara lokal
npm run lint     # Menjalankan ESLint
```

## Cara kerja API

Aplikasi mengirim permintaan ke endpoint Article Search API New York Times dan meneruskan `VITE_API_KEY` sebagai parameter `api-key`. Kata kunci pencarian dikirim sebagai parameter `q`, dengan urutan hasil `newest`.

## Catatan

- Daftar artikel tersimpan menggunakan Redux Toolkit di memori aplikasi dan akan kembali kosong setelah halaman dimuat ulang.
- Jangan commit file `.env` atau membagikan API key di repositori.
- Karena `VITE_API_KEY` digunakan pada aplikasi frontend, nilainya dapat dilihat di browser atau bundle hasil build. Vite menjelaskan bahwa variabel berawalan `VITE_` terekspos ke kode sisi klien. Untuk deployment yang membutuhkan key tetap privat, gunakan backend atau fungsi server sebagai perantara API. [Dokumentasi environment variables Vite](https://vite.dev/guide/env-and-mode).

## Struktur proyek

```text
src/
├── api/          # Klien New York Times Article Search API
├── components/   # Komponen navigasi dan pencarian
├── pages/        # Halaman berita, pencarian, dan daftar tersimpan
└── store/        # Redux store dan news slice
```
