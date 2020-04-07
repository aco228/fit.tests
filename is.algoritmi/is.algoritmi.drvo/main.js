Main.prototype.reset = function(){
  root = new Node(null, 0);
  nodes = [];
  nodes.push(root);
  main.update();
}

Main.prototype.update = function(){
  this.redraw();
}

Main.prototype.redraw = function(){
  var self = this;
  $('#content').html('');
  $('#content').css({height: main.depth() * root.HEIGHT + 50 });
  this.redrawRec(root, 0, 0);
}
Main.prototype.redrawRec = function(node, childrenIndex, startFrom){
  var self = this;
  var elem = node.getHtml();
  elem.find('.node_value').val(node.value);
  elem.attr('width', node.width());
  elem.attr('childrenIndex', childrenIndex);

  var width = node.width();
  var left = startFrom + ((width / 2) - (node.WIDTH / 2));
  elem.css({ left: left, top: node.depth * node.HEIGHT });
  $('#content').append(elem);

  if(node.parent.length == 1)
    this.connectLine(node, node.parent[0]);

  var index = 0;
  var currentChildrenWidths = 0;;

  node.children.forEach((child) => {
    self.redrawRec(child, index, startFrom + currentChildrenWidths);
    currentChildrenWidths += child.width();
    index++;
  });
}