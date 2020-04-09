Main.prototype.initExtend = function(){
  var self = this;
  this.connectingInit();

  $('body').on('click', '.line', function(){
    if($(this).find('input').is(':focus')) return;
    //if(confirm('Izbrisi liniju?')){
      var fromNode = main.getNode($(this).attr('from'));
      var toNode = main.getNode($(this).attr('to'));

      fromNode.removeChild(toNode);
      toNode.removeParent(fromNode);
      $(this).remove();
    //}
  });
}

Main.prototype.reset = function(){
  $('#content').html('');
  $('#result').css({display:'none'});
  root = null;
  nodes = [];
}


Main.prototype.updateContentHeight = function(){
  var max = 0;
  $('.node').each(function(){
    var top = $(this)[0].offsetTop + 80;
    if(top > max)
      max = top;
  });

  $('#content').css({height: max});
}



Main.prototype.addNewNode = function(){
  var node = new Node(0,0);
  node.label = alphabet[nodes.length];
  nodes.push(node);

  if(root == null){
    root = node;
    root.isRoot = true;
  }

  $('#content').append(node.getHtml());
  this.dragNode(node);
}

Main.prototype.dragNode = function(node) {
  var self = this;
  var elem = node.getElement();
  var elmnt = elem[0];
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  elem.find('.btnDrag')[0].onmousedown = dragMouseDown;

  /*
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }
  */

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    for(var i = 0; i < node.parent.length; i++)
      main.connectLine(node, node.parent[i]);
    for(var i = 0; i < node.children.length; i++)
      main.connectLine(node.children[i], node);

  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    self.updateContentHeight();
  }
}


// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=// +=
// CONNECTING NODES
Main.prototype.connectionIsOpen = false;
Main.prototype.connectionType = '';
Main.prototype.connectingNode = null;


Main.prototype.connectingInit = function(){
  var self = this;
  $('body').on('click', '.btnConnectNode', function(){
    var parent = $(this).closest('.node');
    connectionType = $(this).attr('type');
    if(parent.hasClass('nodeConnectionRequester')){
      parent.removeClass('nodeConnectionRequester');
      self.closeConnectingPhase(); 
    }
    else{
      $('#drawLine').css({display:'block'});
      self.connectionIsOpen = true;
      self.connectingNode = self.getNode(parent.attr('id'));
      parent.addClass('nodeConnectionRequester');
      self.markAvaliable();
    }
    $('nodeConnectionRequester').each(function(e){
      if($(this).attr('id') != parent.attr('id'))
        $(this).removeClass('nodeConnectionRequester');
    });
  });

  $('body').on('click', '.nodeConnectionPosible', function(){
    var currentNode = self.getNode($(this).attr('id'));

    if(connectionType == '2')
      currentNode.addChild(self.connectingNode, true);
    
    self.connectingNode.addChild(currentNode);

    self.closeConnectingPhase();
  });

  window.onmousemove = function(e) {
    e = e || window.event;
    if(!self.connectionIsOpen)
      return;

    self.connectConnectingLine(event.clientX, event.clientY);
  }
}

Main.prototype.closeConnectingPhase = function(){
  this.connectionIsOpen = false;
  this.connectingNode = null;
  $('#drawLine').css({display:'none'});
  $('.nodeConnectionPosible').each(function(){
    $(this).removeClass('nodeConnectionPosible');
  });
  $('.nodeConnectionRequester').each(function(){
    $(this).removeClass('nodeConnectionRequester');
  });
}

Main.prototype.markAvaliable = function(){
  var self = this;
  $('#content').find('.node').each(function(){
    if($(this).hasClass('nodeConnectionRequester'))
      return;

    var currentNode = self.getNode($(this).attr('id'));
    if(currentNode == null){
      console.error('currentNode is NULL WTF? ' + $(this).attr('id'));
      return;
    }
    if(currentNode.hasChild(self.connectingNode) || self.connectingNode.hasChild(currentNode))
      return;

    $(this).addClass('nodeConnectionPosible');
  });
}

Main.prototype.connectConnectingLine = function(x, y){

  var node = this.connectingNode;
  var lineElem = $('#drawLine');
  var line = lineElem[0];

  var from = node.getElement()[0];

  //var fT = from.offsetTop  + from.offsetHeight/2;
  //var fL = from.offsetLeft + from.offsetWidth/2;
  var tT = y;
  var tL = x;
  var fT = $('#content')[0].offsetTop + from.offsetTop  + from.getBoundingClientRect().height/2;
  var fL = from.offsetLeft + from.getBoundingClientRect().width/2;
  /*
  var tT = to.offsetTop    + to.getBoundingClientRect().height/2;
  var tL = to.offsetLeft   + to.getBoundingClientRect().width/2;
  */
  
  var CA   = Math.abs(tT - fT);
  var CO   = Math.abs(tL - fL);
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

  line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-transform"] = 'rotate('+ ANG +'deg)';
  line.style.top    = top+'px';
  line.style.left   = left+'px';
  line.style.height = H + 'px';
}
