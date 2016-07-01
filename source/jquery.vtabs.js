/*
 * TODO:
 * 
 * CTRL + mouse click = deselect
 * public method deactivate to disable plugin (destroy?)
 * injected jQuery methods may conflict if declared in a project using this plugin?
 * check for duplicate IDs and [*="#*"] on page and throw console error
 * should all [*="#*"] be anchors?
 * !when hiding/displaying tabs rather use data() so that we can slide tabs in/out
 */

;
(function ($) {
	'use strict';

	var pluginName = 'vTabs';
	var defaults = {
		activeTab: 0,
		active: true,
		selfClickHide: true
	};

	function vTabs(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);

		this.privateMethodScopeAssignment();
		this.activateTab(this.settings.activeTab);
	}

	//public methods
	$.extend(vTabs.prototype, {
		privateMethodScopeAssignment: function () {
			events.apply(this);
		},
		activateTab: function (id) {
			var scope = this;

			if (this.settings.active) {
				$.each($(this.element).find('li'), function () {
					//hide all div content
					$($(this).find('a').attr('href')).invisible();

					//remove href active
					if ($(this).hasClass('active')) {
						$(this).removeClass('active');
					}
				});

				var li = id !== parseInt(id) ? $(scope.element).find('a[href="' + id + '"]').parent() : $(scope.element).find('li').eq(id);

				if (li.length === 0) {
					li = $(scope.element).find('li').eq(0);
				}

				//display selected anchors href DOM element
				$(li.addClass('active').find('a').attr('href')).visible().hide().fadeIn();
			} else {
				scope.reset(true);
			}
		},
		reset: function (hideFirst) {
			var scope = this;
			$(this.element).find('li').removeClass('active');

			$.each($(this.element).find('li'), function () {
				//hide all div content
				$($(this).find('a').attr('href')).invisible();
			});

			if (!hideFirst) {
				$($(scope.element).find('li').eq(0).addClass('active').find('a').attr('href')).visible();
			}
		}
	});

	//private methods
	function events() {
		var scope = this;

		$(this.element).find('a').on('click', function (e) {
			e.preventDefault();

			//used clicked anchor href to check if DOM element is visible
			if ($($(this).attr('href')).css('visibility') === 'hidden') {
				$.each($(scope.element).find('li'), function () {
					$(this).removeClass('active');

					//hide all href anchor DOM elements
					$($(this).find('a').attr('href')).invisible();
				});

				$(this).parent().addClass('active');

				//display clicked anchors href DOM element
				$($(this).attr('href')).visible().hide().fadeIn();
			} else if (scope.settings.selfClickHide) {
				$(this).parent().removeClass('active');

				$($(this).attr('href')).invisible();
			}
		});
	}

	//inject jQuery methods
	//#TODO: make only available to this plugin
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