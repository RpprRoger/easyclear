/*
 *  Project: clearInput
 *  Description:
 *  Author:
 *  License:
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "easyClear",
        fullName = "plugin_" + pluginName,
        defaults = {
            contents: '&#x274C;',
            style: {
                'font-size' : '1em',
                'color'     : 'red',
                'background': 'transparent'
            }
        };

    function Plugin( element, options ) {
        this.$element = $(element);

        this.options = $.extend( true, {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    };

    Plugin.prototype = {

        init: function() {

            var $parent = this.$element.parent(),
                $butt = $('<span>').html( this.options.contents ).appendTo( $parent ).css( this.options.style );

        },

        destroy: function() {

            this.$element.removeData( fullName );

            this.$element.off('.' + pluginName);

        }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, fullName)) {
                $.data(this, fullName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );