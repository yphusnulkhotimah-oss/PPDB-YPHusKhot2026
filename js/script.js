// ===========================
// HAMBURGER MENU FUNCTIONALITY
// ===========================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===========================
// FORM HANDLING - REGISTRATION
// ===========================

const daftarForm = document.getElementById('daftarForm');
const jenjangSelect = document.getElementById('jenjang');
const jalurSelect = document.getElementById('jalur');

// Jalur options based on jenjang
const jalurOptions = {
    mi: [
        'Jalur Prestasi Akademik',
        'Jalur Prestasi Non-Akademik',
        'Jalur KIP/Zonasi',
        'Jalur Anak Guru/Karyawan',
        'Jalur Reguler'
    ],
    mts: [
        'Jalur Prestasi Akademik',
        'Jalur Prestasi Non-Akademik',
        'Jalur KIP/Zonasi',
        'Jalur Anak Guru/Karyawan',
        'Jalur Program Khusus',
        'Jalur Olahraga',
        'Jalur Al-Qur\'an',
        'Jalur Reguler'
    ],
    ma: [
        'Jalur Prestasi Akademik',
        'Jalur Prestasi Non-Akademik',
        'Jalur KIP/Zonasi',
        'Jalur Anak Guru/Karyawan',
        'Jalur Program Khusus',
        'Jalur Olahraga',
        'Jalur Al-Qur\'an',
        'Jalur Reguler'
    ]
};

// Update jalur options when jenjang changes
jenjangSelect.addEventListener('change', (e) => {
    const selectedJenjang = e.target.value;
    jalurSelect.innerHTML = '<option value="">Pilih Jalur Pendaftaran</option>';
    
    if (selectedJenjang && jalurOptions[selectedJenjang]) {
        jalurOptions[selectedJenjang].forEach(jalur => {
            const option = document.createElement('option');
            option.value = jalur.toLowerCase().replace(/\s+/g, '-');
            option.textContent = jalur;
            jalurSelect.appendChild(option);
        });
    }
});

// Form submission
daftarForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const namaLengkap = document.getElementById('namaLengkap').value.trim();
    const email = document.getElementById('email').value.trim();
    const noHp = document.getElementById('noHp').value.trim();
    const jenjang = document.getElementById('jenjang').value;
    const jalur = document.getElementById('jalur').value;
    
    // Basic validation
    if (!namaLengkap || !email || !noHp || !jenjang || !jalur) {
        alert('Mohon lengkapi semua data pendaftaran');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email tidak valid');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^(\+62|0)[0-9]{9,12}$/;
    if (!phoneRegex.test(noHp.replace(/[^0-9\+]/g, ''))) {
        alert('Nomor telepon tidak valid. Gunakan format 08xx atau +62xx');
        return;
    }
    
    // Success message
    alert(`Terima kasih ${namaLengkap}! Pendaftaran Anda telah kami terima.\n\nJenjang: ${jenjang.toUpperCase()}\nJalur: ${jalur}\n\nData Anda akan kami verifikasi dalam waktu 1x24 jam.`);
    
    // Reset form
    daftarForm.reset();
    jalurSelect.innerHTML = '<option value="">Pilih Jalur Pendaftaran</option>';
});

// ===========================
// FORM HANDLING - CONTACT
// ===========================

const kontakForm = document.getElementById('kontakForm');

kontakForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputs = kontakForm.querySelectorAll('input, textarea');
    let allFilled = true;
    
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            allFilled = false;
        }
    });
    
    if (!allFilled) {
        alert('Mohon lengkapi semua field pesan');
        return;
    }
    
    alert('Terima kasih! Pesan Anda telah kami terima.\nTim kami akan segera menghubungi Anda.');
    kontakForm.reset();
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.jenjang-card, .info-card, .news-card, .timeline-item').forEach(element => {
    observer.observe(element);
});

// ===========================
// SMOOTH SCROLL NAVIGATION
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#home') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// NAVBAR BACKGROUND ON SCROLL
// ===========================

const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'white';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        navbar.style.backgroundColor = 'white';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===========================
// TESTIMONIAL/STATISTICS (Optional Enhancement)
// ===========================

// Counter animation for stats if added
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCount = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target;
        }
    };
    
    updateCount();
}

// ===========================
// PAGE LOAD ANIMATIONS
// ===========================

window.addEventListener('load', () => {
    // Add animation to hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease-out';
    }
    
    // Add staggered animation to jenjang cards
    const jenjangCards = document.querySelectorAll('.jenjang-card');
    jenjangCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.2}s backwards`;
    });
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Format phone number
function formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4})(\d{3,})$/);
    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
}

// Validate Indonesian phone number
function isValidIndonesianPhone(phone) {
    const phoneRegex = /^(\+62|0)[0-9]{9,12}$/;
    return phoneRegex.test(phone.replace(/[^0-9\+]/g, ''));
}

// ===========================
// ACCESSIBILITY ENHANCEMENTS
// ===========================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close menu with Escape key
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===========================
// THEME INITIALIZATION
// ===========================

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('PPDB Sekolah Islamic Theme - Initialized');
    
    // Check if localStorage has user preferences
    const savedTheme = localStorage.getItem('ppdbTheme') || 'light';
    
    // You can add dark mode toggle in future
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Lazy load images if implemented
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// CAROUSEL FUNCTIONALITY
// ===========================

const programsContainer = document.getElementById('programsContainer');
const nextBtn = document.getElementById('nextBttn');

let currentIndex = 0;
let cardsPerView = 3;
const totalCards = document.querySelectorAll('.program-card').length;

// Initialize carousel
function initCarousel() {
    if (!programsContainer) return;
    
    updateCardsPerView();
    updateCarousel();
}

// Update cards per view based on screen size
function updateCardsPerView() {
    if (window.innerWidth <= 480) {
        cardsPerView = 1;
    } else if (window.innerWidth <= 768) {
        cardsPerView = 2;
    } else {
        cardsPerView = 3;
    }
}

// Update carousel position
function updateCarousel() {
    const wrapperWidth = document.querySelector('.programs-wrapper').offsetWidth;
    const offset = -(currentIndex * wrapperWidth);

    programsContainer.style.transform = `translateX(${offset}px)`;
}

// Next button
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        } else {
            // Reset to beginning when reaching the end
            currentIndex = 0;
            updateCarousel();
        }
    });
}

// Touch/Swipe support for mobile
let startX = 0;
let endX = 0;

if (programsContainer) {
    programsContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, false);

    programsContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, false);
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - go to next
            const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        } else {
            // Swipe right - go to previous
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = Math.ceil(totalCards / cardsPerView) - 1;
            }
            updateCarousel();
        }
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    updateCardsPerView();
    currentIndex = 0;
    updateCarousel();
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (programsContainer && document.querySelectorAll('.program-card').length > 0) {
            initCarousel();
        }
    }, 100);
});

// ===========================
// EXPORT FUNCTIONS FOR FUTURE USE
// ===========================

window.PPDB = {
    formatPhoneNumber,
    isValidIndonesianPhone,
    animateCounter
};