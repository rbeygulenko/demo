//import * as flsFunctions from "./modules/functions.js";

/*
function isWebp(){
    function testWebP(callback){
        let webP = new Image();
        webP.onload = webP.onerror = function (){
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,Uk1GRjoAAABXRUJQV1A4IC4AAACyAgCdASoCAAIALmk0mk0iTiTi";
        
    }
    testWebP(function(support){
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    })
} 

 isWebp();
 */


 var $body = $('body');
 var $ajaxUpdate = $('.js-update');
 var $ajaxLoader = $('.loader');
 var $ajaxPopupComplete = function(){popupApp.clear()}
 $body.append('<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>');
  
 var core = function () { 
	 return {
		 init: function () { 
			 core.initFixedHeader();
			 core.initDefault(); 
			 core.initResize();
			 core.initPhoneMask();     
			 core.initQty();  
			 //core.contentProtect();	
		 },
		 isTouchDevice: function() {
			 try{document.createEvent("TouchEvent");return true;}catch(e){return false;}
		 },
		 initResize: function(){
 
		  
			   
		 },
		 initFixedHeader: function(){ 
			 var fixed = false;
			 var height = 50;
		 $(window).scroll(function() { 
						 if($(this).scrollTop() > height) {
							 if(!fixed) {fixed = true;$body.addClass('js-fixed-header');}
						 }else{
							 if(fixed){fixed = false;$body.removeClass('js-fixed-header');}
						 }					
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
			 $('.form-control.error, .form-group.error .form-control').on('change keydown keyup', function(){
				 var item = $(this).parents('.form-group:first');
				 item.removeClass('error');
				 item.find('.form-control').removeClass('error');
				 item.find('.form-hint--error').remove();
			 }) 
		 },
		 findErrors: function(){ 
			 if($('.form-group.error').length){
				 var headerHeight = 20;
				 if($('.js-fixed-header').length){
					 headerHeight = parseInt($('.header').outerHeight()) + 20;
				 }
				  $('html,body').animate({ scrollTop: $('.form-group.error').first().offset().top - headerHeight }, 300);
			 } 
		 },
		 initPhoneMask: function(){
			 if($('.js-input--phone').length){$(".js-input--phone").mask('+9 (999) 999-99-99');}
			 if($('.js-input--time-from').length){$(".js-input--time-from").mask('99:99');}
			 if($('.js-input--time-to').length){$(".js-input--time-to").mask('99:99');}
		 },
		 initQty: function(){
			 $('.js-qty--input').each(function(){ 
				 var num = $(this).find('input'); 
				 $(this).find('.js-qty--plus').on('click', function(){ 
					 var inputVal = parseInt(num.val(), 10);
					 if ( inputVal <= 0 || !$.isNumeric(inputVal) ){inputVal = 0;}
					 num.val(++inputVal).trigger('change');
					 return false;
				 });	
				 $(this).find('.js-qty--minus').on('click', function(){ 
					 var inputVal = parseInt(num.val(), 10);
					 if ( inputVal < 1 || !$.isNumeric(inputVal) ) inputVal = 1;
					 num.val(--inputVal).trigger('change');
					 return false;
				 });	
			 });
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
				 
			 if(core.isTouchDevice()){$body.addClass('js-touchdevice')}
			 
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
 
			 var reviewsCarousel = new Swiper($('.js-reviews-carousel .swiper-container'), {
					 slidesPerView: 2,spaceBetween:10,
					 navigation: {
						 nextEl: '.js-reviews-carousel .swiper-button--next',
						 prevEl: '.js-reviews-carousel .swiper-button--prev',
					 },
				 breakpoints: {1380: {slidesPerView: 2 }, 0: {slidesPerView: 1 }},
					 
			 });
   
			 var sortLinksCarousel = new Swiper($('.js-sort-links--carousel .swiper-container'), {
			  spaceBetween: 15,freeMode: true, slidesPerView: 'auto',	
			 });
 
			 var tabLinksCarousel = new Swiper($('.js-tabs--carousel .swiper-container'), {
				 spaceBetween: 0,freeMode: true, slidesPerView: 'auto',	
			 });
  
		  
			 $('.js-resort-gallery').each(function(i){
				  var index = i;
				 $(this).addClass('js-resort-gallery-init-'+index);
				 var resortGalleryItem = $('.js-resort-gallery-init-'+index);  
				 var resortGallery = new Swiper(resortGalleryItem.find('.swiper-container'), {
					 slidesPerView: 1,spaceBetween:0, allowTouchMove:false, /*effect: 'fade',*/
					 navigation: {
					 nextEl: resortGalleryItem.find('.swiper-button--next'),
					 prevEl: resortGalleryItem.find('.swiper-button--prev'),
					 }  	
				 });
			 });
		  
 
			 var resortsCarousel = new Swiper('.js-resorts-carousel .swiper-container--main', { 
				 slidesPerView: 4,spaceBetween:14, watchSlidesVisibility:true,
				 navigation: {nextEl: '.js-resorts-carousel .swiper-buttons--blue .swiper-button--next',prevEl: '.js-resorts-carousel .swiper-buttons--blue .swiper-button--prev'},
				 breakpoints: {1380: {slidesPerView:4 },1200: {slidesPerView: 3 }, 768: {slidesPerView: 2 },0: {slidesPerView: 1 }},
			 });
  
 
			 var galleryThumbs = new Swiper('.js-gallery-thumbs .swiper-container', {
				 slidesPerView:4,
				 spaceBetween: 10, 
				 watchSlidesVisibility: true,
				 watchSlidesProgress: true,
			 });
		 
			 var galleryPreview = new Swiper('.js-gallery-preview .swiper-container', {
				 slidesPerView: 1,spaceBetween:0, watchSlidesVisibility:true,spaceBetween: 0,thumbs: {swiper: galleryThumbs},
				 navigation: {nextEl: '.room__gallery-preview .swiper-button--next',prevEl: '.room__gallery-preview .swiper-button--prev'},
			   })
 
			 // default tabs
			 $('.tabs-group').each(function(){
				 var t = $(this);
				 var links = t.find('.tabs-group__links .tabs-group__links-item');
				 var tabs = t.find('.tabs-group__content .tabs-group__tab'); 
				 tabs.hide().filter(':first').show();
				 links.filter(':first').addClass('is-selected');
				 links.click(function(){ 
			 
					 var target = $(this).data('tab');
					 tabs.hide();
					 $('.tabs-group__tab[data-target="'+target+'"]').show();
					 links.removeClass('is-selected').filter($(this)).addClass('is-selected');
				 })
			 })
 
			 // set rating
			 if($('.js-set--rating').length){$('.js-set--rating').rating();}
		  
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
		 }
	 };
 }();
 
  
  
 var popupApp = function () {  
	 return {
		 init: function () { 
			 $('.popup .js-close').on('click', function(){popupApp.success();});
		 },
		 clear:function(){
			 $body.removeClass('js-popup-show');
			 $('.popup').removeClass('is-state-b');
			 $('.popup .form-control').val('');
			 $('.popup.shown').removeClass('shown')
			 $('.popup .error').removeClass('error');
			 $('.popup').find('.form-hint--error').remove();	
		 },
		 success: function(a){
			 $body.removeClass('js-popup-show');
			 $('.popup.shown').removeClass('shown');
		 }, 
		 center: function (a) {
			 var name = a;
			 var popup = $('.popup-'+a);  
			 var wHeight = core.getViewPort().height / 2;
			 var pTopPos = $(document).scrollTop() - 20;
			 var pHeight = popup.outerHeight() / 2;
			 pHeight = Math.round(pHeight);
			 var pMarginTop = pTopPos + (wHeight - pHeight);
			 popup.removeAttr('style');
			 if(core.getViewPort().width <= 1024 || popup.outerHeight() > core.getViewPort().height){popup.css('top', pTopPos + 40);}else{popup.css('top', pMarginTop);}
			 $body.addClass('js-popup-show');
			 popup.addClass('shown').find('input[type=text]').first().focus(); 
		 }, 
		 open: function(a) { 
			 popupApp.clear();
			 popupApp.center(a);
		 }  
	 };
 }();
 
 core.init();
 popupApp.init();
  
 
  
 
 $(function () {
 
 
	 function declOfNum(n, text_forms) {  
		 n = Math.abs(n) % 100; var n1 = n % 10;
		 if (n > 10 && n < 20) { return text_forms[2]; }
		 if (n1 > 1 && n1 < 5) { return text_forms[1]; }
		 if (n1 == 1) { return text_forms[0]; }
		 return text_forms[2];
	 }
  
	 $('.js-minisearch-submit').on('click', function(){
		 $('.header .search--form').submit();
	 })
 
	 $('.js-scroll-to--room').on('click', function(){
		 $('.tabs-group--room .tabs-group__links-item').removeClass('is-selected');
		 $('.tabs-group--room .tabs-group__links-item[data-tab="rooms"]').trigger('click');
		 $('html,body').animate({ scrollTop: $('.tabs-group--room').offset().top - 130 }, 300);
	 })
 
	 $('.js-scroll-to--about').on('click', function(){
		 $('.tabs-group--room .tabs-group__links-item').removeClass('is-selected');
		 $('.tabs-group--room .tabs-group__links-item[data-tab="desc"]').trigger('click');
		 $('html,body').animate({ scrollTop: $('.tabs-group--room').offset().top - 130 }, 300);
	 })
 
	 $('.js-scroll-to--program').on('click', function(){
		 $('.tabs-group--room .tabs-group__links-item').removeClass('is-selected');
		 $('.tabs-group--room .tabs-group__links-item[data-tab="programs"]').trigger('click');
		 $('html,body').animate({ scrollTop: $('.tabs-group--room').offset().top - 130 }, 300);
	 })
 
	 $('.js-scroll-to--reviews').on('click', function(){
		 $('.tabs-group--room .tabs-group__links-item').removeClass('is-selected');
		 $('.tabs-group--room .tabs-group__links-item[data-tab="reviews"]').trigger('click');
		 $('html,body').animate({ scrollTop: $('.tabs-group--room').offset().top - 130 }, 300);
	 })
 
	 $('.js-other-resorts--toggle').on('click', function(){
		  $('.otherDestionations__list').toggleClass('is-open');
	 })
  
	 $('.js-date').daterangepicker({"parentEl":"#js-date--value","autoApply": true});
 
 
	 $('.js-menu-sub').on('click', function(){
		 $('.mainmenu').toggleClass('is-sub')
		 $(this).parents('.mainmenu__group').toggleClass('is-selected')
	 })
 
	 $('.js-menu-toggle').on('click', function(){
		 $body.toggleClass('js-show-menu')
	 })
 
	 $('.js-search-toggle').on('click', function(){
		 if($('.index-page').length){
			 $('html,body').scrollTop(0)
		 }else{
			 $body.toggleClass('js-show-minisearch')
		 }
	 })
	 $('.js-filter-toggle').on('click', function(){
		 $body.toggleClass('js-show-filter')
	 })
 
	 $('.js-room-toggle').on('click', function(){
		 $(this).parents('.resort:first').toggleClass('is-open')
	 })
 
	 $('.sbox--radio .item__value').on('change', function(){
		 var item = $(this).parents('.sbox--radio:first');
		 var selected = $(this).next().text();
		 item.find('.selected__value span').html(selected);
	 })
 
	 $('.sbox--check .item__value').on('change', function(){
		 var item = $(this).parents('.sbox--check:first');
		 var name = item.find('.selected__value span');
		 var input_all = item.find('.js-select--all');
		 var input_other = item.find('.js-select--other');
 
		 if(item.find('.js-select--other:checked').length > 0){
			 input_all.prop('checked', false)  
			 name.html(item.find('.js-select--other:checked').length+' '+declOfNum(item.find('.js-select--other:checked').length, ['destination', 'destinations', 'destinations']))
		 }else{
			 input_all.prop('checked', true);
			 name.html('all destionations')
		 } 
	 })
 
	 $('.sbox-qty').each(function(){
		 var item = $(this);
		 var name = item.find('.selected__value span')
		 var input = item.find('.qty_inputs-value')
		 var qty = 0;
		 item.find('.qty_inputs-value').on('change keyup keydown', function(){
			 qty = parseInt(item.find('.js-qty-value--adult').val()) + parseInt(item.find('.js-qty-value--children').val())	
			 if(qty < 1){
				 name.html('not chosen');
			 }else{
				 name.html(qty+' '+declOfNum(qty, ['person', 'person', 'persons']))
			 } 
		 }) 
	 })
  
	 $('.sbox .sbox__selected').on('click', function(e){
		 var sbox = $(this).parents('.sbox:first');
		 $('.sbox').not(sbox).removeClass('is-open');
		 sbox.toggleClass('is-open');
 
				 if(sbox.hasClass('sbox--date')){
 
					 $('#calendar-1').datepicker({
						 range: true,multipleDatesSeparator:' - ',
						 onSelect: function onSelect(fd, date) {
							 $('#calendar-1--value').val(fd)
							 $('#calendar-1--selected').html(fd)
						 }
					 })
 
					 $('#calendar-2').datepicker({
						 range: true,multipleDatesSeparator:' - ',
						 onSelect: function onSelect(fd, date) {
							 $('#calendar-2--value').val(fd)
							 $('#calendar-2--selected').html(fd)
						 }
					 })
 
					 $('#calendar-3').datepicker({
						 range: true,multipleDatesSeparator:' - ',
						 onSelect: function onSelect(fd, date) {
							 $('#calendar-3--value').val(fd)
							 $('#calendar-3--selected').html(fd)
						 }
					 }) 
				 } 
	 })
 
	 if(core.getViewPort().width > 991){
		 $('.sbox').on('click', function(e){
			 e.stopPropagation();
		 })
		 $(document).on('click touchstart', function (e) {
			 $('.sbox').removeClass('is-open');
		 });
	 }	
  
	 $('.popup-callback .js-submit').on('click', function(){ 
		 var name_error, phone_error = false;
		 var popup_handle = 'callback';
		 var popup = $(this).parents('.popup:first');
		 
		 var name = popup.find('.js-input--name');
		 var name_group = name.parents('.form-group:first');
 
		 var phone = popup.find('.js-input--phone');
		 var phone_group = phone.parents('.form-group:first');
		 var form_success = function(){popupApp.success(popup_handle);}
		 popup.find('.form-hint--error').remove();
 
		 if(name.val() == '') { 
			 name_error = true;
			 name_group.append('<div class="form-hint form-hint--error">'+name.data('validation-error')+'</div>')
			 name_group.addClass('error'); 
		 }else{
			 name_error = false; 
			 name_group.removeClass('error');
		 } 
 
		 if(phone.val() == '') { 
			 phone_error = true;
			 phone_group.append('<div class="form-hint form-hint--error">'+phone.data('validation-error')+'</div>')
			 phone_group.addClass('error'); 
		 }else{
			 phone_error = false; 
			 phone_group.removeClass('error');
		 } 
 
		 core.resetErrors();
 
		 if(name_error || phone_error) {return;}
 
		 // AJAX request here
		 core.showLoader();  
		 popup.addClass('is-state-b');
		 popupApp.center(popup_handle);
		 //window.setTimeout(form_success, 5000);
 
	 })
 
 
	 $('.popup-book-help .js-submit').on('click', function(){ 
		 var name_error, phone_error, email_error = false;
		 var popup_handle = 'book-help';
		 var popup = $(this).parents('.popup:first');
		 
		 var name = popup.find('.js-input--name');
		 var name_group = name.parents('.form-group:first');
 
		 var email = popup.find('.js-input--email');
		 var email_group = email.parents('.form-group:first');
 
		 var phone = popup.find('.js-input--phone');
		 var phone_group = phone.parents('.form-group:first');
 
		 var form_success = function(){popupApp.success(popup_handle);}
		 popup.find('.form-hint--error').remove();
 
		 if(name.val() == '') { 
			 name_error = true;
			 name_group.append('<div class="form-hint form-hint--error">'+name.data('validation-error')+'</div>')
			 name_group.addClass('error'); 
		 }else{
			 name_error = false; 
			 name_group.removeClass('error');
		 } 
 
		 if(phone.val() == '') { 
			 phone_error = true;
			 phone_group.append('<div class="form-hint form-hint--error">'+phone.data('validation-error')+'</div>')
			 phone_group.addClass('error'); 
		 }else{
			 phone_error = false; 
			 phone_group.removeClass('error');
		 } 
	  
		 if(!core.getEmailFilter().filter.test(email.val())) { 
			 emailerror = true;
			 email_group.append('<div class="form-hint form-hint--error">'+email.data('validation-error')+'</div>')
			 email_group.addClass('error'); 
		 }else{
			 email_error = false; 
			 email_group.removeClass('error');
		 } 
 
		 core.resetErrors();
 
		 if(name_error || phone_error || email_error) {return;}
 
		 // AJAX request here
		 core.showLoader();  
		 popup.addClass('is-state-b');
		 popupApp.center(popup_handle);
		 //window.setTimeout(form_success, 5000);
 
	 });
 
	 $('.popup-addreview .js-submit').on('click', function(){ 
		 var name_error, phone_error, resort_error = false;
		 var popup_handle = 'addreview';
		 var popup = $(this).parents('.popup:first');
		 
		 var name = popup.find('.js-input--name');
		 var name_group = name.parents('.form-group:first');
 
		 var resort = popup.find('.js-input--resort');
		 var resort_group = resort.parents('.form-group:first');
 
		 var phone = popup.find('.js-input--phone');
		 var phone_group = phone.parents('.form-group:first');
 
 
		 
		 var form_success = function(){popupApp.success(popup_handle);}
		 popup.find('.form-hint--error').remove();
 
		 if(name.val() == '') { 
			 name_error = true;
			 name_group.append('<div class="form-hint form-hint--error">'+name.data('validation-error')+'</div>')
			 name_group.addClass('error'); 
		 }else{
			 name_error = false; 
			 name_group.removeClass('error');
		 } 
 
		 if(resort.val() == '') { 
			 resort_error = true;
			 resort_group.append('<div class="form-hint form-hint--error">'+resort.data('validation-error')+'</div>')
			 resort_group.addClass('error'); 
		 }else{
			 resort_error = false; 
			 resort_group.removeClass('error');
		 } 
 
		 if(phone.val() == '') { 
			 phone_error = true;
			 phone_group.append('<div class="form-hint form-hint--error">'+phone.data('validation-error')+'</div>')
			 phone_group.addClass('error'); 
		 }else{
			 phone_error = false; 
			 phone_group.removeClass('error');
		 } 
	  
	  
 
		 core.resetErrors();
 
		 if(name_error || phone_error || resort_error) {return;}
 
		 // AJAX request here
		 core.showLoader();  
		 popup.addClass('is-state-b');
		 popupApp.center(popup_handle);
		 //window.setTimeout(form_success, 5000);
 
	 })
 
	 $('.form-help .js-submit').on('click', function(){ 
		 var name_error, phone_error, email_error = false;
		 var form = $(this).parents('.form:first');
		 
		 var name = form.find('.js-input--name');
		 var name_group = name.parents('.form-group:first');
 
		 var email = form.find('.js-input--email');
		 var email_group = email.parents('.form-group:first');
 
		 var phone = form.find('.js-input--phone');
		 var phone_group = phone.parents('.form-group:first');
 
		 var form_success = function(){
			 form.removeClass('is-success').find('.form-group--success').slideUp();
			 form.find('.form-control').val('');
		 }
		 form.find('.form-hint--error').remove();
 
		 if(name.val() == '') { 
			 name_error = true;
			 name_group.append('<div class="form-hint form-hint--error">'+name.data('validation-error')+'</div>')
			 name_group.addClass('error'); 
		 }else{
			 name_error = false; 
			 name_group.removeClass('error');
		 } 
 
		 if(!core.getEmailFilter().filter.test(email.val())) { 
			 emailerror = true;
			 email_group.append('<div class="form-hint form-hint--error">'+email.data('validation-error')+'</div>')
			 email_group.addClass('error'); 
		 }else{
			 email_error = false; 
			 email_group.removeClass('error');
		 } 
 
		 if(phone.val() == '') { 
			 phone_error = true;
			 phone_group.append('<div class="form-hint form-hint--error">'+phone.data('validation-error')+'</div>')
			 phone_group.addClass('error'); 
		 }else{
			 phone_error = false; 
			 phone_group.removeClass('error');
		 } 
	  
	  
 
		 core.resetErrors();
 
		 if(name_error || phone_error || email_error) {return;}
		 
		 // AJAX request here
		 core.showLoader();   
		 form.addClass('is-success').find('.form-group--success').slideDown();
		 window.setTimeout(form_success, 5000);
	 })
 
	 
	 $('.js-clear-handlers').on('click', function(){
		 $body.removeClass('js-show-minisearch');
		 $body.removeClass('js-show-search');
		 $body.removeClass('js-show-filter');
		 popupApp.clear();
 
	 })
 
	 
	 $(window).on('resize', function() {
		 core.initResize();  
	 })
		 
 
 
  
	 if($('.js-mainbox-slider').length && core.getViewPort().width > 576){
		 console.log(core.getViewPort().width)
		 $('.js-mainbox-slider').show()
		 var imageIndex = 0;
		 var imagesArray = $('.js-mainbox-slider .main-box__slider-item'); 
		 function changeBackground(){	
			 var index = imageIndex++ % imagesArray.length;
			 $('.js-mainbox-slider .main-box__slider-item').removeClass('is-shown');
			 $('.js-mainbox-slider .main-box__slider-item--'+index).addClass('is-shown'); 
		 }
		 $(document).ready(function() {setInterval(changeBackground, 5000);});
	 }else{ 
		 $('.js-mainbox-slider').hide()
	 }
 
 
 })
  
 
  