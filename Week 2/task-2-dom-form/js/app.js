'use strict';

const peserta = [
    { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' },
    { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' },
];

const form = document.querySelector('#form-peserta');
const inputNama = document.querySelector('#nama');
const inputProdi = document.querySelector('#prodi');
const filterProdi = document.querySelector('#filter-prodi');
const daftarPeserta = document.querySelector('#daftar-peserta');
const statusText = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');

function validasiPeserta(nama, prodi) {
    let isValid = true;

    inputNama.removeAttribute('aria-invalid');
    errorNama.textContent = '';
    inputProdi.removeAttribute('aria-invalid');
    errorProdi.textContent = '';

    if (nama.trim().length < 3) {
        inputNama.setAttribute('aria-invalid', 'true');
        errorNama.textContent = 'Nama minimal 3 karakter';
        isValid = false;
    }
    
    if (!prodi) {
        inputProdi.setAttribute('aria-invalid', 'true');
        errorProdi.textContent = 'Pilih program studi terlebih dahulu';
        isValid = false;
    }

    return isValid;
}

function buatKartuPeserta(data) {
    const article = document.createElement('article');
    article.classList.add('kartu'); 

    const namaEl = document.createElement('h3');
    namaEl.textContent = data.nama;

    const prodiEl = document.createElement('p');
    prodiEl.textContent = data.prodi;

    article.appendChild(namaEl);
    article.appendChild(prodiEl);

    return article;
}

function renderPeserta(dataArray) {
    daftarPeserta.replaceChildren(); 

    if (dataArray.length === 0) {
        statusText.textContent = 'Tidak ada peserta';
    } else {
        statusText.textContent = '';
        
        dataArray.forEach(item => {
            const kartu = buatKartuPeserta(item);
            daftarPeserta.appendChild(kartu);
        });
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const namaValue = inputNama.value;
    const prodiValue = inputProdi.value;

    if (validasiPeserta(namaValue, prodiValue)) {
        const idUnik = Date.now(); 
        
        peserta.push({
            id: idUnik,
            nama: namaValue.trim(),
            prodi: prodiValue
        });

        form.reset();
        filterProdi.value = 'semua';
        renderPeserta(peserta);
    }
});

filterProdi.addEventListener('change', (e) => {
    const keyword = e.target.value;
    
    if (keyword === 'semua') {
        renderPeserta(peserta);
    } else {
        const hasilFilter = peserta.filter(item => item.prodi === keyword);
        renderPeserta(hasilFilter);
    }
});

renderPeserta(peserta);