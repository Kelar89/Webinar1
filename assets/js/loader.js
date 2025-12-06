// --- SCRIPT UNTUK MEMANGGIL KOMPONEN HTML ---

// Fungsi Loader
async function loadComponent(elementId, fileName) {
    const container = document.getElementById(elementId);
    if (!container) return;

    try {
        const response = await fetch(`components/${fileName}`);
        if (!response.ok) throw new Error(`File tidak ditemukan: ${fileName}`);
        const html = await response.text();
        container.innerHTML = html;

        // Inisialisasi Script per komponen
        if (elementId === 'hero-container' || elementId === 'footer-container') initForm();
        if (elementId === 'faq-container') initFAQ();

        // Lazy Load Gambar
        const images = container.querySelectorAll('img');
        images.forEach(img => img.setAttribute('loading', 'lazy'));

    } catch (error) {
        console.error(error);
        container.innerHTML = `<div style="color:red; text-align:center;">ERROR: Gagal memuat <b>${fileName}</b>. Gunakan Live Server.</div>`;
    }
}

// --- FITUR SCROLL TO TOP ---
function initScrollTop() {
    const btn = document.getElementById('scrollTopBtn');
    
    if (btn) {
        window.addEventListener('scroll', () => {
            // Muncul jika scroll lebih dari 300px
            if (window.scrollY > 300) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });

        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah loncat kasar
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        console.warn("Tombol ScrollTop tidak ditemukan di HTML.");
    }
}

// Fitur FAQ (Accordion)
function initFAQ() {
    const buttons = document.querySelectorAll('.faq-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            content.classList.toggle('hidden');
            
            if (content.classList.contains('hidden')) {
                icon.style.transform = 'rotate(0deg)';
                if(btn.parentElement) btn.parentElement.classList.remove('border-orange-500');
            } else {
                icon.style.transform = 'rotate(180deg)';
                if(btn.parentElement) btn.parentElement.classList.add('border-orange-500');
            }
        });
    });
}

// Fitur Form WhatsApp
function initForm() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nama = form.querySelector('input[placeholder*="Nama"]')?.value || "";
            const email = form.querySelector('input[placeholder*="Email"]')?.value || "";
            const wa = form.querySelector('input[placeholder*="Nomor"]')?.value || "";
            const bisnis = form.querySelector('input[placeholder*="Bisnis"]')?.value || "";
            
            const text = `Halo Admin, saya daftar webinar.%0A%0A` +
                         `Nama: ${nama}%0A` +
                         `Email: ${email}%0A` +
                         `WA: ${wa}%0A` +
                         `Bisnis: ${bisnis}`;
            
            window.open(`https://wa.me/6285894448143?text=${text}`, '_blank');
        });
    });
}

// EKSEKUSI SAAT LOAD
document.addEventListener("DOMContentLoaded", () => {
    // 1. Peringatan jika bukan server
    if (window.location.protocol === 'file:') {
        alert("PERINGATAN: Fitur modular tidak jalan jika diklik langsung. Mohon gunakan 'Live Server' di VS Code.");
    }

    // 2. Load Semua Komponen
    loadComponent('navbar-container', 'navbar.html');
    loadComponent('hero-container', 'hero.html');
    loadComponent('audience-container', 'audience.html');
    loadComponent('experts-container', 'experts.html');
    loadComponent('strategies-container', 'strategies.html');
    loadComponent('faq-container', 'faq.html');
    loadComponent('footer-container', 'footer.html');
    
    // 3. Jalankan Fitur Scroll
    initScrollTop();
});