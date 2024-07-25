document.addEventListener('DOMContentLoaded', function () {
  //alert ('hellow carrusel')

  const carousel = document.querySelector('#productoCarousel');
  const fullScreenImg = document.querySelector('#fullScreenImg');
  const fullScreenContainer = document.querySelector('#fullScreenImage');
  const closeBtn = document.querySelector('#closeFullScreen');
  const imageNumber = document.querySelector('#imageNumber');
  const totalImages = document.querySelector('#totalImages');
  const prevControl = document.querySelector('.carousel-control-prev');
  const nextControl = document.querySelector('.carousel-control-next');


  // Desactivar el deslizamiento automático
  $(carousel).carousel('dispose');

  // Desactiva el deslizamiento automático y táctil nativo de Bootstrap
  $(carousel).carousel({
    interval: false,
    wrap: false,
    touch: false
  });


  // Actualizar el contador de imágenes
  function updateImageCounter() {
    const currentIndex = $(carousel).find('.carousel-item.active').index() + 1;
    imageNumber.textContent = currentIndex;
  }

  function updateControls() {
    const currentIndex = $(carousel).find('.carousel-item.active').index();
    const totalItems = $(carousel).find('.carousel-item').length;
    //console.log('currentIndex:' + currentIndex + ' / totalItems: ' + totalItems)

    if (currentIndex === 0) {
      prevControl.classList.add('disabled');
      prevControl.setAttribute('aria-disabled', 'true');
      console.log('logica prevControl true:' + currentIndex)
    } else {
      prevControl.classList.remove('disabled');
      console.log('logica prevControl false:' + currentIndex)
    }

    if (currentIndex === totalItems - 1) {
      nextControl.classList.add('disabled');
      nextControl.setAttribute('aria-disabled', 'true');
      console.log('logica nextControl true:' + currentIndex)
    } else {
      nextControl.classList.remove('disabled');
      console.log('logica nextControl false:' + currentIndex)
    }
  }

  updateImageCounter();
  updateControls();

  //$(carousel).on('click', '.carousel-control-prev, .carousel-control-next', function () {
  $(carousel).on('click', '.carousel-control-prev, .carousel-control-next', function (e) {
    /*setTimeout(function () {
      updateImageCounter();
      updateControls();
    }, 500); // Ajusta el tiempo si es necesario
*/
    if (this.classList.contains('disabled')) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setTimeout(function () {
        updateImageCounter();
        updateControls();
      }, 500); // Ajusta el tiempo si es necesario
    }
  });


  $(carousel).on('slide.bs.carousel', function () {
    updateImageCounter();
  });



  // Abrir imagen en pantalla completa
  $(carousel).on('click', '.carousel-item img', function () {
    fullScreenImg.src = this.src;
    fullScreenContainer.style.display = 'block';
  });

  // Cerrar pantalla completa
  closeBtn.addEventListener('click', function () {
    fullScreenContainer.style.display = 'none';
  });

  // Navegación por deslizamiento en móviles
  let touchStartX = 0;
  let touchEndX = 0;

  function handleSwipe() {
    //alert('handleSwipe')
    const currentIndex = $(carousel).find('.carousel-item.active').index();
    const totalItems = $(carousel).find('.carousel-item').length;
    const swipeDistance = touchEndX - touchStartX;
    //alert('touchEndX: ' + touchEndX + ' touchStartX:' + touchStartX + 'swipeDistance:' + swipeDistance)
    // Define un umbral de distancia mínima para considerar un deslizamiento
    const swipeThreshold = 100;

    if (window.innerWidth < 768) { // Para dispositivos pequeños      
      if (Math.abs(swipeDistance) > swipeThreshold) {
        // A la izquierda 
        if (touchEndX < touchStartX && currentIndex < totalItems - 1) {
          //alert('izquierda > next - currentIndex:' + currentIndex + ' totalItems:' + (totalItems - 1))
          $(carousel).carousel('next');
          //A la derecha
        } else if (touchEndX > touchStartX && currentIndex > 0) {
          //alert('derecha > prev - currentIndex:' + currentIndex)
          $(carousel).carousel('prev');
        }
      }
    } else { // Para dispositivos grandes
      if (touchEndX < touchStartX && !nextControl.classList.contains('disabled')) {
        $(carousel).carousel('next');
      } else if (touchEndX > touchStartX && !prevControl.classList.contains('disabled')) {
        $(carousel).carousel('prev');
      }
    }

    setTimeout(function () {
      updateImageCounter();
      updateControls();
    }, 500); // Ajusta el tiempo si es necesario

  }

  carousel.addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].screenX;
  });

  carousel.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  });



});