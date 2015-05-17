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
