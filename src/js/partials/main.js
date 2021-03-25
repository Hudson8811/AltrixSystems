$(document).ready(function(){
    $('.banner-slider').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        appendDots: $('.banner-tools-dots'),
        appendArrows: $('.banner-tools-arrows'),
    });

    $('.objects-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendArrows: $('.objects-arrows'),
    });

    $('.types').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        appendDots: $('.types-pag'),
        appendArrows: $('.types-arrows'),
    });
    

    const TypesAllSliders = $('.types-catalog').length;
    $('.types-text-pag span:last-child').html(TypesAllSliders < 10 ? '0' + TypesAllSliders : TypesAllSliders);

    $('.types').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        const current = nextSlide + 1;
        $('.types-text-pag span:first-child').html(current < 10 ? '0' + current : current);
    });

    const allSliders = $('.banner-slider-item').length;
    $('.banner-tools-text_pag span:last-child').html(allSliders < 10 ? '0' + allSliders : allSliders);

    $('.banner-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        const current = nextSlide + 1;
        $('.banner-tools-text_pag span:first-child').html(current < 10 ? '0' + current : current);
    });

    $('.reviews-catalog').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        appendArrows: $('.reviews-tools'),
        responsive: [
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
                breakpoint: 580,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              },

        ]
    });

    $('.reviews-catalog').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        const current = nextSlide + 1;
        $('.reviews-pag span:first-child').html(current < 10 ? '0' + current : current);
    });

    $('.advantages-catalog').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        appendArrows: $('.advantages-tools'),
        responsive: [
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
                breakpoint: 580,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              },

        ]
    });

    $('.shades-catalog').slick({
        infinite: false,
        slidesToShow: 6,
        rows:2,
        slidesToScroll: 6,
        appendArrows: $('.shades-tools'),
        responsive: [
            {
              breakpoint: 1300,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4
              }
            },
            {
                breakpoint: 580,
                settings: {
                  slidesToShow: 2, 
                  rows:3,
                  slidesToScroll: 2
                }
              },

        ]
    });


    $('.advantages-catalog').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        const current = nextSlide + 1;
        $('.advantages-pag span:first-child').html(current < 10 ? '0' + current : current);
    });

    $('.modal1-btn').click(function(e){
        e.preventDefault()
        $.fancybox.open($('#modal1'))
    });

    $('.modal2-btn').click(function(e){
        e.preventDefault()
        $.fancybox.open($('#modal2'))
    });


    $(document).on('click', '.calc-select-heading', function(e){
        e.preventDefault();
        const $this = $(this);
        const $select = $this.parents('.calc-select');
        if(!$select.hasClass('is-active')){
            $('.calc-select').removeClass('is-active');
            $select.addClass('is-active');
        } else{
            $select.removeClass('is-active');
        }
    });

    $(document).on('click', '.calc-select-content li', function(e){
        e.preventDefault();
        const $this = $(this);
        const $select = $this.parents('.calc-select');
        const $heading = $this.parent('.calc-select-content').siblings('.calc-select-heading').children('span')
        const $content = $this.text()
        $heading.text($content);
        $select.removeClass('is-active');
    });


    $(document).on('change', '.calc-checkbox input', function(){
        const id = $(this).data('id');
        $(`.calc-row[data-id="${id}"]`).toggleClass('is-active');
    });

    $(document).on('click', '.technologies-item', function(){
        const $this = $(this);
        const itemCount = $this.data('item');
        $('.technologies-item').removeClass('is-active');
        $this.addClass('is-active');
        $('.technologies-slide').removeClass('is-active');
        $(`.technologies-slide[data-item="${itemCount}"]`).addClass('is-active');
    });

    $(document).on('click', '.technologies-slide-close', function(e){
        e.preventDefault();
        const $this = $(this);
        const item = $this.parents('.technologies-slide')
        const itemCount = item.data('item');
        item.removeClass('is-active');
        $(`.technologies-item[data-item="${itemCount}"]`).removeClass('is-active');
    });

    $('[data-fancybox]').fancybox({
		touch: false,
		scrolling: 'no',
		beforeShow: function(){
			$("body").css({'overflow-y':'hidden'});
		},
		afterClose: function(){
			$("body").css({'overflow-y':'visible'});
		}
    });
    

    $('.header-menu > li > a').hover(function(e){
        e.preventDefault();

        if($(window).width() > 1300){
            if($(this).data('id')){
                const $this = $(this);
                const id = $(this).data('id');
                $('.header-menu a').removeClass('is-active');
                $this.addClass('is-active');
                $('.bigMenu').addClass('is-active');
                $('.bigMenu-content').removeClass('is-active');
                $(`.bigMenu-content[data-id="${id}"]`).addClass('is-active');
            }
            
        }
    });

    $('.header-menu > li > a').click(function(e){
        e.preventDefault();

        if($(window).width() < 1301){
            const $this = $(this);
            if($(this).data('id')){
                if(!$(this).hasClass('is-active')){
                    $('.header-menu a').removeClass('is-active');
                    $('.header-menu-siblings').slideUp();
                    $this.addClass('is-active');
                    $this.siblings('.header-menu-siblings').slideDown();
                } else{
                    $this.removeClass('is-active');
                    $this.siblings('.header-menu-siblings').slideUp();
                }
            }
            
        }
    });

    $('.bigMenu-overlay').hover(function(e){
        $('.header-menu a').removeClass('is-active');
        $('.bigMenu').removeClass('is-active');
        $('.bigMenu-content').removeClass('is-active');
    });

    $('.prices-heading-tabs-item').click(function(){
        const content = $(this).data('content');
        $('.prices-heading-tabs-item').removeClass('is-active');
        $(this).addClass('is-active');
        $('.prices-content').hide();
        $(`.prices-content[data-content="${content}"]`).show();
    });

    $(document).on('focus','.application-form-label input[type="text"], .application-form-label input[type="email"], .application-form-label textarea', function(){
        $(this).parent('.application-form-label').addClass('is-active');
    } );

    $(document).on('blur','.application-form-label input[type="text"], .application-form-label input[type="email"], .application-form-label textarea', function(){
        if($(this).val() == ""){
            $(this).parent('.application-form-label').removeClass('is-active');
        }
    } );

    $(document).on('change','.application-form-label input[type="file"]', function(){
        var file = $(this)[0].files[0]
            if (file){
            $(this).parent('.application-form-label').addClass('is-active');
              $('.application-form-file-name').text(file.name);
            }
    });

    $(document).on('change','input[type="color"]', function(){
        const color = $(this).val()
        $(this).siblings('.task-color-value').text(color);
    });

    $('.tabs-heading-item').click(function(){
        const content = $(this).data('tabs');
        const $this = $(this);
     
            if($(window).width() > 1300){
                $this.siblings('.tabs-heading-item').removeClass('is-active');
                $this.addClass('is-active');
                $this.siblings('.tabs-content').removeClass('is-active');
                $this.siblings(`.tabs-content[data-tabs="${content}"]`).addClass('is-active');
            } else{
                if(!$(this).hasClass('is-active')){
                    $this.siblings('.tabs-heading-item').removeClass('is-active');
                    $this.addClass('is-active');
                    $this.siblings('.tabs-content').slideUp();
                    $this.siblings(`.tabs-content[data-tabs="${content}"]`).slideDown();
                } else{
                    $this.removeClass('is-active');
                    $this.siblings(`.tabs-content[data-tabs="${content}"]`).slideUp();
                }
            }
      


    });

    $('.tabs-scroll').mCustomScrollbar({
        axis:"y",
    });

   $('.contacts-form-btn').click(function(e){
       e.preventDefault();
       $(this).toggleClass('is-active');
       $('.contacts-form').toggleClass('is-active');
   });

   $('.header-mobile-burger').click(function(e){
       e.preventDefault();
       $(this).toggleClass('is-active');
       $('.header-mobile-wrapper').toggleClass('is-active');

   });

   $('.calc-result-btn').click(function(e){
       e.preventDefault();
       $(this).hide();
       $('.calc-row-result').addClass('is-active');
   });

   $('.prices-mobile-heading').click(function(e){
       e.preventDefault();
       const $this = $(this);

       if(!$(this).hasClass('is-active')){
        $('.prices-mobile-heading').removeClass('is-active');
        $('.prices-mobile-content').slideUp();
        
        $this.addClass('is-active');
        $this.siblings('.prices-mobile-content').slideDown();
       } else{
        $this.removeClass('is-active');
        $this.siblings('.prices-mobile-content').slideUp();
       }
   });

   $('.mounting-title').click(function(e){
       e.preventDefault()
       if($(window).width() < 1301){
           if(!$(this).hasClass('is-active')){
            $('.mounting-title').removeClass('is-active');
            $('.mounting-content').slideUp();
            $(this).addClass('is-active');
            $(this).siblings('.mounting-content').slideDown();
           } else{
            $(this).removeClass('is-active');
            $(this).siblings('.mounting-content').slideUp();
           }
       }
   });


   $('.shades-catalog').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    if($(window).width() > 580){
        const current = nextSlide + 1;
        const currentPoints =  Math.ceil(current / 4)
        $('.shades-pag span:first-child').html(current < 10 ? '0' + currentPoints : currentPoints);
        console.log(currentSlide)
    } else{
        const current = nextSlide + 1;
        const currentPoints =  Math.ceil(current / 2)
        $('.shades-pag span:first-child').html(current < 10 ? '0' + currentPoints : currentPoints);
    }
});
});



