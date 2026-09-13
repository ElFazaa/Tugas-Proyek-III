# Praktikum - Hasbi Wirya Alfaza / 251511012

## Ringkasan halaman
Halaman *landing page* statis "TechFix" ini dibangun untuk menawarkan jasa perbaikan perangkat keras, *upgrade* komponen laptop, dan perakitan PC desktop. Target utamanya adalah mahasiswa dan warga lokal yang membutuhkan solusi praktis terkait masalah komputer. Halaman disusun murni menggunakan HTML5 dan CSS3 tanpa bantuan *framework*, dengan fokus utama pada responsivitas di berbagai perangkat serta pemenuhan standar aksesibilitas web dasar.

## Tiga keputusan teknis
1. **Penggunaan HTML Semantik**: Memilih tag `<header>`, `<main>`, `<section>`, dan `<footer>` alih-alih menggunakan `<div>` secara berlebihan. Keputusan ini diambil agar struktur dokumen lebih bermakna (memenuhi kriteria semantik), mudah dibaca oleh mesin pencari, dan mendukung perangkat pembaca layar (*screen reader*).
2. **Layout Fleksibel dengan Flexbox**: Menerapkan kombinasi properti `display: flex`, `flex-wrap: wrap`, dan `flex-basis` pada kontainer kartu layanan. Keputusan ini memungkinkan tata letak beradaptasi secara otomatis; menyusun vertikal di layar sempit dan berjejer horizontal di layar lebar, tanpa memerlukan banyak kode *media query*.
3. **Penerapan Aksesibilitas Keyboard**: Menambahkan *pseudo-class* `:focus-visible` dengan properti *outline* bergaris tebal pada elemen tautan dan tombol. Hal ini diputuskan agar pengguna yang bernavigasi menggunakan tombol *Tab* pada *keyboard* dapat mengetahui dengan jelas elemen mana yang sedang aktif.

## Masalah, diagnosis, dan perbaikan
Masalah utama yang ditemukan adalah halaman dapat digeser ke samping (*horizontal overflow*) saat diuji pada layar berukuran 320px. Melalui proses diagnosis menggunakan fitur *Inspect Element* (tab *Computed*) di DevTools, ditemukan bahwa ukuran asli gambar yang disematkan melampaui batas lebar layar ponsel. Perbaikan dilakukan secara mandiri dengan mendefinisikan properti `max-width: 100%;` dan `height: auto;` pada elemen `<img>` di file eksternal CSS, sehingga gambar mengecil secara proporsional mengikuti lebar kontainernya.

## Hasil pengujian empat viewport
Pengujian dilakukan menggunakan *Device Toolbar* pada *browser*:
- **Viewport 320px dan 375px**: Tidak ditemukan *horizontal overflow*. Seluruh konten, termasuk gambar dan kartu layanan, tersusun rapi secara vertikal dari atas ke bawah.
- **Viewport 768px dan 1024px**: Ruang layar yang lebih luas direspons dengan baik oleh sistem Flexbox. Kartu layanan otomatis membagi ruang secara proporsional dan sejajar ke samping. Teks tetap nyaman dibaca dan struktur navigasi bekerja dengan sempurna.

## Refleksi belajar
Proses pengerjaan proyek ini memberikan pemahaman mendalam mengenai pentingnya merancang antarmuka web dari dasar secara terstruktur. Konsep baru yang paling berdampak bagi saya adalah kemampuan Flexbox dalam mengatur tata letak beresolusi dinamis tanpa harus selalu mengandalkan aturan resolusi statis. Sebelumnya, saya berasumsi penyesuaian tata letak ponsel harus selalu ditulis manual per ukuran layar. 

Di sisi lain, kesalahan berharga yang saya temui adalah mengabaikan properti aksesibilitas visual. Hal ini menyadarkan saya bahwa kode HTML dan CSS yang valid tidak hanya dinilai dari tampilan visualnya menggunakan tetikus (*mouse*), melainkan juga kegunaannya bagi semua orang melalui peramban dan papan ketik. Ke depannya, target saya adalah memperdalam pemahaman mengenai *CSS Grid Layout* untuk melengkapi kemampuan Flexbox, sehingga saya mampu merancang arsitektur tata letak dua dimensi yang lebih kompleks dan presisi pada tugas-tugas berikutnya.

## Log AI atau sumber bantuan
Berdasarkan batas penggunaan yang diizinkan (Mode Fundamental & Tutor), berikut adalah riwayat penggunaan AI:
1. **Fase Layouting (Fundamental)**: Bertanya mengenai cara kerja distribusi ruang pada Flexbox. AI menjelaskan konsep teori `flex-wrap` dan `flex-basis`. Berdasarkan pemahaman tersebut, saya secara mandiri meracik nilai `flex: 1 1 250px;` pada CSS saya.
2. **Fase Debugging (Tutor)**: Meminta panduan cara melacak *error overflow* pada layar kecil. AI membimbing langkah-langkah penggunaan inspeksi *box model* di DevTools. Setelah menemukan sumber masalahnya pada elemen gambar, saya mengetikkan kode penyelesaiannya di CSS secara manual. AI tidak membuatkan sintaks atau dokumen final untuk disalin.
