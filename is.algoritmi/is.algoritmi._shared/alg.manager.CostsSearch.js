function CostsSearchManager(){
  this.id = '';
  this.name = '';
  this.description = '';
  this.parent = alg;
  this.result = null;

  this.beforeStart = function(){}
  this.onSelect = function(){}

  this.reset = function(){
    this.result = {
      found: false,
      lastLabel: 'none',
      otvorenaLista: [],
      sortiranaLista: [],
      komentar: [],
      listaPosjecenosti: ''
    };   

    $('#table1').css({display: 'none'});
    $('#table2').css({display: 'block'});
    $('#resultTable2Body').html('');

    this.parent.result = result;
    this.update();
  }

  this.listToData = function(list){
    var result = '';
    for(var i = 0; i < list.length; i++)
      result += (result != '' ? ' ' : '' ) + list[i].label + list[i].val;
    return result;
  }

  this.remove = function(node){
    for(var i = 0; i < this.result.otvorenaLista.length; i++)
      if(this.result.otvorenaLista[i].tempId == node.tempId){
        this.result.otvorenaLista.splice(i, 1);
        return;
      }
    for(var i = 0; i < this.result.sortiranaLista.length; i++)
      if(this.result.sortiranaLista[i].tempId == node.tempId){
        this.result.sortiranaLista.splice(i, 1);
        return;
      }
  }

  this.add = function(node){
    /*
    for(var i = 0; i < this.result.otvorenaLista.length; i++)
      if(this.result.otvorenaLista[i].id == node.id)
        return;
    */
    this.result.otvorenaLista.push(node);
  }

  this.sort = function(){
    this.result.sortiranaLista = [...this.result.otvorenaLista].sort(function(a, b){return a.val - b.val});
  }

  this.update = function(){
    if(this.result.listaPosjecenosti == this.result.lastLabel) return;
    this.result.lastLabel = this.result.listaPosjecenosti;

    var result = this.result;
    $('#listaPosjecenosti').text(result.listaPosjecenosti);
    var tableHtml = '<tr><td>'+this.listToData(result.otvorenaLista)+'</td><td>{'+this.listToData(result.sortiranaLista)+'}</td><td>{'+result.komentar+'}</td></tr>';
    $('#resultTable2Body').append(tableHtml);
  }

}