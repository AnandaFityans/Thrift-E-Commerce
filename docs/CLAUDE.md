# CLAUDE.md — Project Brain & Engineering Guardrails
Proyek: **Curated Thrifting & Vintage Apparel E-Commerce (1-of-1 Model)**

---

## 1. Dokumen Referensi Utama (`/docs`)
Sebelum merancang fitur, mengubah struktur database, atau membuat komponen UI baru, **WAJIB** merujuk pada dokumen spesifikasi di folder `/docs`:
- `docs/PRD.pdf` — Ruang lingkup fitur MVP, User Stories, dan aturan bisnis 1-of-1.
- `docs/TECH_BRIEF.pdf` — Skema PostgreSQL, mekanisme row-level locking, webhook, dan arsitektur sistem.
- `docs/MASTER_DESIGN.pdf` — Spesifikasi UI/UX Mobile-First & Desktop ("Curated Vintage Archive").

---

## 2. Tech Stack & Infrastruktur
- **Framework:** Next.js (App Router) + TypeScript (Strict Mode)
- **Styling & UI:** Tailwind CSS + Shadcn UI (Radix Primitives)
- **State Management:** Zustand + `localStorage` (khusus keranjang belanja klien)
- **Database & Auth:** Supabase (PostgreSQL + Row Level Security + Supabase Auth)
- **Media CDN:** Cloudinary (Signed Upload + Auto WebP/AVIF + Zoom detail kain)
- **Payment Gateway:** Midtrans (QRIS & Virtual Account + Webhook Verification)
- **Deployment:** Vercel

---

## 3. Design System Tokens ("Vintage Paper & Selvedge Indigo")
Hindari tampilan generik/AI slop (dilarang memakai drop-shadow tebal atau putih murni `#FFFFFF` sebagai background utama). Gunakan estetika **utilitarian garment-label** dengan garis tepi `1px solid`:

### Palet Warna
- `bg-canvas`: `#F4F1EA` (Warm Newsprint / Unbleached Cotton — background utama storefront)
- `bg-surface`: `#FAF9F5` (Off-white lembut — kartu form, spec sheet, modal)
- `bg-subtle`: `#E8E3D7` (Stone Beige — kotak dimensi P×L, countdown, metadata)
- `brand-primary`: `#1E293B` (Deep Selvedge Indigo — tombol CTA utama & active states)
- `brand-hover`: `#0F172A`
- `accent-rust`: `#C84B31` (Vintage Rust — khusus stempel `SOLD`, badge `ONLY 1 PIECE AVAILABLE`, dan alert error/stok habis)
- `text-primary`: `#1C1917` (Warm Charcoal Ink)
- `text-secondary`: `#57534E` (Warm Stone Grey)
- `border-hairline`: `#D6D0C2` (Garis pemisah `1px solid` pengganti drop-shadow)

### Tipografi
- **Heading & Judul Item:** `Syne` atau `Plus Jakarta Sans` (Bold, tegas)
- **Body & Form UI:** `Inter`
- **Spesifikasi Teknis & Angka:** `JetBrains Mono` dengan `tabular-nums` (Wajib untuk harga, ukuran aktual `P × L`, SKU arsip, `condition_score`, nomor pesanan, dan countdown timer)

---

## 4. Aturan Keras (Non-Negotiable Rules)

### A. Aturan Bisnis Thrifting (1-of-1)
1. **Stok Selalu 1:** Setiap SKU adalah barang unik tunggal (`1-of-1`). **DILARANG** membuat tombol pengubah kuantitas (`+` / `-`) atau dropdown varian ukuran di halaman produk maupun keranjang. Tampilkan label `Qty: 1 (Unique Item)`.
2. **Transparansi Dimensi & Minus:** Setiap produk wajib menampilkan ukuran aktual (`length_cm` × `width_cm`), `fit_size`, `condition_score` (1–10), serta `flaws_note` (catatan kondisi/minus).

### B. Aturan Keamanan & Backend
3. **Harga Selalu Dihitung di Server:** Endpoint `/api/checkout` **DILARANG** mempercayai harga atau ongkos kirim yang dikirim dari client/localStorage. Total harga wajib dikalkulasi ulang di database PostgreSQL menggunakan fungsi RPC `reserve_thrift_items` (`SELECT ... FOR UPDATE`).
4. **Penguncian Stok 15 Menit:** Saat pembeli menekan "Bayar Sekarang", kunci status produk menjadi `RESERVED` selama 15 menit. Jika dibayar via webhook valid, ubah ke `SOLD`. Jika lewat 15 menit tanpa bayar, kembalikan ke `AVAILABLE`.
5. **Proteksi RLS & Admin:** Tabel `orders` tertutup total untuk publik (akses pelacakan wajib via server endpoint `/api/orders/track` dengan validasi `order_number` + kontak). Rute `/admin/*` wajib diverifikasi di server menggunakan `app_metadata.role === 'admin'`.
6. **Zero Secret Exposure:** `SUPABASE_SERVICE_ROLE_KEY`, `MIDTRANS_SERVER_KEY`, dan `CLOUDINARY_API_SECRET` dilarang keras memiliki awalan `NEXT_PUBLIC_` atau diimpor di komponen klien.

### C. Aturan UI/UX Mobile-First
7. **Anti-Zoom iOS:** Semua elemen `<input>`, `<textarea>`, dan `<select>` wajib memiliki ukuran font minimal **`16px` (`text-base`)**.
8. **Touch Target & Thumb-Zone:** Semua elemen interaktif (tombol ukuran S/M/L/XL, filter, CTA) wajib memiliki area sentuh minimal **`44×44px`**, dan tombol aksi utama diletakkan pada *Sticky Bottom Bar*.
9. **Rasio Gambar:** Semua foto produk wajib memakai rasio `aspect-[4/5]` dengan bingkai `border border-[#D6D0C2]`.

---

## 5. Struktur Direktori Standar
```text
src/
├── app/
│   ├── (storefront)/        # Halaman pembeli (/, /products, /products/[slug], /cart, /checkout, /order/confirmation/[id], /track-order, /login, /register)
│   ├── admin/               # Halaman admin (/admin/login, /admin/dashboard, /admin/products, /admin/orders)
│   └── api/                 # Route handlers (/api/checkout, /api/webhooks/payment, /api/orders/track, /api/cloudinary/sign)
├── components/
│   ├── ui/                  # Komponen dasar Shadcn yang sudah dikustomisasi token warna
│   ├── storefront/          # Navbar, Footer, ProductCard, SizeFilterBar, SpecSheet
│   └── admin/               # MobileAdminNav, CameraUploader, OrderFulfillmentCard
├── store/                   # Zustand cart store (1-of-1 logic)
└── lib/                     # Supabase client/server, Midtrans helper, Zod schemas