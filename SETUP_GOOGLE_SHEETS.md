# 📊 SETUP GOOGLE SHEETS - PANDUAN LENGKAP

Panduan lengkap untuk menghubungkan formulir PPDB ke Google Sheets dalam **3 langkah mudah**.

---

## ✅ LANGKAH 1: BUAT GOOGLE SHEET

### 1.1 Buka Google Sheets
- Kunjungi: https://sheets.google.com
- Login dengan Google Account Anda
- Klik **+ Blank spreadsheet** (tombol plus baru)

### 1.2 Setup Kolom Header
Buat spreadsheet dengan nama **PPDB 2026** dan setup kolom-kolom ini:

| Kolom | Header | 
|-------|--------|
| A | Timestamp |
| B | Jenjang |
| C | Nama Lengkap |
| D | NIK |
| E | Tempat Lahir |
| F | Tanggal Lahir |
| G | Jenis Kelamin |
| H | Agama |
| I | Anak ke- |
| J | Alamat |
| K | Asal Sekolah |
| L | No HP Calon PD |
| M | Nama Ayah |
| N | Tahun Lahir Ayah |
| O | Pekerjaan Ayah |
| P | Alamat Ayah |
| Q | No HP Ayah |
| R | Nama Ibu |
| S | Tahun Lahir Ibu |
| T | Pekerjaan Ibu |
| U | Alamat Ibu |
| V | No HP Ibu |
| W | Nama Wali |
| X | No HP Wali |
| Y | Tinggi Badan |
| Z | Berat Badan |
| AA | Jarak Sekolah |
| AB | Berapa Bersaudara |
| AC | Ukuran Baju |
| AD | File Akta |
| AE | File KK |
| AF | File KTP |
| AG | File Foto |
| AH | File Ijazah |
| AI | File Pendukung |

✅ **Simpan spreadsheet Anda!**

---

## ✅ LANGKAH 2: BUAT GOOGLE APPS SCRIPT

### 2.1 Buka Script Editor
Di Google Sheet Anda, klik:
```
Menu → Extensions → Apps Script
```

### 2.2 Hapus Kode Default
Hapus semua kode yang ada dan ganti dengan kode di bawah:

```javascript
// ==========================================
// PPDB GOOGLE SHEETS INTEGRATION
// Oleh: Panitia PPDB Sekolah YP Husnul Khotimah
// Last Updated: February 2026
// ==========================================

// KONFIGURASI - DI SINI ANDA BISA EDIT
const CONFIG = {
  SHEET_ID: 'GANTI_DENGAN_SHEET_ID_ANDA', // Lihat cara dapat ID di bawah
  SHEET_NAME: 'PPDB 2026', // Nama sheet Anda
  SEND_EMAIL: true, // Kirim email konfirmasi? true/false
  EMAIL_SENDER: 'noreply@yphk.sch.id' // Email pengirim (optional)
};

// ==========================================
// FUNCTION UTAMA - TERIMA DATA DARI FORM
// ==========================================
function doPost(e) {
  try {
    // Parse data dari form HTML
    const data = JSON.parse(e.postData.contents);
    
    // Validasi input
    if (!data || !data.namaLengkap) {
      return buildResponse('error', 'Data tidak lengkap');
    }

    // Siapkan row untuk di-insert ke sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    const row = [
      data.timestamp || new Date().toLocaleString('id-ID'),
      data.jenjang || '',
      data.namaLengkap || '',
      data.nik || '',
      data.tempatLahir || '',
      data.tanggalLahir || '',
      data.jenisKelamin || '',
      data.agama || '',
      data.anakKeBerapa || '',
      data.alamat || '',
      data.asalSekolah || '',
      data.noHpCalonPD || '',
      data.namaAyah || '',
      data.tahunLahirAyah || '',
      data.pekerjaanAyah || '',
      data.alamatAyah || '',
      data.noHpAyah || '',
      data.namaIbu || '',
      data.tahunLahirIbu || '',
      data.pekerjaanIbu || '',
      data.alamatIbu || '',
      data.noHpIbu || '',
      data.namaWali || '',
      data.noHpWali || '',
      data.tinggiBadan || '',
      data.beratBadan || '',
      data.jarakSekolah || '',
      data.berapaBersaudara || '',
      data.ukuranBaju || '',
      data.fileAkta || 'Tidak ada file',
      data.fileKK || 'Tidak ada file',
      data.fileKTP || 'Tidak ada file',
      data.fileFoto || 'Tidak ada file',
      data.fileIjazah || 'Tidak ada file',
      data.filePendukung || 'Tidak ada file'
    ];

    // Tambah row ke sheet
    sheet.appendRow(row);
    
    Logger.log('✅ Data berhasil disimpan untuk: ' + data.namaLengkap);

    // Kirim email konfirmasi jika diaktifkan
    if (CONFIG.SEND_EMAIL && data.email) {
      sendConfirmationEmail(data);
    }

    // Return success response
    return buildResponse('success', 'Data pendaftaran berhasil disimpan! Terima kasih telah mendaftar.');

  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    return buildResponse('error', 'Terjadi kesalahan: ' + error.toString());
  }
}

// ==========================================
// KIRIM EMAIL KONFIRMASI
// ==========================================
function sendConfirmationEmail(data) {
  try {
    const email = data.email;
    const name = data.namaLengkap;
    const jenjang = data.jenjang;

    const subject = `✅ Pendaftaran Diterima - PPDB ${jenjang} - Sekolah YP Husnul Khotimah`;
    
    const emailBody = `
