 let $body = $('body');
 let $html = $('html');
 let $ajaxUpdate = $('.js-update'); 
 $body.append('<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>');
 
 const newBody = document.querySelector('body');

 



 const core = function () { 
	 return {
		 init: function () { 
			core.initWebPcheck();
			core.initFixedHeader(); 
			core.initDefault(); 
			core.initResize();  
			//core.initPhoneMask();     
			core.initQty(); 
			 //core.contentProtect();	
		 },
		 isTouchDevice: function() {
			 try{document.createEvent("TouchEvent");return true;}catch(e){return false;}
		 },
		 initWebPcheck: function(){
				let elem = document.createElement('canvas'); 
				if(!!(elem.getContext && elem.getContext('2d'))){
					document.documentElement.classList.add('is-webp');
					return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
				}else{
					document.documentElement.classList.add('is-no-webp'); 
					return false;
				}
		 },
		 initResize: function(){

 
				 

		 
		 },
	  
		initFixedHeader: function(){ 
			let fixed = false;
			let height = 200;
			let lastScrollTop = 0;
		    $(window).scroll(function() { 
				let st = $(this).scrollTop();

				if(st > height) { 
					if(!fixed) {
						fixed = true;
						$body.addClass('js-fixed-header');
					}
				}else{
					if(fixed){
						fixed = false;
						$body.removeClass('js-fixed-header');
					} 
				}
						 
				if(st > lastScrollTop) {
					$body.removeClass('js-scroll-top')
					$body.addClass('js-scroll-down') 
				}else{
					$body.removeClass('js-scroll-down')
					$body.addClass('js-scroll-top')	 
				}	
				lastScrollTop = st;				
			}); 
 
		 }, 
		 contentProtect: function(){
			 $body.bind('cut copy paste contextmenu dragstart', function(e){e.preventDefault();});
		 },
		 hideLoader: function(){ 
			 $ajaxUpdate.fadeTo('opacity', '1');
			 $body.removeClass('js-loader-show');
		 },
		 showLoader: function(a){       
			 var timer = a; 
			 $body.addClass('js-loader-show');
			 if(timer){setTimeout(core.hideLoader(), timer);}
			 $ajaxUpdate.fadeTo('opacity', '0.6');        
		 },
		 resetErrors : function(){ 
			$('div.is-error .input, .input.is-error').on('change keydown keyup', function(){ 
				console.log('change')
				$(this).parents('.is-error:first').removeClass('is-error');
		  }) 
			 
		 },
		 findErrors: function(){ 
			 
		 },
		 initPhoneMask: function(){
			 
		 },
		 initQty: function(){

			const uiQty = document.querySelectorAll('.js-qty');


			uiQty.forEach(item => {

				const input = item.querySelector('.qty__input');
				const btnPlus = item.querySelector('.qty__btn--plus');
				const btnMinus = item.querySelector('.qty__btn--minus');
 
				btnPlus.addEventListener('click', e => {  
					 let value = Number(input.value, 10);
					 if(value <= 0 || !$.isNumeric(value) ){
						value = 0;
					 }
					 input.value = ++value; 
					 return false; 
				});

				btnMinus.addEventListener('click', e => {  
					let value = Number(input.value, 10);
					if ( value < 1 || !$.isNumeric(value)) {
						value = 1;
					}
					input.value = --value; 
					return false; 
			   });
 
			}) 
		 },
		 getViewPort: function () {
			 var e = window, a = 'inner';
			 if (!('innerWidth' in window)) {a = 'client';e = document.documentElement || document.body;}
			 return {width: e[a + 'Width'],height: e[a + 'Height']};
		 },
		 getEmailFilter: function () {
			 return {filter: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/}
		 },
		  
		 initDefault: function(){

			$html.removeClass('no-js')	 
			
			if(core.isTouchDevice()){
				$html.addClass('is-touchdevice')
			}else{
				$html.addClass('is-no-touchdevice')
			}
			 
			 // forms keydown
			 $('*[data-allow]').on('keydown', function(e){
				 var allow = $(this).data('allow');
				 var key = e.keyCode;  
				 var base = [8,9,27] // backspace, tab, escape
				 var numbers = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105]
				 var spec = [189,187,219,221,220,186,222,191,110,111,106,109,107,192]
				 var space = 32
				 var enter = 13    
				 if(allow == 'abc'){if($.inArray(key, spec) !== -1 || $.inArray(key, numbers) !== -1){e.preventDefault();}  }
				 if(allow == 'num'){
					 if($.inArray(key, base) !== -1 || (key == 65 && e.ctrlKey === true) || (key >= 35 && key <= 40)) {return;}
					 if ((e.shiftKey || (key < 48 || key > 57)) && (key < 96 || key > 105)) {e.preventDefault();}
				 } 
			 })
 
			 // default toggle
			 $('.js-toggle').on('click', function(){
				 $(this).parent().toggleClass('is-open'); 
			 })
 
			 // default tabs 
			 $('.tabs__group').each(function(){
				var t = $(this);
				var links = t.find('>.tabs__links .item');
				var tabs = t.find('>.tabs__content > .tab__item'); 
				tabs.removeClass('is-selected').filter(':first').addClass('is-selected');
				links.filter(':first').addClass('is-selected');
				links.click(function(){ 
					var target = $(this).data('tab');
					console.log(target)
					tabs.removeClass('is-selected');
					$('.tab__item--'+target).addClass('is-selected');
					links.removeClass('is-selected').filter($(this)).addClass('is-selected');
			 
				})
			})
 
		 
			 // js link
			 $('*[data-link]').on('click', function(){location.href=$(this).data('link');})
 
			 // scroll to target
			 $('*[data-scroll]').each(function(){
				 $(this).on('click', function(){
					 var header = $('.header').outerHeight()
					 var target = $(this).attr('data-scroll'); 
					 $('html,body').animate({ scrollTop: $('.'+target).offset().top - 70 }, 300);
				 })
			 })
			 
			 // popup open
			 $('*[data-popup]').on('click', function(){ 
				 popupApp.open($(this).data('popup'));
			 }) 

			 // check forms
			 core.resetErrors();



			// UI: Accordeon
			const uiAccordeons = document.querySelectorAll('.js-accordeon');

			uiAccordeons.forEach(accordeon => {
				const items = accordeon.querySelectorAll('.js-accordeon-item');
				items.forEach(item => {  
					const itemTarget = item.querySelector('.js-accordeon-target'); 
					itemTarget.addEventListener('click', e => {  
						e.preventDefault();
						item.classList.toggle('is-open');
					});
				}) 
			})

			const uiCartDiscountBox = document.querySelector('.js-discount-box');
			const uiCartDiscountLink = document.querySelector('.js-discount-link'); 
			 
			if(uiCartDiscountLink){
				uiCartDiscountLink.addEventListener('click', e => {
					e.preventDefault();
					uiCartDiscountBox.classList.add('is-shown');
					uiCartDiscountBox.classList.add('box');
					uiCartDiscountBox.querySelector('.input').focus();
				})
			}
 
			 
		 }
	 };
 }();
 
  
 
