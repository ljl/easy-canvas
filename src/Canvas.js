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
