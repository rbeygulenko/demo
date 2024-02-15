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
		  let bodyTag = document.querySelector('body')
		  bodyTag.classList.remove.apply(bodyTag.classList, Array.from(bodyTag.classList).filter(v=>v.startsWith('js-')));
		},
		hideLoader: function(){ 
			$body.classList.remove('js-loader-show');
		 },
		 showLoader: function(a){       
			$body.classList.add('js-loader-show');        
		 },
		resetErrors : function(){  
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

			  /*
			// scroll top  
			$('.js-scroll-top').on('click', function(){
				window.scrollTo(0, 0);
				return false;
			})
			*/

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
 
			// resize trigger
			window.addEventListener('resize', () => {
				core.initResize();
			})

		},
		initCarousels: function(){ 
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
			core.resetErrors();
 
		}
	};
}();
 
// init mods
core.init(); 
  
// reset handlers
document.querySelector('.js-clear-handlers').addEventListener('click', () => {
	core.clearHandlers(); 
})

// show msg
const cardButton = document.querySelectorAll('.js-msg-toggle');
if(cardButton.length){
	cardButton.forEach(btn => {
		btn.addEventListener('click', () => {
			$body.classList.add('js-show-bottom-msg');
		})
	})
}

// show footer more
document.querySelector('.js-footer-more').addEventListener('click', () => {
	document.querySelector('.footerBox--text .footerBox__content').classList.add('is-open');
})
 

// product card carousel
const productsCard = document.querySelectorAll('.js-product-card');
if(productsCard.length){
	productsCard.forEach(card => {
		let carousel = card.querySelector('.swiper');
		let btnNext = card.querySelector('.js-button-right');
		let btnPrev = card.querySelector('.js-button-left');
		let pager = card.querySelector('.js-swiper-pagination'); 
		const productsCarousel = new Swiper(carousel, { 
			spaceBetween:0,
			slidesPerView: 1, 
			navigation: {nextEl: btnNext ,prevEl: btnPrev},
			pagination: {el: pager,clickable: false}
		});
	})
}