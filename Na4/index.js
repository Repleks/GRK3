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
    draw_line_midpoint();
    updatePixels();
}

function set_pixel(x, y, c) {
    let idx = (y * 512 + x) * 4;
    pixels[idx] = c;
    pixels[idx + 1] = c;
    pixels[idx + 2] = c;
    pixels[idx + 3] = 255;
}

function draw_line_midpoint() {
    let dx = x1 - x0;
    let dy = y1 - y0;

    let Dp = 2 * dy - dx;
    let Deq = 2 * dy;
    let Dinc = 2 * (dy - dx);

    let y = y0;

    for (let x = x0; x <= x1; x++) {
        set_pixel(x, y, 0);

        if (Dp < 0) {
            Dp += Deq;
        } else {
            y++;
            Dp += Dinc;
        }
    }
}