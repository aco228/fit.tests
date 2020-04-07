(function(){
  var current = new IterationAndRecursion();

  current.id = 'deepFirstSearch';
  current.name =  'Deep First Search';
  current.description =  'r: Koristimo LIFO, tjs. nove čvorove dodajemo na početak otvorene liste. Pretraživanje u dubinu koristi princip steka.';

  current.run = function(node){
    if(this.initialCheck(node))
      return;

    var self = this;
    this.visit(node);
    if(this.check(node))
      return;
    
    if(node.getDepth() < this.parent.maxDepth)
        node.children.forEach((e) => {
        self.result.otvorenaLista.push(e);
      });

    this.removeFromOpenList(node);
    this.result.zatvorenaLista.push(node);

    node.children.forEach((e) => {
      self.run(e);
    });

  }

  alg.types.push(current);
})();


