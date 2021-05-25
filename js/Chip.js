class Chip {

    constructor(x,y,radius,color,img,ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.size = this.radius * 2;
        this.color = color;
        this.img = img;
        this.ctx = ctx;
        this.draggable = true;
        this.startX = x;
        this.startY = y;
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = '#FFF';
        this.ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        this.ctx.fill();
        this.ctx.drawImage(this.img, this.x-this.radius, this.y-this.radius, this.size, this.size);
        this.ctx.closePath();
    }

    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }

    // Me estan clickeando?
    isHit(x, y) {
        // Math.sqrt((e.offsetX - this.x)*(e.offsetX - this.x) + (e.offsetY - this.y)*(e.offsetY - this.y) );
        // ** => operador de exponenciación ES7.
        return Math.sqrt((x - this.x)**2 + (y - this.y)**2 ) < this.radius;
    }

    updateXY(x,y) {
        this.x = x;
        this.y = y;
    }

    setDraggable(isDraggable) {
        this.draggable = isDraggable;
    }

    isDraggable() {
        return this.draggable;
    }

    returnToStart() {
        this.x = this.startX;
        this.y = this.startY;
        // this.draw();
    }

    getRadius() {
        return this.radius;
    }
    setRadius(r) {
        this.radius = r;
        this.size = this.radius * 2;
    }
}
