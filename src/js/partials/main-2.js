$(document).ready(function(){
  const projectsCarousel = new Swiper('.__js_projects-carousel', {
		slidesPerView: 'auto',
		spaceBetween: 58,
		loop: true,
		pagination: {
			el: '.paginate',
			clickable: true
		},
		navigation: {
			nextEl: '.nav-btn--next',
			prevEl: '.nav-btn--prev',
		}
  });

  const mainSlider = new Swiper('.__js_main-slider', {
    slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		pagination: {
			el: '.paginate',
			clickable: true
		},
  });

  const burger = $('.burger');
  burger.on('click', function() {
    $(this).toggleClass('is-active');
  });

  const footerMenuToggle = $('.footer__menu-title');
  
  footerMenuToggle.on('click', function() {
    if ($(window).width() <= 580) {
      $(this).toggleClass('is-active').next().slideToggle(300);
    }
  })
  
});
