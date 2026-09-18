'use strict';

const btnMenu = document.querySelector('#btn-menu');
const navMenu = document.querySelector('#nav-menu');
const btnTema = document.querySelector('#btn-tema');
const filterLayanan = document.querySelector('#filter-layanan');
const containerLayanan = document.querySelector('#container-layanan');
const faqToggles = document.querySelectorAll('.faq-toggle');
const formKontak = document.querySelector('#form-kontak');
const inputKeluhan = document.querySelector('#input-keluhan');
const errorKeluhan = document.querySelector('#error-keluhan');
const statusForm = document.querySelector('#status-form');
const btnTop = document.querySelector('#btn-top');

const layananData = [
    { kategori: 'rakit', judul: 'Rakit Desktop Custom', deskripsi: 'Pemilihan komponen yang tepat dan seimbang sesuai budget Anda.' },
    { kategori: 'perbaikan', judul: 'Upgrade Laptop', deskripsi: 'Pemasangan RAM dan SSD ekstra dengan aman tanpa merusak garansi.' },
    { kategori: 'perbaikan', judul: 'Troubleshooting', deskripsi: 'Penanganan masalah short circuit, kabel terbakar, dan PC mati total.' }
];

function renderLayanan(filter) {
    containerLayanan.replaceChildren();

    const dataTampil = filter === 'semua' 
        ? layananData 
        : layananData.filter(item => item.kategori === filter);

    dataTampil.forEach(item => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        
        const h3 = document.createElement('h3');
        h3.textContent = item.judul;
        
        const p = document.createElement('p');
        p.textContent = item.deskripsi;
        
        divCard.append(h3, p);
        containerLayanan.append(divCard);
    });
}

btnMenu.addEventListener('click', () => {
    navMenu.classList.toggle('aktif');
    const isAktif = navMenu.classList.contains('aktif');
    btnMenu.setAttribute('aria-expanded', String(isAktif));
});

btnTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        btnTema.textContent = '☀️ Terang';
    } else {
        btnTema.textContent = '🌙 Gelap';
    }
});

filterLayanan.addEventListener('change', (e) => {
    renderLayanan(e.target.value);
});

faqToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        const jawaban = btn.nextElementSibling;
        jawaban.classList.toggle('hidden');
        
        const isBuka = !jawaban.classList.contains('hidden');
        btn.setAttribute('aria-expanded', String(isBuka));
    });
});

formKontak.addEventListener('submit', (e) => {
    e.preventDefault();
    const nilai = inputKeluhan.value.trim();

    if (nilai === '') {
        errorKeluhan.textContent = 'Detail keluhan tidak boleh kosong.';
        inputKeluhan.setAttribute('aria-invalid', 'true');
        statusForm.textContent = '';
    } else {
        errorKeluhan.textContent = '';
        inputKeluhan.setAttribute('aria-invalid', 'false');
        statusForm.textContent = 'Konsultasi berhasil terkirim. Teknisi kami akan segera membalas!';
        statusForm.style.color = '#38a169'; // hijau sukses
        inputKeluhan.value = '';
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        btnTop.classList.remove('hidden');
    } else {
        btnTop.classList.add('hidden');
    }
});

btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

renderLayanan('semua');