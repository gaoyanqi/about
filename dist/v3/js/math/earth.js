;(function($) {

    var defaults = {
        width: 100,
        height: 100,
        scale: 2
    };

    $.fn.extend({
        drawEarth: function (options) {
            var drawOptions = {};
            drawOptions.settings = $.extend({}, defaults, options);

            var el = this;
            var that = $(this);

            var width = drawOptions.settings.width;
            var height = drawOptions.settings.height;
            var halfWidth = width / 2;
            var halfHeight = height / 2;

            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            el.append(canvas);

            var texture = "images/earth512.jpg";
			createSphere(canvas, texture);

            return this;
        }
    });
})(jQuery);