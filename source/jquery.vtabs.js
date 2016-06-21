;
(function ($) {
	'use strict';

	var pluginName = 'vTabs';
	var defaults = {
		activeTab: 0
	};
	var instance = null;

	function vTabs(element, options) {
		instance = this;
		instance.element = element;
		instance.settings = $.extend({}, defaults, options);

		events();
		instance.activateTab(this.settings.activeTab);
	}

	//public methods
	$.extend(vTabs.prototype, {
		activateTab: function (id) {
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
		}
	});

	//private methods
	function events() {
		$(instance.element).find('a').on('click', function (e) {
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
			$(this).css('visibility', 'visible').height('auto');
		});
	};

	$.fn.invisible = function () {
		return this.each(function () {
			$(this).css('visibility', 'hidden').height(0);
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