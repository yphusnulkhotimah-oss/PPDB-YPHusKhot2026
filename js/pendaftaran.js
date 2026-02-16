// Form Multi-Step Pendaftaran PPDB

class PPDBForm {
    constructor() {
        this.currentTab = 1;
        this.totalTabs = 5;
        this.form = document.getElementById('ppdbForm');
        this.jenjang = this.getJenjangFromURL();
        this.uploadedFiles = {};
        
        // Jenjang name mapping
        this.jenjangNames = {
            'SD IT': 'SD IT Husnul Khotimah',
            'SMP IT': 'SMP IT Husnul Khotimah',
            'SMK IT': 'SMK IT Husnul Khotimah'
        };
        
        // Get URL parameter for jenjang
        const urlParams = new URLSearchParams(window.location.search);
        this.selectedJenjang = urlParams.get('jenjang')?.toUpperCase() || '';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedData();
    }

    setupEventListeners() {
        // Tab clicks
        document.querySelectorAll('.form-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.selectTab(parseInt(e.currentTarget.dataset.tab)));
        });

        // Navigation buttons
        document.getElementById('btnPrev').addEventListener('click', () => this.prevTab());
        document.getElementById('btnNext').addEventListener('click', () => this.nextTab());
        document.getElementById('btnSubmit').addEventListener('click', (e) => this.submitForm(e));

        // Form submit
        this.form.addEventListener('submit', (e) => this.submitForm(e));

        // File uploads
        this.setupFileUploads();

