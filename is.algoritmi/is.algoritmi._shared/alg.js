var alg = new function(){
  this.types = [];
  this.result = null;
  this.maxDepth = 1000;
  this.searchId = '';
  this.currentAlgoritm = null;

  this.sortChildren = false;

  this.reset = function(){
    if($('#result').css('display') == 'none')
      $('#result').css('display', 'block');

    $('#algoritamName').text(this.currentAlgoritm.name);
    $('#resultTableBody').html('');

    if($('.nodeSelected').length != 0)
      this.searchId = $('.nodeSelected').attr('id');
    else
      this.searchId = '';
    
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

    if(this.searchId != '')
      console.warn('Searching for label:' + main.getNode(this.searchId).label + ' with algoritam "' + algoritam.name + '"');

    algoritam.beforeStart();
    algoritam.sortChildren = $('#sortchildren').is(':checked');

    console.log(algoritam);

    root.tempDepth = -1;
    algoritam.run(root);
    algoritam.update();

    if(typeof algoritam.onExit === 'function')
      algoritam.onExit();
  }

}