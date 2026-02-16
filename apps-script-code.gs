// PPDB GOOGLE SHEETS + DRIVE INTEGRATION
// Script untuk menghubungkan Formulir PPDB + Upload File ke Google Drive
// Copy-paste semua kode ini ke Google Apps Script editor

// ==========================================
// KONFIGURASI
// ==========================================
const CONFIG = {
  SHEET_NAME: 'PPDB SD IT',
  DRIVE_FOLDER_NAME: 'PPDB SD IT - File Upload',
  SEND_EMAIL: false
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

    // Get active sheet
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Process uploads ke Google Drive
    const fileLinks = {};
    if (data.filesToUpload && Object.keys(data.filesToUpload).length > 0) {
      const driveFolder = getOrCreateDriveFolder(data.jenjang);
      const personFolder = getOrCreatePersonFolder(driveFolder, data.namaLengkap, data.nik);
      
      for (let fieldName in data.filesToUpload) {
        fileLinks[fieldName] = uploadFileToDrive(
          data.filesToUpload[fieldName],
          fieldName,
          personFolder
        );
      }
    }
    
    // Siapkan row untuk di-insert ke sheet
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
      data.pekerjaanWali || '',
      data.alamatWali || '',
      data.noHpWali || '',
      data.tinggiBadan || '',
      data.beratBadan || '',
      data.jarakSekolah || '',
      data.berapaBersaudara || '',
      data.ukuranBaju || '',
      fileLinks.fileAkta || 'Tidak ada file',
      fileLinks.fileKK || 'Tidak ada file',
      fileLinks.fileKTP || 'Tidak ada file',
      fileLinks.fileFoto || 'Tidak ada file',
      fileLinks.fileIjazah || 'Tidak ada file',
      fileLinks.filePendukung || 'Tidak ada file'
    ];

    // Tambah row ke sheet
    sheet.appendRow(row);
    
    Logger.log('Data berhasil disimpan untuk: ' + data.namaLengkap);

    // Return success response
    return buildResponse('success', 'Data pendaftaran berhasil disimpan! Terima kasih telah mendaftar.');

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return buildResponse('error', 'Terjadi kesalahan: ' + error.toString());
  }
}

// ==========================================
// FUNGSI GOOGLE DRIVE - HANDLE FOLDER
// ==========================================
function getOrCreateDriveFolder(jenjang) {
  const rootFolderName = CONFIG.DRIVE_FOLDER_NAME;
  const jenjangFolderName = jenjang || 'Undefined';
  
  try {
    // Find atau create root folder
    const rootFolders = DriveApp.getRootFolder().getFoldersByName(rootFolderName);
    let rootFolder;
    
    if (rootFolders.hasNext()) {
      rootFolder = rootFolders.next();
    } else {
      rootFolder = DriveApp.getRootFolder().createFolder(rootFolderName);
      Logger.log('Created root folder: ' + rootFolderName);
    }
    
    // Find atau create jenjang folder
    const jenjangFolders = rootFolder.getFoldersByName(jenjangFolderName);
    let jenjangFolder;
    
    if (jenjangFolders.hasNext()) {
      jenjangFolder = jenjangFolders.next();
    } else {
      jenjangFolder = rootFolder.createFolder(jenjangFolderName);
      Logger.log('Created jenjang folder: ' + jenjangFolderName);
    }
    
    return jenjangFolder;
    
  } catch (error) {
    Logger.log('Error creating folder: ' + error.toString());
    throw new Error('Gagal membuat folder di Drive: ' + error.toString());
  }
}

function getOrCreatePersonFolder(parentFolder, namaLengkap, nik) {
  const folderName = namaLengkap + ' (' + nik + ')';
  
  try {
    const existingFolders = parentFolder.getFoldersByName(folderName);
    
    if (existingFolders.hasNext()) {
      return existingFolders.next();
    } else {
      return parentFolder.createFolder(folderName);
    }
    
  } catch (error) {
    Logger.log('Error creating person folder: ' + error.toString());
    throw new Error('Gagal membuat folder peserta: ' + error.toString());
  }
}

// ==========================================
// FUNGSI GOOGLE DRIVE - UPLOAD FILE
// ==========================================
function uploadFileToDrive(fileData, fieldName, folder) {
  try {
    // Parse base64 dari client
    const parts = fileData.split(',');
    const mimeType = parts[0].match(/:(.*?);/)[1];
    const binaryData = Utilities.newBlob(Utilities.base64Decode(parts[1]), mimeType);
    
    // Extract nama file asli dari header
    const fileName = binaryData.getName() || fieldName + '_' + new Date().getTime();
    
    // Upload ke Drive
    const file = folder.createFile(binaryData.setName(fileName));
    const fileLink = file.getUrl();
    
    Logger.log('File uploaded: ' + fileName + ' - ' + fileLink);
    
    return fileLink;
    
  } catch (error) {
    Logger.log('Error uploading file: ' + error.toString());
    return 'Gagal upload: ' + error.toString();
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
// TEST FUNCTION
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
