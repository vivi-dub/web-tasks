// Скрипт для фотогалереи
document.addEventListener('DOMContentLoaded', function() {
    loadGalleryImages();
    initModal();
});

let currentImages = [];
let currentImageIndex = 0;

function loadGalleryImages() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    // Массив изображений для галереи
    currentImages = [
        { src: '../images/cat1.jpg', alt: 'Барсик', caption: 'Барсик' },
        { src: '../images/cat2.jpg', alt: 'Соня', caption: 'Соня' },
        { src: '../images/cat3.jpg', alt: 'Исследователь', caption: 'Исследователь' },
        { src: '../images/cat4.jpg', alt: 'Рыжий', caption: 'Рыжий' },
        { src: '../images/cat5.jpg', alt: 'Черная пантера', caption: 'Черная пантера' },
        { src: '../images/cat6.jpg', alt: 'Белоснежка', caption: 'Белоснежка' },
    ];
    
    // Очищаем галерею
    galleryGrid.innerHTML = '';
    
    // Добавляем изображения
    currentImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        galleryItem.innerHTML = `
            <img src="${image.src}" 
                 alt="${image.alt}" 
                 class="gallery-img"
                 data-index="${index}"
                 onerror="this.src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=250&q=80'">
            <div class="img-caption">${image.caption}</div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
    
    // Добавляем обработчики кликов на изображения
    const images = galleryGrid.querySelectorAll('.gallery-img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            openModal(parseInt(this.getAttribute('data-index')));
        });
    });
}

function initModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.modal-nav.prev');
    const nextBtn = document.querySelector('.modal-nav.next');
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Навигация
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Навигация с клавиатуры
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
}

function openModal(index) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    currentImageIndex = index;
    
    modalImg.src = currentImages[index].src;
    modalCaption.textContent = currentImages[index].caption;
    modal.style.display = 'block';
    
    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    
    // Разблокируем прокрутку страницы
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = currentImages.length - 1;
    }
    
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImg.src = currentImages[currentImageIndex].src;
    modalCaption.textContent = currentImages[currentImageIndex].caption;
}

function showNextImage() {
    currentImageIndex++;
    if (currentImageIndex >= currentImages.length) {
        currentImageIndex = 0;
    }
    
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImg.src = currentImages[currentImageIndex].src;
    modalCaption.textContent = currentImages[currentImageIndex].caption;
}