function konvertovanjeInit(){

  $('.inputKonvert').on('input', function(){ convert($(this).closest('.hinput')); });
  $('.selectKonvert').change(function(){ 
    var hinput = $('#konvertovanjeInBox').find('.hinput[context=' + $(this).closest('.hinput').attr('context') + ']');
    convert(hinput); 
  });

  function convert(hinput){
    var context = hinput.attr('context');
    var currentVal = hinput.find('input').val();
    var resultBox = $('#konvertovanjeBox').find('.hinput[context=' + context + ']');
    var convertContext = calc.selextContextValue(context);
    var val = calc.convert(convertContext, currentVal, hinput.find('select').val(), resultBox.find('select').val());

    // console.warn(context, currentVal, hinput.find('select').val(), resultBox.find('select').val());
    // console.log(resultBox, convertContext, val);

    resultBox.find('input').val(val);
  }

}