Assalamu'alaikum ${name},

Terima kasih telah mendaftar di Sekolah YP Husnul Khotimah untuk jenjang ${jenjang}.

DATA PENDAFTARAN ANDA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Nama: ${name}
✓ Jenjang: ${jenjang}
✓ Tanggal Pendaftaran: ${data.timestamp}
✓ Email: ${email}
✓ No HP: ${data.noHpCalonPD}

STATUS:
📋 Pendaftaran Anda sedang dalam proses verifikasi
⏳ Kami akan menghubungi Anda melalui WhatsApp/Telepon dalam 1-3 hari kerja
✅ Cek terus email/WhatsApp untuk update

LANGKAH SELANJUTNYA:
1. Pastikan dokumen yang diperlukan sudah upload
2. Verifikasi data oleh panitia
3. Peserta dipanggil untuk tes

Jika ada pertanyaan, hubungi:
📞 Kantor: (XXX) XXX-XXXX
📱 WhatsApp: 0812-XXXX-XXXX
📧 Email: ppdb@yphk.sch.id

Wassalamu'alaikum,
Panitia PPDB Sekolah YP Husnul Khotimah
    `.trim();

    GmailApp.sendEmail(email, subject, emailBody);
    Logger.log('📧 Email konfirmasi terkirim ke: ' + email);
    
  } catch (error) {
    Logger.log('⚠️ Gagal kirim email: ' + error.toString());
  }
}

// ==========================================
// HELPER FUNCTION - BUILD RESPONSE
// ==========================================
function buildResponse(status, message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: status,
      message: message
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==========================================
// TEST FUNCTION - UNTUK DEBUG
// ==========================================
function testSendData() {
  const testData = {
    timestamp: new Date().toLocaleString('id-ID'),
    jenjang: 'MI',
    namaLengkap: 'Test User',
    nik: '123456789',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2015-01-01',
    jenisKelamin: 'Laki-laki',
    agama: 'Islam',
    anakKeBerapa: '1',
    alamat: 'Jl. Test No. 123',
    asalSekolah: 'SD Test',
    noHpCalonPD: '081234567890',
    namaAyah: 'Ayah Test',
    tahunLahirAyah: '1980',
    pekerjaanAyah: 'Karyawan',
    alamatAyah: 'Jl. Test No. 123',
    noHpAyah: '081234567890',
    namaIbu: 'Ibu Test',
    tahunLahirIbu: '1985',
    pekerjaanIbu: 'Ibu Rumah Tangga',
    alamatIbu: 'Jl. Test No. 123',
    noHpIbu: '081234567890',
    email: 'test@example.com'
  };

  const response = doPost({
    postData: {
      contents: JSON.stringify(testData)
    }
  });

  Logger.log('Test Response: ' + response.getContent());
}
```

### 2.3 Simpan Script
Klik **Ctrl+S** atau **Cmd+S** untuk menyimpan script.
- Beri nama: **PPDB Integration**
- Klik **OK**

---

## ✅ LANGKAH 3: DEPLOY APPS SCRIPT

### 3.1 Deploy sebagai Web App
Di script editor, klik:
```
Deploy → New Deployment
```

### 3.2 Setup Deployment
1. Klik icon **⚙️ (Type)** → Pilih **Web app**
2. Setting:
   - **Project:** PPDB Integration (sudah terisi)
   - **Execute as:** Pilih email Anda
   - **Who has access:** Pilih **Anyone**
3. Klik **Deploy**

### 3.3 Copy URL Deployment
- Akan muncul dialog dengan pesan sukses
- **SALIN URL WEB APP** (yang panjang, seperti: `https://script.google.com/macros/d/ABC123XYZ/userweb`)
- **SIMPAN URL TERSEBUT!** (Anda akan butuh di langkah berikutnya)

---

## ✅ LANGKAH 4: KONFIGURASI FILE PENDAFTARAN.JS

