document.addEventListener('DOMContentLoaded', () => {
    // FAQ Interactivity
    const faqButtons = document.querySelectorAll('.faq-btn');
    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            
            content.classList.toggle('hidden');
            
            if (content.classList.contains('hidden')) {
                icon.style.transform = 'rotate(0deg)';
                icon.classList.remove('text-brand');
            } else {
                icon.style.transform = 'rotate(180deg)';
                icon.classList.add('text-brand');
            }
        });
    });

    // WA Form Submission
    const form = document.getElementById('waForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nama = document.getElementById('nama').value;
            const email = document.getElementById('email').value;
            const wa = document.getElementById('whatsapp').value;
            const perusahaan = document.getElementById('perusahaan').value;

            const text = `Halo Admin, saya daftar Webinar.%0A%0A` +
                         `Nama: ${nama}%0A` +
                         `Email: ${email}%0A` +
                         `Bisnis: ${perusahaan}%0A` +
                         `WA: ${wa}`;
            
            window.open(`https://wa.me/6285894448143?text=${text}`, '_blank');
        });
    }
});