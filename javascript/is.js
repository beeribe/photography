/*
 * jQuery InstaStream - A jQuery plugin for the Instagram API
 * Version 0.1
 * http://www.exibit.be
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;
(function($, window, undefined) {

    // Create the defaults once
    var pluginName = 'instastream',
            document = window.document,
            defaults = {
                instaUser: '1011689',
                instaMenu: 'yes'
            };

    var $nbrResults;
    var $instaUrl;
    var $slideStatus = 0;
    // Constructor
    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Date converter 
    String.prototype.timeconverter = function() {
        var a = new Date(this * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year;
        return time;
    };

    // Stream function
    $.fn.createStream = function(slide, target) {
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            cache: false,
            url: $instaUrl,
            success: function(data) {
                var ul = '<ul class="gallery-a">';
                var count = 0;
                $.each(data.data, function(k, v) {
                    console.log(count);
                    if (count == 21) {
                        ul += '</ul>';
                        ul += '<li><a href="' + v.images.standard_resolution.url + '"><img src="' + v.images.standard_resolution.url + '" alt="Placeholder" width="160" height="160"></a></li>';
                        count=0;
                    } else {
                        ul += '<li><a href="' + v.images.standard_resolution.url + '"><img src="' + v.images.standard_resolution.url + '" alt="Placeholder" width="160" height="160"></a></li>';
                    }
                count++;
                });
                ul += "";
                $(target).append(ul);
            }
        }).done(function() {
            $('.gallery-a li a').append('<div class="fit-a"></div>');
            $('.slider-a').wrapInner('<div class="inner"></div>');
            $('.slider-a .gallery-a').wrap('<div class="wrapper"></div>');
            $('.slider-a').append('<span class="prev"></span><span class="next"></span>');
            var slider = $('.slider-a > .inner').bxSlider({ pager: false, controls: true, useCSS: false, prevSelector: $('.slider-a span.prev'), nextSelector: $('.slider-a span.next') });
            $('#content p, #content h1, #content h2, #content h3, #content h4, #content h5, #content h6, #content li, #content figure, #content ul, #content ol').each(function() {
                $(this).waypoint(function() {
                    $(this).addClass('fading');
                }, {offset: '90%'});
            });
            //$(".slider-a").addClass("slider-as");
        });

    }

    Plugin.prototype.init = function() {

        // Initial variables
        $instaUrl = 'https://api.instagram.com/v1/users/' + this.options.instaUser + '/media/recent/?client_id=' + this.options.instaToken + "&count=25";
//https://api.instagram.com/v1/users/[USER ID]/media/recent/?client_id=[CLIENT ID]
        var $myContainer = this.element;

        $().createStream($slideStatus, $myContainer);

    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
}(jQuery, window));
 