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
