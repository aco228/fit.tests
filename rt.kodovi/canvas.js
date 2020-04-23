var canvas = {
  canvas: null,
  ctx: null,
  width: 0,
  height: 0,
  lineWidth: 1,
  cubeWidth: 55,

  set: function(){
    this.canvas = document.getElementById("cvs");
    this.canvas.width = $('#cvs').width();
    this.width = this.canvas.width;
    this.canvas.height = $('#cvs').height() * 2;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext("2d");
  },

  reset: function(){
    this.ctx.translate(-.5, -.5);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.translate(0.5, 0.5);
  },

  resetLine: function(){
    this.ctx.setLineDash([]);
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = this.lineWidth;
  },


  // draw cube (one segment)
  drawCube: function(i){
    this.ctx.beginPath();
    this.ctx.fillStyle =  i % 2 != 0  ? '#fff' : '#ffffe7';
    this.ctx.fillRect(i * this.cubeWidth, 0, this.cubeWidth, this.height);
    this.ctx.stroke();

    this.ctx.setLineDash([5, 3]);
    this.ctx.lineWidth = .3;
    this.ctx.beginPath();
    this.ctx.moveTo(i * this.cubeWidth, 0.3);
    this.ctx.lineTo(i * this.cubeWidth, this.height + 0.3);
    this.ctx.strokeStyle = '#cacaca';
    this.ctx.stroke();

    this.resetLine();
  },

  margin: 25,
  lastX: 0,
  lastY: 0,

  prepare: function(){
    this.lastX = 0;
    this.lastY = this.margin;
  },

  drawSegments: function(index, input){
    var segmentWidth = this.cubeWidth / input.length;
    var hadFirst = false;
    var y = 0, x = index * this.cubeWidth;
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = "#bb9726";
    var bamChar = $('.adits[part-of=bamiChar]').find('input').val();


    for(var i = 0; i < input.length; i++)
    {
      switch(input[i]){
        case '_':
          y = this.height - this.margin;
          break;
        case '-':
          y = this.margin;
          break;
        case bamChar:
          y = this.height / 2;
          break;
      }

      x += segmentWidth;

      if(index == 0 && !hadFirst){
        console.log('zero');
        this.lastY = y;
        hadFirst = true;
      }

      if(y == this.lastY)
        this.drawLine(this.lastX, this.lastY, x, y);
      else
      {
        this.drawLine(this.lastX, this.lastY, this.lastX, y);
        this.drawLine(this.lastX, y, x, y);
      }
      this.lastX = x;
      this.lastY = y;
    }
    
    this.resetLine();
  },

  drawLine: function(fromX, fromY, toX, toY){
    //console.log('drawing', 'fromX', fromX, 'fromY', fromY, 'toX', toX, 'toY', toY);
    this.ctx.beginPath();
    this.ctx.moveTo(fromX + 0.1, fromY + 0.1);
    this.ctx.lineTo(toX + 0.1, toY + 0.1);
    this.ctx.stroke();
  },

  drawMiddleLine: function(numOfEntries){
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.height / 2 + 0.5);
    this.ctx.lineTo(numOfEntries * this.cubeWidth, this.height / 2 + 0.5);
    this.ctx.stroke();
  }



}