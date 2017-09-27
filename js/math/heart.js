;(function($) {

    var defaults = {
        width: 100,
        height: 100,
        scale: 2
    };

    $.fn.extend({
        drawHeart: function (options) {
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
            var context = canvas.getContext("2d");
            context.strokeStyle = "red";
            context.beginPath();
            var t = -3;
            var x = 0;
            var y = 0;
            var nx = 0;
            var ny = 0;
            var intervalID;

            function drawHeart(dx, dy, scale) {
                if(t > 3) {
                    //setTimeout(reDraw, 1000);
                    return;
                }
                x = 16 * Math.pow(Math.sin(t), 3);
                y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

                intervalID = setInterval(drawLine, 10, dx, dy, scale);
            }

            function reDraw() {
                context.clearRect(0, 0, width, height);
                t = -3;

                context.beginPath();
                drawHeart(halfWidth, halfHeight, drawOptions.settings.scale);
            }

            function drawLine(dx, dy, scale) {
                //console.log("x:" + x + ",y:" + y);
                nx = dx + x * scale;
                ny = dy + y * scale;

                context.lineTo(nx, height - ny);
                context.stroke();

                t += 0.025;

                clearInterval(intervalID);
                drawHeart(dx, dy, scale);
            }

            function sleep(milliSeconds){
                var startTime = new Date().getTime(); // get the current time
                while (new Date().getTime() < startTime + milliSeconds); // hog cpu
            }

            drawHeart(halfWidth, halfHeight, drawOptions.settings.scale);

            return this;
        }
    });
})(jQuery);