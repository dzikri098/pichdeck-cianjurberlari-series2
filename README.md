# Website Pitch Deck Interaktif: KONI Kabupaten Cianjur
## Cianjur Berlari Bupati Series Season 2: Platform Digital Terintegrasi

Website presentasi interaktif dan dinamis yang dibangun khusus untuk pitching konsep ekosistem digital **Cianjur Berlari Bupati Series Season 2** kepada pimpinan KONI Kabupaten Cianjur, panitia penyelenggara, dan calon mitra strategis.

Pitch deck dan arsitektur platform digital ini dibuat serta dikelola oleh **Creative Digital Innovation (Creadin.co)** ([https://www.creadin.co/](https://www.creadin.co/)) sebagai mitra perancang ekosistem event olahraga daerah.

> **Catatan Produk:** Website ini adalah **presentasi pitch deck berbasis web yang dapat dijalankan secara interaktif**, bukan website pendaftaran lomba produksi. Seluruh alur pendaftaran, penyerahan race pack, dan pemantauan data berjalan menggunakan simulasi status browser (tanpa database produksi, tanpa pengiriman email nyata, dan tanpa transaksi finansial).

---

## 1. Cara Menjalankan Project

### Prasyarat
- Node.js versi 18 ke atas (direkomendasikan Node.js 20 atau 24 LTS)
- npm, pnpm, atau yarn

### Instalasi & Mode Pengembangan (Dev Server)
```bash
# Masuk ke direktori project
cd "Pitch-deck/CianjurBerlari-Series2"

# Jalankan server pengembangan
npm run dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000).

### Build Produksi & Deploy
```bash
# Build aplikasi produksi (Next.js App Router)
npm run build

# Menjalankan server hasil build
npm run start
```

### Panduan Deploy ke GitHub & Vercel

#### 1. Push ke GitHub
```bash
# Inisialisasi & commit perubahan (sudah disiapkan .gitignore)
git add .
git commit -m "feat: initial commit pitch deck cianjur berlari s2"

# Hubungkan ke repository GitHub Anda
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

#### 2. Deploy ke Vercel (Rekomendasi Utama)

##### Cara A: Melalui Vercel Dashboard (Paling Mudah)
1. Buka [https://vercel.com/new](https://vercel.com/new).
2. Hubungkan akun GitHub Anda dan pilih repository project ini.
3. Vercel akan otomatis mendeteksi Framework Preset: **Next.js**.
4. Pengaturan build default sudah optimal (`npm run build`, direktori output `.next`).
5. Klik tombol **Deploy**. Project langsung aktif dengan SSL otomatis dan domain gratis `https://nama-project.vercel.app`.

##### Cara B: Melalui Terminal (Vercel CLI)
```bash
# Deploy preview instan
npx vercel

# Deploy langsung ke production
npx vercel --prod
```

---

## 2. Navigasi & Pengalaman Presentasi

Website ini dilengkapi dua mode presentasi yang dapat dialihkan melalui tombol di bilah navigasi atas:

1. **Mode Presentasi (Default):**
   - Menampilkan satu scene terfokus per layar (teroptimalkan untuk layar laptop 1366×768, monitor 1920×1080, maupun proyektor panggung).
   - Dilengkapi bilah progres, tombol Next/Previous, serta panel kontrol ringkas di sudut kanan bawah.
2. **Mode Explore:**
   - Menampilkan seluruh 20 scene secara bersambung (vertical scroll) dengan navigasi anchor (`#opening`, `#registration`, `#pickup`, dll.). Cocok untuk peninjauan mandiri oleh reviewer.

### Pintasan Keyboard (Presenter Hotkeys)
| Tombol | Tindakan |
|---|---|
| `→` atau `Spasi` | Berpindah ke scene berikutnya |
| `←` | Kembali ke scene sebelumnya |
| `M` | Membuka daftar isi seluruh scene (Drawer Navigasi) |
| `?` | Membuka jendela bantuan pintasan keyboard |
| `Esc` | Menutup jendela modal atau popup aktif |

---

## 3. Fitur Interaktif yang Siap Didemokan

Seluruh alur demo berikut telah terhubung dalam satu *shared client state* (`src/state/demoStore.tsx`):

1. **Landing Page Mockup (Scene 07 & 08):**
   - Visualisasi antarmuka web event bernuansa *sport-tech* modern, mencerminkan identitas daerah Kabupaten Cianjur, lengkap dengan pilihan kategori (5K, 10K, 21K) dan agenda lomba.
2. **Simulasi Registrasi Peserta (Scene 09):**
   - Formulir pendaftaran pelari dengan validasi field, pilihan ukuran jersey, kontak darurat, serta **proteksi 1 Tiket 1 NIK (16 digit)**.
   - Dilengkapi tombol preset demo untuk menguji langsung: pendaftaran NIK baru (sukses) vs pendaftaran NIK duplikat (otomatis diblokir sistem untuk mencegah calo tiket dan akun ganda).
   - Mengirim formulir memunculkan pesan sukses resmi: *"Pendaftaran berhasil. Silakan cek email Anda untuk akses dashboard peserta."*, informasi ID pendaftaran, NIK terkunci dengan masking privasi, serta tombol buka dashboard.
   - Sesuai prinsip keamanan: **tidak pernah menampilkan atau mengirimkan kata sandi terbuka (plaintext)**.
3. **Preview Notifikasi Email Akses (Scene 10):**
   - Simulasi email transaksional resmi dari panitia KONI yang menjelaskan model akses aman berbasis tautan terverifikasi (magic link).
4. **Dashboard Peserta & Paspor QR (Scene 11 & 12):**
   - Menampilkan identitas peserta, nomor BIB, jadwal race pack di Pendopo Cianjur, serta **kode QR vektor dinamis** dengan status `Belum Diambil` atau `Sudah Diambil`.
5. **Admin Command Center & Data Peserta (Scene 13 & 14):**
   - Kartu KPI real-time (total kuota 2.500, pendaftar terverifikasi, jumlah race pack terambil, dan rasio distribusi).
   - Tabel peserta interaktif dengan pencarian cepat nama/BIB dan filter kategori serta status logistik.
6. **Demo Pengambilan Race Pack End-to-End (Scene 15):**
   - **Pemindaian QR:** Scanner meja membaca token peserta yang belum mengambil (contoh: Rian Hidayat).
   - **Foto Bukti:** Operator dapat menekan *Gunakan Foto Contoh Panitia* atau mengunggah file foto lokal dari perangkat (preview lokal base64, tidak diunggah ke server).
   - **Konfirmasi:** Tombol konfirmasi aktif setelah bukti terpasang. Setelah dikonfirmasi, status terkunci menjadi `Sudah Diambil`, rekam jejak petugas dan waktu tercatat, serta KPI admin dan dashboard peserta langsung tersinkronisasi.
7. **Pencegahan Klaim Ganda / Scan Ulang (Scene 16):**
   - Scan ulang kode peserta yang sudah mengambil memunculkan status `Race Pack Sudah Diambil` berserta bukti foto dan waktu sebelumnya. Tombol klaim dinonaktifkan otomatis.
8. **Deteksi Kode Tidak Valid:**
   - Scan token invalid memunculkan status terkendali `Kode Tidak Ditemukan` tanpa membocorkan informasi pribadi apapun.
9. **Tombol Reset Demo:**
   - Tersedia di bilah atas untuk mengembalikan seluruh data peserta dan status pengambilan ke kondisi awal sebelum presentasi dimulai.

---

## 4. Panduan Mengganti Aset Mockup Visual

Jika Anda telah menyelesaikan rancangan UI final (misalnya dari Figma), Anda dapat memasang gambar tersebut dengan mudah tanpa perlu mengubah tata letak presentasi:

### Langkah Penggantian:
1. Simpan gambar desain Anda (format `.png`, `.jpg`, `.webp`, atau `.svg`) ke dalam folder:
   ```text
   public/mockups/
   ```
2. Sesuaikan nama file dengan slot yang terdaftar di `src/content/mockups.ts`. Secara otomatis, `MockupFrame` akan menampilkan gambar baru Anda. Jika gambar belum diletakkan, komponen fallback interaktif akan ditampilkan secara elegan.

### Daftar 16 Slot Mockup Resmi:
| Slot ID | Nama File di `public/mockups/` | Tampilan Layar |
|---|---|---|
| `landing-desktop` | `landing-desktop.png` | Mockup Beranda Desktop |
| `landing-mobile` | `landing-mobile.png` | Mockup Beranda Ponsel |
| `registration-form` | `registration-form.png` | Formulir Pendaftaran |
| `registration-success` | `registration-success.png` | Halaman Sukses Registrasi |
| `email-preview` | `email-preview.png` | Template Email Akses |
| `participant-dashboard` | `participant-dashboard.png` | Dashboard Utama Peserta |
| `participant-racepack-qr` | `participant-racepack-qr.png` | Kartu Paspor QR di Ponsel |
| `admin-overview` | `admin-overview.png` | KPI Admin Command Center |
| `admin-participants` | `admin-participants.png` | Tabel Manajemen Peserta |
| `admin-analytics` | `admin-analytics.png` | Grafik Tren & Kuota |
| `scanner-idle` | `scanner-idle.png` | Scanner Meja Posko (Siaga) |
| `scanner-verified` | `scanner-verified.png` | Verifikasi Peserta Ditemukan |
| `scanner-proof-upload` | `scanner-proof-upload.png` | Lampiran Foto Dokumentasi |
| `scanner-success` | `scanner-success.png` | Penyerahan Berhasil |
| `scanner-already-claimed` | `scanner-already-claimed.png` | Peringatan Sudah Diambil |
| `scanner-invalid` | `scanner-invalid.png` | Peringatan Kode Invalid |

---

## 5. Mengubah Konfigurasi Informasi Event

Seluruh parameter kegiatan yang bersifat usulan dikumpulkan dalam satu berkas konfigurasi di:
```text
src/content/eventConfig.ts
```

Anda dapat mengubah nilai placeholder berikut:
- **Nama Acara & Tagline:** `eventName`, `seriesTag`
- **Penyelenggara:** `organizer` ("KONI Kabupaten Cianjur")
- **Tanggal & Lokasi:** `eventDatePlaceholder`, `venuePlaceholder`
- **Kategori Lomba:** kuota, jarak, dan deskripsi kategori 5K, 10K, 21K
- **Isi Paket Race Pack:** daftar perlengkapan lomba (Jersey, BIB, Medali, dll.)

---

## 6. Struktur Direktori Proyek

```text
src/
├── app/
│   ├── globals.css         # Styling Tailwind, custom scrollbar, aksesibilitas
│   ├── layout.tsx          # App shell, metadata, DemoProvider wrapper
│   └── page.tsx            # Root pitch deck controller, keyboard nav, URL hash
├── components/
│   ├── dashboards/
│   │   ├── AdminDashboardDemo.tsx        # Command center, KPI cards, tabel peserta
│   │   └── ParticipantDashboardDemo.tsx  # Dashboard pelari, kartu BIB, paspor QR
│   ├── demo/
│   │   ├── EmailPreviewDemo.tsx          # Pratinjau email transaksional
│   │   ├── QRScannerDemo.tsx             # Scanner posko, foto bukti, anti double-claim
│   │   └── RegistrationDemo.tsx          # Form registrasi dummy & success state
│   ├── diagrams/
│   │   ├── ArchitectureDiagram.tsx       # Topologi sistem modular & security notes
│   │   └── JourneyFlow.tsx               # Stepper 5 tahapan perjalanan peserta & panitia
│   ├── mockups/
│   │   ├── FallbackMockups.tsx           # Mock UI React interaktif untuk 16 slot
│   │   └── MockupFrame.tsx               # Device frame desktop browser & smartphone
│   ├── presentation/
│   │   ├── PresentationNav.tsx           # Bilah atas navigasi & progres presentasi
│   │   ├── SceneContent.tsx              # Renderer konten untuk 20 scene
│   │   ├── SceneDrawer.tsx               # Drawer daftar isi seluruh scene
│   │   ├── SceneShell.tsx                # Pembungkus viewport scene terstruktur
│   │   └── ShortcutsModal.tsx            # Popup bantuan pintasan keyboard
│   └── ui/
│       ├── Icons.tsx                     # Bespoke SVG icons ramah aksesibilitas
│       └── SvgQrCode.tsx                 # Generator kode QR vektor deterministik
├── content/
│   ├── eventConfig.ts      # Konfigurasi data & fakta acara (placeholder terkelola)
│   ├── mockups.ts          # Manifest registry 16 slot mockup
│   └── scenes.ts           # Definisi 20 scene presentasi
├── data/
│   ├── analytics.ts        # Data ilustrasi tren & kuota
│   └── participants.ts     # Data peserta simulasi aman
└── state/
    └── demoStore.tsx       # Shared client state & state machine verifikasi
public/
├── branding/               # Folder peletakan logo resmi panitia / sponsor
└── mockups/                # Folder peletakan file mockup visual final (.png/.jpg/.svg)
```

---

## 7. Batasan & Catatan Integritas

- **Data Simulasi:** Seluruh angka pendaftaran, statistik, dan nama peserta merupakan data contoh untuk keperluan pitching presentasi dan diberi tanda *Data Simulasi* / *Ilustrasi*.
- **Tanpa Pengiriman Data Keluar:** Seluruh simulasi registrasi dan preview foto penyerahan disimpan sementara di peramban pengguna; tidak ada data personal yang dikirimkan ke server luar.
- **Bukan Sistem Produksi:** Modul sistem produksi sesungguhnya (seperti payment gateway, email server, database PostgreSQL, dan chip timing) akan dibangun pada fase implementasi lanjutan setelah konsep ini disetujui oleh KONI Kabupaten Cianjur.

