/*
 * Project: vTabs
 * Description: Simplistic and unstyled tabs
 * Author: https://github.com/Wancieho
 * License: MIT
 * Version: 0.1.1
 * Dependancies: jquery-1.*
 * Date: 10/02/2016
 */
;
(function ($, window, document, undefined) {
	'use strict';

	var pluginName = 'vTabs';

	function vTabs(element) {
		this.element = element;

		this.__construct();
	}

	$.extend(vTabs.prototype, {
		__construct: function () {
			this.setup();
			this.events();
		},
		setup: function () {
			var tabControlIsActive = false;

			$.each($(this.element).find('li'), function () {
				if ($(this).hasClass('active')) {
					tabControlIsActive = true;
				}
			});

			if (!tabControlIsActive) {
				$(this.element).find('li:first-child').addClass('active');

				$.each($(this.element).find('li'), function () {
					$($(this).find('a').attr('href')).hide();
				});

				$($(this.element).find('li:first-child').find('a').attr('href')).show();
			}
		},
		events: function () {
			var scope = this;

			$(this.element).find('a').on('click', function (e) {
				e.preventDefault();

				if ($($(this).attr('href')).is(':hidden')) {
					$.each($(scope.element).find('li'), function () {
						$(this).removeClass('active');
						$($(this).find('a').attr('href')).hide();
					});

					$(this).parent().addClass('active');
					$($(this).attr('href')).fadeIn();
				}
			});
		}
	});

	$.fn[pluginName] = function () {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				new vTabs(this);
			}
		});
	};
})(jQuery, window, document);