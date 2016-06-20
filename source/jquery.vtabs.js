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
				//hide all div content
				$($(this).find('a').attr('href')).invisible().height(0);

				//remove href active
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
				}

				//activate element href
				if ($(this).find('a').attr('href') === '#' + element.id) {
					$(this).addClass('active');

					//display selected anchors href DOM element
					$($(this).find('a').attr('href')).visible().hide().fadeIn().height('auto');
				}
			});
		}
	}

	//public methods
	$.extend(vTabs.prototype, {});

	//private methods
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

			//used clicked anchor href to check if DOM element is visible
			if ($($(this).attr('href')).css('visibility') === 'hidden') {
				$.each($(instance.element).find('li'), function () {
					$(this).removeClass('active');
					//hide all href anchor DOM elements
					$($(this).find('a').attr('href')).invisible().height(0);
				});

				$(this).parent().addClass('active');
				//display clicked anchors href DOM element
				$($(this).attr('href')).visible().hide().fadeIn().height('auto');
			}
		});
	}

	//inject jQuery methods
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