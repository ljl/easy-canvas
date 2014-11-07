# easy-canvas
A tiny and incomplete javascript library for HTML5 canvas i made to try out canvas features.

## Usage
    var canvas = new ec.Canvas("canvasId");
    var myBox = new ec.Box(canvas);
    myBox.setX(100).setY(100).setWidth(50).setHeight(50).setFillStyle("blue").draw();
    
## Todo
- Fix function inheritance
- Fix game demo angle calculation
- Create tests