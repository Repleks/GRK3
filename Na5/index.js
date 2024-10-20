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
    draw_line_bresenham();
    updatePixels();
}

function set_pixel(x, y, c) {
    let idx = (y * 512 + x) * 4;
    pixels[idx] = c;
    pixels[idx + 1] = c;
    pixels[idx + 2] = c;
    pixels[idx + 3] = 255;
}

function draw_line_bresenham() {
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let swapped = false;

    if (dy > dx) {
        [x0, y0] = [y0, x0];
        [x1, y1] = [y1, x1];
        [dx, dy] = [dy, dx];
        [sx, sy] = [sy, sx];
        swapped = true;
    }

    let err = dx - dy;

    while (true) {
        if (swapped) set_pixel(y0, x0, 0);
        else set_pixel(x0, y0, 0);

        if (x0 === x1 && y0 === y1) break;

        let e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}