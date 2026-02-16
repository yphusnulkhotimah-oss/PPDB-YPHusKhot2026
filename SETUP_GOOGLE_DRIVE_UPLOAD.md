# 📂 SETUP GOOGLE DRIVE - FILE AUTO UPLOAD

Panduan lengkap untuk setup **auto-upload file ke Google Drive** setiap kali ada pendaftaran.

---

## 🎯 Cara Kerja:

1. **User upload file** di form → File convert ke base64
2. **Kirim ke Google Apps Script** → Script receive data + file
3. **Google Apps Script auto-create folder** di Drive → Folder per jenjang & per pendaftar
4. **File otomatis tersimpan** di Drive dengan struktur rapih
5. **Link folder** muncul di Google Sheet untuk akses cepat

---

## 📋 Struktur Folder di Google Drive

Otomatis akan terbuat:

```
PPDB SD IT (root folder)
├── MI (jenjang)
│   ├── Ahmad Hidayat (1234567890)
│   │   ├── fileAkta.pdf
│   │   ├── fileKK.jpg
│   │   ├── fileKTP.jpg
│   │   ├── fileFoto.jpg
│   │   └── ...
│   ├── Siti Aisyah (9876543210)
│   │   ├── fileAkta.pdf
│   │   └── ...
├── MTS
│   ├── Budi Santoso (2468135790)
│   │   └── ...
└── MA
    └── ...
```

---

## ✅ LANGKAH 1: ENABLE GOOGLE DRIVE API

### 1.1 Buka Google Cloud Console
- Akses: https://console.cloud.google.com
- Login dengan akun Google yang sama dengan Apps Script

### 1.2 Cari Project
- Di dropdown (atas), cari project yang sesuai dengan Apps Script Anda
- Atau buat project baru:
  - Klik **"Select a project"** → **"NEW PROJECT"**
  - Nama: "PPDB Automation"
  - Klik **Create**

### 1.3 Enable Google Drive API
1. Di SearchBar, cari: **"Drive API"**
2. Klik hasil yang muncul: **"Google Drive API"**
3. Klik tombol **"ENABLE"**
4. Tunggu proses selesai (1-2 menit)

✅ **Google Drive API sudah aktif!**

---

## ✅ LANGKAH 2: UPDATE GOOGLE APPS SCRIPT

### 2.1 Copy Kode Baru
Buka file ini di workspace: `apps-script-code.gs`

### 2.2 Copy Semua Kode
- **Ctrl+A** untuk select semua
- **Ctrl+C** untuk copy

### 2.3 Paste ke Google Apps Script
1. Buka Google Apps Script editor (dari Google Sheet)
2. **Hapus semua kode lama**
3. **Paste kode baru** (Ctrl+V)
4. **Ctrl+S** untuk save

---

## ✅ LANGKAH 3: DEPLOY ULANG

### 3.1 Klik Deploy
1. Tombol **"Deploy"** → **"New Deployment"**
2. Pilih icon **⚙️** → **"Web app"**
3. Set:
   - **Execute as:** Email Anda
   - **Who has access:** "Anyone"
4. Klik **"Deploy"**

### 3.2 Salin URL Baru
- Copy URL yang di-generate
- URL format: `https://script.google.com/macros/s/[LONG_ID]/userweb`

### 3.3 Update pendaftaran.js
Di VS Code, buka `js/pendaftaran.js` dan cari:

```javascript
const scriptUrls = {
    'MI': 'https://script.google.com/macros/s/YOUR_MI_DEPLOYMENT_ID/userweb',
    'MTS': 'https://script.google.com/macros/s/YOUR_MTS_DEPLOYMENT_ID/userweb',
    'MA': 'https://script.google.com/macros/s/YOUR_MA_DEPLOYMENT_ID/userweb'
};
```

**Ganti dengan URL baru** (gunakan URL yang sama untuk ketiga jenjang):

```javascript
const scriptUrls = {
    'MI': 'https://script.google.com/macros/s/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o/userweb',
    'MTS': 'https://script.google.com/macros/s/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o/userweb',
    'MA': 'https://script.google.com/macros/s/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o/userweb'
};
```

---

## ✅ LANGKAH 4: AUTHORIZE DRIVE API

### 4.1 Trigger Authorization
1. Di Google Apps Script editor, cari dropdown function
2. Pilih **"testSendData"**
3. Klik tombol **"Run"**
4. Muncul popup auth, **klik "Review permissions"**
5. Pilih akun Google Anda

### 4.2 Grant Permission
1. Klik **"Go to PPDB Integration (unsafe)"** atau serupa
2. Klik **"Allow"** saat diminta izin Drive
3. Selesai! Script sekarang boleh akses Drive

---

## ✅ LANGKAH 5: TEST UPLOAD FILE

### 5.1 Buka Form
```
http://localhost:5500/pendaftaran.html?jenjang=MI
```
(Atau gunakan Live Server untuk buka local)

### 5.2 Isi Form & Upload File
1. Lengkapi semua field
2. Upload minimal 1 file (file apapun, jpg/pdf OK)
3. Klik **"Kirim Pendaftaran"**

### 5.3 Cek Results
1. Tunggu loading selesai → pesan sukses muncul
2. Cek **Google Drive** → folder baru harus sudah ada:
   - `PPDB SD IT` (root)
   - `MI` (jenjang)
   - `Nama Pendaftar (NIK)` (folder peserta)
   - File yang diupload ada di dalam

3. Cek **Google Sheet** → row baru dengan link folder

---

## 🔗 Link File di Google Sheet

Setelah upload sukses, Sheet akan berisi **link Google Drive** untuk setiap file:

| fileAkta | fileKK | fileKTP | ... |
|----------|--------|---------|-----|
| https://drive.google.com/file/d/xxx/view | https://drive.google.com/file/d/yyy/view | ... | ... |

Panitia bisa **langsung klik link** untuk buka file!

---

## ❓ TROUBLESHOOTING

### Error: "Failed to get Drive API"
**Solusi:**
1. Pastikan Google Drive API sudah ENABLE di Cloud Console
2. Klik Deploy ulang
3. Run testSendData() ulang

### File tidak upload ke Drive
**Solusi:**
1. Cek Authorization - klik Run > testSendData() berhasil?
2. Cek file size < 25 MB (limit Drive API)
3. Lihat Execution Log di Apps Script untuk error detail

### Folder tidak terbuat
**Solusi:**
1. Pastikan Apps Script SDH diauthorize untuk Drive
2. Cek nama folder di CONFIG tidak mengandung karakter spesial
3. Test dengan nama yang simple dulu

### Error: "Bad Request"
**Solusi:**
1. Cek URL di pendaftaran.js - harus `/userweb` bukan `/exec`
2. Pastikan kode di Apps Script sudah EQUAL dengan file terbaru
3. Deploy ULANG jika ada perubahan kode

---

## 📊 Admin Workflow

Setelah file terupload:

1. **Buka Google Sheet** → lihat semua pendaftar
2. **Klik link file** → preview/verify dokumen
3. **Buat kolom Status** → "Terima", "Tolak", "Verifikasi"
4. **Share folder dengan panitia** → masing-masing panitia review files
5. **Export laporan** jika perlu

---

## 🎯 Next Steps

1. **Test upload** dengan file dummy
2. **Share folder Drive** dengan panitia yang perlu akses
3. **Buat checklist** untuk verifikasi dokumen
4. **Setup notification** jika ingin email saat ada pendaftar baru

---

**Setup selesai! File akan otomatis tersimpan di Drive! 🎉**
