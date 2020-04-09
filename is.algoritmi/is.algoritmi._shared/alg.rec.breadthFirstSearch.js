(function(){
  var current = new IterationAndRecursion();

  current.id = 'breadthFirstSearch';
  current.name =  'Breadth First Search';
  current.description =  'r: Koristimo LIFO, tjs. nove čvorove dodajemo na početak otvorene liste. Pretraživanje u dubinu koristi princip steka.';

  current.run = function(node){ 
    var self = this;
    var stop = false;

    var pe_MAX = 100, pe_INDEX = 0;



    while(stop == false){

      pe_INDEX++;
      if(pe_INDEX >= pe_MAX){
        console.error("ENDLESS LOOP MAJMUNE..");
        break;
      }

      var list = [...this.result.otvorenaLista];

      if(list.length > 100)
        return;

      for(var i = 0; i < list.length; i++){
        var visited = false;
        var currentNode = list[i];
        self.result.zatvorenaLista.forEach(e=>{
          if(e.id == currentNode.id) visited = true;
        });

        if(visited)
          continue;

        this.visit(currentNode);

        if(this.initialCheck(currentNode))
          return;

        if(this.check(currentNode))
          return;

        this.addChildren(currentNode);
        /*
        if(currentNode.getDepth() != this.parent.maxDepth)
          currentNode.children.forEach((e)=> { self.openLista(e); });
        */

        this.closeLista(currentNode);
      }

      if(this.result.otvorenaLista.length == 0)
        stop = true;

    }
  };

  alg.types.push(current);
})();