### 4.1 Buka File pendaftaran.js
Di workspace Anda, buka file:
```
js/pendaftaran.js
```

### 4.2 Cari bagian `submitForm`
Cari baris yang berisi:
```javascript
const scriptUrls = {
    'MI': 'https://script.google.com/macros/d/YOUR_MI_DEPLOYMENT_ID/usercontent',
    'MTS': 'https://script.google.com/macros/d/YOUR_MTS_DEPLOYMENT_ID/usercontent',
    'MA': 'https://script.google.com/macros/d/YOUR_MA_DEPLOYMENT_ID/usercontent'
};
```

### 4.3 Ganti dengan URL Anda
Ganti URL yang sudah anda salin tadi. Contoh:

```javascript
const scriptUrls = {
    'MI': 'https://script.google.com/macros/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7/userweb',
    'MTS': 'https://script.google.com/macros/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7/userweb',
    'MA': 'https://script.google.com/macros/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7/userweb'
};
```

> **Note:** Untuk sekarang, gunakan URL yang sama untuk ketiga jenjang. Nanti bisa buat script terpisah untuk setiap jenjang jika perlu.

---

## 🧪 TEST INTEGRATION

### Test 1: Langsung di Google Apps Script
1. Di script editor, klik **Run**
2. Klik **testSendData()** function
3. Lihat di **Execution log** apakah data berhasil disimpan
4. Cek Google Sheet Anda - harus ada 1 baris data test

### Test 2: Dari Form
1. Buka `pendaftaran.html?jenjang=MI`
2. Isi formulir dengan data test
3. Klik **Kirim Pendaftaran**
4. Tunggu loading selesai
5. Harus muncul pesan **"Pendaftaran Berhasil!"**
6. Cek Google Sheet - harus ada data baru masuk

---

## 📊 VERIFIKASI DATA DI GOOGLE SHEET

Setelah formula berjalan, data akan otomatis masuk ke Google Sheet dengan struktur:

```
Timestamp | Jenjang | Nama | NIK | Tempat Lahir | ... | File Akta | File KK | etc
```

### Spreadsheet Permitting
Anda bisa:
- 📌 **Sort** data berdasarkan jenjang, nama, dll
- 🎨 **Filter** untuk melihat data tertentu
- 📈 **Buat pivot table** untuk statistik
- ☑️ **Buat kolom status** untuk verifikasi manual
- 📧 **Share** dengan panitia lain

---

## 🔒 SECURITY & BEST PRACTICES

### Jangan Lupa:
1. **Backup Sheet Regularly**
   - File → Download → Pilih format Excel
   
2. **Limit Access**
   - Share sheet hanya dengan panitia yang perlu
   - Settings → Restrict sharing
   
3. **Monitor Submissions**
   - Set email notification untuk setiap submission
   - Sheet → Notification rules → On changes
   
4. **Keep Script Updated**
   - Review log occasionally untuk debug error
   - Apps Script → Execution log

---

## ❓ TROUBLESHOOTING

### ❌ "Error 403 - Forbidden"
**Solusi:**
1. Cek URL Apps Script sudah benar
2. Pastikan deploy sebagai **Web app** bukan Deploy
3. Setting "Who has access" = **Anyone**

### ❌ "Data tidak masuk ke Sheet"
**Solusi:**
1. Klik tombol **Test** di script editor
2. Lihat di **Execution log** ada error apa
3. Pastikan sheet name di CONFIG sama dengan nama sheet Anda

### ❌ "Form tidak submit"
**Solusi:**
1. Buka browser Developer Tools (**F12**)
2. Lihat tab **Console** ada error apa
3. Pastikan network request berhasil (tab **Network**)

### ❌ "Email konfirmasi tidak terkirim"
**Solusi:**
1. Di script editor, set `SEND_EMAIL: false` jika tidak perlu
2. Atau set `SEND_EMAIL: true` dan update email address
3. Pastikan account google sudah authorize Gmail API

---

## 📞 HUBUNGI SUPPORT JIKA:
- URL Apps Script tidak bisa di-generate
- Data tidak masuk ke sheet walau form submit
- Google Sheet sudah penuh (unlimited baris)
- Ingin setup jenjang terpisah dengan sheet berbeda

---

## ✨ NEXT STEPS

Setelah verifikasi berhasil:

1. **Share Google Sheet** dengan panitia verifikasi
2. **Buat Dashboard** untuk monitor jumlah pendaftar
3. **Setup Email Notification** untuk setiap pendaftaran baru
4. **Buat Status Column** untuk tracking verifikasi
5. **Print Report** sebelum pengumuman hasil

---

**Selamat! Setup Google Sheets Anda sudah siap! 🎉**
