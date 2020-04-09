function CostsSearchManager(){
  this.id = '';
  this.name = '';
  this.description = '';
  this.parent = alg;
  this.result = null;

  this.beforeStart = function(){}
  this.onSelect = function(){}
  this.onExit = function(){
    for(var i = 0; i < nodes.length; i++)
      if(typeof nodes[i].tempId !== 'undefined')
        delete nodes[i].tempId;
  }

  this.reset = function(){
    this.result = {
      found: false,
      lastLabel: 'none',
      visits: [],
      poseceniCvorovi:[],
      otvorenaLista: [],
      sortiranaLista: [],
      komentar: [],
      trenutniCvor: '',
      listaPosjecenosti: ''
    };   

    $('#table1').css({display: 'none'});
    $('#table2').css({display: 'block'});
    $('#resultTable2Body').html('');

    this.parent.result = result;
    this.update();
  }

  this.onVisit = function(node){
    this.result.poseceniCvorovi.push(node);
    this.result.trenutniCvor = node.label + node.val;
    this.result.listaPosjecenosti += node.label;
  }

  this.checkForLoop = function(parent, child){
    var connectionName = parent.id + '_' + child.id;

    if(this.result.visits.includes(connectionName))
      return true;

    this.result.visits.push(connectionName);
    return false;
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
    for(var i = 0; i < this.result.poseceniCvorovi.length; i++)
      if(this.result.poseceniCvorovi[i].id == node.id)
        return;

    for(var i = 0; i < this.result.otvorenaLista.length; i++){
      if(this.result.otvorenaLista[i].label == node.label){
        if(this.result.otvorenaLista[i].label == node.val) return;
        if(this.result.otvorenaLista[i].val > node.val)
          this.result.otvorenaLista[i] = node;
        return;
      }
    }
    
    this.result.otvorenaLista.push(node);
  }

  // SUMMARY: check if this is the destination node
  this.check = function(node){
    if(this.parent.searchId != '' && node.id == this.parent.searchId){
      this.result.otvorenaLista = [];
      this.result.sortiranaLista = [];
      this.result.komentar = `sortirati, ${node.label} je destinacija, prvi je na steku, prekida se pretrazivanje`;
      this.update();
      return true;
    }
    
    return false;
  }

  this.sortList = function(lst){
    return lst.sort(function(a, b){return a.val - b.val});
  }

  this.sort = function(){
    this.result.sortiranaLista = [...this.result.otvorenaLista].sort(function(a, b){return a.val - b.val});
  }

  this.update = function(){
    if(this.result.listaPosjecenosti == this.result.lastLabel) return;
    this.result.lastLabel = this.result.listaPosjecenosti;

    var result = this.result;
    $('#listaPosjecenosti').text(result.listaPosjecenosti);
    var tableHtml = '<tr><td>'+result.trenutniCvor+'</td><td>'+this.listToData(result.otvorenaLista)+'</td><td>'+this.listToData(result.sortiranaLista)+'</td><td>{'+result.komentar+'}</td></tr>';
    $('#resultTable2Body').append(tableHtml);
  }

}