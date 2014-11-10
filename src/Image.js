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