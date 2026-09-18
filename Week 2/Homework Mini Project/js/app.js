'use strict';

const statusEl = document.querySelector('#status');
const btnCobaLagi = document.querySelector('#btn-coba-lagi');

const namaProfil = document.querySelector('#nama-profil');
const deskripsiProfil = document.querySelector('#deskripsi-profil');
const detailProfil = document.querySelector('#detail-profil');
const btnDetail = document.querySelector('#btn-detail');

const btnTema = document.querySelector('#btn-tema');

const formSkill = document.querySelector('#form-skill');
const inputSkill = document.querySelector('#input-skill');
const errorSkill = document.querySelector('#error-skill');
const listSkill = document.querySelector('#list-skill');

let keterampilanData = [];
let isMemuat = false;

function aturState(state, pesan) {
    statusEl.textContent = pesan;
    
    btnCobaLagi.hidden = (state !== 'error');
    
    if (state === 'loading') statusEl.style.color = '#1d4ed8';
    else if (state === 'success') statusEl.style.color = '#166534';
    else if (state === 'error' || state === 'empty') statusEl.style.color = '#b91c1c';
}

function renderKeterampilan() {
    listSkill.replaceChildren();
    
    if (keterampilanData.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Daftar keterampilan kosong.';
        li.style.justifyContent = 'center';
        li.style.color = '#6b7280';
        listSkill.appendChild(li);
        return;
    }

    keterampilanData.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill.nama;

        const btnHapus = document.createElement('button');
        btnHapus.textContent = 'Hapus';
        btnHapus.classList.add('btn-hapus');
        btnHapus.setAttribute('aria-label', `Hapus keterampilan ${skill.nama}`);
        
        btnHapus.addEventListener('click', () => {
            hapusKeterampilan(skill.id);
        });

        li.appendChild(btnHapus);
        listSkill.appendChild(li);
    });
}

function hapusKeterampilan(id) {
    keterampilanData = keterampilanData.filter(skill => skill.id !== id);
    renderKeterampilan();
    
    if (keterampilanData.length === 0) {
        aturState('empty', 'Semua keterampilan telah dihapus.');
    }
}

async function muatDataProfil() {
    if (isMemuat) return; 
    
    isMemuat = true;
    aturState('loading', 'Memuat profil...');
    btnCobaLagi.disabled = true;

    try {
        const response = await fetch('data/profile.json');
        
        if (!response.ok) {
            throw new Error(`Gagal memuat data (Status: ${response.status})`);
        }
        
        const data = await response.json();
        
        if (!data || Object.keys(data).length === 0 || (Array.isArray(data) && data.length === 0)) {
            aturState('empty', 'Data profil kosong.');
            namaProfil.textContent = 'Data Kosong';
            return;
        }

        namaProfil.textContent = data.nama || 'Tanpa Nama';
        deskripsiProfil.textContent = data.deskripsi || 'Tidak ada deskripsi.';
        
        keterampilanData = data.keterampilan || [];
        renderKeterampilan();
        
        aturState('success', 'Profil berhasil dimuat.');

    } catch (error) {
        console.error(error);
        aturState('error', `Terjadi kesalahan: ${error.message}`);
        namaProfil.textContent = 'Gagal Memuat';
    } finally {
        isMemuat = false;
        btnCobaLagi.disabled = false;
    }
}

btnTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

btnDetail.addEventListener('click', () => {
    detailProfil.classList.toggle('hidden');
    
    const isTerbuka = !detailProfil.classList.contains('hidden');
    btnDetail.setAttribute('aria-expanded', String(isTerbuka));
    btnDetail.textContent = isTerbuka ? 'Tutup Detail' : 'Lihat Detail';
});

formSkill.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nilaiSkill = inputSkill.value.trim();
    
    if (nilaiSkill === '') {
        errorSkill.textContent = 'Keterampilan tidak boleh kosong.';
        inputSkill.setAttribute('aria-invalid', 'true');
        return;
    }
    
    errorSkill.textContent = '';
    inputSkill.setAttribute('aria-invalid', 'false');
    
    const skillBaru = {
        id: Date.now(),
        nama: nilaiSkill
    };
    
    keterampilanData.push(skillBaru);
    renderKeterampilan();
    
    inputSkill.value = '';
    aturState('success', `Keterampilan "${nilaiSkill}" berhasil ditambahkan.`);
});

btnCobaLagi.addEventListener('click', muatDataProfil);

muatDataProfil();