var alg = new function(){
  this.types = [];
  this.result = null;
  this.maxDepth = 1000;
  this.searchId = '';
  this.currentAlgoritm = null;

  this.reset = function(){
    if($('#result').css('display') == 'none')
      $('#result').css('display', 'block');

    $('#algoritamName').text(this.currentAlgoritm.name);
    $('#resultTableBody').html('');

    this.searchId = $('.nodeSelected').attr('id');
    this.currentAlgoritm.reset();
  }


  this.get = function(id){
    for(var i = 0; i < this.types.length; i++)
      if(this.types[i].id == id)
        return this.types[i];
    return null;
  }


  this.run = function(algoritam){
    this.currentAlgoritm = algoritam;
    this.reset();
    console.warn('Searching for label:' + main.getNode(this.searchId).label + ' with algoritam "' + algoritam.name + '"');
    algoritam.beforeStart();
    algoritam.run(root);
    algoritam.update();
  }

}