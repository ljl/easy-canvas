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
var ec = ec || {};
ec.BoxStroke = function(canvas) {
    ec.StrokeObject.call(this, canvas);

    this.draw = function (noAdd) {
        canvas.addItem(this);
        ec.StrokeObject.prototype.draw.call(this);
        this.context.strokeRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        return this;
    }
};
ec.BoxStroke.prototype = Object.create(ec.StrokeObject.prototype);
var ec = ec || {};
ec.Canvas = function(elementId, optionParams) {
    var objects = [];
    var options = {
        "width": 300,
        "height": 150
    };

    // Override default options
    if (optionParams) {
        for (var option in options) {
            if (optionParams[option]) {
                options[option] = optionParams[option];
            }
        }
    }

    this.element = document.getElementById(elementId);
    this.context = this.element.getContext('2d');

    this.element.height = options.height;
    this.element.width = options.width;



    this.redraw = function () {
        this.context.clearRect(0, 0, options.width, options.height);
        for (var obj in objects) {
            objects[obj].draw();
            this.context.fillStyle = "#000000"; // reset styles before drawing a new object
            this.context.drawStyle = "#000000";
        }
    };

    this.addItem = function (item) {
        if (!this.hasObject(item)) objects.push(item);
    };

    this.removeItem = function (item) {
        var idx = objects.indexOf(item);
        objects.splice(idx, 1);
    };

    this.hasObject = function (object) {
        return objects.indexOf(object) != -1;
    }

};

ec.isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

ec.CanvasException = function(message) {
    this.message = message;
    this.name = "CanvasException";
};

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

var ec = ec || {};
ec.Image = function (canvas) {
    ec.CanvasObject.call(this, canvas);
    this.imageEl = null;

    this.fromUrl = function(url) {
        var that = this;
        var imageEl = this.imageEl = document.createElement("img");
        imageEl.src = url;
        imageEl.addEventListener("load", function() {
            console.log(imageEl.width);
            that.setWidth(imageEl.width);
            that.setHeight(imageEl.height);
            canvas.addItem(that);
            canvas.context.drawImage(imageEl, that.getX(),that.getX(),that.getWidth(),that.getHeight());
        });
        return this;
    };

    this.draw = function() {
        canvas.context.drawImage(this.imageEl, this.getX(),this.getY(),this.getWidth(),this.getHeight());
    }
};
ec.Image.prototype = Object.create(ec.CanvasObject.prototype);
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