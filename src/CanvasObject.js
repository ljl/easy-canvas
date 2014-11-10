var ec = ec || {};
ec.CanvasObject = function(canvas) {
    if (!canvas instanceof ec.Canvas) throw new ec.CanvasException("Expected Canvas");
    this.context = canvas.context;

    this.offsetX = 0;
    this.offsetY = 0;
    this.width = 0;
    this.height = 0;
    this.fillStyle = null;

    this.getX = function () {
        return this.offsetX;
    };

    this.getY = function () {
        return this.offsetY;
    };

    this.getWidth = function () {
        return this.width;
    };

    this.getHeight = function () {
        return this.height;
    };

    this.setX = function (value) {
        if (!ec.isNumber(value)) throw new ec.CanvasException("Expected Number");
        this.offsetX = value;
        return this;
    };

    this.setY = function (value) {
        if (!ec.isNumber(value)) throw new ec.CanvasException("Expected Number");
        this.offsetY = value;
        return this;
    };

    this.setWidth = function (value) {
        if (!ec.isNumber(value)) throw new ec.CanvasException("Expected Number");
        this.width = value;
        return this;
    };

    this.setHeight = function (value) {
        if (!ec.isNumber(value)) throw new ec.CanvasException("Expected Number");
        this.height = value;
        return this;
    };

    this.move = function (x, y) {
        if (!ec.isNumber(x) || !ec.isNumber(y)) throw new ec.CanvasException("Expected Number");
        this.setX(x);
        this.setY(y);
        canvas.redraw();
    };
};