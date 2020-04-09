function IterationAndRecursion(){
  this.id = '';
  this.name = '';
  this.description = '';
  this.parent = alg;
  this.result = null;

  this.sortChildren = false;

  this.beforeStart = function(){}
  this.onSelect = function(){ }

  this.reset = function(alg){
    this.result =  {
      found: false,
      lastLabel: 'first',
      currentlistaPosjecenosti:'',
      listaPosjecenosti:'',
      otvorenaLista:[],
      zatvorenaLista:[]
    };

    $('#resultTable2Body').html('');
    $('#table1').css({display: 'block'});
    $('#table2').css({display: 'none'});

    this.result.otvorenaLista.push(root);
    this.parent.result = result;
    this.update();
  }

  this.update = function(){
    if(this.result.currentlistaPosjecenosti == this.result.lastLabel) return;
    this.result.lastLabel = this.result.currentlistaPosjecenosti;

    var result = this.result;
    $('#listaPosjecenosti').text(result.listaPosjecenosti);
    var tableHtml = '<tr><td>'+result.currentlistaPosjecenosti+'</td><td>{'+this.listToLabels(result.otvorenaLista)+'}</td><td>{'+this.listToLabels(result.zatvorenaLista)+'}</td></tr>';
    $('#resultTableBody').append(tableHtml);
  }

  // SUMMARY: add childrens of the node the otvorena lista
  this.addChildren = function(node){
    var self = this;
    var list = [];

    if(node.getDepth() < this.parent.maxDepth)
      node.children.forEach((e) => {
        var child = e;
        var exists = false;
        for(var i = 0; i < self.result.otvorenaLista.length; i++)
          if(self.result.otvorenaLista[i].id == child.id){
            child = {...e};
            child.id = main.id();
            exists = true;
            console.log('Exists: ' + child.label);
          }

        if(!exists)
          list.push(child);
      });

    if(this.sortChildren)
      list = list.sort(function(a, b){return a.label - b.label})

    for(var i = 0; i < list.length; i++)
      this.result.otvorenaLista.push(list[i]);

    console.log('list to added to otvorena', {...node}, [...list], [...this.result.otvorenaLista]);
    return list;
  }


  this.openLista = function(node){ this.result.otvorenaLista.push(node); }
  this.closeLista = function(node){
    this.result.zatvorenaLista.push(node);
    this.removeFromOpenList(node);
  }

  this.visit = function(node){
    console.log('visiting ' + node.label);
    this.update();
    this.result.listaPosjecenosti += node.label;
    this.result.currentlistaPosjecenosti = node.label;
  }

  // check at the start of the method
  this.initialCheck = function(node){
    var result = (node.getDepth() > this.parent.maxDepth || this.result.found == true);
    if(result)
      this.update();
    return result;
  }


  // check if this is the correct node
  this.check = function(node){
    if(this.parent.searchId == '') return false;
    if(node.id != this.parent.searchId)
      return false;

    console.warn('found ' + node.label);
    this.closeLista(node);
    this.result.found = true;
    this.update();
    return true;
  }

  this.removeFromOpenList = function(node){
    for(var i = 0; i < this.result.otvorenaLista.length; i++)
      if(this.result.otvorenaLista[i].id == node.id) {
        console.log('Removed ' + node.label);
        this.result.otvorenaLista.splice(i, 1);
        return;
      }
  }

  this.listToLabels = function(lst){
    var result = '';
    for(var i = 0; i < lst.length; i++)
      result += lst[i].label;
    return result;
  }


}