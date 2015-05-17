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