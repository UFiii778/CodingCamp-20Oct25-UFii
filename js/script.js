document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi: Tampilkan Waktu Saat Ini
    updateCurrentTime();

    // 2. Tambahkan Event Listener ke Formulir
    const form = document.getElementById('message-form');
    // Tambahkan listener untuk event 'submit' pada form
    form.addEventListener('submit', function(e) {
        // Mencegah form dikirim secara default, agar halaman tidak reload
        e.preventDefault(); 
        validateAndDisplayForm();
    });

    // 3. (Opsional) Fungsi sapaan awal
    // Hapus dua baris komentar di bawah jika Anda ingin prompt nama muncul saat halaman dimuat:
    // welcomeSpeech(); 
});


function updateCurrentTime() {
    // Fungsi untuk menampilkan waktu saat ini
    const currentTimeElement = document.getElementById('current-time');
    
    // Mendapatkan objek Date saat ini
    const now = new Date();
    
    // Format tanggal dan waktu agar mirip contoh wireframe (cth: Fri Jun 17 2022 11:27:28 GMT+0100)
    // Menggunakan toLocaleString untuk format yang lebih konsisten (opsional, tapi lebih baik)
    // Atau menggunakan gabungan toDateString dan toTimeString
    const datePart = now.toDateString();
    // Mengambil bagian waktu (HH:MM:SS) dan Timezone (cth: GMT+0700)
    const timeZoneMatch = now.toTimeString().match(/(\d{2}:\d{2}:\d{2}) (GMT[+-]\d{4} \(.+\))/);
    
    if (timeZoneMatch) {
        currentTimeElement.textContent = `${datePart} ${timeZoneMatch[1]} ${timeZoneMatch[2]}`;
    } else {
         // Fallback jika regex gagal
         currentTimeElement.textContent = now.toString();
    }
}

welcomeSpeech();

function welcomeSpeech(){
    /// show prompt to ask for user's name
    let name = prompt("Enter your name:")

    //Great the user with thier name
    document.getElementById('greet-name').innerHTML = `Hii ${name}, `;
}


function validateForm () {
    const name = document.getElementById('name-input').value;
    const email = document.getElementById('email-input').value;
    const message = document.getElementById('message-input').value;

    console.log(name, email, message);

    if (name=== "" || email === "" || message === "") {
        alert("All fiedls are required!");
    } else {
        alert(`Thank you ${name}, your message has been submitted successfully!`);
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    // ... (kode yang sudah ada untuk waktu dan form) ...

    // --- Kode baru untuk Carousel ---
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('carousel-prev');
    const nextButton = document.getElementById('carousel-next');

    let currentIndex = 0; // Indeks item yang sedang terlihat pertama kali

    // Fungsi untuk menggeser carousel
    function updateCarousel() {
        // Hitung lebar satu item (termasuk padding/margin jika ada, tapi di sini pakai Tailwind w-full)
        // Kita perlu tahu berapa banyak item yang terlihat untuk menghitung offset yang benar
        let itemWidth;
        if (window.innerWidth >= 1024) { // Desktop (3 item)
            itemWidth = carouselWrapper.offsetWidth / 3;
        } else if (window.innerWidth >= 768) { // Tablet (2 item)
            itemWidth = carouselWrapper.offsetWidth / 2;
        } else { // Mobile (1 item)
            itemWidth = carouselWrapper.offsetWidth;
        }
        
        // Geser wrapper berdasarkan currentIndex dan itemWidth
        carouselWrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    // Event Listener untuk tombol "Previous"
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Opsional: kembali ke item terakhir jika di awal
            let itemsPerView;
            if (window.innerWidth >= 1024) { itemsPerView = 3; }
            else if (window.innerWidth >= 768) { itemsPerView = 2; }
            else { itemsPerView = 1; }
            
            currentIndex = carouselItems.length - itemsPerView;
            if (currentIndex < 0) currentIndex = 0; // Pastikan tidak negatif
            updateCarousel();
        }
    });

    // Event Listener untuk tombol "Next"
    nextButton.addEventListener('click', () => {
        // Hitung jumlah item yang bisa digeser ke depan
        let itemsPerView;
        if (window.innerWidth >= 1024) { itemsPerView = 3; }
        else if (window.innerWidth >= 768) { itemsPerView = 2; }
        else { itemsPerView = 1; }

        if (currentIndex < carouselItems.length - itemsPerView) {
            currentIndex++;
            updateCarousel();
        } else {
            // Opsional: kembali ke item pertama jika di akhir
            currentIndex = 0;
            updateCarousel();
        }
    });

    // Panggil updateCarousel saat load dan resize
    window.addEventListener('resize', () => {
        // Reset currentIndex agar tidak keluar batas saat resize
        let itemsPerView;
        if (window.innerWidth >= 1024) { itemsPerView = 3; }
        else if (window.innerWidth >= 768) { itemsPerView = 2; }
        else { itemsPerView = 1; }

        if (currentIndex > carouselItems.length - itemsPerView) {
            currentIndex = carouselItems.length - itemsPerView;
            if (currentIndex < 0) currentIndex = 0;
        }
        updateCarousel();
    });

    // Panggil pertama kali untuk memastikan posisi awal benar
    updateCarousel();

    // --- Akhir Kode Carousel ---

    // ... (kode lain di bawahnya jika ada) ...
});