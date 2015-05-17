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
					ctx.fillStyle = this.colorSelected;
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
	this.contains = function(mx, my) {
		console.log(this);
		console.log(mx,my);
		return  (mx >= this.left && mx <= this.width + this.left) && (my >= this.top && my <= this.top + this.height);
	}
}
var Tools = (function(){
	return{
		selectedTool: "",
		pointer : {
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
			mouseup : function(e){
			
			}
		},
		rect: {
			click : function(e){ },
			mousemove : function(e){},
			dblclick : function(e){},
			mousedown : function(e){
				var mouse = Paint.getMouse(e)
				this.startLeft = mouse.x;
				this.startTop  = mouse.y;
			},
			mouseup : function(e){
				var mouse = Paint.getMouse(e)
				this.endLeft = mouse.x;
				this.endTop  = mouse.y;
				
				//calcula o tamanho do shape
				var width  = Math.abs(this.endLeft - this.startLeft);
				var height = Math.abs(this.endTop - this.startTop);
				
				//pega o menor ponto x,y
				var left = (this.startLeft <= this.endLeft ) ? this.startLeft : this.endLeft; 
				var top  = (this.startTop <= this.endTop ) ? this.startTop : this.endTop;
				
				//Cria um novo shape
				Paint.addRetangulo(new Shape(left,top,height,width));
				
				//Zerando variaveis
				this.startLeft = this.endLeft = this.startTop = this.endTop = 0;
			}
		}
	}
})();

//Canvas
var canvas = document.getElementById("container");
var ctx = canvas.getContext("2d");
	
//Eventos
canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);

canvas.addEventListener('click',function(e){
	Tools.selectedTool.click(e);
});

canvas.addEventListener('dblclick', function(e) {
	Tools.selectedTool.dblclick(e);
},true);

canvas.addEventListener('mousemove',function(e){
	if(typeof Tools.selectedTool !== "undefined" && Tools.selectedTool !== "")
		Tools.selectedTool.mousemove(e);
});

canvas.addEventListener('mousedown',function(e){
	if(typeof Tools.selectedTool !== "undefined" && Tools.selectedTool !== "")
		Tools.selectedTool.mousedown(e);
});

canvas.addEventListener('mouseup',function(e){
	if(typeof Tools.selectedTool !== "undefined" && Tools.selectedTool !== "")
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

/* INIT */
Paint.init();