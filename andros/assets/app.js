const $body = document.querySelector('body');
const $html = document.querySelector('html'); 

// core app
var core = function () { 
	return {
		init: function () { 
		  core.initWebPcheck(); 
		  core.initDefault(); 
		  core.initResize();  	
		},
		isTouchDevice: function() {
		  try{
			  document.createEvent("TouchEvent");
			  return true;
		  }catch(e){
			  return false;
		  }
		},
		initPhoneMask: function(){ 
			let phoneElements = document.querySelectorAll('js-input-phone');
			if(phoneElements){ 
				let maskOptions = {
					mask: '+{7}(000)000-00-00',
					lazy: false
				};
				phoneElements.forEach(function (element) {
					let mask = new IMask(element, maskOptions);
				});
			}
		},
		initWebPcheck: function(){
			const elem = document.createElement('canvas'); 
			if (elem.getContext && elem.getContext('2d')) {
			  document.documentElement.classList.add('is-webp');
			  return elem.toDataURL('image/webp').startsWith('data:image/webp');
			} else {
			  document.documentElement.classList.add('is-no-webp');
			  return false;
			}
		},
		initResize: function(){   
			
		},  
		initClearHandlers: function(){
			const el = document.querySelector('.js-clear-handlers');
			if(el){
				el.addEventListener('click', () => {
					core.clearHandlers();
					popupApp.clear();
				})
			} 
		}, 
		clearHandlers: function(){ 
		  $body.classList.remove.apply($body.classList, Array.from($body.classList).filter(v=>v.startsWith('js-')));
		}, 
		loader: function(name = 'show'){
			const type = name;
			const loader = document.querySelector('.r_loader'); 
			const createLoader = () => {
				const el = document.createElement('div');
				el.setAttribute('class', 'r_loader');
				Array.from({ length: 12 }, () => document.createElement('i')).forEach(newElement => el.appendChild(newElement));
				$body.appendChild(el);
			}; 
			switch (type) {
				case 'show':
					if (!loader) createLoader();
					$body.classList.add('js-loader-show');
					break;
				case 'hide':
					$body.classList.remove('js-loader-show');
					break;
				case 'create':
					if (!loader) createLoader();
					break;
			}  
		}, 
		resetErrors : function(){ 
			/*
			$('div.is-error .input, .input.is-error').on('change keydown keyup', function(){  
			  $(this).parents('.is-error:first').removeClass('is-error');
		 }) 
		 */
		},  
		getViewPort: function () {
			const e = window, a = 'inner';
			 if (!('innerWidth' in window)) {a = 'client';e = document.documentElement || document.body;}
			 return {width: e[a + 'Width'],height: e[a + 'Height']};
		},
		/*
		getBreakpoint: function (size) {
			const sizes = {'xs': 0, 'sm': 576, 'md': 768, 'lg': 992, 'xl': 1200, 'xxl': 1400};
			return sizes[size] ?? 0;
		},
		*/ 
		getEmailFilter: function () {
			return {filter: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/}
		}, 
		getDeclension: function(){
			const n = Math.abs(n) % 100;
			const n1 = n % 10;
			return (n > 10 && n < 20) ? txt[2] : (n1 > 1 && n1 < 5) ? txt[1] : (n1 === 1) ? txt[0] : txt[2];
		},
		getScrollbarWidth: function(){
			if(!document.querySelector('.r_scrolldetect')){
				div = document.createElement('div');
				div.className = 'r_scrolldetect';
				Object.assign(div.style, {
					width: "100px",
					height: "100px",
					overflow: "scroll",
					position: "absolute",
					top: "-9999px",
				});
				$body.appendChild(div);
			}  
			const scrollDiv = document.querySelector('.r_scrolldetect'); 
			const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth; 
			document.body.removeChild(scrollDiv); 
			return scrollbarWidth;
		},
		uiFormBlock: function(obj){   

			let settings = { form: null, button: null, block: true }; 

			try {
				if (typeof obj === 'object') Object.assign(settings, obj);
				else throw new Error('Invalid object provided for settings.');
			} catch (error) {
				console.log('Settings error:', error.message);
			}

			const buttonElement = settings.button && document.querySelector(settings.button);

			if (buttonElement) {
				buttonElement.disabled = settings.block;

				if (settings.block) {
					const buttonText = buttonElement.textContent;
					buttonElement.innerHTML = `
						<span class="btn__text">${buttonText}</span>
						<span class="btn__loading"><span></span><span></span><span></span><span></span></span>
						`;
					buttonElement.style.width = `${buttonElement.offsetWidth}px`;
					buttonElement.classList.toggle('is-loading', settings.block);
				} else {
					buttonElement.removeAttribute('style');
					buttonElement.classList.remove('is-loading');
				}
			} else if (!settings.block) {
				//document.querySelector('.is-loading')?.classList.remove('is-loading');
				document.querySelector('.is-loading').classList.remove('is-loading');
			}

			if (settings.form) {
				const formElements = document.querySelectorAll(`${settings.form} input, ${settings.form} button, ${settings.form} textarea,${settings.form} select`);
				formElements.forEach(element => (element.disabled = settings.block));
			}
  
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
		initFormRestrictRules: function(){
			const uiFormInputRestrict = document.querySelectorAll('*[data-allow]');
			uiFormInputRestrict.length && uiFormInputRestrict.forEach(item => {
				item.addEventListener('keydown', (e) => {
					const allow = item.dataset.allow;
					const key = e.keyCode;
					const base = [8, 9, 27];
					const numbers = [...Array(10).keys()].map(i => i + 48).concat([...Array(10).keys()].map(i => i + 96));
					const spec = [189, 187, 219, 221, 220, 186, 222, 191, 110, 111, 106, 109, 107, 192];
					const isNumericKey = numbers.includes(key);
					const isSpecialKey = spec.includes(key);
					if (allow === 'abc' && (isSpecialKey || isNumericKey)) {
							e.preventDefault();
					}
					if (allow === 'num') {
						if (base.includes(key) || (key === 65 && e.ctrlKey) || (key >= 35 && key <= 40)) {
							return;
						}
						if ((e.shiftKey || (key < 48 || key > 57)) && (key < 96 || key > 105)) {
							e.preventDefault();
						}
					}
				});
			});
		},  
		initDefault: function(){

			$html.classList.remove('no-js')	  

			if(core.isTouchDevice()){
				$body.classList.add('is-touchdevice'); 
			}else{
				$body.classList.add('is-no-touchdevice')
			}
			if(core.isTouchDevice() == false && core.getViewPort().width > 1199){
				core.hoverIntent(); 
			}
			core.loader('create'); // create loader in DOM
			core.initFormRestrictRules(); // init custom restricts for inputs
			core.initClearHandlers();
			core.initPhoneMask(); 

		  
		  core.resetErrors(); // check forms
		}
	};
}();

  
// popup app
var popupApp = function () {  
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

			$body.removeAttribute('style');
			 
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
			let scrollWidth = core.getScrollbarWidth();
			$body.setAttribute('style', '--scrollbar-width: '+scrollWidth+'px');
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


 /*
class TabsComponent {
	constructor(element) {
	  this.el = $(element);
	  this.links = this.el.find('*[data-tab]');
	  this.settings = { "type": "tabs", "transform": true, "breakpoint": 576, "carousel": false };
 
	  try {
		 $.extend(this.settings, JSON.parse(this.el.attr('data-settings')));
	  } catch (error) {
		 console.log('tabs component error: ', error);
	  }
 
	  this.init();
	}
 
	setAccordion() {
	  this.el.find('.js-tabs-links .r_tabs__item_title').each((index, element) => {
		 let target = $(element).data('tab');
		 this.el.find('*[data-tab-target=' + target + ']').prepend(element);
	  });
	}
 
	setTabs() {
	  const tabsLinks = this.el.find('.js-tabs-links');
	  if (tabsLinks.length === 0) {
		 this.el.prepend('<div class="r_tabs__links js-tabs-links"></div>');
	  }
	  this.el.find('.js-tabs-links').html(this.links);
 
	  this.el.find('[data-tab], [data-tab-target]').removeClass('is-selected');
	  let firstID = this.el.find('.js-tabs-links .r_tabs__item_title:first').attr('data-tab');
	  this.el.find('*[data-tab-target=' + firstID + '],*[data-tab=' + firstID + ']').addClass('is-selected');
	}
 
	tabClick() {
	  this.el.find('*[data-tab]').off().on('click', (event) => {
		 let id = $(event.currentTarget).data('tab');
		 if (this.settings.type == 'tabs' && this.settings.transform && core.getViewPort().width > this.settings.breakpoint) {
			this.el.find('[data-tab], [data-tab-target]').removeClass('is-selected');
			this.el.find('*[data-tab-target=' + id + '],*[data-tab=' + id + ']').addClass('is-selected');
		 } else {
			this.el.find('*[data-tab-target=' + id + '],*[data-tab=' + id + ']').toggleClass('is-selected');
		 }
	  });
	}
 
	init() {
	  if (this.settings.type == 'tabs') {
		 if (this.settings.transform) {
			$(window).on('load resize', () => {
			  (core.getViewPort().width > this.settings.breakpoint) ? this.setTabs() : this.setAccordion();
			  this.tabClick();
			});
		 } else {
			this.setTabs();
			this.tabClick();
		 }
	  }
 
	  if (this.settings.type == 'accordeon') {
		 this.tabClick();
	  }
	}
 }
 
 $('.js-tabs').each((index, element) => {
	new TabsComponent(element);
 });
 */

 

 
// components app
const componentsApp = function () {  
	return {
		init: function () {
			popupApp.init();
			componentsApp.scrollToTop();
			componentsApp.scrollToTarget();
			componentsApp.fixedHeader(); 
			//componentsApp.accordeon();
			componentsApp.qty();
			componentsApp.tabs();
			componentsApp.readProgress();
		


			// UI: fancybox init
			const uiFancyboxGallery = document.querySelectorAll('*[data-fancybox]')
			if(uiFancyboxGallery.length){
				Fancybox.bind("[data-fancybox]", {});
			} 	


		}, 
		fixedHeader: function(){ 
			const header = document.querySelector('.header');
			const totopButton = document.querySelector('.js-scroll-top');
			let lastScrollTop = 0;
			window.addEventListener('scroll', () => {
				const scrollTop = Math.round(window.pageYOffset);
				const scrollHeight = header.offsetHeight;
				const shouldFixHeader = scrollTop > scrollHeight + 60; 
				if (shouldFixHeader !== lastScrollTop > header.offsetHeight + 60) {
					$body.classList.toggle('is-fixed-header', shouldFixHeader);
				} 
				if (totopButton) {
					const shouldShowTotop = scrollTop > header.offsetHeight * 6 && core.getViewPort().width > 576;
					$body.classList.toggle('is-show-totop', shouldShowTotop);
				} 
				lastScrollTop = scrollTop;
			});
		},
		tabs: function(){
			/*
			$('.js-tabs').each(function(){
				const el = $(this);
				const links = el.find('*[data-tab]');
				let settings = {"type":"accordeon", "transform": true, "breakpoint": 576, "carousel": false }
				
				try { 
					$.extend(settings, JSON.parse(el.attr('data-settings')));
				} catch (error) { 
					console.log('tabs component error: ', error)
				}   

				
				
				el.find('.js-tabs-links > *').each(function(){
					let element = $(this);
					console.log(element)
					let target = element.data('tab');
					el.find('*[data-tab-target=' + target + ']').prepend('<div class="r_tabs__item_title" data-tab="'+target+'">'+element.text()+'</div>');
				});

				el.find('*[data-tab]').on('click', function(){
					let id = $(this).data('tab');
					el.find('[data-tab], [data-tab-target]').removeClass('is-selected');
					$(this).add('*[data-tab-target=' + id + ']').addClass('is-selected');
				});
			});
			*/
		},
		/*
		Tabs: function(element){
			const el = document.querySelector(element);
			const links = el.querySelectorAll('*[data-tab]');
			const settings = { "type": "tabs", "transform": true, "breakpoint": 576, "carousel": false };

			try {
				Object.assign(settings, JSON.parse(el.getAttribute('data-settings')));
			} catch (error) {
				console.log('tabs component error: ', error);
			}

			const setAccordion = () => {
				el.querySelectorAll('.js-tabs-links .r_tabs__item_title').forEach((element) => {
					const target = element.dataset.tab;
					el.querySelectorAll('*[data-tab-target=' + target + ']').forEach((targetElement) => {
					targetElement.prepend(element.cloneNode(true));
					});
				});
			};

			const setTabs = () => {
				const tabsLinks = el.querySelector('.js-tabs-links');
				if (!tabsLinks) {
					const tabsLinksContainer = document.createElement('div');
					tabsLinksContainer.className = 'r_tabs__links js-tabs-links';
					el.prepend(tabsLinksContainer);
				}

				tabsLinks.innerHTML = '';
				links.forEach((link) => {
					tabsLinks.appendChild(link.cloneNode(true));
				});

				el.querySelectorAll('[data-tab], [data-tab-target]').forEach((element) => {
					element.classList.remove('is-selected');
				});

				const firstID = el.querySelector('.js-tabs-links .r_tabs__item_title:first-child').dataset.tab;
				el.querySelectorAll('*[data-tab-target=' + firstID + '],*[data-tab=' + firstID + ']').forEach((element) => {
					element.classList.add('is-selected');
				});
			};

			const tabClick = (event) => {
				const id = event.currentTarget.dataset.tab;
				if (settings.type == 'tabs' && settings.transform && core.getViewPort().width > settings.breakpoint) {
					el.querySelectorAll('[data-tab], [data-tab-target]').forEach((element) => {
					element.classList.remove('is-selected');
					});
					el.querySelectorAll('*[data-tab-target=' + id + '],*[data-tab=' + id + ']').forEach((element) => {
					element.classList.add('is-selected');
					});
				} else {
					el.querySelectorAll('*[data-tab-target=' + id + '],*[data-tab=' + id + ']').forEach((element) => {
					element.classList.toggle('is-selected');
					});
				}
			};

			const init = () => {
				if (settings.type == 'tabs') {
					if (settings.transform) {
					window.addEventListener('load', handleResize);
					window.addEventListener('resize', handleResize);
					} else {
					setTabs();
					el.querySelectorAll('*[data-tab]').forEach((tab) => {
						tab.addEventListener('click', tabClick);
					});
					}
				}

				if (settings.type == 'accordeon') {
					el.querySelectorAll('*[data-tab]').forEach((tab) => {
					tab.addEventListener('click', tabClick);
					});
				}
			};

			const handleResize = () => {
				(core.getViewPort().width > settings.breakpoint) ? setTabs() : setAccordion();
				el.querySelectorAll('*[data-tab]').forEach((tab) => {
					tab.removeEventListener('click', tabClick);
				});
				el.querySelectorAll('*[data-tab]').forEach((tab) => {
					tab.addEventListener('click', tabClick);
				});
			};

			init();
		},
		*/
		/*
		Tabs: function(element){
			this.el = $(element);
			this.links = this.el.find('*[data-tab]');
			this.settings = { "type": "tabs", "transform": true, "breakpoint": 576, "carousel": false };
		 
			try {
			  $.extend(this.settings, JSON.parse(this.el.attr('data-settings')));
			} catch (error) {
			  console.log('tabs component error: ', error);
			}
		 
			this.setAccordion = () => {
			  this.el.find('.js-tabs-links .r_tabs__item_title').each((index, element) => {
				 let target = $(element).data('tab');
				 this.el.find('*[data-tab-target=' + target + ']').prepend(element);
			  });
			};
		 
			this.setTabs = () => {
			  const tabsLinks = this.el.find('.js-tabs-links');
			  if (tabsLinks.length === 0) {
				 this.el.prepend('<div class="r_tabs__links js-tabs-links"></div>');
			  }
			  this.el.find('.js-tabs-links').html(this.links);
		 
			  this.el.find('[data-tab], [data-tab-target]').removeClass('is-selected');
			  let firstID = this.el.find('.js-tabs-links .r_tabs__item_title:first').attr('data-tab');
			  this.el.find('*[data-tab-target=' + firstID + '],*[data-tab=' + firstID + ']').addClass('is-selected');
			};
		 
			this.tabClick = () => {
			  this.el.find('*[data-tab]').off().on('click', (event) => {
				 let id = $(event.currentTarget).data('tab');
				 if (this.settings.type == 'tabs' && this.settings.transform && core.getViewPort().width > this.settings.breakpoint) {
					this.el.find('[data-tab], [data-tab-target]').removeClass('is-selected');
					this.el.find('*[data-tab-target=' + id + '],*[data-tab=' + id + ']').addClass('is-selected');
				 } else {
					this.el.find('*[data-tab-target=' + id + '],*[data-tab=' + id + ']').toggleClass('is-selected');
				 }
			  });
			};
		 
			this.init = () => {
			  if (this.settings.type == 'tabs') {
				 if (this.settings.transform) {
					$(window).on('load resize', () => {
					  (core.getViewPort().width > this.settings.breakpoint) ? this.setTabs() : this.setAccordion();
					  this.tabClick();
					});
				 } else {
					this.setTabs();
					this.tabClick();
				 }
			  }
		 
			  if (this.settings.type == 'accordeon') {
				 this.tabClick();
			  }
			};
		 
			this.init();
		}, 
		*/
		/*
		accordeon: function(){  
			const el = document.querySelectorAll('.js-accordeon');
			if(el){
				el.forEach((item) => {
					let settings = { "close": false };
				 
					try {
					  Object.assign(settings, JSON.parse(item.dataset.settings || '{}'));
					} catch (error) {
					  console.log('accordeon component error: ', error);
					}
				 
					item.querySelectorAll('[data-acc]').forEach((title) => {
					  title.addEventListener('click', () => {
						 let id = title.dataset.acc;
						 if (settings.close) {
							item.querySelectorAll('[data-acc-target]').forEach((acc) => acc.classList.remove('is-selected'));
						 }
						 item.querySelector(`[data-acc-target="${id}"]`).classList.toggle('is-selected');
					  });
					});
				});
			}  
		},
		*/
		scrollToTarget: function(){
			const el =  document.querySelectorAll('*[data-scroll]')
			if (el) {
				el.forEach(item => {
					item.addEventListener('click', () => {
					const header = document.querySelector('.header').offsetHeight;
					const target = item.getAttribute('data-scroll');
					const targetElement = document.querySelector(`.${target}`);
				
					if (targetElement) {
						window.scrollTo({
							top: targetElement.offsetTop - header,
							behavior: 'smooth'
						});
					}
				});
			 });
			}
		},
		scrollToTop: function(){ 
			if(!document.querySelector('.js-scroll-top')){
				linkTop = document.createElement('div');
				linkTop.className = 'r_totop js-scroll-top';
				//linkTop.innerHTML = 'top'; 
				$body.appendChild(linkTop) 
			} 
			document.querySelector('.js-scroll-top').addEventListener('click', () => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
				return false;
			}); 
		},
		qty: function(){ 
			const el = document.querySelectorAll('.js-qty');

			if (el) {
			el.forEach(item => {
				const input = item.querySelector('.js-qty-input');
				const btnPlus = item.querySelector('.js-qty-plus');
				const btnMinus = item.querySelector('.js-qty-minus');

				btnPlus.addEventListener('click', () => {
					if (!input.disabled) {
						input.value = Number(input.value) + 1;
					}
				});

				btnMinus.addEventListener('click', () => {
					if (!input.disabled) {
						input.value = Math.max(1, Number(input.value) - 1);
						input.dispatchEvent(new Event('change', { bubbles: true }));
					}
				});

				input.addEventListener('change', () => {
					if (!input.disabled) {
						input.value = Math.max(1, Number(input.value));
					}
				});
			});
			}
		 
		},
		toast: function(message, duration = 3000){ 
			if(!document.querySelector('.r_toast')){
				toasts = document.createElement('div');
				toasts.className = 'r_toast';
				$body.appendChild(toasts);
			}  
		   const toastContainer = document.querySelector('.r_toast');
			const toastElement = document.createElement('div');
			toastElement.classList.add('r_toast__item');
			toastElement.textContent = message; 
			setTimeout(() => {
				toastElement.classList.add('is-shown');
			 }, 100);

			toastContainer.insertBefore(toastElement, toastContainer.firstChild);
			setTimeout(() => {
				toastElement.style.animation = 'fadeOut 0.3s ease-in-out forwards';
				setTimeout(() => {
				  toastContainer.removeChild(toastElement);
				}, 400);
			 }, duration); 
		},
		readProgress: function(){
			if (document.querySelectorAll('.js-read-progress').length) {

				if (!document.querySelector('.r_readprogress')) {
				  const readProgress = document.createElement('div');
				  readProgress.classList.add('r_readprogress');
				  $body.appendChild(readProgress);
				}
			 
				const processScroll = () => {
				  const docElem = document.documentElement;
				  const scrollTop = docElem.scrollTop || $body.scrollTop;
				  const scrollBottom = (docElem.scrollHeight || $body.scrollHeight) - window.innerHeight;
				  const scrollPercent = (scrollTop / scrollBottom) * 100 + '%';
				  document.querySelector('.r_readprogress').style.setProperty('--scrollAmount', scrollPercent);
				};
			 
				document.addEventListener('scroll', processScroll);
			 }


		 },
	};
}();

// init apps
core.init(); 
componentsApp.init();



const cardsCarousel = document.querySelectorAll('.js-cards-carousel');

if(cardsCarousel){ 
	cardsCarousel.forEach(card => { 
		let carousel = card.querySelector('.swiper');
		let btnNext = card.querySelector('.js-button-right');
		let btnPrev = card.querySelector('.js-button-left');

		const productsCarousel = new Swiper(carousel, { 
			spaceBetween:20,
			slidesPerView: 1,
			breakpoints: {  
			576: {slidesPerView: 2},
				992: {slidesPerView:3},
				1200: {slidesPerView:4},
				1400: {slidesPerView:4, spaceBetween:30}
			},
			navigation: {nextEl: btnNext ,prevEl: btnPrev},
		});
	})
}


const docsCarousel = document.querySelectorAll('.js-docs-carousel');

if(docsCarousel){ 
	docsCarousel.forEach(card => { 
		let carousel = card.querySelector('.swiper');
		let btnNext = card.querySelector('.js-button-right');
		let btnPrev = card.querySelector('.js-button-left');

		const productsCarousel = new Swiper(carousel, { 
			spaceBetween:20,
			slidesPerView:1,
			breakpoints: { 
			0: {spaceBetween:10},
			576: {spaceBetween:20,slidesPerView:2},
			992: {spaceBetween:20,slidesPerView:3},
				1200: {slidesPerView:2},
				1500: {slidesPerView:3, spaceBetween:30} 
			},
			navigation: {nextEl: btnNext ,prevEl: btnPrev},
		});
	})
}

const benefitsCarousel = document.querySelectorAll('.js-benefits-carousel');

if(benefitsCarousel){ 
	benefitsCarousel.forEach(card => { 
		let carousel = card.querySelector('.swiper');
		let btnNext = card.querySelector('.js-button-right');
		let btnPrev = card.querySelector('.js-button-left');

		const productsCarousel = new Swiper(carousel, { 
			spaceBetween:20,
			slidesPerView:1,
			speed:600,  
			autoplay: {
				delay: 4000,
				disableOnInteraction: true
			},
			breakpoints: { 
			0: {spaceBetween:10},
			576: {spaceBetween:20,slidesPerView:1},
			992: {spaceBetween:20,slidesPerView:2},
				1200: {slidesPerView:3},
				1400: {slidesPerView:4} 
			},
			navigation: {nextEl: btnNext ,prevEl: btnPrev},
		});
	})
}



const beforeCarousel = document.querySelectorAll('.js-beforeafter-carousel');

if(beforeCarousel){ 
	beforeCarousel.forEach(card => { 
		let carousel = card.querySelector('.swiper');
		let btnNext = card.querySelector('.js-button-right');
		let btnPrev = card.querySelector('.js-button-left');

		const productsCarousel = new Swiper(carousel, { 
			spaceBetween:0,
			slidesPerView: 1, 
			navigation: {nextEl: btnNext ,prevEl: btnPrev},
		});
	})
}


 
const topCarousel = document.querySelectorAll('.js-top-carousel');

if(topCarousel){ 
	topCarousel.forEach(card => { 
		let carousel = card.querySelector('.swiper');
		let btnNext = card.querySelector('.js-button-right');
		let btnPrev = card.querySelector('.js-button-left');

		const productsCarousel = new Swiper(carousel, { 
			spaceBetween:20,
			slidesPerView: 1,
			breakpoints: {  
			0: {slidesPerView: 1}, 
			768: {slidesPerView:2},
			992: {slidesPerView: 3,spaceBetween:20}, 
			1400: {slidesPerView: 2,spaceBetween:20}
			},
			navigation: {nextEl: btnNext ,prevEl: btnPrev},
		});
	})
}
 

// resize events
window.addEventListener('resize', () => {
	core.initResize();  
	
})

const directionsLink  = document.querySelector('.section--directions-default .section__content');
if(directionsLink){
	directionsLink.addEventListener('click', () => {
		directionsLink.classList.toggle('is-open');
	})
}

const homeSlider = new Swiper('.js-mainbanner-carousel.is-interactive .swiper', {
	speed:600, 
	//autoHeight: true,
	//effect: 'fade',
	slidesPerView: 1,
	spaceBetween: 0,
	autoplay: {
		delay: 3000,
		disableOnInteraction: true
	},
	navigation: {nextEl: '.js-mainbanner-carousel .js-button-right',prevEl: '.js-mainbanner-carousel .js-button-left'},
	pagination: {el: '.js-mainbanner-carousel .js-pagination',clickable: true,
	renderBullet: function (index, className) {
	  return '<span class="' + className + '">' + (index + 1) + '</span>';
	}}, 
});
 
 
 document.querySelectorAll('.js-tabs').forEach((tab) => {
 
	// new componentsApp.Tabs(tab);
 });

 
