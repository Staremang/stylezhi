/**
 * anchor.js - jQuery Plugin
 * Jump to a specific section smoothly
 *
 * @dependencies	jQuery v1.5.0 http://jquery.com
 * @author			Cornel Boppart <cornel@bopp-art.com>
 * @copyright		Author
 
 * @version		1.0.5 (02/11/2014)
 */

;(function ($) {
	
	window.anchor = {
		
		/**
		 * Default settings
		 *
		 */
		settings: {
			transitionDuration: 2000,
			transitionTimingFunction: 'swing',
			labels: {
				error: 'Couldn\'t find any section'
			}
		},

		/**
		 * Initializes the plugin
		 *
		 * @param	{object}	options	The plugin options (Merged with default settings)
		 * @return	{object}	this	The current element itself
		 */
		init: function (options) {
			// Apply merged settings to the current object
			$(this).data('settings', $.extend(anchor.settings, options));

			return this.each(function () {
				var $this = $(this);

				$this.unbind('click').click(function (event) {
					event.preventDefault();
					anchor.jumpTo(
						anchor.getTopOffsetPosition($this),
						$this.data('settings')
					);
				});
			});
		},

		/**
		 * Gets the top offset position
		 *
		 * @param	{object}	$object				The root object to get sections position from
		 * @return	{int}		topOffsetPosition	The top offset position
		 */
		getTopOffsetPosition: function ($object) {
			var href = $object.attr('href'),
				$section = $($(href).get(0)),
				documentHeight = $(document).height(),
				browserHeight = $(window).height();

			if (!$section || $section.length < 1) {
				throw new ReferenceError(anchor.settings.labels.error);
			}

			if (($section.offset().top + browserHeight) > documentHeight) {
				return documentHeight - browserHeight;
			} else {
				return $section.offset().top;
			}
		},
		
		/**
		 * Jumps to the specific position
		 *
		 * @param	{int}		topOffsetPosition	The top offset position
		 * @param	{object}	settings			The object specific settings
		 * @return	{void}
		 */
		jumpTo: function (topOffsetPosition, settings) {
			var $viewport = $('html, body');

			$viewport.animate(
				{scrollTop: topOffsetPosition},
				settings.transitionDuration,
				settings.transitionTimingFunction
			);

				// Stop the animation immediately, if a user manually scrolls during the animation.
			$viewport.bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(event){
				if (event.which > 0 || event.type === 'mousedown' || event.type === 'mousewheel') {
					$viewport.stop().unbind('scroll mousedown DOMMouseScroll mousewheel keyup');
				}
			});
		}

	};

	$.fn.anchor = function (method) {
			// Method calling logic
		if (anchor[method]) {
			return anchor[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return anchor.init.apply(this, arguments);
		} else {
			return $.error('Method ' + method + ' does not exist on jQuery.anchor');
		}
	};

})(jQuery);

