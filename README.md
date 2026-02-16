# PPDB Sekolah - Website Pendaftaran Peserta Didik Baru

Website PPDB Sekolah dengan tema Islamic yang elegan, modern, dan responsif untuk pendaftaran peserta didik baru secara online.

## 🎨 Fitur Utama

### 1. **Desain Islamic Professional**
- Tema warna hijau (simbol Islam), emas (elegan), dan putih (bersih)
- Font premium dengan Google Fonts (Poppins & Playfair Display)
- Ornamen Islamic dan tipografi yang menarik
- Responsif untuk desktop, tablet, dan mobile

### 2. **Navigasi Intuitif**
- Header dengan sticky navbar
- Menu responsif dengan hamburger menu untuk mobile
- Smooth scroll navigation
- Breadcrumb dan footer yang informatif

### 3. **Jenjang Pendidikan**
- **MI (Madrasah Ibtidaiyah)** - 5 Jalur Pendaftaran
- **MTs (Madrasah Tsanawiyah)** - 8 Jalur Pendaftaran  
- **MA (Madrasah Aliyah)** - 8 Jalur Pendaftaran

### 4. **Fitur Pendaftaran**
- Form pendaftaran interaktif dengan validasi
- Pilihan jalur dinamis sesuai jenjang
- Validasi email dan nomor telepon Indonesia
- Konfirmasi pendaftaran yang jelas

### 5. **Informasi Lengkap**
- Timeline jadwal pendaftaran yang jelas
- Informasi persyaratan dan panduan
- Section FAQ dan berita terbaru
- Kontak dan lokasi sekolah

### 6. **Interaktivitas**
- Hamburger menu untuk mobile
- Animasi smooth pada scroll
- Form validation real-time
- Hover effects dan transitions

## 📁 Struktur File

```
PPDB/
├── index.html              # Halaman utama
├── css/
│   └── style.css          # Styling dengan tema Islamic
├── js/
│   └── script.js          # JavaScript untuk interaktivitas
├── assets/                # Folder untuk gambar dan media
└── README.md              # Dokumentasi ini
```

## 🚀 Cara Menggunakan

### 1. **Buka di Browser**
   - Buka file `index.html` di browser Anda
   - Atau gunakan live server untuk development

### 2. **Customization**

#### Mengubah Nama Sekolah
Buka `index.html` dan cari:
```html
<span>PPDB Sekolah</span>  <!-- Ubah sesuai nama sekolah -->
```

#### Mengubah Warna Tema
Buka `css/style.css` dan ubah variabel di `:root`:
```css
:root {
    --primary-color: #1b5e20;        /* Warna hijau utama */
    --secondary-color: #d4af37;      /* Warna emas */
    --accent-color: #f57c00;         /* Warna aksen */
}
```

#### Mengubah Kontak & Informasi
Cari section `<!-- Info & Kontak -->` di `index.html` dan update:
- Alamat sekolah
- Nomor telepon
- Email
- Jam operasional

### 3. **Menambah Gambar**
- Letakkan gambar di folder `assets/`
- Update path di HTML dengan: `<img src="assets/nama-gambar.jpg" alt="Deskripsi">`

## 🎯 Jalur Pendaftaran

### MI (5 Jalur)
1. Jalur Prestasi Akademik
2. Jalur Prestasi Non-Akademik
3. Jalur KIP/Zonasi
4. Jalur Anak Guru/Karyawan
5. Jalur Reguler

### MTs (8 Jalur)
1. Jalur Prestasi Akademik
2. Jalur Prestasi Non-Akademik
3. Jalur KIP/Zonasi
4. Jalur Anak Guru/Karyawan
5. Jalur Program Khusus
6. Jalur Olahraga
7. Jalur Al-Qur'an
8. Jalur Reguler

### MA (8 Jalur)
- Sama dengan MTs

## 📅 Timeline Default

- **Pembukaan**: 1 - 15 Mei 2025
- **Verifikasi Data**: 16 - 30 Mei 2025
- **Pengumuman Hasil**: 31 Mei 2025
- **Registrasi Ulang**: 1 - 10 Juni 2025

*Sesuaikan dengan jadwal sekolah Anda di section "Jadwal Pendaftaran"*

## 🔧 Modifikasi Lanjutan

### Mengganti Template Contact Form
Jika ingin menggabungkan dengan email service (seperti Formspree, EmailJS):

```javascript
// Di script.js, ubah bagian form submission
// Tambahkan API key atau endpoint

kontakForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Kirim ke server atau email service
    const formData = new FormData(kontakForm);
    // ... proses pengiriman
});
```

### Menambah Database
Untuk menyimpan data pendaftaran, hubungkan dengan:
- **Firebase** untuk backend sederhana
- **Node.js + Express** untuk solusi custom
- **PHP + MySQL** untuk server tradisional

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ✨ Fitur CSS

- **Gradients**: Background warna yang elegan
- **Shadows**: Drop shadow untuk depth
- **Transitions**: Animasi yang smooth
- **Grid & Flexbox**: Layout modern yang fleksibel
- **Hover Effects**: Interaksi visual yang menarik
- **Scrollbar Styling**: Custom scrollbar dengan warna tema

## 🎬 Animasi

- Fade In Up
- Scale on Hover
- Smooth Transitions
- Heartbeat effect di footer
- Staggered animations untuk cards

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Browsers (iOS Safari, Chrome Android)

## 📝 SEO Basics

Website sudah dilengkapi dengan:
- Meta charset dan viewport
- Semantic HTML5
- Proper heading hierarchy
- Alt text untuk images (walaupun belum ada)
- Responsive design

Untuk SEO lebih baik, tambahkan:
```html
<meta name="description" content="PPDB Sekolah - Pendaftaran Peserta Didik Baru Tahun Ajaran 2026/2027">
<meta name="keywords" content="PPDB, pendaftaran, sekolah, madrasah, pendidikan">
```

## 🔒 Security Notes

Saat mengimplementasikan backend:
- Validasi data di server (jangan hanya client-side)
- Gunakan HTTPS
- Sanitize input untuk mencegah XSS
- Implement CSRF protection
- Rate limiting untuk form submission

## 📞 Support & Customization

Untuk customization lebih lanjut atau menambah fitur:
1. Modifikasi HTML untuk menambah section baru
2. Tambahkan CSS di `style.css`
3. Tambahkan JavaScript di `script.js`
4. Test di berbagai device dan browser

## 📄 License

Template ini dapat digunakan untuk keperluan pedidikan dan sekolah.

## 🎓 Tahun Ajaran

**2025 / 2026** - Sesuaikan dengan tahun ajaran sekolah Anda.

---

**Website PPDB Sekolah dibuat dengan ❤️ dengan tema Islamic yang profesional dan modern**

*Last Updated: 14 Februari 2026*
