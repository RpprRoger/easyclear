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
            'contents': '&#x274C;',
            'style': {
                'font-size' : '1em',
                'color'     : 'red',
                'background': 'transparent',
                'cursor':     'pointer',
                'border':     '0',
                'padding':    '0',
                'margin':     '0',
                'line-height':'1'
            }
        };

    function Plugin( element, options ) {
        var $element = $( element );

        $.extend( this, {
            '$butt': null,
            '$element': $element,
            '$parent': $element.parent(),
            'options': $.extend( true, {}, defaults, options ),
            '_defaults': defaults,
            '_name': pluginName
        });

        this.init();
    };

    Plugin.prototype = {

        'init': function() {

            var position,
                self = this;

            this.$butt = $('<button>')
                    .html( this.options.contents )
                    .appendTo( this.$parent )
                    .css( this.options.style );

            this.$parent.css('position', 'relative');

            this.$element.css('position', 'relative');

            position = this.position();
            this.$butt.css({
                'position': 'absolute',
                'top': position.top,
                'left': position.left
            });

            this.$butt.on('click', function( evt ) {
                var $this = $(this);

                evt.preventDefault();

                self.$element
                    .val('')
                    .focus();
            });

        },

        'position': function() {

            var top = this.$element.position().top,
                left = this.$element.position().left,
                difference;

            difference = (this.$element.outerHeight() - this.$butt.outerHeight()) / 2

            top += this.$element.outerHeight() / 2;
            left += this.$element.outerWidth();

            left -= this.$butt.outerWidth();

            top -= difference;

            return {
                top: top,
                left: left
            };
        },

        'destroy': function() {

            this.$element.removeData( fullName );

            this.$element.off( '.' + pluginName );

            this.$parent.off( '.' + pluginName );
        }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, fullName) ) {
                $.data(this, fullName, new Plugin( this, options ));
            }
            return $.data(this, fullName);
        });
    };

})( jQuery, window, document );