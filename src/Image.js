var ec = ec || {};
ec.Image = function (canvas) {
    ec.CanvasObject.call(this, canvas);
    this.imageEl = null;

    this.fromUrl = function(url) {
        var that = this;
        var imageEl = this.imageEl = document.createElement("img");
        imageEl.src = url;
        console.log("setting source", url, imageEl);
        imageEl.addEventListener("load", function() {
            canvas.addItem(that);
            canvas.context.drawImage(imageEl, 0,0,849,565);
        });
        return this;
    };

    this.draw = function() {
        canvas.context.drawImage(this.imageEl, 0,0,849,565);
    }
};
ec.Image.prototype = Object.create(ec.CanvasObject.prototype);