var ec = ec || {};
ec.FillObject = function (canvas) {
    ec.CanvasObject.call(this, canvas);
    this.fillStyle = null;


    this.getFillStyle = function () {
        return this.fillStyle;
    };

    this.setFillStyle = function (value) {
        this.fillStyle = value;
        return this;
    };
};
ec.FillObject.prototype = Object.create(ec.CanvasObject.prototype);