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
  })
});
