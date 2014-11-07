var ec = ec || {};
ec.Text = function(canvas) {
    this.context = canvas.context;

    this.font = null;
    this.fontSize = null;
    this.offsetX = null;
    this.offsetY = null;
    this.text = "";
    var isDrawn = false;

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

    this.setFont = function (value) {
        this.font = value;
        return this;
    };
    this.setFontSize = function (value) {
        this.fontSize = value;
        return this;
    };

    this.write = function(text) {
        this.text = text;
        if (isDrawn) {
            canvas.redraw();
        } else {
            this.draw();
        }
    };

    this.draw = function(noAdd) {
        if (!noAdd) canvas.addItem(this);
        this.context.font = this.fontSize + " " + this.font;
        this.context.fillText(this.text, this.offsetX, this.offsetY);
    }
};