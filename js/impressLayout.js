/**
 * impressLayout.js
 *
 * Automatic slide layout utility for impress.js.  Inspired by https://gist.github.com/daithiocrualaoich/4269195.
 */
(function ( document, window ) {

    var allLayouts = {};

    var impressLayout = window.impressLayout = function(rootId) {

        rootId = rootId || 'impress';

        // if given root is already initialized just return the API
        if (allLayouts[rootId]) {
            return allLayouts[rootId];
        }

        var init = function() {
            var steps = document.getElementsByClassName("step");

            var r = 9000;
            for (var i = 0; i < steps.length; i++) {
                var factor = ((Math.random() * 10) % 2) == 0 ? 1 : -1;
                var theta = -i/(steps.length-1) * 2 * Math.PI;
                var x = r * Math.cos(theta);
                var y = r * Math.sin(theta);
                var rotation = (theta/(2*Math.PI) * 360 - 90) * factor;

                steps[i].setAttribute("data-x", Math.round(x).toString());
                steps[i].setAttribute("data-y", Math.round(y).toString());
                steps[i].setAttribute("data-rotate-z", Math.round(rotation).toString());
                steps[i].setAttribute("data-rotate", Math.round(rotation).toString());
            }

            var overview = document.getElementById("start");
            overview.setAttribute("data-x", "0");
            overview.setAttribute("data-y", "0");
            overview.setAttribute("data-scale", "4");

            // Disable click to move to step.
            document.addEventListener("click", function() { event.cancelBubble = true; }, true);
        };

        allLayouts[rootId] = { init:init }
        return allLayouts[rootId];
    };
})(document, window);