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




(function() {
    if ($('#nCanvasRender').length > 0){
        // Hungarian notation
        // (http://en.wikipedia.org/wiki/Hungarian_notation)
        // n - HTML-Node
        // o - object
        // s - string
        // i - integer
        // a - array
        // b - boolean
        // f - float
        // p - Particle
        // fn - function
        // ctx - 2D Context

        // General Functions
        var app, fnAddEventListener, fnRequestAnimationFrame;

        fnRequestAnimationFrame = function(fnCallback) {
            var fnAnimFrame;
            fnAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(fnCallback) {
                window.setTimeOut(fnCallback, 1000 / 60);
            };
            fnAnimFrame(fnCallback);
        };

        // Add Event Listener
        fnAddEventListener = function(o, sEvent, fn) {
            if (o.addEventListener) {
                o.addEventListener(sEvent, fn, false);
            } else {
                o['on' + sEvent] = fn;
            }
        };

        app = function() {
            var Particle, ctxRender, fAngle, fCosAngle, fMaxAX, fMaxAY, fMaxAZ, fPI, fSinAngle, fStartVX, fStartVY, fStartVZ, fVX, fnACos, fnCos, fnMax, fnMin, fnNextFrame, fnRender, fnRnd, fnRnd2, fnSetSize, fnSin, fnSwapList, gui, h, iProjSphereX, iProjSphereY, iRadiusSphere, nBody, oBuffer, oDoc, oRadGrad, oRender, oStats, w;

            // General Elements
            oDoc = document;
            nBody = oDoc.body;
            // Shortcuts
            fPI = Math.PI;
            fnMax = Math.max;
            fnMin = Math.min;
            fnRnd = Math.random;
            fnRnd2 = function() {
                return 2.0 * fnRnd() - 1.0;
            };
            fnCos = Math.cos;
            fnACos = Math.acos;
            fnSin = Math.sin;
            // Sphere Settings
            iRadiusSphere = 153;
            iProjSphereX = 0;
            iProjSphereY = 0;
            // Particle Settings
            fMaxAX = 0.1;
            fMaxAY = 0.1;
            fMaxAZ = 0.1;
            fStartVX = 0.001;
            fStartVY = 0.001;
            fStartVZ = 0.001;
            fAngle = 0.0;
            fSinAngle = 0.0;
            fCosAngle = 0.0;
            window.iFramesToRotate = 2000.0;
            window.iPerspective = 250;
            window.iNewParticlePerFrame = 10;
            window.fGrowDuration = 200.0;
            window.fWaitDuration = 50.0;
            window.fShrinkDuration = 250.0;
            window.aColor = [22, 40, 60];
            fVX = (2.0 * fPI) / window.iFramesToRotate;
            oRadGrad = null;
            ctxRender = nCanvasRender.getContext('2d');
            oRender = {
                pFirst: null
            };
            oBuffer = {
                pFirst: null
            };
            w = h = 0;

            var hero = document.getElementsByClassName("hero-section")[0];

            // gets/sets size
            fnSetSize = function() {
                nCanvasRender.width = w = hero.offsetWidth;
                nCanvasRender.height = h = hero.offsetHeight;
                iProjSphereX = w / 1.6;
                iProjSphereY = h / 1.9;
                return {
                    w: w,
                    h: h
                };
            };
            fnSetSize();

            // window.onresize
            fnAddEventListener(window, 'resize', fnSetSize);
            fnSwapList = function(p, oSrc, oDst) {
                if (p != null) {
                    // remove p from oSrc
                    if (oSrc.pFirst === p) {
                        oSrc.pFirst = p.pNext;
                        if (p.pNext != null) {
                            p.pNext.pPrev = null;
                        }
                    } else {
                        p.pPrev.pNext = p.pNext;
                        if (p.pNext != null) {
                            p.pNext.pPrev = p.pPrev;
                        }
                    }
                } else {
                    // create new p
                    p = new Particle();
                }
                p.pNext = oDst.pFirst;
                if (oDst.pFirst != null) {
                    oDst.pFirst.pPrev = p;
                }
                oDst.pFirst = p;
                p.pPrev = null;
                return p;
            };
            Particle = (function() {

                // Particle
                class Particle {
                    fnInit() {
                        this.fAngle = fnRnd() * fPI * 2;
                        this.fForce = fnACos(fnRnd2());
                        this.fAlpha = 0;
                        this.bIsDead = false;
                        this.iFramesAlive = 0;
                        this.fX = iRadiusSphere * fnSin(this.fForce) * fnCos(this.fAngle);
                        this.fY = iRadiusSphere * fnSin(this.fForce) * fnSin(this.fAngle);
                        this.fZ = iRadiusSphere * fnCos(this.fForce);
                        this.fVX = fStartVX * this.fX;
                        this.fVY = fStartVY * this.fY;
                        this.fVZ = fStartVZ * this.fZ;
                        this.fGrowDuration = window.fGrowDuration + fnRnd2() * (window.fGrowDuration / 4.0);
                        this.fWaitDuration = window.fWaitDuration + fnRnd2() * (window.fWaitDuration / 4.0);
                        this.fShrinkDuration = window.fShrinkDuration + fnRnd2() * (window.fShrinkDuration / 4.0);
                        this.fAX = 0.0;
                        this.fAY = 0.0;
                        this.fAZ = 0.0;
                    }

                    fnUpdate() {
                        if (this.iFramesAlive > this.fGrowDuration + this.fWaitDuration) {
                            this.fVX += this.fAX + fMaxAX * fnRnd2();
                            this.fVY += this.fAY + fMaxAY * fnRnd2();
                            this.fVZ += this.fAZ + fMaxAZ * fnRnd2();
                            this.fX += this.fVX;
                            this.fY += this.fVY;
                            this.fZ += this.fVZ;
                        }
                        this.fRotX = fCosAngle * this.fX + fSinAngle * this.fZ;
                        this.fRotZ = -fSinAngle * this.fX + fCosAngle * this.fZ;
                        this.fRadiusCurrent = Math.max(0.01, window.iPerspective / (window.iPerspective - this.fRotZ));
                        this.fProjX = this.fRotX * this.fRadiusCurrent + iProjSphereX;
                        this.fProjY = this.fY * this.fRadiusCurrent + iProjSphereY;
                        this.iFramesAlive += 1;
                        if (this.iFramesAlive < this.fGrowDuration) {
                            this.fAlpha = this.iFramesAlive * 1.0 / this.fGrowDuration;
                        } else if (this.iFramesAlive < this.fGrowDuration + this.fWaitDuration) {
                            this.fAlpha = 1.0;
                        } else if (this.iFramesAlive < this.fGrowDuration + this.fWaitDuration + this.fShrinkDuration) {
                            this.fAlpha = (this.fGrowDuration + this.fWaitDuration + this.fShrinkDuration - this.iFramesAlive) * 1.0 / this.fShrinkDuration;
                        } else {
                            this.bIsDead = true;
                        }
                        if (this.bIsDead === true) {
                            fnSwapList(this, oRender, oBuffer);
                        }
                        this.fAlpha *= fnMin(1.0, fnMax(0.5, this.fRotZ / iRadiusSphere));
                        this.fAlpha = fnMin(1.0, fnMax(0.0, this.fAlpha));
                    }

                };

                // Current Position
                Particle.prototype.fX = 0.0;
                Particle.prototype.fY = 0.0;
                Particle.prototype.fZ = 0.0;

                // Current Velocity
                Particle.prototype.fVX = 0.0;
                Particle.prototype.fVY = 0.0;
                Particle.prototype.fVZ = 0.0;

                // Current Acceleration
                Particle.prototype.fAX = 0.0;
                Particle.prototype.fAY = 0.0;
                Particle.prototype.fAZ = 0.0;

                // Projection Position
                Particle.prototype.fProjX = 0.0;
                Particle.prototype.fProjY = 0.0;

                // Rotation
                Particle.prototype.fRotX = 0.0;
                Particle.prototype.fRotZ = 0.0;

                // double linked list
                Particle.prototype.pPrev = null;
                Particle.prototype.pNext = null;
                Particle.prototype.fAngle = 0.0;
                Particle.prototype.fForce = 0.0;
                Particle.prototype.fGrowDuration = 0.0;
                Particle.prototype.fWaitDuration = 0.0;
                Particle.prototype.fShrinkDuration = 0.0;
                Particle.prototype.fRadiusCurrent = 0.0;
                Particle.prototype.iFramesAlive = 0;
                Particle.prototype.bIsDead = false;

                return Particle;

            }).call(this);
            fnRender = function() {
                var iCount, p;
                ctxRender.fillStyle = "#FFF";
                ctxRender.fillRect(0, 0, w, h);
                p = oRender.pFirst;
                iCount = 0;
                while (p != null) {
                    ctxRender.fillStyle = "rgba(" + window.aColor.join(',') + ',' + p.fAlpha.toFixed(4) + ")";
                    ctxRender.beginPath();
                    ctxRender.arc(p.fProjX, p.fProjY, p.fRadiusCurrent, 0, 2 * fPI, false);
                    ctxRender.closePath();
                    ctxRender.fill();
                    p = p.pNext;
                    iCount += 1;
                }
            };
            fnNextFrame = function() {
                var iAddParticle, iCount, p, pNext;
                fAngle = (fAngle + fVX) % (2.0 * fPI);
                fSinAngle = fnSin(fAngle);
                fCosAngle = fnCos(fAngle);
                iAddParticle = 0;
                iCount = 0;
                while (iAddParticle++ < window.iNewParticlePerFrame) {
                    p = fnSwapList(oBuffer.pFirst, oBuffer, oRender);
                    p.fnInit();
                }
                p = oRender.pFirst;
                while (p != null) {
                    pNext = p.pNext;
                    p.fnUpdate();
                    p = pNext;
                    iCount++;
                }
                fnRender();
                return fnRequestAnimationFrame(function() {
                    return fnNextFrame();
                });
            };
            fnNextFrame();


            if (window.innerWidth < 1000) {
                window.iNewParticlePerFrame = 5;
            }
            window.app = this;
        };

        fnAddEventListener(window, 'load', app);

    }
}).call(this);