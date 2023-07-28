const $body = document.querySelector('body');
const $html = document.querySelector('html'); 

// core app
const core = function () { 
	 return {
		 init: function () { 
			core.initWebPcheck();
			core.initFixedHeader(); 
			core.initDefault(); 
			core.initResize();       
			core.initQty();  	
		 },
		 isTouchDevice: function() {
			try{
				document.createEvent("TouchEvent");
				return true;
			}catch(e){
				return false;
			}
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
				menuApp.default(); 
		 }, 
		 initFixedHeader: function(){ 
			const headerHeight = document.querySelector('.header').offsetHeight;
			let proceed = false;  

			window.onscroll = function (e) {  
				let scrollTop = Math.round(window.pageYOffset); 
				if(scrollTop > headerHeight) { 
					if(!proceed) {
						proceed = true;
						$body.classList.add('is-fixed-header');
					}
				}else{
					if(proceed){
						proceed = false;
						$body.classList.remove('is-fixed-header');
					} 
				}
			}
 
		 }, 
		 clearHandlers: function(){
			$body.classList.remove.apply($body.classList, Array.from($body.classList).filter(v=>v.startsWith('js-')));
		 },
		 hideLoader: function(){ 
			$body.classList.remove('js-loader-show');
		 },
		 showLoader: function(a){       
			$body.classList.add('js-loader-show');        
		 },
		 resetErrors : function(){ 
			/*
			$('div.is-error .input, .input.is-error').on('change keydown keyup', function(){ 
				console.log('change')
				$(this).parents('.is-error:first').removeClass('is-error');
		  }) 
		  */  
		 }, 
		 initQty: function(){

			const uiQty = document.querySelectorAll('.js-qty');

			if(uiQty.length){
				uiQty.forEach(item => { 
					const input = item.querySelector('.qty__input');
					const btnPlus = item.querySelector('.qty__btn--plus');
					const btnMinus = item.querySelector('.qty__btn--minus');
	
					btnPlus.addEventListener('click', e => {  
						let value = Number(input.value, 10);
						if(value <= 0 || (typeof value != 'number')){
							value = 0;
						}
						input.value = ++value; 
						return false; 
					});

					btnMinus.addEventListener('click', e => {  
						let value = Number(input.value, 10);
						if ( value < 1 || (typeof value != 'number')) {
							value = 1;
						}
						input.value = --value; 
						return false; 
					});
	
				}) 
			}
		 },
		 getViewPort: function () {
			 const e = window, a = 'inner';
			 if (!('innerWidth' in window)) {a = 'client';e = document.documentElement || document.body;}
			 return {width: e[a + 'Width'],height: e[a + 'Height']};
		 },
		 getEmailFilter: function () {
			 return {filter: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/}
		 },
		 getNumberDeclension: function(){
			n = Math.abs(n) % 100; var n1 = n % 10;
			if (n > 10 && n < 20) { return text_forms[2]; }
			if (n1 > 1 && n1 < 5) { return text_forms[1]; }
			if (n1 == 1) { return text_forms[0]; }
			return text_forms[2];
		 },
		 initUI: function(){
				// UI: forms keydown restrict
				const uiFOrmInputRestrict = document.querySelectorAll('*[data-allow]');
				if(uiFOrmInputRestrict.length){
					uiFOrmInputRestrict.forEach(item => {
						item.addEventListener('keydown', (e) => {
							let allow = item.dataset.allow;
							let key = e.keyCode;  
							let base = [8,9,27] // backspace, tab, escape
							let numbers = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105]
							let spec = [189,187,219,221,220,186,222,191,110,111,106,109,107,192]
							//let space = 32
							//let enter = 13    
							if(allow == 'abc'){
								if(spec.indexOf(key) !== -1 || numbers.indexOf(key) !== -1){
									e.preventDefault();
								}  
							}
							if(allow == 'num'){
								if(base.indexOf(key) !== -1 || (key == 65 && e.ctrlKey === true) || (key >= 35 && key <= 40)) {
									return;
								}
								if ((e.shiftKey || (key < 48 || key > 57)) && (key < 96 || key > 105)) {
									e.preventDefault();
								}
							} 
						})
					})
				}
				 
				// UI: accordeons
				const uiAccordeons = document.querySelectorAll('.js-accordeon');
				if(uiAccordeons.length){
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
				}

				// UI: open discount form
				const uiCartDiscountLink = document.querySelector('.js-discount-link'); 
				if(uiCartDiscountLink){ 
					const uiCartDiscountBox = document.querySelector('.js-discount-box');
					uiCartDiscountLink.addEventListener('click', e => {
						e.preventDefault();
						uiCartDiscountBox.classList.add('is-shown');
						uiCartDiscountBox.classList.add('box');
						uiCartDiscountBox.querySelector('.input').focus();
					})
				} 

				// UI: selectboxes
				const uiSelectboxes = document.querySelectorAll('.selectBox');
				if(uiSelectboxes.length){
					
					uiSelectboxes.forEach(item => {
						item.querySelector('.selectBox__name').addEventListener('click', (e) => {
							e.preventDefault()
							let elements = [...document.querySelectorAll('.selectBox')];
							let otherElements = elements.filter(function(element) {
							return element !== item;
							});  
							if(otherElements.length){
								otherElements.forEach(function(other, i){
									other.classList.remove('is-open');
									other.querySelectorAll('.nav__item.is-open').forEach(function(opened, i){
										opened.classList.remove('is-open');
									})
								})
							}
							item.classList.toggle('is-open');
						})

						const itemOptions = item.querySelectorAll('.selectBox__option');
						itemOptions.forEach(option => {
							option.addEventListener('click', (e) => {
								e.preventDefault();  
								item.querySelector('.selectBox__value').innerHTML = option.dataset.value;
								item.classList.remove('is-open');
							})
						}) 

						/*
						$('body').on('click', function(e){
							if($(e.target).closest('.selectBox').length == 0){
								$('.selectBox.is-open').removeClass('is-open');
							}
						*/ 

					})
				} 

				// UI: cart popup close 
				document.querySelector('.js-cart-message .js-close').addEventListener('click', () => {
					$body.classList.remove('js-cart-added');
				})

				// UI: mobile popups close
				const uiBackSliders = document.querySelectorAll('.c_slide .js-close');
				if(uiBackSliders.length){
					uiBackSliders.forEach(item => {
						item.addEventListener('click', () => {
							core.clearHandlers();
						})
					})
				}

				// UI: catalog open
				const uiCatalogOpenLink = document.querySelector('.js-catalog-open');
				if(uiCatalogOpenLink){
					uiCatalogOpenLink.addEventListener('click', () => {
						$body.classList.toggle('js-catalog-show');
					})
				}

				// UI: filter open
				const uiFilterOpenLink = document.querySelector('.js-filter-open');
				if(uiFilterOpenLink){
					uiFilterOpenLink.addEventListener('click', () => {
						$body.classList.toggle('js-filter-show');
					})
				} 

				// UI: fancybox init
				const uiFancyboxGallery = document.querySelectorAll('*[data-fancybox]')
				if(uiFancyboxGallery.length){
					Fancybox.bind("[data-fancybox]", {});
				} 	

				// UI: open search
				const uiSearchToggle = document.querySelector('.js-search-toggle');
				uiSearchToggle.addEventListener('click', e => {
					e.preventDefault();
					$body.classList.toggle('js-show-search');
					const searchInput = document.querySelector('.search .search__item_input');
					searchInput.addEventListener('focus', (e) => {
						e.stopImmediatePropagation()
					});
					searchInput.focus();
 	 
				})

		 },
		 isInViewport: function(el){
		 
				const rect = el.getBoundingClientRect();
				return (
						rect.top >= 0 &&
						rect.left >= 0 &&
						rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
						rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			
				);
			 
		 },
		 initInViewportVisibility: function(){ 
 
			const checkWrapper = document.querySelector('.js-check-visibility-target');
			const checkElement = checkWrapper.querySelector('.js-check-visibility-element');
 
			if(checkWrapper){
				if(core.isInViewport(checkWrapper)){
					checkElement.classList.remove('is-fixed');
				}else{
					checkElement.classList.add('is-fixed');
				}
			}

		 },
		 initCarousels: function(){
			
				const selectedCarousel = new Swiper('.js-filter-selected--carousel .swiper', {
					spaceBetween: 5,
					freeMode: true, 
					slidesPerView: 'auto'	
				});
			
				const productCarousel = new Swiper(".js-product--carousel .swiper", { 
					spaceBetween: 10,
					slidesPerView: 2,
					breakpoints: {
						576: {scrollbar: { hide: true}},
						992: {slidesPerView:3},
						1260: {slidesPerView:4}
					},
					scrollbar: {
						el: ".js-product--carousel .swiper-scrollbar",
						hide: false
					}
				});
			
				const homeSlider = new Swiper('.js-swiper-slider.is-interactive .swiper', {
					speed:600, 
					effect: 'fade',
					slidesPerView: 1,
					spaceBetween: 0,
					autoplay: {
						delay: 3000,
						disableOnInteraction: true
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

				// UI: Range sliders
				const uiRangeSlider = document.querySelectorAll('.js-range');

				if(uiRangeSlider.length){ 
					uiRangeSlider.forEach(range => {

						const inputFrom = range.querySelector('.js-range-value-from');
						const inputTo = range.querySelector('.js-range-value-to');
						const slider = range.querySelector('.js-range-slider');
						const sliderMin = Number(slider.dataset.min);
						const sliderMax = Number(slider.dataset.max);
						const sliderFrom = Number(slider.dataset.from);
						const sliderTo = Number(slider.dataset.to);
						const sliderStep = Number(slider.dataset.step);
 
						noUiSlider.create(range, {
							start: [sliderFrom, sliderTo], 
							connect: true,
							step: sliderStep,
							range: {
								 'min': sliderMin,
								 'max': sliderMax
							}, 
							tooltips: { 
								 to: function(numericValue) {
									  return numericValue.toFixed(0);
								 }
							} 
					  }); 
 
					   range.noUiSlider.on('update', function (values, handle, unencoded) {
							inputFrom.value = values[0];
							inputTo.value = values[1];
						});
					   
					}) 
				}
 

		 }, 
		 initDefault: function(){

			$html.classList.remove('no-js')	  

			if(core.isTouchDevice()){
				$body.classList.add('is-touchdevice'); 
			}else{
				$body.classList.add('is-no-touchdevice')
			}
			 
			// init UI 
			core.initUI(); 

			// init Swiper carousels
			core.initCarousels();

			// check forms
			//core.resetErrors();
  
		 }
	 };
 }();
 
  
// popup app
const popupApp = function () {  
	return {
		init: function () {
			popupApp.close(); 

			const uiPopupLinks = document.querySelectorAll('*[data-popup]');
			if(uiPopupLinks.length){
				uiPopupLinks.forEach(link => {
					link.addEventListener('click', () => {
						let linkData = link.dataset.popup; 
						popupApp.open(linkData);
						return false;
					})
				})
			}

		 },
 
		clear:function(){
			$body.classList.remove('js-popup-show');
			const popups = document.querySelectorAll('.popup.is-shown');
			if(popups.length){
				popups.forEach(item => {
					item.classList.remove('is-shown');
				})
			}
		},
		close: function(a){
			const getPopups = document.querySelectorAll('.popup .js-close');
			 
			if(getPopups.length){
				getPopups.forEach(popup => {
					popup.addEventListener('click', () => {
						popupApp.clear(); 
					})
				})   
			}
		},
		center: function (a) {
			let name = a;
			let popup = document.querySelector('.popup--'+name);  
			var popupInner = popup.querySelector('.popup__inner');

			if(popupInner.outerHeight > core.getViewPort().height){
				popup.classList.add('is-align-top');
			}else{
				popup.classList.remove('is-align-top');
			} 
			$body.classList.add('js-popup-show');
			popup.classList.add('is-shown'); 
		}, 
		open: function(a,b) {
			//let state = b;
			let popup = a;
			if($body.classList.contains('js-popup-show')){
				popupApp.clear();
			} 
			popupApp.center(popup);
		}  
	};
}();
 
// popup app
const menuApp = function () {  
	return {
		init: function () { 
			document.querySelector('.js-toggle-mobile-nav').addEventListener('click', (e) => {
				e.preventDefault();     
				if($body.classList.contains('js-show-mainmenu')){ 
					$body.classList.remove('js-show-mainmenu'); 
				}else{ 
					$body.classList.add('js-show-mainmenu'); 
				}
			}); 
		}, 
		reset: function(){
			$body.classList.remove('js-show-mainmenu', 'is-menu-show-1', 'is-menu-show-2');
			document.querySelectorAll('.js-mainmenu .is-open').forEach(item => {
				item.classList.remove('is-open');
			})
		},  
		hoverIntent: function(){
			let uiCatalogDropdowns = document.querySelectorAll('.js-mainmenu .mainMenu__item.is-dd');

			if(core.isTouchDevice() == false && core.getViewPort().width > 1199){
				let timer;
				let delay = 160; 
				if(uiCatalogDropdowns.length){ 
					uiCatalogDropdowns.forEach(item => { 
						item.addEventListener('mouseenter', () => { 
							timer = setTimeout(function(){
								$body.classList.add('js-menu-hover');
								item.classList.add('is-hover');
							}, delay);
						})

						item.addEventListener('mouseleave', () => { 
							clearTimeout(timer);
							$body.classList.remove('js-menu-hover');
							item.classList.remove('is-hover');
						}) 
					})
				}
			} 
		},
		default: function(){

			menuApp.reset();
			 
			if(core.isTouchDevice() == false && core.getViewPort().width > 1199){
				menuApp.hoverIntent(); 
			}
 
			if(core.isTouchDevice() == true || core.getViewPort().width < 1200){ 
				document.querySelectorAll('.js-mainmenu .mainMenu__item.is-dd').forEach(function(item, i){
					item.querySelector('.mainMenu__item_link').addEventListener('click', function(e){
					  e.preventDefault()
					  let elements = [...document.querySelectorAll('.js-mainmenu .mainMenu__item.is-dd')];
					  let otherElements = elements.filter(function(element) {
						 return element !== item;
					  }); 

						if(otherElements.length){
							otherElements.forEach(function(other, i){
								other.classList.remove('is-open');
								other.querySelectorAll('.nav__item.is-open').forEach(function(opened, i){
									opened.classList.remove('is-open');
								})
							})
						}
						if(core.getViewPort().width > 1199){
							$body.classList.add('js-menu-hover'); 
						}
						item.classList.toggle('is-open'); 
						$body.classList.toggle('is-menu-show-1'); 
					});
				 });
 
				 document.querySelectorAll('.js-mainmenu .nav--catalog .nav__item.is-dd').forEach(function(item, i){
					item.querySelector('.nav__item_link').addEventListener('click', function(e){
					  e.preventDefault()
					  let elements = [...document.querySelectorAll('.js-mainmenu .nav--catalog .nav__item.is-dd')];
					  let otherElements = elements.filter(function(element) {
						 return element !== item;
					  }); 

						if(otherElements.length){
							otherElements.forEach(function(other, i){
								other.classList.remove('is-open')
							})
						}
						item.classList.toggle('is-open');  
						$body.classList.toggle('is-menu-show-2');
					});
				 }); 
			}

			document.querySelectorAll('.sidebar .nav--catalog .nav__item.is-dd').forEach(function(item, i){
				item.querySelector('.nav__item_link').addEventListener('click', function(e){
				  e.preventDefault()
					item.classList.toggle('is-open'); 
				});
			}); 
		}  
	};
}(); 
 
core.init();
popupApp.init(); 
menuApp.init();
   
	/* --------------------------------------------
						 CUSTOM  
	---------------------------------------------*/
 
	// reset handlers
	document.querySelector('.js-clear-handlers').addEventListener('click', () => {
		core.clearHandlers();
		popupApp.clear();
		menuApp.reset();
	})

	// init check viewport visibility
	const checkWrapper = document.querySelector('.js-check-visibility-target');
	if(checkWrapper && core.getViewPort().width <= 420){
		document.addEventListener('scroll', function(){ 
			core.initInViewportVisibility();
		});
	}

	// resize listener
	window.addEventListener('resize', function(){
		core.initResize();  // init default
	})

	 
	/* --------------------------------------------
						DEV ONLY 
	---------------------------------------------*/

	// set selected style in main-menu
	const path = (window.location.pathname).replace('/', '');
	document.querySelectorAll('.header .mainMenu .mainMenu__item_link').forEach(item => {
		if(item.getAttribute('href') == path){
			item.classList.add('is-selected')
		}
	}) 

	// add-to-cart demo
	const cartAdd = document.querySelectorAll('.js-addToCart');
	if(cartAdd.length){
		cartAdd.forEach(btn => {
			btn.addEventListener('click', () => {
				const showMsg = () => {
					core.hideLoader();
					document.querySelector('.js-header-cart').classList.add('is-active');
					let counter = Number(document.querySelector('.js-header-cart-counter').innerHTML);
					counter = counter + 1; 
					document.querySelector('.js-header-cart-counter').innerHTML = counter;
					$body.classList.add('js-cart-added');
				}
				core.showLoader();
				setTimeout(showMsg, 1000)
			})
		})
	}

	// add-to-wishlist demo
	const wishlistAdd = document.querySelectorAll('.js-wishlist-add');
	if(wishlistAdd.length){
		wishlistAdd.forEach(btn => {
			btn.addEventListener('click', () => {
				btn.classList.toggle('is-selected');
			})
		})
	}