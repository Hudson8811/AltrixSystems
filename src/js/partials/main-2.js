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
  const asideMenu = $('.aside-menu');

  burger.on('click', function() {
    $(this).toggleClass('is-active');
    asideMenu.toggleClass('aside-menu--open');
  });

  const footerMenuToggle = $('.footer__menu-title');
  
  footerMenuToggle.on('click', function() {
    if ($(window).width() <= 580) {
      $(this).toggleClass('is-active').next().slideToggle(300);
    }
  });

  const dropdownLinks = $('.aside-menu__link--dropdown');

  dropdownLinks.on('click', function(evt) {
    evt.preventDefault();
    $(this).parent().siblings().find('.aside-menu__link--dropdown').removeClass('aside-menu__link--active').next().slideUp();
    
    if ($(this).hasClass('aside-menu__link--active')) {
      $(this).removeClass('aside-menu__link--active').next().slideUp();
    } else {
      $(this).addClass('aside-menu__link--active').next().slideDown();
    }
  });


  const catalogAccordionItems = $('.catalog-accordion__item-head');
  const modifierClass = 'catalog-accordion__item--active';
  //const contentClass = '.catalog-accordion__item-content';

  catalogAccordionItems.on('click', function() {
    let btn = $(this);
    let parent = btn.parent();

    parent.siblings().removeClass(modifierClass).find('.catalog-accordion__item-content').slideUp();
    

      if (parent.hasClass(modifierClass)) {
        parent.removeClass(modifierClass);
        btn.next().slideUp();
      } else {
        parent.addClass(modifierClass);
        btn.next().slideDown();
      }

    
  });
  
});
