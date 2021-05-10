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
      autoHeight:true,
        pagination: {
            el: '.paginate',
            clickable: true
        },
      breakpoints: {
          768: {
              autoHeight: false
          },
      },
  });

  const burger = $('.burger');
  const asideMenu = $('.aside-menu');

  burger.on('click', function() {
    $(this).toggleClass('is-active');
    asideMenu.toggleClass('aside-menu--open');
  });

  $(document).click( function(e){
    if ( !($(e.target).closest('.aside-menu').length || ($(e.target).hasClass('burger') || $(e.target).closest('.burger').length)) ) {
      burger.removeClass('is-active');
      asideMenu.removeClass('aside-menu--open');
    }
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
  const dropdownLinks = $('.aside-menu__link-dropdown');

  dropdownLinks.on('click', function(evt) {
    evt.preventDefault();
    $(this).parent().parent().siblings().find('.aside-menu__link-dropdown').removeClass('active').parent().next().slideUp();
    
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').parent().next().slideUp();
    } else {
      $(this).addClass('active').parent().next().slideDown();
    }
  });

  const catalogAccordionItems = $('.catalog-accordion__item-head');
  const modifierClass = 'catalog-accordion__item--active';
  //const contentClass = '.catalog-accordion__item-content';

  catalogAccordionItems.on('click', function() {
    let btn = $(this);
    let parent = btn.parent();

    parent.find('.catalog-accordion__item-content').slideUp();
    

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

$(document).on('click','.share-btn',function (){
   event.preventDefault();
   $('.share-tip').toggleClass('active');
});



(function() {
    if ($('#nCanvasRender').length > 0 && $(window).width() > 1250){
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
                iProjSphereX = w / 1.45;
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





var hoverEffect = function(opts) {
    var vertex = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;

    var fragment = `
        varying vec2 vUv;

        uniform sampler2D texture;
        uniform sampler2D texture2;
        uniform sampler2D disp;

        // uniform float time;
        // uniform float _rot;
        uniform float dispFactor;
        uniform float effectFactor;

        // vec2 rotate(vec2 v, float a) {
        //  float s = sin(a);
        //  float c = cos(a);
        //  mat2 m = mat2(c, -s, s, c);
        //  return m * v;
        // }

        void main() {

            vec2 uv = vUv;

            // uv -= 0.5;
            // vec2 rotUV = rotate(uv, _rot);
            // uv += 0.5;

            vec4 disp = texture2D(disp, uv);

            vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
            vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);

            vec4 _texture = texture2D(texture, distortedPosition);
            vec4 _texture2 = texture2D(texture2, distortedPosition2);

            vec4 finalTexture = mix(_texture, _texture2, dispFactor);

            gl_FragColor = finalTexture;
            // gl_FragColor = disp;
        }
    `;

    var parent = opts.parent || console.warn("no parent");
    var dispImage = opts.displacementImage || console.warn("displacement image missing");
    var image1 = opts.image1 || console.warn("first image missing");
    var image2 = opts.image2 || console.warn("second image missing");
    var intensity = opts.intensity || 1;
    var speedIn = opts.speedIn || 1.6;
    var speedOut = opts.speedOut || 1.2;
    var userHover = (opts.hover === undefined) ? true : opts.hover;
    var easing = opts.easing || Expo.easeOut;

    var mobileAndTabletcheck = function() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(
        parent.offsetWidth / -2,
        parent.offsetWidth / 2,
        parent.offsetHeight / 2,
        parent.offsetHeight / -2,
        1,
        1000
    );

    camera.position.z = 1;

    var renderer = new THREE.WebGLRenderer({
        antialias: false,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0.0);
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    parent.appendChild(renderer.domElement);


    var loader = new THREE.TextureLoader();
    loader.crossOrigin = "";
    var texture1 = loader.load(image1);
    var texture2 = loader.load(image2);

    var disp = loader.load(dispImage);

    disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

    texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
    texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

    texture1.anisotropy = renderer.getMaxAnisotropy();
    texture2.anisotropy = renderer.getMaxAnisotropy();

    var mat = new THREE.ShaderMaterial({
        uniforms: {
            effectFactor: { type: "f", value: intensity },
            dispFactor: { type: "f", value: 0.0 },
            texture: { type: "t", value: texture1 },
            texture2: { type: "t", value: texture2 },
            disp: { type: "t", value: disp },
        },

        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0
    });

    var geometry = new THREE.PlaneBufferGeometry(
        parent.offsetWidth,
        parent.offsetHeight,
        1
    );
    var object = new THREE.Mesh(geometry, mat);
    scene.add(object);

    var addEvents = function(){
        var evtIn = "mouseenter";
        var evtOut = "mouseleave";
        if (mobileAndTabletcheck()) {
            evtIn = "touchstart";
            evtOut = "touchend";
        }
        parent.addEventListener(evtIn, function(e) {
            TweenMax.to(mat.uniforms.dispFactor, speedIn, {
                value: 1,
                ease: easing
            });
        });

        parent.addEventListener(evtOut, function(e) {
            TweenMax.to(mat.uniforms.dispFactor, speedOut, {
                value: 0,
                ease: easing
            });
        });
    };

    if (userHover) {
        addEvents();
    }

    window.addEventListener("resize", function(e) {
        renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    });


    this.next = function(){
        TweenMax.to(mat.uniforms.dispFactor, speedIn, {
            value: 1,
            ease: easing
        });
    }

    this.previous = function(){
        TweenMax.to(mat.uniforms.dispFactor, speedOut, {
            value: 0,
            ease: easing
        });
    };

    var animate = function() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();
};


imagesLoaded( document.querySelectorAll('img'), () => {
    document.body.classList.remove('loading');
});

$(window).on('load', function() {
    if ($(window).width() > 1250) {
        Array.from(document.querySelectorAll('.dir-card__image')).forEach((el) => {
            const imgs = Array.from(el.querySelectorAll('img'));
            new hoverEffect({
                parent: el,
                intensity: el.dataset.intensity || undefined,
                speedIn: el.dataset.speedin || undefined,
                speedOut: el.dataset.speedout || undefined,
                easing: el.dataset.easing || undefined,
                hover: el.dataset.hover || undefined,
                image1: imgs[0].getAttribute('src'),
                image2: imgs[1].getAttribute('src'),
                displacementImage: el.dataset.displacement
            });
        });
    }
});
