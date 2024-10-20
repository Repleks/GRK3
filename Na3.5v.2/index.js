function setup() {
    createCanvas(512, 512);
    background(255);
}

var x0=-1;
var y0=-1;
var x1=-1;
var y1=-1;

function mousePressed() {
    x0 = mouseX;
    y0 = mouseY;
}

function mouseDragged() {
    x1 = mouseX;
    y1 = mouseY;
    background(255);
    noStroke();
    fill('red');
    ellipse(x0 - 3, y0 - 3, 6);
    fill('green');
    ellipse(x1 - 3, y1 - 3, 6);
}

function mouseReleased() {
    background(255);
    loadPixels();
    draw_line_with_colour();
    updatePixels();
}

function set_pixel_rgb(x, y, r, g, b) {
    let idx = (y * 512 + x) * 4;
    pixels[idx] = r;
    pixels[idx + 1] = g;
    pixels[idx + 2] = b;
    pixels[idx + 3] = 255;
}

function draw_line_with_colour() {
    let dx = x1 - x0;
    let dy = y1 - y0;

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {

            let D = 2 * dy * (x - x0) - 2 * dx * (y - y0);

            if (D < -dx || D > dx) {
                if (D < 0) {
                    set_pixel_rgb(x, y, 255, 0, 0);
                } else {
                    set_pixel_rgb(x, y, 0, 255, 0);
                }
            } else {
                set_pixel_rgb(x, y, 0, 0, 0);
            }
        }
    }
}