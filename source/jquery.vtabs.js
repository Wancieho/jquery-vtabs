/*
 * TODO:
 * 
 * CTRL + mouse click = deselect
 * public method deactivate to disable plugin (destroy?)
 * injected jQuery methods may conflict if declared in a project using this plugin?
 * check for duplicate IDs and [*="#*"] on page and throw console error
 * should all [*="#*"] be anchors?
 */

;
(function ($) {
	'use strict';

	var pluginName = 'vTabs';
	var defaults = {
		activeTab: 0,
		active: true
	};
	var instance = null;

	function vTabs(element, options) {
		console.debug('instantiate');
		instance = this;
		instance.element = element;
		instance.settings = $.extend({}, defaults, options);

		events();
		instance.activateTab(this.settings.activeTab);
	}

	//public methods
	$.extend(vTabs.prototype, {
		activateTab: function (id) {
			if (instance.settings.active) {
				$.each($(instance.element).find('li'), function () {
					//hide all div content
					$($(this).find('a').attr('href')).invisible();

					//remove href active
					if ($(this).hasClass('active')) {
						$(this).removeClass('active');
					}
				});

				var li = id !== parseInt(id) ? $(instance.element).find('a[href="' + id + '"]').parent() : $(instance.element).find('li').eq(id);

				if (li.length === 0) {
					li = $(instance.element).find('li').eq(0);
				}

				//display selected anchors href DOM element
				$(li.addClass('active').find('a').attr('href')).visible().hide().fadeIn();
			} else {
				instance.reset(true);
			}
		},
		reset: function (hideFirst) {
			$(instance.element).find('li').removeClass('active');

			$.each($(instance.element).find('li'), function () {
				//hide all div content
				$($(this).find('a').attr('href')).invisible();
			});

			if (!hideFirst) {
				$($(instance.element).find('li').eq(0).addClass('active').find('a').attr('href')).visible();
			}
		}
	});

	//private methods
	function events() {
		$(instance.element).find('a').on('click', function (e) {
			console.debug($(instance.element));
			e.preventDefault();

			//used clicked anchor href to check if DOM element is visible
			if ($($(this).attr('href')).css('visibility') === 'hidden') {
				$.each($(instance.element).find('li'), function () {
					$(this).removeClass('active');
					//hide all href anchor DOM elements
					$($(this).find('a').attr('href')).invisible();
				});

				$(this).parent().addClass('active');
				//display clicked anchors href DOM element
				$($(this).attr('href')).visible().hide().fadeIn();
			}
		});
	}

	//inject jQuery methods
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
		console.debug(this);
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new vTabs(this, options));
			}
		});
	};
})(jQuery);