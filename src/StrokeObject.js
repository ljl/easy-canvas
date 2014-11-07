var ec = ec || {};
ec.StrokeObject = function (canvas) {
    ec.CanvasObject.call(this, canvas);

    this.strokeStyle = null;

    this.getStrokeStyle = function () {
        return this.fillStyle;
    };

    this.setStrokeStyle = function (value) {
        this.fillStyle = value;
        return this;
    };

    this.draw = function() {
        if(this.getFillStyle()) {
            this.context.strokeStyle = this.getStrokeStyle();
        }
    };

};
ec.StrokeObject.prototype = Object.create(ec.CanvasObject.prototype);