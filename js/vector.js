class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;

        return this;
    }

    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;

        return this;
    }

    times(val) {
        this.x *= val;
        this.y *= val;

        return this;
    }

    distance(from) {
        return Math.sqrt(Math.pow(this.x - from.x, 2) + Math.pow(this.y - from.y, 2));
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    toAngle() {
        return Math.atan(this.x / this.y);
    }

    static fromAngle(a) {
        return new Vector(Math.sin(a), Math.cos(a));
    }
}