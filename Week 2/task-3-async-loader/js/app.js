'use strict';
const status = document.querySelector('#status');
const daftar = document.querySelector('#daftar-materi');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');

function aturState(state, pesan) {
    status.dataset.state = state;
    status.textContent = pesan;
    tombolCobaLagi.hidden = state !== 'error';
}   

async function ambilMateri() {
    const response = await fetch('data/materi.json');
    
    if (!response.ok) {
        throw new Error(`Terjadi kesalahan jaringan (Status HTTP: ${response.status})`);
    }
    
    return await response.json();
}

function renderMateri(data) {
    daftar.replaceChildren();
    
    data.forEach(item => {
        const article = document.createElement('article');
        article.classList.add('kartu');
        
        const judulEl = document.createElement('h3');
        judulEl.textContent = item.judul;
        
        const durasiEl = document.createElement('p');
        durasiEl.textContent = `Durasi: ${item.durasi} menit`;
        
        article.appendChild(judulEl);
        article.appendChild(durasiEl);
        
        daftar.appendChild(article);
    });
}

async function muatData() {
    aturState('loading', 'Memuat data...');
    tombolMuat.disabled = true;
    daftar.replaceChildren();
    
    try {
        const data = await ambilMateri();
        
        if (data.length === 0) {
            aturState('success', 'Data kosong');
        } else {
            renderMateri(data);
            aturState('success', 'Data berhasil dimuat');
        }
    } catch (error) {
        console.error(error);
        aturState('error', `Gagal: ${error.message}`);
    } finally {
        tombolMuat.disabled = false;
    }
}

tombolMuat.addEventListener('click', muatData); 
tombolCobaLagi.addEventListener('click', muatData);