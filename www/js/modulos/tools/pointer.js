var Tools = Tools ||  {};

(function(){
  Tools.pointer = {
      click : function(e){},
      mousemove : function(e){
        if(typeof Paint.shapeSelected != "undefined" && Paint.shapeSelected != ""){
          var mouse = Paint.getMouse(e);
          var shape = Paint.shapeSelected;

          if(typeof this.diff_x == "undefined" || this.diff_x == ""){
            this.diff_x = mouse.x - shape.left
            this.diff_y = mouse.y - shape.top;
          }

          shape.left = mouse.x - this.diff_x;
          shape.top = mouse.y - this.diff_y;
        }
      },
      dblclick : function(e){
        var mouse = Paint.getMouse(e);
        Paint.shapeSelected = Paint.getShape(mouse.x,mouse.y);
        console.log(Paint.shapeSelected);
      },
      mousedown : function(e){
        Paint.shapeSelected = "";
        if(this.diff_x != ""){
          this.diff_x = "";
          this.diff_y = "";
        }
      },
      mouseup : function(e){}
  };
}());