var popupApp = function () {  
	return {
		init: function () {
			popupApp.close();
 
			$('*[data-popup]').on('click', function(e){ 
				popupApp.open($(this).data('popup'));
				return false;
			}) 
		 },
 
		clear:function(){
			$body.removeClass('js-popup-show');
			$('.popup.is-shown').removeClass('is-shown')
			$('.popup .error').removeClass('error');
		},
		close: function(a){$('.popup .js-close').on('click', function(){popupApp.clear(); });        },
		center: function (a) {
			var name = a;
			var popup = $('.popup--'+a);  
			var popupInner = popup.find('.popup__inner');
			//var wHeight = core.getViewPort().height / 2;
			//var pTopPos = $(document).scrollTop() - 20;
		//	var pHeight = popup.outerHeight() / 2;
			//pHeight = Math.round(pHeight);
			//var pMarginTop = pTopPos + (wHeight - pHeight);
			//popup.removeAttr('style'); 
			if(popupInner.outerHeight() > core.getViewPort().height){
				popup.addClass('is-align-top');
			}else{
				popup.removeClass('is-align-top');
			}
      
			$body.addClass('js-popup-show');
			popup.addClass('is-shown').find('input[type=text]').first().focus(); 
		}, 
		open: function(a,b) {
			var state = b;
			if($body.hasClass('js-popup-show')){popupApp.clear();} 
			popupApp.center(a);
		}  
	};
}();



