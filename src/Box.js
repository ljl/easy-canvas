var ec = ec || {};
ec.Box = function(canvas) {
    ec.FillObject.call(this, canvas);

    this.draw = function (noAdd) {
        canvas.addItem(this);
        if(this.getFillStyle()) {
            this.context.fillStyle = this.getFillStyle();
        }
        this.context.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        return this;
    }
};
ec.Box.prototype = Object.create(ec.FillObject.prototype);