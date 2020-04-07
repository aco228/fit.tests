function reverseInit(){
  $('#reverseBtn').click(function(){
    var izracunaj = $('#reverseIzracunaj').val();
    var poznato = $('#reversePoznato').val();
    var vrijeme = calc.takeValue('reverseVrijeme');

    var state = calc.getState();
    var currentResult = calc.calculate(state);

    if(poznato == 'reverseUkupnoKasnjenje'){
      var state = calc.calculate(calc.getState());
      var N = Math.floor(vrijeme.sub(currentResult.kasnjenjeUsledPropagacije).div(currentResult.kasnjenjeUsledPrenosaSegmenta.div(calc.length().sub(1))).sub(calc.length().sub(2)));
      var fileSize = state.segFileSize.mul(N);

      if(izracunaj == 'reverseVelicinuFajla')
        result = fileSize + 'b';

      if(izracunaj == 'reverseBrSegmenata')
        result = N;

    }


    $('#reverseResult').text(result);
    //console.log(izracunaj, poznato, vrijeme);

  });
}