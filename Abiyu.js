document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    const greetingElement = document.getElementById('greeting');
    const hour = new Date().getHours();
    let timeGreeting = 'Halo';

    if (hour >= 5 && hour < 12) {
        timeGreeting = 'Selamat Pagi';
    } else if (hour >= 12 && hour < 15) {
        timeGreeting = 'Selamat Siang';
    } else if (hour >= 15 && hour < 18) {
        timeGreeting = 'Selamat Sore';
    } else {
        timeGreeting = 'Selamat Malam';
    }

    greetingElement.innerText = `${timeGreeting}, Saya Abiyu Ben Rahaja`;

    document.getElementById('year').innerText = new Date().getFullYear();
});
