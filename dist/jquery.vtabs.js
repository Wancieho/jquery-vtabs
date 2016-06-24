/*
 * Project: vTabs
 * Description: A simplistic un-styled jQuery tab plug-in
 * Author: https://github.com/Wancieho
 * License: MIT
 * Version: 0.4.0
 * Dependancies: jquery-1.*
 * Date: 24/06/2016
 */

;
(function ($) {
	'use strict';

	var pluginName = 'vTabs';
	var defaults = {
		activeTab: 0,
		active: true
	};

	function vTabs(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);

		this.privateMethodScopeAssignment();
		this.activateTab(this.settings.activeTab);
	}

	$.extend(vTabs.prototype, {
		privateMethodScopeAssignment: function () {
			events.apply(this);
		},
		activateTab: function (id) {
			var scope = this;

			if (this.settings.active) {
				$.each($(this.element).find('li'), function () {
					$($(this).find('a').attr('href')).invisible();

					if ($(this).hasClass('active')) {
						$(this).removeClass('active');
					}
				});

				var li = id !== parseInt(id) ? $(scope.element).find('a[href="' + id + '"]').parent() : $(scope.element).find('li').eq(id);

				if (li.length === 0) {
					li = $(scope.element).find('li').eq(0);
				}

				$(li.addClass('active').find('a').attr('href')).visible().hide().fadeIn();
			} else {
				scope.reset(true);
			}
		},
		reset: function (hideFirst) {
			var scope = this;
			$(this.element).find('li').removeClass('active');

			$.each($(this.element).find('li'), function () {
				$($(this).find('a').attr('href')).invisible();
			});

			if (!hideFirst) {
				$($(scope.element).find('li').eq(0).addClass('active').find('a').attr('href')).visible();
			}
		}
	});

	function events() {
		var scope = this;

		$(this.element).find('a').on('click', function (e) {
			e.preventDefault();

			if ($($(this).attr('href')).css('visibility') === 'hidden') {
				$.each($(scope.element).find('li'), function () {
					$(this).removeClass('active');
					$($(this).find('a').attr('href')).invisible();
				});

				$(this).parent().addClass('active');
				$($(this).attr('href')).visible().hide().fadeIn();
			}
		});
	}

	$.fn.visible = function () {
		return this.each(function () {
			$(this).css('visibility', 'visible').css('overflow', 'auto').height('auto');
		});
	};

	$.fn.invisible = function () {
		return this.each(function () {
			$(this).css('visibility', 'hidden').css('overflow', 'hidden').height(0);
		});
	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new vTabs(this, options));
			}
		});
	};
})(jQuery);