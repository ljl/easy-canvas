var ec = ec || {};
ec.Canvas = function(elementId) {
    var objects = [];
    this.context = document.getElementById(elementId).getContext('2d');

    this.redraw = function () {
        this.context.clearRect(0, 0, 300, 150);
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
