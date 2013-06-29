/**
 * User: Jeffrey
 * Date: 6/29/13
 * Time: 1:50 PM
 */

var canvas;
var ctx;
function init() {
    canvas = initFullScreenCanvas("mainCanvas");
    ctx = canvas.getContext("2d");
    repaint();
}

/**
 * Resizes the canvas element once the window is resized.
 * @param canvasId - string id of the canvas element
 */

function initFullScreenCanvas(canvasId) {
    canvas = document.getElementById(canvasId);
    resizeCanvas(canvas);

    window.addEventListener("resize", function() {
        resizeCanvas(canvas);
    });
    return canvas;
}

/**
 * Does the actual resize
 */

function resizeCanvas(canvas) {
    canvas.width = document.width || document.body.clientWidth;
    canvas.height = document.height || document.body.clientHeight;

    // Notify main game class that the canvas is resized
    console.log("the canvas was resized to " + canvas.width +"x" + canvas.height);

    // Paint something to see the effect of changed orientation
    repaint();
}


/**
 * Draw green bars for indication that
 * the page was reoriented
 */
function repaint() {
    if(!ctx) return;

    // Clear the background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    reorient();

    ctx.fillStyle = "darkgreen";
    ctx.fillRect(10, 10, 250, 30);
    ctx.fillRect(115, 10, 30, 250);
}

function reorient() {
    var angle = window.orientation;

    if(angle) {
        var rot = -Math.PI*(angle/ 180);
        ctx.translate(angle == -90 ? canvas.width : 0,
            angle == 90 ? canvas.height : 0);

        ctx.rotate(rot);
    }
}