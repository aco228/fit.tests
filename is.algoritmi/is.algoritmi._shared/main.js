

function Main(){

  this.init = function(){
    var self = this;
    $('body').on('click', '.btnAddNode', function(){
      var parent = $(this).closest('.node');
      var node = self.getNode(parent.attr('id'));
      if(node == null) {
        console.error('WTF? ' + parent.attr('id'));
        return;
      }
      node.add();
      self.update();
    });

    $('body').on('click', '.btnRemoveNode', function(){
      var id = $(this).closest('.node').attr('id');
      if(root.id == id)
        return;

      if(!confirm('Siguran?')) return;
      self.getNode(id).remove();
      if(typeof self.update === 'function')
        self.update();
    });

    $('body').on('click', '.btnFindThisOne', function(){
      var parent = $(this).closest('.node');
      var isSelected = parent.hasClass('nodeSelected');

      $('.nodeSelected').each(function(){ 
        $(this).removeClass('nodeSelected'); 
        self.getNode($(this).attr('id')).selected = false;
      });

      if(isSelected) return;

      parent.addClass('nodeSelected');
      self.getNode(parent.attr('id')).selected = true;
    });

    if(typeof this.initExtend === 'function')
      this.initExtend();
  }

  this.getNode = function(id){
    for(var i = 0; i < nodes.length; i++)
      if(nodes[i].id == id)
        return nodes[i];
    return null;
  }

  this.depth = function(){ return this.depthRec(root, {d:0, md:0}).md; }
  this.depthRec = function(node, depth){
    var self = this;
    if(node.children.length == 0)
      return depth;

    depth.d++;
    node.children.forEach((e) => {
      depth = self.depthRec(e, depth);
    });

    if(depth.d > depth.md)
      depth.md = depth.d;

    depth.d--;

    return depth;
  }

  this.getDepthNodes = function(depth){
    var result = [];
    nodes.forEach((e)=> {
      if(e.depth == depth)
        result.push(e);
    });
    return result;
  }

  this.addNode = function(){
    var elem = $('#template').find('.node').clone();
    $('#content').append(elem);
  }


  this.id = function(prefix, length) {
    if(typeof length === 'undefined') length = 16;
    if(typeof prefix === 'undefined') prefix = '';
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) 
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return prefix + result;
  }

  /*
    +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
    UPDATE
  */


  this.connectLine = function(toNode, fromNode){

    var lineElem = null;
    var id = 'line_' + fromNode.id + '_' + toNode.id;
    if($('#' + id).length == 0)
    {
      lineElem = $('#template').find('.line').clone();
      lineElem.attr('id', id);
      lineElem.attr('from', fromNode.id);
      lineElem.attr('to', toNode.id);
      lineElem.find('.node_cost').val(toNode.cost);
      lineElem.find('.node_cost').on('input', function(){ 
        // on update
        fromNode.cost = parseInt($(this).val());
      });
      $('#content').append(lineElem);
    }
    else
      lineElem = $('#' + id);

    var line = lineElem[0];

    var from = fromNode.getElement()[0];
    var to =   toNode.getElement()[0];

    var fT = from.offsetTop  + from.offsetHeight/2;
    var tT = to.offsetTop    + to.offsetHeight/2;
    var fL = from.offsetLeft + from.offsetWidth/2;
    var tL = to.offsetLeft   + to.offsetWidth/2;
    /*
    var fT = from.offsetTop  + from.getBoundingClientRect().height/2;
    var fL = from.offsetLeft + from.getBoundingClientRect().width/2;
    var tT = to.offsetTop    + to.getBoundingClientRect().height/2;
    var tL = to.offsetLeft   + to.getBoundingClientRect().width/2;
    */

    var caTT = tT, caFT = fT, catFL = fL, caTL = tL;
    
    var CA   = Math.abs(caTT - caFT);
    var CO   = Math.abs(caTL - catFL);
    var H    = Math.sqrt(CA*CA + CO*CO);
    var ANG  = 180 / Math.PI * Math.acos( CA/H );

    if(tT > fT){ var top  = (tT-fT)/2 + fT; }
    else { var top  = (fT-tT)/2 + tT; }
    if(tL > fL){ var left = (tL-fL)/2 + fL; }
    else{ var left = (fL-tL)/2 + tL; }
    
    
    if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
      ANG *= -1;
    }
    top-= H/2;

    if(tT < fT){
      lineElem.find('.node_cost').css({transform: 'rotate(180deg)'});
      ANG += 180;
    }

    line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
    line.style["-transform"] = 'rotate('+ ANG +'deg)';
    line.style.top    = top+'px';
    line.style.left   = left+'px';
    line.style.height = H + 'px';
  }

  this.init();
}