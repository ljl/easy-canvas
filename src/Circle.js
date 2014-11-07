var ec = ec || {};
ec.Circle = function(canvas) {
    ec.FillObject.call(this, canvas);

    this.setHeight = function(value) {
        this.setWidth(value);
        return this;
    };

    this.getHeight = function() {
        return this.getWidth();
    };

    this.draw = function (noAdd) {
        canvas.addItem(this);
        if(this.getFillStyle()) {
            this.context.fillStyle = this.getFillStyle();
        }
        this.context.beginPath();
        this.context.arc(this.getX() + (this.getWidth()/2), this.getY() + (this.getWidth()/2), this.getWidth(), 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.closePath();
        return this;
    };
};
ec.Circle.prototype = Object.create(ec.FillObject.prototype);
