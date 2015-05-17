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
				canvas.className = this.dataset.cursor;
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
