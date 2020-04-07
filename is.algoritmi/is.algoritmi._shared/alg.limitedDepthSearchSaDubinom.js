(function(){
  var current = new IterationAndRecursion();

  current.id = 'limitedDepthSearchSaDubinom';
  current.name = 'Limited depth search sa dubinom';
  current.description = 'r: Koristimo LIFO, tjs. nove čvorove dodajemo na početak otvorene liste.';

  current.run = function(node){ 
    alg.types[0].reset();
    alg.types[0].run(node);
  };

  alg.types.push(current);
})();
