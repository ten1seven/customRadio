/*! jquery.customRadio.js v 0.10 | Author: Jeremy Fields [jeremy.fields@viget.com], 2013 | License: MIT */

(function($) {

	$.customRadio = function(el, options) {
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;

		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;

		// Add a reverse reference to the DOM object
		base.$el.data("customRadio", base);

		// init
		base.init = function() {
			base.options = $.extend({},$.customRadio.defaultOptions, options);

			base.vars();

			//
			if (base.$el.is(':checked')) {
				base.$parent.addClass(base.options.checked);
			}

			base.$el.on({
				'focus.replace': function() {
					base.$parent.addClass(base.options.focused);
				},
				'blur.replace': function() {
					base.$parent.removeClass(base.options.focused);
				},
				'click.replace': function() {
					if (base.$el.is(':checked')) {
						if (base.$el.attr('type') === 'radio') {
							base.$siblings.closest('label').removeClass(base.options.checked);
						}
						base.$parent.addClass(base.options.checked);
					} else {
						base.$parent.removeClass(base.options.checked);
					}
				}
			});
		};

		// variables
		base.vars = function() {
			base.$el.off('focus.replace blur.replace click.replace');
			base.$parent = base.$el.closest('label').addClass(base.options.init);
			base.$siblings = $('input[name="' + base.$el.attr('name') + '"]').not(base.$el);
		};

		// Run initializer
		base.init();
	};

	$.customRadio.defaultOptions = {
		init: "control-replace-js",
		checked: "control-checked",
		focused: "control-focused"
	};

	$.fn.customRadio = function(options) {
		return this.each(function() {
			(new $.customRadio(this, options));
		});
	};

})(jQuery);
