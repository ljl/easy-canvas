var ec = ec || {};
ec.Text = function (canvas) {
    this.context = canvas.context;

    this.font = null;
    this.fontSize = null;
    this.offsetX = null;
    this.offsetY = null;
    this.text = "";
    this.width = null;
    var lines = [];
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

    this.setWidth = function (value) {
        if (!ec.isNumber(value)) throw new ec.CanvasException("Expected Number");
        this.width = value;
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

    this.getFontSizeValue = function () {
        if (this.fontSize) {
            return this.fontSize.split("px")[0];
        }
    };

    this.write = function (text) {
        this.text = text;
        if (isDrawn) {
            canvas.redraw();
        } else {
            this.draw();
            isDrawn = true;
        }
    };

    this.sliceText = function (text) {
        var slicedText = [];
        var lastIndex = 0;
        var maxIndex = text.length;

        for (var i = 1; i <= maxIndex; i++) {
            var tempText = text.substring(lastIndex, i);
            var textWidth = this.context.measureText(tempText).width;
            var nextText = text.substring(lastIndex, i + 1);
            var nextWidth = this.context.measureText(nextText).width;

            if (textWidth <= this.width) {
                if (i == maxIndex) {
                    slicedText.push(tempText);
                } else if (nextWidth > this.width) {
                    slicedText.push(tempText);
                    lastIndex = i;
                }
            }

        }
        return slicedText;
    };

    this.draw = function () {
        canvas.addItem(this);
        this.context.font = this.fontSize + " " + this.font;
        if (this.width) {
            var lines = this.sliceText(this.text);
            for (var line in lines) {
                this.context.fillText(lines[line], this.offsetX, this.offsetY + (line * this.getFontSizeValue()));
            }
        } else {
            this.context.fillText(this.text, this.offsetX, this.offsetY);
        }

    }
};