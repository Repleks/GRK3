function setup() {
    createCanvas(512,512);
    background(255);
}

var last_x=-1;
var last_y=-1;

function mouseDragged() {
    if(mouseButton != LEFT) return;
    if(last_x>0) {
        line(last_x,last_y,mouseX,mouseY);
    }
    last_x=mouseX;
    last_y=mouseY;
}
function mouseReleased() {
    last_x=last_y=-1;
    if(mouseButton == RIGHT) {
        loadPixels();
        flood_fill(mouseX,mouseY);
        updatePixels();
    }
}

function set_pixel(x,y,c) {
    idx=(y*512+x)*4;
    pixels[idx]=c;
    pixels[idx+1]=c;
    pixels[idx+2]=c;
    pixels[idx+3]=255;
}

function get_pixel(x,y) {
    idx=(y*512+x)*4;
    return pixels[idx];
}

function flood_fill(x, y) {
    let stack = [];
    stack.push([x, y]);

    while (stack.length > 0) {
        let [curX, curY] = stack.pop();

        if (curX < 0 || curY < 0 || curX >= 512 || curY >= 512) continue;

        let color = get_pixel(curX, curY);

        if (color !== 255) continue;

        set_pixel(curX, curY, 200);

        stack.push([curX + 1, curY]);
        stack.push([curX - 1, curY]);
        stack.push([curX, curY + 1]);
        stack.push([curX, curY - 1]);
    }
}
