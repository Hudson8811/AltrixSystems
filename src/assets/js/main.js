$(window).on('load', function() {

  function getScrollbarWidth() {
    var block = $('<div>').css({'height':'50px','width':'50px'});
    var indicator = $('<div>').css({'height':'200px'});

    $('body').append(block.append(indicator));

    var w1 = $('div', block).innerWidth();
    block.css('overflow-y', 'scroll');

    var w2 = $('div', block).innerWidth();
    $(block).remove();

    return (w1 - w2);
  }

  const scrollbarWidth = getScrollbarWidth();

  const projectsCarousel = new Swiper('.__js_projects-carousel', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		loop: true,
		pagination: {
			el: '.paginate',
			clickable: true
		},
		navigation: {
			nextEl: '.nav-btn--next',
			prevEl: '.nav-btn--prev',
		},
    breakpoints: {
      // when window width is >= 560px
      560: {
        slidesPerView: 2,
        //spaceBetween: 30
      },
      // when window width is >= 992px
      768: {
        slidesPerView: 3,
        //spaceBetween: 36
      },
      // when window width is >= 1300px
      992: {
        slidesPerView: 4,
        //spaceBetween: 36
      },
      1300: {
        slidesPerView: 4,
        spaceBetween: 36
      }
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
    const item = $(this);

    if ($(window).width() <= 560) {

      if (item.hasClass('is-active')) {
        item.next().slideToggle(300);
        setTimeout(function() {
          item.removeClass('is-active');
        }, 200);
        
      } else {
        item.addClass('is-active').next().slideToggle(300);
      }
    }
  });

  
  $(window).on('resize', function() {
    if ($(window).width() > 560) {
      footerMenuToggle.removeClass('is-active').next().removeAttr('style');
    }
  });

  //
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

  // modal
  const cookieModal = $('.cookie-confirm');
  const cookieBtn = $('.__js_cookie-confirm');
  const cookieClass = 'cookie-confirm--active';
  const madalSelectors = ['.__js_vacancy-modal', '.__js_demo-modal-success-message', '.__js_show-form', '.__js_show-tags'];

  madalSelectors.forEach(function(item) {
    $(item).fancybox({
      hideScrollbar: false,
      smallBtn: false,
      toolbar: false,

      beforeShow: function() {
        $('body').css({'margin-right': scrollbarWidth + 'px', 'overflow': 'hidden'})
      },
      afterClose: function() {
        $('body').removeAttr('style');
      }
    });
  });
      //
      //touch: false,
      //modal: false
  $('.__js_modal-close').on('click', function() {
    $.fancybox.close();
  });

  if (localStorage['confirm-cookie'] !== "1") {
    setTimeout(function() {
      cookieModal.addClass(cookieClass);
      localStorage.setItem('confirm-cookie', false);
    }, 3000);

    cookieBtn.on('click', function() {
      cookieModal.removeClass(cookieClass);
      localStorage['confirm-cookie'] = 1;
    })
  }

  //
  const searchToggle = $('.smart-search__toggle');
  const searchToggleClass = 'is-active';

  searchToggle.on('click', function() {
    $(this).toggleClass(searchToggleClass).next().toggleClass(searchToggleClass);
  });

  $(window).on('resize', function() {
    if ($(window).width() > 560) {
      searchToggle.removeClass(searchToggleClass).next().removeClass(searchToggleClass);
    }
  });

  // accordion
  const accordionItems = $('.accordion-item');
  const accordionHeadings = $('.accordion-heading');
  const accordionItemClass = 'is-active';
  const accordionContent = $('.accordion-content');

  accordionHeadings.on('click', function() {
    const parent = $(this).parent();
    const heading = $(this);


    if (parent.hasClass(accordionItemClass)) {
      parent.removeClass(accordionItemClass);
      heading.next().slideUp();
    } else {
      accordionItems.removeClass(accordionItemClass);
      accordionContent.slideUp();
      parent.addClass(accordionItemClass);
      heading.next().slideDown();
    }
  });
});
