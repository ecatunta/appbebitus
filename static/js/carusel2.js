document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('#productoCarousel');
  const fullScreenImg = document.querySelector('#fullScreenImg');
  const fullScreenContainer = document.querySelector('#fullScreenImage');
  const closeBtn = document.querySelector('#closeFullScreen');
  const imageNumber = document.querySelector('#imageNumber');
  const totalImages = document.querySelector('#totalImages');
  const prevControl = document.querySelector('.carousel-control-prev');
  const nextControl = document.querySelector('.carousel-control-next');

  function updateImageCounter() {
    const currentIndex = $(carousel).find('.carousel-item.active').index() + 1;
    imageNumber.textContent = currentIndex;
  }

  function updateControls() {
    const currentIndex = $(carousel).find('.carousel-item.active').index();
    const totalItems = $(carousel).find('.carousel-item').length;

    if (currentIndex === 0) {
      prevControl.classList.add('disabled');
      prevControl.setAttribute('aria-disabled', 'true');
    } else {
      prevControl.classList.remove('disabled');
      prevControl.removeAttribute('aria-disabled');
    }

    if (currentIndex === totalItems - 1) {
      nextControl.classList.add('disabled');
      nextControl.setAttribute('aria-disabled', 'true');
    } else {
      nextControl.classList.remove('disabled');
      nextControl.removeAttribute('aria-disabled');
    }
  }

  $(carousel).on('slide.bs.carousel', function () {
    updateImageCounter();
    updateControls();
  });

  updateImageCounter();
  updateControls();

  $(carousel).on('click', '.carousel-control-prev, .carousel-control-next', function (e) {
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

  $(carousel).on('click', '.carousel-item img', function () {
    fullScreenImg.src = this.src;
    fullScreenContainer.style.display = 'flex';
  });

  closeBtn.addEventListener('click', function () {
    fullScreenContainer.style.display = 'none';
  });

  let touchStartX = 0;
  let touchEndX = 0;

  function handleSwipe() {
    const currentIndex = $(carousel).find('.carousel-item.active').index();
    const totalItems = $(carousel).find('.carousel-item').length;

    if (touchEndX < touchStartX && currentIndex < totalItems - 1) {
      $(carousel).carousel('next');
    } else if (touchEndX > touchStartX && currentIndex > 0) {
      $(carousel).carousel('prev');
    }

    setTimeout(function () {
      updateImageCounter();
      updateControls();
    }, 500); // Ajusta el tiempo si es necesario
  }

  /*function handleSwipe() {
    const currentIndex = $(carousel).find('.carousel-item.active').index();
    const totalItems = $(carousel).find('.carousel-item').length;

    if (window.innerWidth < 768) { // Para dispositivos pequeños
      if (touchEndX < touchStartX && currentIndex < totalItems - 1) {
        $(carousel).carousel('next');
      } else if (touchEndX > touchStartX && currentIndex > 0) {
        $(carousel).carousel('prev');
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
  }*/


  /* function handleSwipe(event) {  // Agregar event como parámetro
     const currentIndex = $(carousel).find('.carousel-item.active').index();
     const totalItems = $(carousel).find('.carousel-item').length;
 
     if (window.innerWidth < 768) { // Para dispositivos pequeños
       if (touchEndX < touchStartX) { // Desplazamiento a la izquierda
         if (currentIndex < totalItems - 1) {
           $(carousel).carousel('next');
         } else {
           alert('cancel')
           // Cancelar el evento de deslizamiento
           event.preventDefault();
           event.stopPropagation();
         }
       } else if (touchEndX > touchStartX) { // Desplazamiento a la derecha
         if (currentIndex > 0) {
           $(carousel).carousel('prev');
         } else {
           // Cancelar el evento de deslizamiento
           alert('cancel')
           event.preventDefault();
           event.stopPropagation();
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
   }*/


  carousel.addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].screenX;
  });


  /*carousel.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  });*/

  /*carousel.addEventListener('touchend', function(event) {
    alert ('touchend')
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe(event); // Pasar event a handleSwipe
  });*/

  carousel.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].screenX;
    const currentIndex = $(carousel).find('.carousel-item.active').index();
    const totalItems = $(carousel).find('.carousel-item').length;

    if ((touchEndX < touchStartX && currentIndex < totalItems - 1) ||
      (touchEndX > touchStartX && currentIndex > 0)) {
      handleSwipe();
    }
  });

  $(carousel).carousel({
    interval: false // Establece el intervalo en false para desactivar el deslizamiento automático
  });

});
