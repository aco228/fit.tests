(function(){
  var current = new IterationAndRecursion();

  current.id = 'breadthFirstSearch';
  current.name =  'Breadth First Search';
  current.description =  'r: Koristimo LIFO, tjs. nove čvorove dodajemo na početak otvorene liste. Pretraživanje u dubinu koristi princip steka.';

  current.run = function(node){ 
    var self = this;
    var stop = false;

    while(stop == false){
      var list = [...this.result.otvorenaLista];
      console.warn('lista', list);
      for(var i = 0; i < list.length; i++){
        var currentNode = list[i];
        console.log('currentNode', currentNode);
        this.visit(currentNode);

        if(this.initialCheck(currentNode))
          return;

        if(this.check(currentNode))
          return;

        if(currentNode.getDepth() != this.parent.maxDepth)
          currentNode.children.forEach((e)=> { self.openLista(e); });
        this.closeLista(currentNode);
      }

      if(this.result.otvorenaLista.length == 0)
        stop = true;

    }
  };

  alg.types.push(current);
})();
