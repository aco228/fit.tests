function Main(){

  this.init = function(){
    $('.selToFrom').on('change', function() {
      $('.adits').each(function(){ $(this).css('display', 'none'); });
      var elem = $(this).find('option[value=' + $(this).val() + ']');
      var adits = elem.attr('adits');
      if(typeof adits === 'undefined')
        return;

      var referers = elem.attr('adits').split(',');
      for(var i = 0; i < referers.length; i++)
        $('.adits[part-of=' + referers[i].trim() + ']').css('display', 'block');
    });
  }
  
  this.getData = function(){
    var text = $('#input').val();
    var from = {
      type: $('#selFrom').val(),
      validate: $('#selFrom').find('option:selected').attr('validate')
    };
    var to = {
      type: $('#selTo').val(),
      validate: $('#selTo').find('option:selected').attr('validate')
    };

    if(this.validate(text, from.validate))
      return null;

    var data = {
      text: text, 
      from: from,
      bami: '=',
      to: to
    };
    
    if( typeof $('#selFrom').find('option:selected').attr('adits') !== 'undefined'){
      var adits = $('#selFrom').find('option:selected').attr('adits').split(',');
      for(var i = 0; i < adits.length; i++)
        data[adits[i].trim()] = $('.adits[part-of='+adits[i].trim()+']').find($('.adits[part-of='+adits[i].trim()+']').attr('lookup')).val();
    }

    if( typeof $('#selTo').find('option:selected').attr('adits') !== 'undefined'){
      var adits = $('#selTo').find('option:selected').attr('adits').split(',');
      for(var i = 0; i < adits.length; i++)
        data[adits[i].trim()] = $('.adits[part-of='+adits[i].trim()+']').find($('.adits[part-of='+adits[i].trim()+']').attr('lookup')).val();
    }

    console.log('constructed data', data);

    return data;
  }

  this.validate = function(input, type){
    if (input == '') {
      alert('Nema unosa!')
      return true;
    }

    var dictonary = type == 'bin' ? '10' : '_-' + BAMI_CHAR;
    for (var i = 0; i < input.length; i++)
      if (dictonary.indexOf(input[i]) === -1) {
        alert('Pogresan unos');
        return true;
      }

    return false;
  }

  this.getaditsionalData = function(){

  }

  this.convertToHtml = function(result, length){
    var arr = [];
    var cI = 0, w = '';
    for(var i = 0; i < result.length; i++){
      w += result[i];
      cI++;
      if(cI >= length){
        arr.push(w);
        w = ''; cI = 0;
      }
    }

    console.log(arr);
    canvas.prepare();

    var result = '';
    for(var i = 0; i < arr.length; i++){
      result += `<div class="wrd">`+arr[i]+`</div>`;
      canvas.drawCube(i);
      canvas.drawSegments(i, arr[i]);
    }

    canvas.drawMiddleLine(arr.length);

    return result;
  }
}