if (typeof ymaps !== "undefined" && typeof addr !== "undefined") {
	ymaps.ready(init);
	var yaMap;
	function init() {
		ymaps.geocode(addr, {
			results: 1
		}).then(function (res) {

			var coords = res.geoObjects.get(0).geometry.getCoordinates(),
				myPlacemark = new ymaps.Placemark(coords);
			yaMap = new ymaps.Map("map",{
				center: coords,
				zoom: 17,
				controls: ['zoomControl', 'fullscreenControl']
			});

			yaMap.geoObjects.add(myPlacemark);
		});
	}
}
if (typeof(jQuery) !== "undefined") {
	$(document).ready(function () {
		if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
			$('.section-hero__video').hide();
			$('.section-hero__video-overlay').hide();
		}
		
//		$('input[data-custom-placeholder]')
//			.focus(function() {
//				$('label[for="' + $(this).attr('id') + '"]').addClass('active');
//			})
//			.blur(function() {
//				if ($(this).val() == '') {
//					$('label[for="' + $(this).attr('id') + '"]').removeClass('active');
//				}
//			})

		$('.nav-menu-btn').click(function() {
			if ($(this).hasClass('open')) {
				$(this).removeClass('open');
//				$(this).children('.nav-menu-btn__text').html('Открыть меню')
				$('.menu-mobile').removeClass('active');
				$('body').css('overflow', 'auto');
			} else {
				$(this).addClass('open');
//				$(this).children('.nav-menu-btn__text').html('Закрыть меню');
				$('.menu-mobile').addClass('active');
				$('body').css('overflow', 'hidden');
			}
		})
		$('.menu-mobile__link').click(function () {
			$('.menu-mobile').removeClass('active');
			$('.nav-menu-btn').removeClass('open');
			$('body').css('overflow', 'auto');
			
			
			
			var href = $(this).attr('href'),
				$section = $($(href).get(0)),
				documentHeight = $(document).height(),
				browserHeight = $(window).height(),
				offsetTop;

			if (!$section || $section.length < 1) {
				throw new ReferenceError(anchor.settings.labels.error);
			}

			if (($section.offset().top + browserHeight) > documentHeight) {
				offsetTop = documentHeight - browserHeight;
			} else {
				offsetTop = $section.offset().top;
			}
			
			
			$('html, body').animate({ scrollTop: offsetTop }, 1000)
		})
		
		
		
		
		
		var popup = false;
		$('.popup').hide();
		
		
		function showPopup (el) {
			$('body').css('overflow', 'hidden');
			el.addClass('active');
			el.fadeIn();
			popup = true;
		}
		
		function hidePopup (el) {
			el.fadeOut();
			el.removeClass('active');
			$('body').css('overflow', 'auto');
			popup = false;
		}
		
		
		$('[data-popup]').click(function (e) {
			e.preventDefault();
			if (popup) {
				hidePopup($('.popup.active'));
			} else {
				showPopup($('#' + $(this).attr('data-popup')));
			}
		})
		
		$('.popup').click(function(e) {
			if ($(e.target).hasClass('popup')) {
				hidePopup($(this));
			}
		})
		$('.popup__btn-close').click(function () {
			hidePopup($(this).parents('.popup'));
		})
//		
//		
//		$('form').on('submit', function (e) {
//			e.preventDefault();
//			
//			
//			var popupBlock = $(e.target).parent();
//			if (popupBlock.attr('id') == 'callme') {
//				if ($('#callme-name').val() == '' || $('#callme-tel').val() == '' || $('#callme-email').val() == '') {
//					alert('Не все поля заполнены');
//					return;
//				}
//			} else if (popupBlock.attr('id') == 'registration'){
//				if ($('#promo-game').prop("checked") == false && $('#test-game').prop("checked") == false && $('#one-hour-of-play').prop("checked") == false) {
//					alert('Не все поля заполнены');
//					return;
//				}
//				
//				if ($('#registration-name').val() == '' || $('#registration-tel').val() == '' || $('#registration-date').val() == '') {
//					alert('Не все поля заполнены');
//					return;
//				}
//			}
//			if (typeof yaCounter47279892 != 'undefined') {
//				yaCounter47279892.reachGoal('zayavka');
//			} else {
//				console.log('Adblock detected')
//			}
//			var data = $(this).serialize(),
//				htmlText = popupBlock.find('.popup-wrapper__btn').html();
//			
//			$.ajax({
//				type: "POST",
//				url: url,
//				data: data,
//				beforeSend: function () {
//					popupBlock.find('.popup-wrapper__btn').html('Отправка...');
//				},
//				error: function () {
//					popupBlock.find('.popup-wrapper__btn').html('Ошибка');
//					setTimeout(function () {
//						popupBlock.find('.popup-wrapper__btn').html(htmlText);
//					}, 5000)
//				},
//				success: function () {
//					if (popupBlock.attr('id') == 'registration') {
//						alert("Благодарим за заявку! Мы перезвоним вам в ближайшее время для подтверждения бронирования");
//					} else if (popupBlock.attr('id') == 'callme') {
//						alert("Благодарим за заявку! Мы перезвоним вам в ближайшее время");
//					}
//					
//					hidePopup(popupBlock);
//					popupBlock.find('.popup-wrapper__btn').html(htmlText);
//				}
//			});
//		})
		
		
		// interview-form
		// guest-visit-form
		// call-me-form
		// guest-visit-form-m
		// thanks-and-gift-form
		
		$('form').on('submit', function (e) {
			e.preventDefault();
			var data = $(this).serialize(),
				id = $(this).attr('id'),
				sentForms = JSON.parse(localStorage.getItem('sentForms'));
				submitBtn = $(this).find('button[type="submit"]');


			console.log(data);

			if (!sentForms || sentForms == '') {
				sentForms = {
					"interview": false,
					"guestVisit": false,
					"gift": false,
					"callMe": false
				}
			}
			

			if (id == 'interview-form') {
				if (sentForms.interview) {
					alert('Вы уже проходили опрос!');
					return;
				} else {
					sentForms.interview = true;
				}

			} else if (id == 'guest-visit-form' || id == 'guest-visit-form-m') {
				if (sentForms.guestVisit) {
					alert('Вы уже записались на гостевой визит!');
					hidePopup ($('#guest-visit-m'));
					return;
				} else {
					sentForms.guestVisit = true;
				}

			} else if (id == 'call-me-form') {
				if (sentForms.callme) {
					alert('Вы уже отправляли эти данные!');
					hidePopup ($('#call-me'));
					return;
				} else {
					sentForms.callme = true;
				}

			} else if (id == 'thanks-and-gift-form') {
				if (sentForms.gift) {
					alert('Вы уже отправляли эти данные!');
					hidePopup ($('#thanks-and-gift'));
					return;
				} else {
					sentForms.gift = true;
				}

			}



			$.ajax({
				type: "POST",
				url: url,
				data: data,
				beforeSend: function () {
					submitBtn.attr('disabled', '');
				},
				error: function (error) {
					alert('Ошибка ' + error.status + '. Повторите позднее.');
					submitBtn.removeAttr('disabled');
				},
				success: function (data) {
					data = JSON.parse(data);
					if (data.sended) {

						if (id == 'interview-form') {
							$('#gift-parent-name').val($('#6-step-name').val());
							showPopup ($('#thanks-and-gift'));

							if (typeof yaCounter47707927 != 'undefined') {
								yaCounter47707927.reachGoal('karta');
							} else {
								console.log('Adblock detected')
							}

						} else if (id == 'guest-visit-form') {
							
							$('#gift-parent-name').val($('#guest-visit-form__name').val());
							showPopup ($('#thanks-and-gift'));

							if (typeof yaCounter47707927 != 'undefined') {
								yaCounter47707927.reachGoal('gostevoi');
							} else {
								console.log('Adblock detected')
							}

						} else if (id == 'call-me-form') {

							if (typeof yaCounter47707927 != 'undefined') {
								yaCounter47707927.reachGoal('zvonok');
							} else {
								console.log('Adblock detected')
							}
							hidePopup ($('#call-me'));
							showPopup ($('#thanks'));

						} else if (id == 'guest-visit-form-m') {

							if (typeof yaCounter47707927 != 'undefined') {
								yaCounter47707927.reachGoal('gostevoi');
							} else {
								console.log('Adblock detected')
							}
							hidePopup ($('#guest-visit-m'));
							
							$('#gift-parent-name').val($('#guest-visit-m-form__name').val());
							showPopup ($('#thanks-and-gift'));

						} else if (id == 'thanks-and-gift-form') {

							if (typeof yaCounter47707927 != 'undefined') {
								yaCounter47707927.reachGoal('podarok');
							} else {
								console.log('Adblock detected')
							}
							hidePopup ($('#thanks-and-gift'));
							showPopup ($('#thanks'));
						}

						gtag('event', 'sendforms', { 'event_category': 'zayavka', 'event_action': 'podtverdit'});
						localStorage.setItem('sentForms', JSON.stringify(sentForms));
						submitBtn.removeAttr('disabled');

					} else {
						alert (data.message);
					}
					
				}
			});
		});
		
		function errorMessage () {
			alert('Выберите ответ!');
		}
		
		$('#bonus-1').show();
		$('#interview-go-to-2').click(function () {
			if ($('#1-step-new').prop("checked") || $('#1-step-old').prop("checked")) {
				$('.step__item').removeClass('active');
				$('#interview-step-2').addClass('active');
				$('.step__discount-count').html('4000 р')
				$('#bonus-2').show();
				$('#step-scale-2').addClass('active');
			} else {
				errorMessage();
			}
		})
		$('#interview-go-to-3').click(function () {
			if ($('#2-step-alone').prop("checked") || $('#2-step-w-friends').prop("checked") || $('#2-step-w-family').prop("checked")) {
				$('.step__item').removeClass('active');
				$('#interview-step-3').addClass('active');
				$('.step__discount-count').html('6000 р')
				$('#bonus-3').show();
				$('#step-scale-3').addClass('active');
			} else {
				errorMessage();
			}
		})
		$('#interview-go-to-4').click(function () {
			if ($('#3-step-24m').prop("checked") || $('#3-step-12m').prop("checked") || $('#3-step-6m').prop("checked")) {
				$('.step__item').removeClass('active');
				$('#interview-step-4').addClass('active');
				$('.step__discount-count').html('8000 р')
				$('#bonus-4').show();
				$('#step-scale-4').addClass('active');
			} else {
				errorMessage();
			}
		})
		$('#interview-go-to-5').click(function () {
			if ($('#4-step-any-time').prop("checked") || $('#4-step-17h').prop("checked") || $('#4-step-weekend').prop("checked")) {
				$('.step__item').removeClass('active');
				$('#interview-step-5').addClass('active');
				$('.step__discount-count').html('10000 р')
				$('#bonus-5').show();
				$('#step-scale-5').addClass('active');
			} else {
				errorMessage();
			}
		})
		$('#interview-go-to-6').click(function () {
			$('.step__item').removeClass('active');
			$('#interview-step-6').addClass('active');
		})
		
		$('.scheme-list__item').hover(
			function() {
				$('.scheme-map__pin[data-pin="' + $(this).attr('data-pin') + '"]').addClass('active');
			},
			function() {
				$('.scheme-map__pin').removeClass('active');
			}
		);
		
		$('.scheme-map__pin').hover(
			function() {
				$('.scheme-list__item[data-pin="' + $(this).attr('data-pin') + '"]').addClass('active');
			},
			function() {
				$('.scheme-list__item').removeClass('active');
			}
		)
		$('.scheme-list__btn-up').click(function() {
			$('.scheme-list__container').animate({ scrollTop: 0 }, 500);
		})
		$('.scheme-list__btn-down').click(function() {
			$('.scheme-list__container').animate({ scrollTop: 700 }, 500);
		})
		
		
		$('a[data-anchor]').anchor({
			transitionDuration : 1000
		});
		
		$('input[type=tel]').inputmask({
			'mask': '+7 (999) 999-99-99'
		})
		
		$('input[type=email]').inputmask({
			'alias': 'email'
		})
//		$('input[name="name"]').inputmask({
//			'mask': 'a{1,}'
//		})
//		
		$('.services-slider').addClass('owl-carousel owl-carousel_no-dots owl-theme');
		$('.services-slider').owlCarousel({ 
			loop: true,
			nav: false,
			navText: [ '', '' ],
			items: 1,
//			autoHeight: true,
//				autoWidth:true, 
//				center:true,
//			onInitialized: sliderChange,
//				onChanged: test,
//			onTranslated: sliderChange,
			responsive : {
				768 : {
					nav: true
				}
			}
		})
//		function sliderChange (e) {
//
//			var owlItems  = e.item.count,
//				item      = e.item.index,
//				calcItem  = Math.floor(item - (e.item.count / 2) + 1);
//
//			if (calcItem === 0) {
//				calcItem = owlItems;
//			}
//			if (calcItem > owlItems) {
//				calcItem = 1;
//			}
//
////				console.log($(e.target).find('.owl-item.active').children().attr('alt'));
////			console.log(calcItem + '/' + owlItems + " " + $(e.target).find('.owl-item.active').children().attr('alt'));
//
////				var index = e.item.index + 1,
////					count = e.item.count;
//			if (calcItem < 10) {
//				calcItem = '0' + String(calcItem);
//			}
//			if (owlItems < 10) {
//				owlItems = '0' + String(owlItems);
//			}
//			$('.gallery__index').html(calcItem);
//			$('.gallery__count').html(owlItems);
//			$('.gallery__title').html($(e.target).find('.owl-item.active').children().attr('alt'));
//
//		}
	})
	
}