/*
 * Project: vTabs
 * Description: Simplistic and unstyled tabs
 * Author: https://github.com/Wancieho
 * License: MIT
 * Version: 0.1.2
 * Dependancies: jquery-1.*
 * Date: 10/02/2016
 */
;
(function ($) {
	'use strict';

	var pluginName = 'vTabs';
	var instance = null;

	function vTabs(element) {
		if (instance === null) {
			instance = this;
			this.element = element;

			setup();
			events();
		}
		else {
			$.each($(instance.element).find('li'), function () {
				$($(this).find('a').attr('href')).invisible().height(0);

				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				}

				if ($(this).find('a').attr('href') === '#' + element.id) {
					$(this).addClass('active');

					$($(this).find('a').attr('href')).visible().hide().fadeIn().height('auto');
				}
			});
		}
	}

	$.extend(vTabs.prototype, {});

	function setup() {
		var tabControlIsActive = false;

		$.each($(instance.element).find('li'), function () {
			if ($(this).hasClass('active')) {
				tabControlIsActive = true;
			}
		});

		if (!tabControlIsActive) {
			$(instance.element).find('li:first-child').addClass('active');

			$.each($(instance.element).find('li'), function () {
				$($(this).find('a').attr('href')).invisible().height(0);
			});

			$($(instance.element).find('li:first-child').find('a').attr('href')).visible().hide().fadeIn().height('auto');
		}
	}

	function events() {
		$(instance.element).find('a').on('click', function (e) {
			e.preventDefault();

			if ($($(this).attr('href')).css('visibility') === 'hidden') {
				$.each($(instance.element).find('li'), function () {
					$(this).removeClass('active');
					$($(this).find('a').attr('href')).invisible().height(0);
				});

				$(this).parent().addClass('active');
				$($(this).attr('href')).visible().hide().fadeIn().height('auto');
			}
		});
	}

	$.fn.invisible = function () {
		return this.each(function () {
			$(this).css('visibility', 'hidden');
		});
	};

	$.fn.visible = function () {
		return this.each(function () {
			$(this).css('visibility', 'visible');
		});
	};

	$.fn[pluginName] = function () {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				new vTabs(this);
			}
		});
	};
})(jQuery);