(function(){
  var current = new IterationAndRecursion();

  current.id ='IterativeDeepeningSearch';
  current.name =  'Iterative deepening search';
  current.description = 'r: Koristimo LIFO, tjs. nove čvorove dodajemo na početak otvorene liste. Počinjemo od dubine 0, a onda, u svakoj novoj iteraciji, obilazimo naredni nivo.';

  current.run = function(node){ 
    alg.types[1].reset();
    alg.types[1].run(node);
  };

  alg.types.push(current);
})();
