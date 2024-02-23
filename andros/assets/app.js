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
		isHasIOSline: function(){
			const hasHomeIndicator = window.safeAreaInsets && window.safeAreaInsets.bottom > 0;
			if (hasHomeIndicator) {
				$body.classList.add('is-iosline');
			} 
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
			const inputs = document.querySelectorAll('input[type=tel]');
			if(inputs){
				inputs.forEach(el => {
					VMasker(el).maskPattern("9 (999) 999-99-99");
				})
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
			menuApp.default(); 
		},  
		initClearHandlers: function(){
			const el = document.querySelector('.js-clear-handlers');
			if(el){
				el.addEventListener('click', () => {
					core.clearHandlers();
					popupApp.clear();
					menuApp.reset();
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

			let settings = { 
				form: 'form', 
				button: '[type=submit]', 
				animation: true,
				block: true 
			}; 

			try {
				if (typeof obj === 'object') Object.assign(settings, obj);
				else throw new Error('Invalid object provided for settings.');
			} catch (error) {
				console.log('Settings error:', error.message);
			}
			
			const form = document.querySelector(settings.form); 
			const formInputs = document.querySelectorAll(`${settings.form} input, ${settings.form} button, ${settings.form} textarea,${settings.form} select`);
			const buttonElement = settings.button && form.querySelector(settings.button);
			formInputs.forEach(element => (element.disabled = settings.block));

			if (settings.animation) {
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
				const loadingElement = document.querySelector('.is-loading');
				if (loadingElement !== null) {
					loadingElement.classList.remove('is-loading');
				}
				//document.querySelector('.is-loading').classList.remove('is-loading');
			}	 
  
		}, 
		getResetError : function(){  
			const handleEvent = (event) => { 
				const target = event.target; 
				if (target.matches('div.is-error .input, .input.is-error')) {
				  const errorParent = target.closest('.is-error');
				  if (errorParent) {
					 errorParent.classList.remove('is-error');
				  }
				}
			 };
			 
			 document.addEventListener('change', handleEvent);
			 document.addEventListener('keydown', handleEvent);
			 document.addEventListener('keyup', handleEvent);
		 
		},  
		getResetForm: function(el){
			const form = el;
			const inputs = Array.from(form.querySelectorAll('input,textarea,select'));
			const errors = form.querySelectorAll('.is-error');
			const msg = form.querySelector('.form__group--complete');

			if(errors){
				errors.forEach(el => {
					el.classList.remove('is-error');
				})
			}
			if(msg){
				msg.classList.remove('is-shown');
			}
			inputs.forEach(input => { 
				if(input.type == 'checkbox' || input.type == 'radio'){
					input.checked = false;
				}else{
					input.value = '';
				}
			})
		},
		getFormValidation: function(el){
			 
			const form = el;
			const inputs = Array.from(form.querySelectorAll('[data-required]'));
			const radioGroups = {};

			let hasError = false;

			inputs.forEach(input => {
				if (!input) {
					return;
				}

				const { value, checked, type, dataset } = input;
				const errorText = dataset.errorText || 'Заполните обязательное поле'; 

				let isError = (value == '' || (!checked && type === 'checkbox'));

				if (type === 'email') { 
					const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					isError = isError || !emailRegex.test(value);
				} 
				/*
				if (type === 'tel') { 
					const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
					isError = isError || !phoneRegex.test(value);
				}
				*/

				if (isError) {
					const hintContainer = input.closest('.form__group').querySelector('.form__group_hints'); 
					const hintError = input.closest('.form__group').querySelector('.form__group_hints .hint__item--error');
					if(hintContainer){
						if(!hintError){ 
							const errorContainer = document.createElement('div');
							errorContainer.className = 'hint__item hint__item--error';
							hintContainer.prepend(errorContainer);
							errorContainer.textContent = errorText 
						} 
					}
					
					input.closest('.form__group').classList.add('is-error');
					hasError = true; 
				} else {
					input.closest('.form__group').classList.remove('is-error');
				}
			}); 
			 
			return hasError;
			   
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
				menuApp.hoverIntent(); 
			}
			core.isHasIOSline();
			core.loader('create'); // create loader in DOM
			core.initFormRestrictRules(); // init custom restricts for inputs
			core.initClearHandlers();
			core.initPhoneMask(); 
			core.getResetError(); 
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
		 
			const popupForm = document.querySelector('.popup--'+popup+ ' form');

			if(popupForm){
				core.getResetForm(popupForm);
			}
			if(popup == 'appointment'){
				appointmentApp.resetWindows();
			}
			
			popupApp.center(popup);
		}  
	};
}();

 
// components app
const componentsApp = function () {  
	return {
		init: function () {
			popupApp.init();
			componentsApp.scrollToTop();
			componentsApp.scrollToTarget();
			componentsApp.fixedHeader();  
			//componentsApp.qty();
			componentsApp.tabs();
			componentsApp.fancybox();
			//componentsApp.readProgress();
			componentsApp.initFloatActions();
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
		fancybox: function(){ 
			Fancybox.bind('*[data-fancybox]', {});
		},
		tabs: function(){
			const allTabs = document.querySelectorAll('.js-tabs');
			if(allTabs){ 
				allTabs.forEach((el) => { 
					const settings = {
						type: el.getAttribute('data-type') || 'tabs',
						breakpoint: el.getAttribute('data-breakpoint') || 576,
						carousel: false
				   }; 
 
					if(settings.type == 'accordeon'){
						el.classList.remove('r_tabs--tabs');
						el.classList.add('r_tabs--accordeon')
					}
					el.querySelectorAll('.js-tabs-links > *').forEach((element) => {
						const target = element.dataset.tab;
						const newItem = el.querySelector(`*[data-tab-target="${target}"]`).insertBefore(
							document.createElement('div'),
							el.querySelector(`*[data-tab-target="${target}"]`).firstElementChild
						);

						newItem.className = 'r_tabs__item_title';
						newItem.setAttribute('data-tab', target);
						newItem.textContent = element.textContent;
					});

					el.querySelectorAll('*[data-tab]').forEach((tab) => {
						tab.addEventListener('click', () => {
							const id = tab.dataset.tab; 
							if(settings.type == 'accordeon' || core.getViewPort().width < settings.breakpoint){
								tab.closest('[data-tab]').classList.toggle('is-selected');
								el.querySelector(`*[data-tab-target="${id}"]`).classList.toggle('is-selected');
							}else{
								el.querySelectorAll('[data-tab], [data-tab-target]').forEach((item) => {
									item.classList.remove('is-selected');
								});
								tab.closest('[data-tab]').classList.add('is-selected');
								el.querySelector(`*[data-tab-target="${id}"]`).classList.add('is-selected');
							} 
						});
					});

					if (settings.type === 'tabs' && core.getViewPort().width > settings.breakpoint) {
						el.querySelector('.r_tabs__links [data-tab]:first-child').classList.add('is-selected'); 
						el.querySelector('.r_tabs__wrapper [data-tab-target]:first-child').classList.add('is-selected');
					}

				}); 
			}
		}, 
		scrollToTarget: function(){
			const el =  document.querySelectorAll('*[data-scroll]')
			if (el) {
				el.forEach(item => {
					item.addEventListener('click', () => {
					const header = document.querySelector('.header').offsetHeight;
					const subheader = document.querySelector('.section--submenu').offsetHeight / 2;
					let minusHeight = header;
					if(subheader){
						minusHeight = header + subheader;
					}
					const target = item.getAttribute('data-scroll');
					const targetElement = document.querySelector(`.${target}`);
				
					if (targetElement) {
						window.scrollTo({
							top: targetElement.offsetTop - minusHeight,
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
		/*
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
		 */
		 initFloatActions: function(){

			const floatActions = document.querySelector('.js-float-actions');
			const hideFloat = () => {
				localStorage.setItem('float-actions', 'hide');
				floatActions.classList.remove('is-shown');
			};

			if (floatActions) {
				const closeBtn = floatActions.querySelector('.js-close');
				const actionsInStorage = localStorage.getItem('float-actions');
				if (!actionsInStorage) {
					const showActions = () => {
					floatActions.classList.add('is-shown');
					};
					setTimeout(showActions, 3000);
				}
				if (closeBtn) {
					closeBtn.addEventListener('click', () => {
					hideFloat();
					});
				}
			} 

			// hide action on swipe x\y
			let startX, startY;
			const swipeElement = document.querySelector('.js-float-actions .r_toast__item');
			const handleTouchStart = (event) => {
				startX = event.touches[0].clientX;
				startY = event.touches[0].clientY;
				};

			const handleTouchEnd = (event) => {
				const deltaX = event.changedTouches[0].clientX - startX;
				const deltaY = event.changedTouches[0].clientY - startY;
				if (Math.abs(deltaX) > 50 || Math.abs(deltaY) > 50) {
					if (swipeElement) {
						hideFloat();
					}
				}
			};
			
			if (swipeElement !== null) {
				swipeElement.addEventListener('touchstart', handleTouchStart);
				swipeElement.addEventListener('touchend', handleTouchEnd);
			}

		}
	};
}();

 
// menuApp
const menuApp = function () {  
	return {
		init: function () { 
			let menuLinks = document.querySelectorAll('.js-toggle-mobile-nav');
			if(menuLinks){
				menuLinks.forEach(link => {
					link.addEventListener('click', (e) => {
						e.preventDefault();     
						let scrollWidth = core.getScrollbarWidth();
					
						if($body.classList.contains('js-show-mainmenu')){ 
							$body.classList.remove('js-show-mainmenu'); 
							$body.removeAttributeAttribute('style');
						}else{ 
							$body.classList.add('js-show-mainmenu'); 
							$body.setAttribute('style', '--scrollbar-width: '+scrollWidth+'px');
						}
					}); 
				})
			} 
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

			const mainMenuLinks = document.querySelectorAll('.js-mainmenu .mainMenu__item.is-dd');
			const mainSubmenuLinks = document.querySelectorAll('.js-mainmenu .nav--catalog .nav__item.is-dd'); 
			
			if(core.isTouchDevice() == true || core.getViewPort().width < 1200){ 
				mainMenuLinks.forEach(function(item){ 
					item.querySelector('.mainMenu__item_link').addEventListener('click', menuHandlerLevelOne);		 
				});
				mainSubmenuLinks.forEach(function(item){
					item.querySelector('.nav__item_link').addEventListener('click', menuHandlerLevelTwo);
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


function menuHandlerLevelOne(e) { 
	e.preventDefault();  
	let item = e.target.parentElement;  
	let elements = [...document.querySelectorAll('.js-mainmenu .mainMenu__item.is-dd ')];
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
}

function menuHandlerLevelTwo(e){
	e.preventDefault()
	let item = e.target.parentElement;  
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
}

// appointmentApp
const appointmentApp = (function () {
	const selectors = {
		sectionStart: '.section--appointment-order-start',
		sectionOnline: '.section--appointment-order-online',
		sectionComplete: '.section--appointment-order-complete',
		btnShowOnline: '.js-open-appointment-online',
		btnGoBack: '.js-appointment-back',
		form: '.js-appointment-online-form',
	};

	const toggleSections = (showStart, showOnline) => () => {
		document.querySelector(selectors.sectionStart).classList.toggle('is-shown', showStart);
		document.querySelector(selectors.sectionOnline).classList.toggle('is-shown', showOnline);
	};

	const addClickListener = (element, showStart, showOnline) => {
		const targetElement = document.querySelector(element);
		if (targetElement) {
			targetElement.addEventListener('click', toggleSections(showStart, showOnline));
		}
	};

	const initFormSelect = () => {
		const { btnShowOnline, btnGoBack } = selectors;
		addClickListener(btnShowOnline, false, true);
		addClickListener(btnGoBack, true, false);
	};
	const resetWindows = () => {
		const { sectionStart, sectionOnline, sectionComplete } = selectors;
		document.querySelector(sectionStart).classList.add('is-shown');
		document.querySelector(sectionOnline).classList.remove('is-shown');
		document.querySelector(sectionComplete).classList.remove('is-shown');
	}
	const initComplete = () => {
		const { sectionStart, sectionOnline, sectionComplete } = selectors;
		document.querySelector(sectionStart).classList.remove('is-shown');
		document.querySelector(sectionOnline).classList.remove('is-shown');
		document.querySelector(sectionComplete).classList.add('is-shown');
		//core.loader('hide');
		core.uiFormBlock({'form': selectors.form, 'block': false});
		setTimeout(() => {
			popupApp.clear(); 
			resetWindows();
		}, 4000);
	};

	const initSubmit = () => {
		const form = document.querySelector(selectors.form);

		form.addEventListener('submit', function (e) {
			e.preventDefault();

			// validate form
			if (core.getFormValidation(form)) {
				return;
			} 
			core.uiFormBlock({'form': selectors.form, 'button': '.btn--submit'});
			// DEMO: ajax simulation (DEL ME)
			//core.loader();

			setTimeout(() => {
				initComplete(); 
				core.loader('hide');
			}, 2000);
			/*
			// send form data example
			const formData = new URLSearchParams(new FormData(form));

			const requestOptions = {
				method: 'POST',
				body: formData,
			};

			fetch('/client_account/feedback.json', requestOptions)
				.then(response => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then(data => {
					// success
				})
				.catch(error => {
					// console.error('Error:', error);
				})
				.finally(() => {
					// done logic
					core.loader('hide');
				});
			*/
		});
	};

	return {
		init: function () {
			initFormSelect();
			initSubmit();
		},
		resetWindows: resetWindows
	};
})();

// formHandlerApp
const formHandlerApp = (function () {
	let form, formSelector; 
	 
	const initSubmit = (el) => { 
			form = document.querySelector(formSelector);  
			if (core.getFormValidation(form)) return;  
		 
			if(formSelector === '.js-form-search' || formSelector === '.js-form-search-popup'){
				core.uiFormBlock({'form': formSelector, 'animation': false}); 
			}else{ 
				core.uiFormBlock({'form': formSelector}); 
			} 
			  
			const formData = new URLSearchParams(new FormData(form));
			const requestOptions = {
				method: 'POST',
				body: formData,
			}; 

			if(formSelector === '.js-form-search' || formSelector === '.js-form-search-popup'){
				core.loader();
				sendSearch('/search.json', requestOptions);
			} 
			if(formSelector === '.js-form-callback'){
				core.loader();
				sendCallback('/callback.json', requestOptions);
			} 
			if(formSelector === '.js-test-form'){
				sendTestForm('/test.json', requestOptions);
			} 

			
			
	};

	// send search data
	const sendSearch = (addr, requestOptions) => {
		setTimeout(function(){
			initComplete();
			core.loader('hide');
		}, 2000); 

 		/*
		!!!! EXAMPLE REQUEST
		fetch(addr, requestOptions)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				// success
			})
			.catch(error => {
				// console.error('Error:', error);
			})
			.finally(() => {
				// done logic
				core.loader('hide');
			});
		*/
	};

	// send callback data
	const sendCallback = (addr, requestOptions) => {
		setTimeout(function(){
			initComplete();
			core.loader('hide');
		}, 2000);  
	};

	// send callback data
	const sendTestForm = (addr, requestOptions) => {
		setTimeout(function(){
			initComplete(); 
		}, 2000);  
	};

	const initComplete = () => {
		form = document.querySelector(formSelector);
		const successMsg = form.querySelector('.form__group--complete');
		if(successMsg){
			successMsg.classList.add('is-shown');
		}
		core.uiFormBlock({'form': formSelector, 'block': false});
		setTimeout(() => core.getResetForm(form), 4000);
	};
  
	return {
		init: function (el) {
			formSelector = el;
			initSubmit(); 
		},
		initComplete 
	}
})();

document.addEventListener('DOMContentLoaded', function () {

	// init demo form
	const demoForm = document.querySelector('.js-test-form');
	if(demoForm){
		demoForm.addEventListener('submit', function (e) {
			e.preventDefault();
			formHandlerApp.init('.js-test-form');
		});
	}
	
	// init callbackform
	const formCallback = document.querySelector('.js-form-callback');
	if(formCallback){
		formCallback.addEventListener('submit', function (e) {
			e.preventDefault();
			formHandlerApp.init('.js-form-callback');
		});
	}

	// init search forms
	const formSearch = document.querySelectorAll('.js-form-search');
	if(formSearch){
		formSearch.forEach(search => { 
			search.addEventListener('submit', function (e) {
				e.preventDefault();
				formHandlerApp.init('.js-form-search');
			});
		}) 
	}

	const formSearchPopup = document.querySelectorAll('.js-form-search-popup');
	if(formSearchPopup){
		formSearchPopup.forEach(search => { 
			search.addEventListener('submit', function (e) {
				e.preventDefault();
				formHandlerApp.init('.js-form-search-popup');
			});
		}) 
	}

})

// init apps
core.init(); 
menuApp.init();
componentsApp.init();
appointmentApp.init();


// mobile toggle sections
const toggleSections = document.querySelectorAll('.section--toggle');
if(toggleSections){
	toggleSections.forEach((el) => {
		let title = el.querySelector('[data-toggle-title]');
		let content = el.querySelector('[data-toggle-content]');
		title.addEventListener('click', function () {
		  el.classList.toggle('is-open');
		}); 
	 });
}

// directions links
const directionsLinks  = document.querySelectorAll('.section--direction');
if(directionsLinks){
	directionsLinks.forEach(item => {
		let content = item.querySelector('.section__content');
		content.addEventListener('click', () => {
			content.classList.toggle('is-open');
		}) 
	})
}
 
// cards carousel
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
			576: {slidesPerView: 2, spaceBetween:20},
				992: {slidesPerView:3},
				1200: {slidesPerView:4},
				1400: {slidesPerView:4, spaceBetween:30}
			},
			navigation: {nextEl: btnNext ,prevEl: btnPrev},
		});
	})
}

// docs carousel
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
			0: {slidesPerView:1,spaceBetween:10},
			576: {spaceBetween:20,slidesPerView:2},
			992: {spaceBetween:20,slidesPerView:3},
				1200: {slidesPerView:2},
				1500: {slidesPerView:3, spaceBetween:30} 
			},
			navigation: {nextEl: btnNext ,prevEl: btnPrev},
		});
	})
}

// benefits carousel
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

// benefits Plastic Carousel
const benefitsPlasticCarousel = document.querySelectorAll('.js-benefits-plastic-carousel');
if(benefitsPlasticCarousel){ 
	benefitsPlasticCarousel.forEach(card => { 
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
				1200: {slidesPerView:3}  
			},
			navigation: {nextEl: btnNext ,prevEl: btnPrev},
		});
	})
}

// before carousel
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

// top carousel
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

// home main slider
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
 

// resize events
window.addEventListener('resize', () => {
	core.initResize();  
	
})  

// ESC handler
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') { 
		if(document.querySelector('.js-popup-show')){
			popupApp.clear();
		} 
	}
});