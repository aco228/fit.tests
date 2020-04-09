var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function Node(value, cost){
  this.WIDTH = 70;
  this.HEIGHT = 65;

  this.id = main.id('node');
  this.isRoot = false;
  this.label = 'A';
  this.parent = [];
  this.value = (typeof value === 'undefined' ? 0 : value);
  this.cost = (typeof cost === 'undefined' ? 0 : cost);
  this.depth = 0;
  this.selected = false;
  this.children = [];

  this.init = function(){
  }

  this.add = function(value, cost){
    var node = new Node(value, cost);
    node.depth = this.depth + 1;
    node.label = alphabet[nodes.length];
    this.children.push(node);
    node.parent.push(this);
    nodes.push(node);
    return node;
  }

  this.getCost = function(parent){
    var line = $('.line[to=' + this.id + '][from=' + parent.id + ']');
    if(line.hasClass('doubleLine'))
      return parseInt($('.line[to=' + parent.id + '][from=' + this.id + ']').find('.node_cost').val());
    else
      return parseInt($('.line[to=' + this.id + '][from=' + parent.id + ']').find('.node_cost').val());
  }

  this.hasChild = function(node){
    for(var i = 0; i < this.children.length; i++)
      if(this.children[i].id == node.id)
        return true;
    return false;
  }

  this.removeChild = function(node){
    for(var i = 0; i < this.children.length; i++)
      if(this.children[i].id == node.id){
        this.children.splice(i, 1);
        return;
      }
  }

  this.removeParent = function(node){
    for(var i = 0; i < this.parent.length; i++)
      if(this.parent[i].id == node.id){
        this.parent.splice(i, 1);
        return;
      }
  }

  this.addChild = function(node, twoDirections){
    this.children.push(node);
    node.parent.push(this);
    main.connectLine(node, this, twoDirections);
  }

  this.getDepth = function(){ return this.depth; }

  this.remove = function(){

    // remove node from parents childrens
    for(var i = 0; i < this.parent.length; i++)
      this.parent[i].removeChild(this);

    // remove connections
    $('.line[to='+this.id+']').each(function(){ $(this).remove(); });
    $('.line[from='+this.id+']').each(function(){ $(this).remove(); });
    
    // remove nodes from global.nodes
    if(!this.isRoot)
      for(var i = 0; i < nodes.length; i++)
        if(nodes[i].id == this.id){
          nodes.splice(i, 1);
          break;
        }

    var tempChildren = [...this.children];
    for(var i = 0; i < tempChildren.length; i++)
      tempChildren[i].remove();


    if(!this.isRoot)
      this.getElement().remove();

    delete this;
  }

  this.width = function(){ return this.widthRec(0) + 10; }
  this.widthRec = function(width){

    return this.leafs() * this.WIDTH;

    if(this.children.length == 0) 
      return this.WIDTH;

    this.children.forEach((e)=>{
      width += e.widthRec(width);
    });

    return width;
  }

  this.leafs = function(num){
    if(typeof num === 'undefined')
      num = 0;

    if(this.children.length == 0){
      num++;
      return num;
    }

    this.children.forEach((e)=>{ num = e.leafs(num); });
    return num;
  }

  this.getHtml = function(){
    var self = this;
    var elem = $('#template').find('.node').clone();
    if(this.selected)
      elem.addClass('nodeSelected');
    if(this.isRoot)
      elem.addClass('nodeRoot');
    elem.find('.node_label').val(this.label);
    elem.find('.node_label').on('input', function(){ self.label = $(this).val(); });

    elem.find('.node_value').val(this.value);
    elem.find('.node_value').on('input', function(){ self.value = parseInt($(this).val()); });
    elem.attr('id', this.id);
    return elem;
  }


  this.getContainerElement = function(){ return $('#' + this.id).closest('.node_container'); }
  this.getElement = function(){ return $('#' + this.id); }

  this.init();

}