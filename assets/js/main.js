(function ($) {
	"use strict";

	$(window).on('load', function () {
		preloader();
		wowAnimation();
		splitText();
	});

	/*------------------------------------------
	= preloader
	-------------------------------------------*/
	function preloader() {
		$('#xb-loadding').fadeOut('slow', function () { $(this).remove(); });
	}


	/*------------------------------------------
	= back to top
	-------------------------------------------*/
	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('.xb-backtotop').addClass('active');
		} else {
			$('.xb-backtotop').removeClass('active');
		}
	});
	$(function () {
		$(".scroll").on('click', function () {
			$("html,body").animate({ scrollTop: 0 }, "slow");
			return false
		});
	});

	/*------------------------------------------
	= sticky header
	-------------------------------------------*/
	function stickyHeader() {
		var scrollDirection = "";
		var lastScrollPosition = 0;

		// Clone and make header sticky if the element with class 'xb-header' exists
		if ($('.xb-header').length) {
			$('.xb-header').addClass('original').clone(true).insertAfter('.xb-header').addClass('xb-header-area-sticky xb-sticky-stt').removeClass('original');
		}

		// Handle scroll events
		$(window).on("scroll", function () {
			var currentScrollPosition = $(window).scrollTop();

			// Determine scroll direction
			scrollDirection = currentScrollPosition < lastScrollPosition ? "up" : "down";
			lastScrollPosition = currentScrollPosition;

			// Check if element with ID 'xb-header-area' has class 'is-sticky'
			if ($("#xb-header-area").hasClass("is-sticky")) {
				// Add or remove classes based on scroll position for sticky header and mobile header
				if (lastScrollPosition > 100) {
					$(".xb-header-area-sticky.xb-sticky-stb").addClass("xb-header-fixed");
				} else {
					$(".xb-header-area-sticky.xb-sticky-stb").removeClass("xb-header-fixed");
				}

				// Add or remove classes for sticky header based on scroll direction
				if (scrollDirection === "up" && lastScrollPosition > 100) {
					$(".xb-header-area-sticky.xb-sticky-stt").addClass("xb-header-fixed");
				} else {
					$(".xb-header-area-sticky.xb-sticky-stt").removeClass("xb-header-fixed");
				}
			}
		});
	}
	stickyHeader();

	/**
	 * Progress bar Active
	 */
	if ($(".progress-bar").length) {
		var $progress_bar = $('.progress-bar');
		$progress_bar.appear();
		$(document.body).on('appear', '.progress-bar', function() {
			var current_item = $(this);
			if (!current_item.hasClass('appeared')) {
				var percent = current_item.data('percent');
				current_item.css('width', percent + '%').addClass('appeared').parent().append('<span>' + percent + '%' + '</span>');
			}
			
		});
	};
	

	  /**
   * Ukiyo.js
   */
	  const parallax = new Ukiyo('.ukiyo', {
		externalRAF: true,
		scale: 1.2,
	  });
	
	  /**
	   * smooth scroll
	   */
	  const lenis = new Lenis({
		duration: .8,
		smoothWheel: true,
	  });
	
	  /**
	   * animate
	   */
	  function raf(time) {
		parallax.animate();
	
		lenis.raf(time);
		requestAnimationFrame(raf);
	  }
	  requestAnimationFrame(raf);


	/*------------------------------------------
	= header search
	-------------------------------------------*/
	$(".header-search-btn").on("click", function (e) {
		e.preventDefault();
		$(".header-search-form-wrapper").addClass("open");
		$('.header-search-form-wrapper input[type="search"]').focus();
		$('.body-overlay').addClass('active');
	});
	$(".xb-search-close").on("click", function (e) {
		e.preventDefault();
		$(".header-search-form-wrapper").removeClass("open");
		$("body").removeClass("active");
		$('.body-overlay').removeClass('active');
	});

	/*------------------------------------------
	= sidebar
	-------------------------------------------*/
	$('.sidebar-menu-close, .body-overlay').on('click', function () {
		$('.offcanvas-sidebar').removeClass('active');
		$('.body-overlay').removeClass('active');
	});

	$('.offcanvas-sidebar-btn').on('click', function () {
		$('.offcanvas-sidebar').addClass('active');
		$('.body-overlay').addClass('active');
	});
	$('.body-overlay').on('click', function () {
		$(this).removeClass('active');
		$(".header-search-form-wrapper").removeClass("open");
	});

	/*------------------------------------------
	= mobile menu
	-------------------------------------------*/
	$('.xb-nav-hidden li.menu-item-has-children > a').append('<span class="xb-menu-toggle"></span>');
	$('.xb-header-menu li.menu-item-has-children, .xb-menu-primary li.menu-item-has-children').append('<span class="xb-menu-toggle"></span>');
	$('.xb-menu-toggle').on('click', function () {
		if (!$(this).hasClass('active')) {
			$(this).closest('ul').find('.xb-menu-toggle.active').toggleClass('active');
			$(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
		}
		$(this).toggleClass('active');
		$(this).closest('.menu-item').find('> .sub-menu').toggleClass('active');
		$(this).closest('.menu-item').find('> .sub-menu').slideToggle();
	});

	$('.xb-nav-hidden li.menu-item-has-children > a').click(function (e) {
		var target = $(e.target);
		if ($(this).attr('href') === '#' && !(target.is('.xb-menu-toggle'))) {
			e.stopPropagation();
			if (!$(this).find('.xb-menu-toggle').hasClass('active')) {
				$(this).closest('ul').find('.xb-menu-toggle.active').toggleClass('active');
				$(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
			}
			$(this).find('.xb-menu-toggle').toggleClass('active');
			$(this).closest('.menu-item').find('> .sub-menu').toggleClass('active');
			$(this).closest('.menu-item').find('> .sub-menu').slideToggle();
		}
	});
	$(".xb-nav-mobile").on('click', function () {
		$(this).toggleClass('active');
		$('.xb-header-menu').toggleClass('active');
	});

	$(".xb-menu-close, .xb-header-menu-backdrop").on('click', function () {
		$(this).removeClass('active');
		$('.xb-header-menu').removeClass('active');
	});

	
/*------------------------------------------
	= dm-brand slider
	-------------------------------------------*/
	var slider = new Swiper('.dm-brand-slider', {
		spaceBetween: 100,
		slidesPerView: 6,
		roundLengths: true,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 4000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 6,
			},
			'1200': {
				slidesPerView: 6,
			},
			'992': {
				slidesPerView: 5,
			},
			'768': {
				slidesPerView: 4,
				spaceBetween: 50,
			},
			'576': {
				slidesPerView: 3,
				spaceBetween: 40,
			},
			'0': {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	});

	/*------------------------------------------
	= dm-service slider
	-------------------------------------------*/
	var slider = new Swiper('.dm-service-slider', {
		spaceBetween: 0,
		slidesPerView: 4,
		roundLengths: true,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 5000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= dm-team-slider
	-------------------------------------------*/
	var slider = new Swiper(".dm-team-slider", {
		loop: true,
		spaceBetween: 30,
		speed: 400,
		slidesPerView: 5,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		breakpoints: {
			'1600': {
				slidesPerView: 5,
			},
			'768': {
				slidesPerView: 4,
			},
			'576': {
				slidesPerView: 3,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	

	/*------------------------------------------
	= dm-testimonial slider
	-------------------------------------------*/
	var slider = new Swiper('.dm-testimonial-slider', {
		spaceBetween: 30,
		slidesPerView: 3,
		roundLengths: true,
		loop: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		  },
		autoplay: {
			enabled: true,
			delay: 4000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= dm-instragram slider
	-------------------------------------------*/
	var slider = new Swiper('.instragram-slider', {
		spaceBetween: 0,
		slidesPerView: 6,
		roundLengths: true,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 4000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 6,
			},
			'1200': {
				slidesPerView: 6,
			},
			'992': {
				slidesPerView: 5,
			},
			'768': {
				slidesPerView: 4,
			},
			'576': {
				slidesPerView: 3,
			},
			'0': {
				slidesPerView: 2,
			},
		},
	});
	
	/*------------------------------------------
	= ds-testimonial-slider
	-------------------------------------------*/
	var slider = new Swiper('.ds-testimonial-slider', {
		spaceBetween: 30,
		slidesPerView: 4,
		roundLengths: true,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 4000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= ds-brand-slider
	-------------------------------------------*/
	var slider = new Swiper('.ds-brand-slider', {
		spaceBetween: 89,
		slidesPerView: 5,
		roundLengths: true,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 4000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 5,
			},
			'1200': {
				slidesPerView: 5,
			},
			'992': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 4,
			},
			'576': {
				slidesPerView: 3,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	/*------------------------------------------
	= ds-brand-slider
	-------------------------------------------*/
	var slider = new Swiper('.dm-portfolio-slider', {
		spaceBetween: 30,
		slidesPerView: 2,
		roundLengths: true,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 4000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 2,
			},
			'1200': {
				slidesPerView: 2,
			},
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});


/*----------------------------------------------------*/
/*	HEADER
/*----------------------------------------------------*/
function header() {
	var headerAnimation = gsap.timeline({ yoyo: false, reversed: true });
	headerAnimation.pause();

	headerAnimation.from($('.overlay-menu'), { autoAlpha: 0 });
	headerAnimation.from($('.overlay-menu .left-area'), { y: '100vh' }, 0.1);
	headerAnimation.from($('.overlay-menu .right-area'), { y: '-100vh' }, 0.1);
	headerAnimation.from($('.overlay-menu .right-area ul'), { autoAlpha: 0, stagger: 0.1 }, 0.5);
	headerAnimation.from($('.overlay-menu nav li:not(.overlay-menu nav ul li ul li)'), { stagger: 0.1, y: 30, autoAlpha: 0, ease: "Expo.easeInOut" }, 0.5);
	headerAnimation.from($('.overlay-menu nav li:not(.overlay-menu nav ul li ul li)'), { 'clearProps': 'all', delay: 1.3, ease: "Expo.easeInOut" }, 0.5);

	$('header .burger-menu, .overlay-menu .close').on('click', function () {
		headerAnimation.reversed() ? headerAnimation.play() : headerAnimation.reverse();
		$('.overlay-menu').toggleClass('active');
	});

	$('.overlay-menu .menu-item-has-children').each(function () {
		$(this).find('> a').attr('href', 'javascript:void(0);');
		$(this).children('ul').append('<li><a class="back" href="javascript:void(0);">back <i class="ri-corner-down-left-line"></i></a></li>');
	});

	$('.overlay-menu .menu-item-has-children > a').each(function () {
		var overlay_animation = gsap.timeline({ yoyo: false, reversed: true });

		overlay_animation.pause();
		overlay_animation.to($(this).closest('ul').children('li').children('a'), { stagger: 0.1, autoAlpha: 0, y: -50, 'pointer-events': 'none', ease: Power3.easeOut });
		overlay_animation.to($(this).next('ul'), { 'z-index': '10', 'pointer-events': 'all' }),
			overlay_animation.from($(this).next('ul').children('li').children('a'), { stagger: 0.1, autoAlpha: 0, y: 30, ease: Power3.easeOut });

		this.animation = overlay_animation;

		$(".overlay-menu .back, .overlay-menu .close").on('click', function () {
			overlay_animation.reverse();
		});
	});

	$(".overlay-menu .menu-item-has-children > a").on('click', function () {
		this.animation.reversed() ? this.animation.play() : this.animation.reverse();
	});

	if ($('#fixed').length) {
		scrollbar.addListener(({ offset }) => {
			fixed.style.top = offset.y + ($(window).height() - 90) + 'px';
		});
	}
}

header();
  
	
	/*------------------------------------------
	= data background and bg color
	-------------------------------------------*/
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ") ")
	})
	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));

	});

	/*------------------------------------------
	= aos animation
	-------------------------------------------*/
	function wowAnimation() {
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true
		});
		wow.init();
	}

	/*------------------------------------------
	= counter
	-------------------------------------------*/
	if ($(".xbo").length) {
		$('.xbo').appear();
		$(document.body).on('appear', '.xbo', function (e) {
			var odo = $(".xbo");
			odo.each(function () {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});
			window.xboOptions = {
				format: 'd',
			};
		});
	}

	if ($(".xbo_trigger").length) {
		var odo = $(".xbo_trigger");
		odo.each(function () {
			var countNumber = $(this).attr("data-count");
			var odometerInstance = new Odometer({
				el: this,
				value: 0,
				format: 'd',
			});
			odometerInstance.render();
			odometerInstance.update(countNumber);
		});

		$('.xbo_trigger').appear();
		$(document.body).on('appear', '.xboh', function (e) {
			// This event handler can be empty or used for additional functionality if needed
		});
	}

	/*------------------------------------------
	= isotop
	-------------------------------------------*/
	$('.grid').imagesLoaded(function () {
		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: '.grid-item',
			}
		});

		// filter items on button click
		$('.portfolio-menu').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});
	});

	//for menu active class
	$('.portfolio-menu button').on('click', function (event) {
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		event.preventDefault();
	});

	/*------------------------------------------
	= team slider
	-------------------------------------------*/
	var slider = new Swiper(".team-slider", {
		loop: true,
		spaceBetween: 125,
		speed: 400,
		slidesPerView: 5,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		breakpoints: {
			'1600': {
				slidesPerView: 5,
			},
			'1200': {
				slidesPerView: 4,
				spaceBetween: 50,
			},
			'992': {
				slidesPerView: 4,
				spaceBetween: 40,
			},
			'768': {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			'576': {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= team slider
	-------------------------------------------*/
	var slider = new Swiper(".team-slider-two", {
		loop: true,
		spaceBetween: 30,
		speed: 400,
		slidesPerView: 2,
		direction: "vertical",
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		autoplay: {
			enabled: true,
			delay: 6000
		},
		breakpoints: {
			'1600': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 3,
			},
			'0': {
				slidesPerView: 2,
			},
		},
	});
	

	/*------------------------------------------
	= brand slider
	-------------------------------------------*/
	var slider = new Swiper('.brand-slider', {
		slidesPerView: 6,
		roundLengths: true,
		loop: true,
		loopAdditionalSlides: 30,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 6,
			},
			'1200': {
				slidesPerView: 6,
			},
			'992': {
				slidesPerView: 5,
			},
			'768': {
				slidesPerView: 4,
			},
			'576': {
				slidesPerView: 3,
			},
			'0': {
				slidesPerView: 2,
			},
		},
	});


	/*------------------------------------------
	= service slider
	-------------------------------------------*/
	var slider = new Swiper('.service-slider', {
		spaceBetween: 0,
		slidesPerView: 4,
		roundLengths: true,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
		
	/*------------------------------------------
	= service details slider
	-------------------------------------------*/
	var slider = new Swiper('.service-gallery-slider', {
		spaceBetween: 30,
		slidesPerView: 5,
		roundLengths: true,
		loop: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		autoplay: {
			enabled: true,
			delay: 6000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 5,
			},
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	
	/*------------------------------------------
	= award slider
	-------------------------------------------*/
	var slider = new Swiper('.award-slider', {
		spaceBetween: 30,
		slidesPerView: 4,
		roundLengths: true,
		loop: true,
		navigation: {
			nextEl: '.xb-swiper-arrow-next',
			prevEl: '.xb-swiper-arrow-prev',
		},
		autoplay: {
			enabled: true,
			delay: 4000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});
	
	/*------------------------------------------
	= award slider
	-------------------------------------------*/
	var slider = new Swiper('.portfolio-slider', {
		spaceBetween: 30,
		slidesPerView: 2,
		roundLengths: true,
		loop: true,
		autoplay: {
			enabled: true,
			delay: 4000
		},
		speed: 400,
		breakpoints: {
			'1600': {
				slidesPerView: 2,
			},
			'1200': {
				slidesPerView: 2,
			},
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
	});

	/*------------------------------------------
	= testimonial slider
	-------------------------------------------*/
	var slider = new Swiper('.testimonial-slider', {
		spaceBetween: 0,
		slidesPerView: 1,
		roundLengths: true,
		loop: true,
		centeredSlides: true,
		effect: 'fade',
		loopAdditionalSlides: 30,
		autoplay: {
			enabled: true,
			delay: 6000
		},
		navigation: {
			nextEl: '.xb-swiper-arrow-next',
			prevEl: '.xb-swiper-arrow-prev',
		},
		speed: 400,
	});

	/*------------------------------------------
	= inhover active
	-------------------------------------------*/
	$(".xb-mouseenter").on('mouseenter', function () {
		$(".xb-mouseenter").removeClass("active");
		$(this).addClass("active");
	});
	$(".xb-mouseenter2").on('mouseenter', function () {
		$(".xb-mouseenter2").removeClass("active");
		$(this).addClass("active");
	});

	/*------------------------------------------
	= magnificPopup
	-------------------------------------------*/
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	$('.popup-video').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-zoom-in',
	});

	/*------------------------------------------
	= Accordion Box
	-------------------------------------------*/
	if ($(".accordion_box").length) {
		$(".accordion_box").on("click", ".acc-btn", function () {
			var outerBox = $(this).parents(".accordion_box");
			var target = $(this).parents(".accordion");

			if ($(this).next(".acc_body").is(":visible")) {
				$(this).removeClass("active");
				$(this).next(".acc_body").slideUp(300);
				$(outerBox).children(".accordion").removeClass("active-block");
			} else {
				$(outerBox).find(".accordion .acc-btn").removeClass("active");
				$(this).addClass("active");
				$(outerBox).children(".accordion").removeClass("active-block");
				$(outerBox).find(".accordion").children(".acc_body").slideUp(300);
				target.addClass("active-block");
				$(this).next(".acc_body").slideDown(300);
			}
		});
	}

	/*------------------------------------------
	= marquee
	-------------------------------------------*/
	$('.marquee-left').marquee({
		speed: 50,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		pauseOnHover: false,
		startVisible: true,
	});
	$('.marquee-right').marquee({
		speed: 50,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'right',
		duplicated: true,
		pauseOnHover: false,
		startVisible: true,
	});

	
	/*------------------------------------------
	= split text
	-------------------------------------------*/
	function splitText() {
		var st = $(".xb-split-text");
        if(st.length == 0) return;
        gsap.registerPlugin(SplitText);
        st.each(function(index, el) {
            el.split = new SplitText(el, { 
                type: "lines,words,chars",
                linesClass: "split-line"
            });
            gsap.set(el, { perspective: 100 });

            if( $(el).hasClass('split-in-fade') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    ease: "Back.easeOut",
                });
            }
            if( $(el).hasClass('split-in-right') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    x: "70",
                    ease: "Back.easeOut",
                });
            }
            if( $(el).hasClass('split-in-left') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    x: "-50",
                    ease: "circ.out",
                });
            }
            if( $(el).hasClass('split-in-up') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    y: "80",
                    ease: "circ.out",
                });
            }
            if( $(el).hasClass('split-in-down') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    y: "-80",
                    ease: "circ.out",
                });
            }
            if( $(el).hasClass('split-in-rotate') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    rotateX: "50deg",
                    ease: "circ.out",
                });
            }
            if( $(el).hasClass('split-in-scale') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    scale: "0.5",
                    ease: "circ.out",
                });
            }
            el.anim = gsap.to(el.split.chars, {
                scrollTrigger: {
                    trigger: el,
                    // toggleActions: "restart pause resume reverse",
                    start: "top 100%",
                },
                x: "0",
                y: "0",
                rotateX: "0",
                scale: 1,
                opacity: 1,
                duration: 0.4, 
                stagger: 0.06,
            });
        });
	}

	/*----------------------------
	= SHOP PRICE SLIDER
	------------------------------ */
	if ($("#slider-range").length) {
		$("#slider-range").slider({
			range: true,
			min: 12,
			max: 200,
			values: [0, 100],
			slide: function (event, ui) {
				$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			}
		});

		$("#amount").val("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));
	}
	
	/*------------------------------------------
	= TOUCHSPIN FOR PRODUCT SINGLE PAGE
	-------------------------------------------*/
	if ($("input.product-count").length) {
		$("input.product-count").TouchSpin({
			min: 1,
			max: 1000,
			step: 1,
			buttondown_class: "btn btn-link",
			buttonup_class: "btn btn-link",
		});
	}

	/*------------------------------------------
	= woocommerce
	-------------------------------------------*/
	if ($(".checkout-section").length) {
		var showLogInBtn = $(".woocommerce-info > a");
		var showCouponBtn = $(".showcoupon");
		var shipDifferentAddressBtn = $("#ship-to-different-address");
		var loginForm = $("form.login");
		var couponForm = $(".checkout_coupon");
		var shippingAddress = $(".shipping_address");

		loginForm.hide();
		couponForm.hide();
		shippingAddress.hide();

		showLogInBtn.on("click", function (event) {
			event.preventDefault();
			loginForm.slideToggle();
			event.stopPropagation();
		});

		showCouponBtn.on("click", function (event2) {
			event2.preventDefault();
			couponForm.slideToggle();
			event2.stopPropagation();
		})

		shipDifferentAddressBtn.on("click", function (event3) {
			shippingAddress.slideToggle();
			event3.stopPropagation();
		})
	}

	// element parallax
	$('.xb-element-parallax').each(function () {
        var $this = $(this);
        var dampingFactor = 0.2;

        function handleMouseMove(e) {
            var offset = $this.offset();
            var mouseX = e.pageX - offset.left;
            var mouseY = e.pageY - offset.top;
            var translateX = (mouseX - $this.width() / 2) * dampingFactor;
            var translateY = (mouseY - $this.height() / 2) * dampingFactor;

            var translateTransform = 'translate(' + translateX + 'px, ' + translateY + 'px)';
            $this.css({
                'transform': translateTransform,
                'transition': 'transform 0.1s ease-out'  // Adjust the duration and easing as needed
            });
        }

        function resetTransform() {
            $this.css({
                'transform': 'none',
                'transition': 'transform 0.3s ease-out'  // Adjust the duration and easing as needed
            });
        }

        if ($this.closest('.xb-parent-element-parallax').length) {
            var pare2 = $this.closest('.xb-parent-element-parallax');
            pare2.mousemove(function (e) {
                handleMouseMove(e);
            });
            pare2.mouseleave(resetTransform);
        } else {
            $this.mousemove(handleMouseMove);
            $this.mouseleave(resetTransform);
        }
    });

	// hero image
	function heroImage() {
		function createTimeline(triggerSelector, imagesSelector) {
		  const xbhTrigger = document.querySelector(triggerSelector);
		  const xbhImages = document.querySelectorAll(`${imagesSelector} .xbh-image`);
		  gsap.set(xbhImages, { display: "none", clipPath: "inset(100% 0% 0% 0%)" });
	  
		  const timeline = gsap.timeline({ paused: true });
	  
		  timeline.to(xbhImages, {
			display: "block",
			clipPath: "inset(0% 0% 0% 0%)",
			duration: 1,
			stagger: 0.1,
			ease: "power4.out",
		  });
	  
		  let isTimelinePlaying = false;
	  
		  $(xbhTrigger).hover(
			function () {
			  if (!isTimelinePlaying) {
				isTimelinePlaying = true;
				timeline.play();
			  }
			},
			function () {
			  if (isTimelinePlaying) {
				isTimelinePlaying = false;
				timeline.reverse();
			  }
			}
		  );
		}
		createTimeline('[data-xbh-trigger="creative"]', '[data-xbh-hero-images="creative"]');
		createTimeline('[data-xbh-trigger="design"]', '[data-xbh-hero-images="design"]');
		createTimeline('[data-xbh-trigger="studio"]', '[data-xbh-hero-images="studio"]');
	  }
	  heroImage();
	
	


	
	


})(jQuery);