function getPolixSettings(){
    return {
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        appendArrows: $('.polix-tools'),
        responsive: [
            {
              breakpoint: 580,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    }
}


$('.polix-catalog').slick(getPolixSettings());

function polixCatalogInit(){
    const $window = $(window)
    if($window.width() < 1301){
        $(".polix-catalog").not('.slick-initialized').slick(getPolixSettings())
        $('.polix-catalog').slick('setPosition');
        if($window.width() > 580){
            let polixAllSliders = $('.polix-item').length;
            let polixAllSlidersPoints = Math.ceil(polixAllSliders / 2);
            $('.polix-pag span:last-child').html(polixAllSlidersPoints < 10 ? '0' + polixAllSlidersPoints : polixAllSlidersPoints);
        } else{
            let polixAllSliders = $('.polix-item').length;
            $('.polix-pag span:last-child').html(polixAllSliders < 10 ? '0' + polixAllSliders : polixAllSliders);
        }
    } else{
        $(".polix-catalog").slick('unslick')
    };

};


$('.prices-mobile-tabs .calc-select-content li span').click(function(e){
    e.preventDefault()
    const id = $(this).data('content');
    $('.prices-content').hide();
    $(`.prices-content[data-content="${id}"]`).show();
});


$('.application-link').click(function(e){
    e.preventDefault();
    $('.application-text-col').addClass('is-active');
});

$('.appointment-more').click(function(e){
    e.preventDefault();
    $(this).hide();
    $('.appointment-section .appointment-block').css({display:'flex'})
})





$('.polix-catalog').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    if($(window).width() > 580){
        const current = nextSlide + 1;
        const currentPoints =  Math.ceil(current / 2)
        $('.polix-pag span:first-child').html(current < 10 ? '0' + currentPoints : currentPoints);
    } else{
        const current = nextSlide + 1;
        $('.polix-pag span:first-child').html(current < 10 ? '0' + current : current);
    }
});



