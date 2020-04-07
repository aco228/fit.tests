function IterationAndRecursion(){
  this.id = '';
  this.name = '';
  this.description = '';
  this.parent = alg;
  this.result = null;

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