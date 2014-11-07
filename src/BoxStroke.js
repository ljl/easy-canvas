var ec = ec || {};
ec.BoxStroke = function(canvas) {
    ec.StrokeObject.call(this, canvas);

    this.draw = function (noAdd) {
        if (!noAdd) canvas.addItem(this);
        ec.StrokeObject.prototype.draw.call(this);
        this.context.strokeRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        return this;
    }
};
ec.BoxStroke.prototype = Object.create(ec.StrokeObject.prototype);