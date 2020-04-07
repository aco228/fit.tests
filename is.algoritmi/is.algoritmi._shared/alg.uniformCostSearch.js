(function(){
  var current = new CostsSearchManager();

  current.id = 'uniformCostSearch';
  current.name =  'Uniform cost search';
  current.description =  'r:  Funkcija sortiranja liste: f(n) = g(n)';

  // node is root
  current.run = function(node){

    var self = this;
    var currentNode = {...node};
    currentNode.tempId = main.id('tn');
    currentNode.val = 0;

    this.add(currentNode); this.sort();
    this.result.komentar = '';
    this.update();

    for(;;){
      this.result.listaPosjecenosti += currentNode.label;

      currentNode.children.forEach((e) => { 
        var tempChild = {...e};
        tempChild.tempId = main.id('tn');
        tempChild.val = tempChild.getCost(currentNode) + currentNode.val;
        self.add(tempChild);
      });


      // pronadjeno
      if(currentNode.id == this.parent.searchId){
        this.result.komentar = `sortirati, ${currentNode.label} je destinacija, prvi je na steku, prekida se pretrazivanje`;
        this.update();
        break;
      }

      this.result.komentar = `u sledecem koraku izbacuje se ${currentNode.label} i pisu se njegovi potomci sortirani`;
      this.remove(currentNode);
      console.log('otvorena lista', [...this.result.otvorenaLista]);
      this.sort();
      console.log('sortirana lista', [...this.result.sortiranaLista]);
      this.update();

      if(this.result.sortiranaLista.length == 0)
        break;


      currentNode = this.result.sortiranaLista[0];
    }

  }

  alg.types.push(current);
})();


