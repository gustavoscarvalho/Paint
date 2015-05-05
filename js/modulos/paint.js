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