function getHwSettings(){
    return {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendArrows: $('.how-work-tools'),
    }
  }


$('.how-work-catalog').slick(getHwSettings());
function hwCatalogInit(){
    if($(window).width() < 581){
        $(".how-work-catalog").not('.slick-initialized').slick(getHwSettings())
        $('.how-work-catalog').slick('setPosition');
        const hwAllSliders = $('.how-work-item').length;
        $('.how-work-pag span:last-child').html(hwAllSliders < 10 ? '0' + hwAllSliders : hwAllSliders);
    } else{
        $(".how-work-catalog").slick('unslick')
    }
};



$('.how-work-catalog').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    const current = nextSlide + 1;
    $('.how-work-pag span:first-child').html(current < 10 ? '0' + current : current);
});

function reviewsPagInit(){
    if($(window).width() > 580){
        let polixAllSliders = $('.reviews-item').length;
        let polixAllSlidersPoints = Math.ceil(polixAllSliders / 2);
        $('.reviews-pag span:last-child').html(polixAllSlidersPoints < 10 ? '0' + polixAllSlidersPoints : polixAllSlidersPoints);
    } else{
        let polixAllSliders = $('.reviews-item').length;
        $('.reviews-pag span:last-child').html(polixAllSliders < 10 ? '0' + polixAllSliders : polixAllSliders);
    }
}

function shadesPagInit(){
    if($(window).width() > 580){
        let polixAllSliders = $('.shades-item').length;
        let polixAllSlidersPoints = Math.ceil(polixAllSliders / 8);
        $('.shades-pag span:last-child').html(polixAllSlidersPoints < 10 ? '0' + polixAllSlidersPoints : polixAllSlidersPoints);
    } else{
        let polixAllSliders = $('.shades-item').length;
        let polixAllSlidersPoints = Math.ceil(polixAllSliders / 6);
        $('.shades-pag span:last-child').html(polixAllSlidersPoints < 10 ? '0' + polixAllSlidersPoints : polixAllSlidersPoints);
    }
}



function advantagesPagInit(){
    if($(window).width() > 580){
        let polixAllSliders = $('.advantages-item').length;
        let polixAllSlidersPoints = Math.ceil(polixAllSliders / 2);
        $('.advantages-pag span:last-child').html(polixAllSlidersPoints < 10 ? '0' + polixAllSlidersPoints : polixAllSlidersPoints);
    } else{
        let polixAllSliders = $('.advantages-item').length;
        $('.advantages-pag span:last-child').html(polixAllSliders < 10 ? '0' + polixAllSliders : polixAllSliders);
    }
}

reviewsPagInit();
polixCatalogInit();
hwCatalogInit();
advantagesPagInit();
shadesPagInit();

$(window).resize(function(){
    polixCatalogInit();
    hwCatalogInit();
    reviewsPagInit();
    advantagesPagInit();
    shadesPagInit();
});