var menuApp = function () {  
	return {
		init: function () {

			$('.js-toggle-mobile-nav').on('click', function(e){
				e.preventDefault(); 
				if($body.hasClass('js-show-mainmenu')){
					$body.removeClass('js-show-mainmenu');
					$body.removeClass('is-menu-show-1');
					$body.removeClass('is-menu-show-3').removeClass('is-menu-show-2');
					/*
					if(viewportWidth < 1200){
						$('.js-main-menu .nav__item.is-shown').removeClass('is-shown')
					} 
					*/
				}else{
					$body.removeClass('js-show-search')
					$body.addClass('js-show-mainmenu');
					$body.addClass('is-menu-show-1');
				}
				  
			});
	
	
			$('.js-main-menu .js-back').on('click', function(e){
				let $this = $(this);
				$this.parents('.subnav__goods:first').removeClass('is-open');
				$body.removeClass('is-menu-show-3');
			})

			
 
			
		}, 
		reset: function(){
			$body.removeClass('js-show-mainmenu');
			$body.removeClass('is-menu-show-1').removeClass('is-menu-show-2').removeClass('is-menu-show-3');
			$('.js-main-menu .nav__item.is-dd').removeClass('is-shown')
		}, 
		hoverIntent: function(){
			let item = $('.js-main-menu .nav__item.is-dd');
			item.unbind('mouseenter mouseleave')
			if(core.isTouchDevice() == false && core.getViewPort().width > 1199){
				let timer;
				let delay = 160;
				item.hover(function(e) {
					let $this = $(this);
					timer = setTimeout(function(){
						$body.addClass('js-menu-hover');
						$this.addClass('is-hover');
					}, delay);
				}, function() { 
					let $this = $(this);
					clearTimeout(timer);
					$body.removeClass('js-menu-hover');
					$this.removeClass('is-hover');
				});
			}
		},
		default: function(){

			menuApp.reset();
			

			const viewportWidth = core.getViewPort().width;
			const isTouch = core.isTouchDevice();

			$('.js-main-menu .nav__item.is-dd > .nav__link, .js-main-menu .subnav__group .subnav__link').off();
			 
			menuApp.hoverIntent(); 
 
			function showSubnav(_id){ 
				$('.subnav__goods, .subnav__item').removeClass('is-open');
				$('.subnav__goods[data-goods="'+_id+'"], .subnav__item[data-goods="'+_id+'"]').addClass('is-open'); 	
			}

			$('.js-main-menu .subnav__group .subnav__link').on('click', function(e){
				let $this = $(this); 
				if(isTouch || viewportWidth < 1200){
					$body.addClass('is-menu-show-3'); 
					e.preventDefault(); 
				} 
				let id = $this.parent().data('value'); 
				showSubnav(id); 
			});

			if(isTouch == false || viewportWidth > 1199){ 
				$('.js-main-menu .subnav__group .subnav__link').on('mouseenter', function(e){
					let $this = $(this);  
					let id = $this.parent().data('value'); 
					showSubnav(id);
				});
			}

			$('.js-main-menu .nav__item.is-dd > .nav__link').on('click', function(e){
				$('.js-main-menu .nav__item.is-dd').removeClass('is-shown')
				$('.subnav__goods, .subnav__item').removeClass('is-open');

				if(isTouch || viewportWidth < 1200){
					e.preventDefault();
				} 

				let $this = $(this);
				let dropDown = $this.parents('.nav__dd:first');
				let firstItem = dropDown.find('.subnav__group:nth-child(1) .subnav__item:nth-child(1)').data('value');
				dropDown.find()
				$body.addClass('js-show-mainmenu');
				dropDown.find('.subnav__goods[data-goods="'+firstItem+'"]').addClass('is-open');
				$this.parents('.nav__item').addClass('is-shown');
				if(viewportWidth < 1200){
					
					$body.addClass('is-menu-show-2');
					$body.removeClass('is-menu-show-3');
				}
			}) 


		}  
	};
}();
 
