(function() {
    //alert("hola mundo");
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    
    function mobileNavToogle() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      }
      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
      
      function aosInit() {
        AOS.init({
          duration: 600,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      }
      //window.addEventListener('load', aosInit);
      
  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);
})();

$(document).ready(function() {
  //alert('hola mundo ... !')
  // Hacer que las miniaturas controlen el slider  
  $('.thumbnail').click(function() {
    const slideTo = $(this).data('slide-to');
    $('#productoCarousel').carousel(slideTo);
  });
});