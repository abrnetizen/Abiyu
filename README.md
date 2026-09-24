# Abiyu
Oke, ini penjelasan bagian DOM di JS dan CSS (termasuk `@media`)-nya, pake bahasa yang gampang dipahami:

## Penjelasan DOM di `Abiyu.js`

**1. Ambil elemen dari HTML**
```js
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
```
`document.querySelector()` itu cara JS "nunjuk" elemen HTML pakai selector CSS (class/id). Di sini dia ambil elemen dengan class `hamburger` (tombol menu 3 garis) dan `nav-links` (daftar menu navigasi), lalu disimpan ke variabel biar bisa diatur nanti.

**2. Toggle menu saat hamburger diklik**
```js
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});
```
`addEventListener('click', ...)` = "dengerin" kalau elemen itu diklik, jalankan fungsi di dalamnya. `classList.toggle('active')` nambahin class `active` kalau belum ada, atau ngapus kalau udah ada. Class `active` ini yang bikin CSS nampilin/nyembunyiin menu di mode mobile (lihat `.nav-links.active` di CSS).

**3. Tutup menu otomatis saat link diklik**
```js
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});
```
`querySelectorAll()` ambil **semua** elemen `<a>` di dalam `.nav-links` (beda sama `querySelector` yang cuma ambil satu). `forEach` dipakai buat pasang event listener ke tiap link satu-satu. Jadi begitu user klik salah satu menu, hamburger otomatis nutup lagi.

**4. Ganti teks sapaan sesuai jam**
```js
const greetingElement = document.getElementById('greeting');
const hour = new Date().getHours();
...
greetingElement.innerText = `${timeGreeting}, Saya Abiyu Ben Rahaja`;
```
`getElementById('greeting')` ambil elemen `<h1 id="greeting">`. `new Date().getHours()` ngambil jam sekarang di device user. Berdasarkan jam itu, teksnya diganti pakai `innerText` — jadi "Selamat Pagi/Siang/Sore/Malam" otomatis nyesuaiin waktu buka website.

**5. Tahun otomatis di footer**
```js
document.getElementById('year').innerText = new Date().getFullYear();
```
Ambil elemen `<span id="year">`, terus diisi tahun sekarang biar footer nggak perlu diupdate manual tiap tahun.

---

## Penjelasan CSS (murni, tanpa Tailwind)

CSS ini pakai pendekatan biasa: bikin class sendiri di `Abiyu.css`, lalu class itu dipasang langsung ke tag HTML (`class="navbar"`, dll). Beda sama Tailwind yang stylingnya pakai banyak class utility langsung di HTML (`class="flex justify-between p-4"`).

**CSS Variables (`:root`)**
```css
:root {
    --navy: #1e3a5f;
    --teal: #2a9d8f;
    ...
}
```
Ini kayak "variabel warna" global, dipanggil pakai `var(--navy)`. Enaknya, kalau mau ganti warna tema, cukup ubah di satu tempat ini aja, nggak perlu cari satu-satu di semua elemen.

**Flexbox buat layout navbar & hero**
```css
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```
`display: flex` bikin elemen di dalamnya sejajar (row). `justify-content: space-between` naruh logo di kiri dan menu di kanan dengan jarak otomatis. `align-items: center` bikin semuanya sejajar vertikal di tengah.

**Grid buat kartu proyek**
```css
.project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}
```
`display: grid` bikin layout kotak-kotak. `repeat(auto-fit, minmax(280px, 1fr))` artinya: kolom dibuat otomatis sebanyak yang muat, tiap kolom minimal 280px, tapi kalau ruang lebih lega, kolom-kolom itu ikut melebar rata (`1fr`). Ini yang bikin kartu proyek otomatis responsive tanpa perlu `@media` khusus.

### `@media` — Responsive untuk layar kecil

```css
@media (max-width: 768px) {
    .hamburger {
        display: block;
    }
    .nav-links {
        position: fixed;
        left: -100%;
        ...
    }
    .nav-links.active {
        left: 0;
    }
}
```

`@media (max-width: 768px)` artinya: **aturan CSS di dalamnya cuma berlaku kalau lebar layar 768px ke bawah** (tablet/HP). Di luar kondisi itu (layar besar), aturan ini diabaikan browser.

Yang terjadi di layar kecil:
- `.hamburger { display: block; }` → tombol hamburger yang tadinya `display: none` di CSS normal, sekarang dimunculin.
- `.nav-links { position: fixed; left: -100%; ... }` → menu navigasi digeser keluar layar (disembunyikan) pakai `left: -100%`.
- `.nav-links.active { left: 0; }` → begini nyambungnya sama JS tadi! Waktu JS nambahin class `active` ke `.nav-links`, CSS ini yang bikin menu geser masuk ke `left: 0` (kelihatan).
- Animasi hamburger jadi bentuk **X** pas aktif juga diatur di sini pakai `transform: rotate()` dan `translateY()` pada tiap `.bar`.
- `.hero-content h1 { font-size: 2rem; }` → ukuran judul dikecilin biar pas di layar HP.

Jadi intinya: **JS ngatur "kapan" (toggle class), CSS `@media` ngatur "gimana tampilannya" di ukuran layar tertentu.** Dua-duanya kerja bareng buat bikin menu hamburger yang responsive.