core.init();
popupApp.init(); 
menuApp.init();
 

 
 $(function () {
 


	


	/*
	element.addEventListener('pointerdown', (event) => {
  if (event.pointerType === "mouse") {}
  if (event.pointerType === "touch") {}
  if (event.pointerType === "pen") {}
});

	const mouse = new Event("mouseclick");
const touch = new Event("touch");
document.addEventListener("pointerdown", ({ pointerType, target }) => {
  if (pointerType === "mouse") target.dispatchEvent(mouse);
  if (pointerType === "touch") target.dispatchEvent(touch);
});

const someElement = document.querySelector(".box");
someElement.addEventListener("mouseclick", () => {
  console.log("Clicked with mouse");
});
someElement.addEventListener("touch", () => {
  console.log("Touched with mobile device");
});
someElement.addEventListener("click", () => {
  console.log("Clicked by some device (we don't know)");
});

	*/


 
	
  
	$('.selectBox .selectBox__name').on('click', function(e){
		e.preventDefault();
		$(this).parents('.selectBox').toggleClass('is-open') 
	});

	$('.selectBox .selectBox__option').on('click', function(e){
		e.preventDefault();
		let $this = $(this).parents('.selectBox');
		$this.find('.selectBox__value').html($(this).data('value'));
		$this.removeClass('is-open');
	});


	$('body').on('click', function(e){
		if($(e.target).closest('.selectBox').length == 0){
			$('.selectBox.is-open').removeClass('is-open');
		}
       
	}); 


	const selectedCarousel = new Swiper('.js-filter-selected--carousel .swiper', {
		spaceBetween: 5,freeMode: true, slidesPerView: 'auto',	
	  });
 
	$('.thumb__item--more').on('click', function(){
		$(this).parent().addClass('is-open')
	})
 
	const homeSlider = new Swiper('.js-swiper-slider.is-interactive .swiper', {
		speed:600, 
		effect: 'fade',
		slidesPerView: 1,
		spaceBetween: 0,
		autoplay: {
			delay: 3000,
			//disableOnInteraction: true
		},
		navigation: {nextEl: '.js-swiper-slider .js-button-right',prevEl: '.js-swiper-slider .js-button-left'},
		pagination: {el: '.js-swiper-slider .js-dots-pagination',clickable: true}, 
	});

 
	const galleryThumbs = new Swiper('.js-gallery-thumbs .swiper', {
		direction: 'vertical',
		slidesPerView: 6,
		spaceBetween: 6,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		navigation: {nextEl: '.js-gallery-thumbs .js-button-right',prevEl: '.js-gallery-thumbs .js-button-left'},
	});

	const galleryPreview = new Swiper('.js-gallery-preview .swiper', {
		watchSlidesVisibility:true,
		spaceBetween: 0,
		thumbs: {swiper: galleryThumbs},
		navigation: {nextEl: '.js-gallery-preview .js-button-right',prevEl: '.js-gallery-preview .js-button-left'},
		pagination: {el: '.js-gallery-preview .js-dots-pagination',clickable: true}, 
	});

 
	 
  
  

	 

	const tabsCarousel = new Swiper('.js-tabs-links--carousel .swiper', {
		freeMode: true, slidesPerView: 'auto',spaceBetween:40,	 
	});
	
	
	if($('[data-fancybox]').length){
		$.fancybox.defaults.protect = true;
		$.fancybox.defaults.buttons = ['close'];
	}

	 
 

	$('.header .search .form__control').on('keyup', function(){
		$body.addClass('js-show-search-suggested')
	})


	const uiSearchToggle = document.querySelector('.js-search-toggle');
	uiSearchToggle.addEventListener('click', e => {
		e.preventDefault();
		newBody.classList.toggle('js-show-search');
		document.querySelector('.search .search__item_input').focus();
	})


	$('.js-search-open').on('click', function(){
		$body.addClass('js-show-search'); 
		$body.removeClass('js-show-mainmenu');
		$body.removeClass('is-menu-show-1');
		$body.removeClass('is-menu-show-2');
		$body.removeClass('is-menu-show-3');
		$('.header .search .form__control').focus();
	})

	$('.js-search-close').on('click', function(){
		$body.removeClass('js-show-search');
		$body.removeClass('js-show-search-suggested');
	})
 
	$('.selectBox .selectBox__title').on('click', function(e){
		e.preventDefault();
		$('.selectBox--is-open').toggleClass('selectBox--is-open')
		$(this).parents('.selectBox:first').toggleClass('selectBox--is-open');
	});


	$('body').on('click', function(e){
		if($(e.target).closest('.selectBox').length == 0){
			$('.selectBox--is-open').removeClass('selectBox--is-open');
		}
	
	}); 

	function declOfNum(n, text_forms) {  
		n = Math.abs(n) % 100; var n1 = n % 10;
		if (n > 10 && n < 20) { return text_forms[2]; }
		if (n1 > 1 && n1 < 5) { return text_forms[1]; }
		if (n1 == 1) { return text_forms[0]; }
		return text_forms[2];
	}
 
	 $('.js-clear-handlers').on('click', function(){
		 $body.removeClass('js-show-search');
		 $body.removeClass('js-show-search-suggested');
		 $body.removeClass('js-show-filter');
		 /*
		 $body.removeClass('js-h-catalog-over');
		 $body.removeClass('js-h-menu-show');
		 $body.removeClass('js-show-menu');
		 */
		 $body.removeClass('js-show-mainmenu');
		 $body.removeClass('js-menu-hover')
		 popupApp.clear();
		 menuApp.reset();
 
	 })
	 
	 
	$(window).on('resize', function() {
		 core.initResize(); 
		 //menuApp.default(); 
	})

	/* DEV ONLY */
	const path = (window.location.pathname).replace('/', '');
	$('.header .nav .nav__item_link[href="'+path+'"]').addClass('is-selected'); 
	

})
  
 
