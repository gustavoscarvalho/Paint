var Paint = (function(){
	return {
		colorSelected : "#000",
		shapeSelected : "",
		collection 	  : [],
		redraw		  : false,
		getShape	  : function(left,top){
			var size = this.collection.length;
			for(i =0; i< size; i++){
				if(this.collection[i].contains(left,top))
					return this.collection[i];
			}
		},
		getMouse : function(e) {
			var element = canvas, offsetX = 0, offsetY = 0, mx, my;

			if (element.offsetParent !== undefined) {
				do {
				  offsetX += element.offsetLeft;
				  offsetY += element.offsetTop;
				} while ((element = element.offsetParent));
			}

			mx = e.pageX - offsetX;
			my = e.pageY - offsetY;

			return {x: mx, y: my};
		},
		addRetangulo  : function(shape){
			this.collection.push(shape);
			this.redraw = true;
		},
		refresh : function(){
			if(this.redraw){
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				for(var i = 0; i < this.collection.length; i++){
					var shape = this.collection[i];
					ctx.fillStyle = shape.background;
					ctx.fillRect(shape.left, shape.top, shape.width, shape.height);
				}
			}
		},
		init : function(){
			window.setInterval(function(){ Paint.refresh(); });
		}
	};
})();

var Shape = function(left,top,height,width){
	this.left = 0 || left;
	this.top  = 0 || top;
	this.height = 0 || height;
	this.width  = 0 || width;
	this.background = "#fff";
	this.contains = function(mx, my) {
		return  (mx >= this.left && mx <= this.width + this.left) && (my >= this.top && my <= this.top + this.height);
	}
}


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

var Tools = Tools ||  {};
(function(){
  Tools.rect = {
    selectedRect : "",
    action : "",
    mousemove : function(e){
      if(this.action == "new"){
        //Pegando a posição final
        var mouse = Paint.getMouse(e);
        this.endLeft = mouse.x;
        this.endTop  = mouse.y;

        //calcula o tamanho do shape
        var width  = Math.abs(this.endLeft - this.startLeft);
        var height = Math.abs(this.endTop - this.startTop);

        //pega o menor ponto x,y
        var left = (this.startLeft <= this.endLeft ) ? this.startLeft : this.endLeft;
        var top  = (this.startTop <= this.endTop ) ? this.startTop : this.endTop;

        //Se não existir nenhum retangulo criado, cria um;
        if(this.selectedRect == ""){
          var s = new Shape(left,top,height,width);
          s.background = Paint.colorSelected;
          Paint.addRetangulo(s);
          this.selectedRect = s;
        }else{
          //Se existir, atualiza o retangulo
          this.selectedRect.left = left;
          this.selectedRect.top = top;
          this.selectedRect.width = width;
          this.selectedRect.height = height;
          this.selectedRect.background = Paint.colorSelected;
          Paint.redraw = true;
        }
      }
    },
    mousedown : function(e){
      var mouse = Paint.getMouse(e)
      this.startLeft = mouse.x;
      this.startTop  = mouse.y;
      this.action = "new";
    },
    mouseup : function(e){
      this.selectedRect = "";
      this.action = "";
      this.startLeft = this.endLeft = this.startTop = this.endTop = 0;
    }
  };
}());

//Canvas
var canvas = document.getElementById("container");
var ctx = canvas.getContext("2d");

//Eventos
canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

canvas.addEventListener('click',function(e){
	if(typeof Tools.selectedTool !== "undefined" && Tools.selectedTool !== "")
		if(typeof Tools.selectedTool.click == "function")
			Tools.selectedTool.click(e);
});

canvas.addEventListener('dblclick', function(e) {
	if(typeof Tools.selectedTool !== "undefined" && Tools.selectedTool !== "")
		if(typeof Tools.selectedTool.dblclick == "function")
			Tools.selectedTool.dblclick(e);
});

canvas.addEventListener('mousemove',function(e){
	if(typeof Tools.selectedTool !== "undefined" && Tools.selectedTool !== "")
		if(typeof Tools.selectedTool.mousemove == "function")
			Tools.selectedTool.mousemove(e);
});

canvas.addEventListener('mousedown',function(e){
	if(typeof Tools.selectedTool !== "undefined" && Tools.selectedTool !== "")
		if(typeof Tools.selectedTool.mousedown == "function")
			Tools.selectedTool.mousedown(e);
});

canvas.addEventListener('mouseup',function(e){
	if(typeof Tools.selectedTool !== "undefined" && Tools.selectedTool !== "")
		if(typeof Tools.selectedTool.mouseup == "function")
			Tools.selectedTool.mouseup(e);

});

//Adiciona evento as ferramentas
var tools = document.getElementsByClassName("ferramentas-item");
var size = tools.length;
for(var i = 0; i < size; i++){
  var ferramenta = tools[i];
  ferramenta.addEventListener('click',function(){
		if(typeof this.dataset.tools !== "undefined"){
			if(this.dataset.tools != "")
				Tools.selectedTool = Tools[this.dataset.tools];

			if(this.dataset.cursor != "")
				canvas.style.cursor = this.dataset.cursor;
		}
  });
}

Tools.selectedTool = Tools.pointer;

//Adiciona evento para trocar de cursor
var color = document.getElementById("colorSelected");
color.addEventListener('change',function(){
	Paint.colorSelected = this.value;
});


/* INIT */
Paint.init();
