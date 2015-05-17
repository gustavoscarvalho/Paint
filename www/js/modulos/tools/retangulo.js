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