        // Save data on input change
        this.form.addEventListener('change', () => this.saveFormData());
        this.form.addEventListener('input', () => this.saveFormData());
    }

    setupFileUploads() {
        const fileInputs = [
            { id: 'fileAkta', listId: 'listFileAkta' },
            { id: 'fileKK', listId: 'listFileKK' },
            { id: 'fileKTP', listId: 'listFileKTP' },
            { id: 'fileFoto', listId: 'listFileFoto' },
            { id: 'fileIjazah', listId: 'listFileIjazah' },
            { id: 'filePendukung', listId: 'listFilePendukung' }
        ];

        fileInputs.forEach(({ id, listId }) => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('change', (e) => this.handleFileSelect(e, listId));
            }
        });
    }

    handleFileSelect(e, listId) {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file
        const maxSize = 5 * 1024 * 1024; // 5MB
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

        if (file.size > maxSize) {
            this.showError(`File terlalu besar. Maksimal 5MB. File Anda: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
            e.target.value = '';
            return;
        }

        if (!validTypes.includes(file.type)) {
            this.showError('Format file tidak didukung. Gunakan PDF, JPG, atau PNG');
            e.target.value = '';
            return;
        }

        // Store file info
        const fileName = e.target.name;
        this.uploadedFiles[fileName] = {
            name: file.name,
            size: file.size,
            type: file.type,
            file: file
        };

        // Display file
        this.displayFile(listId, file.name, fileName);
    }

    displayFile(listId, fileName, fieldName) {
        const list = document.getElementById(listId);
        list.innerHTML = `
            <div class="file-item">
                <i class="fas fa-file"></i>
                <span>${fileName}</span>
                <button type="button" onclick="ppdbForm.removeFile('${fieldName}', '${listId}')" title="Hapus">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    }

    removeFile(fieldName, listId) {
        delete this.uploadedFiles[fieldName];
        document.getElementById(listId).innerHTML = '';
        const input = document.querySelector(`input[name="${fieldName}"]`);
        if (input) input.value = '';
    }

    selectTab(tabNumber) {
        if (tabNumber < 1 || tabNumber > this.totalTabs) return;
        
        // Validate current tab before switching
        if (!this.validateTab(this.currentTab)) {
            this.showError('Mohon lengkapi data di tab ini terlebih dahulu');
            return;
        }

        this.currentTab = tabNumber;
        this.updateUI();
    }

    prevTab() {
        if (this.currentTab > 1) {
            this.currentTab--;
            this.updateUI();
        }
    }

    nextTab() {
        if (this.currentTab < this.totalTabs) {
            // Validate current tab
            if (!this.validateTab(this.currentTab)) {
                this.showError('Mohon lengkapi semua data yang diperlukan di tab ini');
                return;
            }
            this.currentTab++;
            this.updateUI();
        } else {
            this.showError('Ini adalah tab terakhir. Klik "Kirim Pendaftaran" untuk menyelesaikan');
        }
    }

    updateUI() {
        // Update tab indicators
        document.querySelectorAll('.form-tab').forEach((tab, index) => {
            tab.classList.toggle('active', parseInt(tab.dataset.tab) === this.currentTab);
        });

        // Update form content
        document.querySelectorAll('.form-content').forEach(content => {
            content.classList.toggle('active', parseInt(content.dataset.tab) === this.currentTab);
        });

        // Update buttons
        const btnPrev = document.getElementById('btnPrev');
        const btnNext = document.getElementById('btnNext');
        const btnSubmit = document.getElementById('btnSubmit');

        btnPrev.disabled = this.currentTab === 1;
        btnNext.style.display = this.currentTab === this.totalTabs ? 'none' : 'block';
        btnSubmit.style.display = this.currentTab === this.totalTabs ? 'block' : 'none';

        // Update progress bar
        const progress = (this.currentTab / this.totalTabs) * 100;
        document.getElementById('progressFill').style.width = progress + '%';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    validateTab(tabNumber) {
        const requiredFields = this.getRequiredFieldsForTab(tabNumber);
        
        for (let fieldName of requiredFields) {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (!field) continue;

            // Validate text/tel/number inputs
            if (field.type === 'text' || field.type === 'tel' || field.type === 'number' || field.type === 'date') {
                if (!field.value.trim()) {
                    field.focus();
                    return false;
                }
                
                // Validate patterns - dengan special handling untuk nomor HP
                if (field.hasAttribute('pattern')) {
                    // Special handling untuk phone numbers (bisa '0000' jika keluarga meninggal)
                    const isPhoneField = ['noHpAyah', 'noHpIbu', 'noHpCalonPD', 'noHpWali'].includes(fieldName);
                    const isValidPhone = isPhoneField && field.value === '0000';
                    
                    if (!isValidPhone && !new RegExp(field.pattern).test(field.value)) {
                        this.showError(`Format ${field.name} tidak valid`);
                        field.focus();
                        return false;
                    }
                }
            }

            // Validate select
            if (field.type === 'select-one' && !field.value) {
                field.focus();
                return false;
            }

            // Validate textarea
            if (field.tagName === 'TEXTAREA' && !field.value.trim()) {
                field.focus();
                return false;
            }

            // Validate file input (tab 5)
            if (field.type === 'file' && field.hasAttribute('required')) {
                const fileName = field.name;
                if (!this.uploadedFiles[fileName]) {
                    this.showError(`Mohon upload ${field.labels[0]?.textContent || 'file'} terlebih dahulu`);
                    return false;
                }
            }
        }

        return true;
    }

    getRequiredFieldsForTab(tabNumber) {
        const fields = {
            1: ['namaLengkap', 'nik', 'tempatLahir', 'tanggalLahir', 'jenisKelamin', 'agama', 'anakKeBerapa', 'alamat', 'asalSekolah', 'noHpCalonPD'],
            2: ['namaAyah', 'tahunLahirAyah', 'pekerjaanAyah', 'alamatAyah', 'noHpAyah', 'namaIbu', 'tahunLahirIbu', 'pekerjaanIbu', 'alamatIbu', 'noHpIbu'],
            3: [], // Tab wali tidak wajib
            4: ['tinggiBadan', 'beratBadan', 'jarakSekolah', 'berapaBersaudara', 'ukuranBaju'],
            5: ['fileAkta', 'fileKK', 'fileKTP', 'fileFoto'] // File wajib
        };
        return fields[tabNumber] || [];
    }

    validateAllTabs() {
        for (let tab = 1; tab <= this.totalTabs; tab++) {
            if (!this.validateTab(tab)) {
                this.currentTab = tab;
                this.updateUI();
                return false;
            }
        }
        return true;
    }

    async submitForm(e) {
        e.preventDefault();

        // Validate all tabs
        if (!this.validateAllTabs()) {
            return;
        }

        // Prepare data
        const formData = new FormData(this.form);
        const data = {
            timestamp: new Date().toLocaleString('id-ID'),
            jenjang: this.selectedJenjang || 'Tidak Ditentukan',
            ...Object.fromEntries(formData)
        };

        // Add file data - convert to base64 untuk upload ke Drive
        const filesToUpload = {};
        
        // Show loading
        this.showLoading(true);

        try {
            // Convert files to base64
            for (let fieldName in this.uploadedFiles) {
                const fileObj = this.uploadedFiles[fieldName];
                const base64 = await this.fileToBase64(fileObj.file);
                filesToUpload[fieldName] = base64;
            }
            
            // Add file data ke payload
            data.filesToUpload = filesToUpload;

            // Determine script URL based on jenjang
            const scriptUrls = {
                'SD IT': 'https://script.google.com/macros/s/AKfycby2TQQ06FsdDcPdXLwpgybdEUuZGmxvDcmb-LyNh1_yp8dEMde-WL2tfo1JwGmDIdhV/exec',
                'SMP IT': 'https://script.google.com/macros/s/AKfycbxBZ-7DRkLWI5CaRdtGI27_xt4AKhP0NPghbcYcIajcbJFM2cFCOUYLSO8TGiKpxysZ/exec',
                'SMK IT': 'https://script.google.com/macros/s/AKfycbwtkDAhWtfePHabQulHD9F6z32M6RQ2lndCcXfQz0DujnraNKUThJafPYWF9rnPffun/exec'
            };

            const jenjang = this.selectedJenjang.toUpperCase();
            const scriptUrl = scriptUrls[jenjang];
            const jenjangName = this.jenjangNames[jenjang] || jenjang;
            
            if (!scriptUrl || scriptUrl.includes('YOUR_')) {
                this.showError(`URL Google Apps Script untuk ${jenjangName} belum dikonfigurasi. Hubungi administrator.`);
                this.showLoading(false);
                return;
            }

            const response = await fetch(scriptUrl, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'no-cors'
            });

            // Success
            this.showLoading(false);
            this.showSuccess();
            this.clearFormData();
            this.form.reset();
            
            // Redirect after 3 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);

        } catch (error) {
            console.error('Error:', error);
            this.showError('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
            this.showLoading(false);
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    saveFormData() {
        const formData = {};
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            if (field.type !== 'file') {
                formData[field.name] = field.value;
            }
        });
        localStorage.setItem('ppdbFormData', JSON.stringify(formData));
    }

    loadSavedData() {
        const saved = localStorage.getItem('ppdbFormData');
        if (saved) {
            const formData = JSON.parse(saved);
            for (let fieldName in formData) {
                const field = this.form.querySelector(`[name="${fieldName}"]`);
                if (field) {
                    field.value = formData[fieldName];
                }
            }
        }
    }

    clearFormData() {
        localStorage.removeItem('ppdbFormData');
    }

    getJenjangFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('jenjang') || '';
    }

    showError(message) {
        const errorEl = document.getElementById('errorMessage');
        errorEl.textContent = message;
        errorEl.classList.add('active');
        setTimeout(() => {
            errorEl.classList.remove('active');
        }, 5000);
    }

    showSuccess() {
        const successEl = document.getElementById('successMessage');
        successEl.classList.add('active');
    }

    showLoading(show) {
        const btnSubmit = document.getElementById('btnSubmit');
        if (show) {
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = '<div class="loading-spinner" style="border: 3px solid rgba(255,255,255,.3); border-top: 3px solid white; width: 20px; height: 20px; display: inline-block; margin-right: 10px;"></div> Mengirim...';
        } else {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pendaftaran';
        }
    }
}

// Initialize form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ppdbForm = new PPDBForm();
});
