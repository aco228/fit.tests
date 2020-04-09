(function(){
  var current = new IterationAndRecursion();

  current.id = 'deepFirstSearch';
  current.name =  'Deep First Search';
  current.description =  'r: Koristimo LIFO, tjs. nove čvorove dodajemo na početak otvorene liste. Pretraživanje u dubinu koristi princip steka.';

  current.run = function(node){

    var self = this;
    var visited = false;
    self.result.zatvorenaLista.forEach(e=>{
      if(e.id == node.id) visited = true;
    });

    if(visited)
      return;

    if(this.initialCheck(node))
      return;

    this.visit(node);
    if(this.check(node))
      return;

    var childrens = this.addChildren(node);
    
    /*
    if(node.getDepth() < this.parent.maxDepth)
        node.children.forEach((e) => {
        self.result.otvorenaLista.push(e);
      });
      */

    this.removeFromOpenList(node);
    this.result.zatvorenaLista.push(node);

    childrens.forEach((e) => {
      self.run(e);
    });

  }

  alg.types.push(current);
})();


