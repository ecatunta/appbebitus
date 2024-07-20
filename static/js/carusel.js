document.addEventListener('DOMContentLoaded', function() {
    //alert ('hellow carrusel')

    const carousel = document.querySelector('#productoCarousel');
    const fullScreenImg = document.querySelector('#fullScreenImg');
    const fullScreenContainer = document.querySelector('#fullScreenImage');
    const closeBtn = document.querySelector('#closeFullScreen');
    const imageNumber = document.querySelector('#imageNumber');
    const totalImages = document.querySelector('#totalImages');
    
    // Actualizar el contador de imágenes
    function updateImageCounter() {
      const currentIndex = $(carousel).find('.carousel-item.active').index() + 1;
      imageNumber.textContent = currentIndex;
    }

    $(carousel).on('slide.bs.carousel', function() {
      updateImageCounter();
    });
    
    updateImageCounter();
    
    // Abrir imagen en pantalla completa
    $(carousel).on('click', '.carousel-item img', function() {
      fullScreenImg.src = this.src;
      fullScreenContainer.style.display = 'block';
    });
    
    // Cerrar pantalla completa
    closeBtn.addEventListener('click', function() {
      fullScreenContainer.style.display = 'none';
    });
    
    // Navegación por deslizamiento en móviles
    let touchStartX = 0;
    let touchEndX = 0;

    function handleSwipe() {
      if (touchEndX < touchStartX) {
        $(carousel).carousel('next');
      }
      if (touchEndX > touchStartX) {
        $(carousel).carousel('prev');
      }
    }

    carousel.addEventListener('touchstart', function(event) {
      touchStartX = event.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', function(event) {
      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();
    });
  });