function loadArray(){
  if($('#input').val() == ''){
    alert("Nema unosa!");
    return null;
  }

  var arr = $('#input').val().split(' ');

  if(arr.length <= 1){
    alert("Nema niza!");
    return null;
  }

  var fLen = 0;
  var lenErr = false;

  for(var i = 0; i < arr.length; i++){
    var tempArr = [];
    for(var j = 0; j < arr[i].length; j++)
      if(arr[i][j] == '1' || arr[i][j] == '0') tempArr.push(arr[i][j]);

    arr[i] = tempArr;
    if(i == 0) fLen = tempArr.length;
    else if(tempArr.length != fLen){
      alert("Duzine niza se ne poduraraju");
      lenErr = true;;
      return null;
    }
  }

  return lenErr ? null : arr;
}

function kodiraj(){
  $('#result').html('');
  var arr = loadArray();
  if(arr == null)
    return;

  // horizontal
  for(var i = 0; i < arr.length; i++){
    var iNum = 0;
    for(var j = 0; j < arr[i].length; j++)
      if(arr[i][j] == '1') iNum++;

    arr[i].push(iNum%2 == 0 ? '0' : '1');
  }

  // vertical
  var verticalArr = [];
  for(var i = 0; i < arr[0].length; i++){
    var iNum = 0;
    for(var j = 0; j < arr.length; j++)
      if(arr[j][i] == '1') iNum++;

    verticalArr.push(iNum%2 == 0 ? '0' : '1');
  }
  arr.push(verticalArr);


  print(arr, []);
}

function print(arr, kom){
  var tableHolder = $('<div class="tableHolder"></div>');
  var niz = '';

  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < arr[i].length; j++){
      var klass = 'bit bit_' + i + '_' +j ;
      if(i == arr.length - 1) klass += ' bit_lst';
      else if(j == arr[i].length - 1) klass += ' bit_alst';

      tableHolder.append('<span class="'+ klass +'">'+ arr[i][j] +'</span>');
      niz += arr[i][j];
    }
    tableHolder.append('<span class="bit bitL_'+ i +'"></span><br>');
    niz += ' ';
  }

  for(var i = 0; i < arr[0].length; i++)
    tableHolder.append('<span class="bit bitD_'+ i +'"></span>');


  $('#result').append(tableHolder);
  $('#result').append('<br><br><div>Niz koji se salje je:<br>' + niz + '</div>');

}

function provjeri(){
  $('#result').html('');
  var arr = loadArray();
  if(arr == null)
    return;
  print(arr);


  // provjera horizontalna
  var errHor = [];
  for(var i = 0; i < arr.length; i++){
    var iNum = 0;
    for(var j = 0; j < arr[i].length; j++) 
      iNum += (arr[i][j] == '1' ? 1 : 0);

    if(iNum % 2 == 0){
      $('.bitL_' + i).html('✓');
      $('.bitL_' + i).css('color', 'green');
    }
    else if(i != arr.length - 1 && j != arr[i].length - 1){
      errHor.push(i);
      $('.bitL_' + i).html('X');
      $('.bitL_' + i).css('color', 'red');
    }
  }

  // provjera vertikalna
  var errVer = [];
  for(var i = 0; i < arr[0].length; i++){
    var iNum = 0;
    for(var j = 0; j < arr.length; j++)
      iNum += (arr[j][i] == '1' ? 1 : 0);

    if(iNum % 2 == 0){
      $('.bitD_' + i).html('✓');
      $('.bitD_' + i).css('color', 'green');
    }
    else if(i != arr[0].length - 1 && j != arr.length - 1){
      errVer.push(i);
      $('.bitD_' + i).html('X');
      $('.bitD_' + i).css('color', 'red');
    }
  }

  // markiranje pogresnih bita
  for(var i = 0; i < errHor.length; i++)
    for(var j = 0; j < errVer.length; j++){
      $('.bit_'+errHor[i]+'_'+errVer[j]).addClass('errBit');
      $('.bit_'+errHor[i]+'_'+errVer[j]).css('background-color', 'yellow');
      $('.bit_'+errHor[i]+'_'+errVer[j]).append('<span class="errBit_bit" i="'+errHor[i]+'" j="'+errVer[j]+'"></span>');
    }


  tryToFix(arr);
}

function tryToFix(arr){

  var sveKombinacije = createCombinations($('.errBit_bit').length);
  for(var i = 0; i < sveKombinacije.length; i++){
    var tempArr = [...arr];
    for(var j = 0; j < sveKombinacije[i].length; j++){
      var errBit = $($('.errBit_bit')[j]);
      console.log('changing ' + parseInt(errBit.attr('i')) + '-' + parseInt(errBit.attr('j')) + ' with ' + sveKombinacije[i][j]);
      tempArr[parseInt(errBit.attr('i'))][parseInt(errBit.attr('j'))] = sveKombinacije[i][j];
    }

    console.log(tempArr);

    if(checkArray(tempArr)){
      for(var j = 0; j < sveKombinacije[i].length; j++)
        $($('.errBit_bit')[j]).text(sveKombinacije[i][j]);

      var niz = '';
      for(var i = 0; i < tempArr.length; i++){
        for(var j = 0; j < tempArr[i].length; j++)
          niz += tempArr[i][j];
        niz += ' ';
      }

      var orginalnaPoruka = '';
      // stampa orginalne poruke
      for(var i = 0; i < tempArr.length - 1; i++){
        for(var j = 0; j < tempArr[i].length - 1; j++)
          orginalnaPoruka += tempArr[i][j];
        orginalnaPoruka += ' ';
      }
      $('#result').append('<br><br><div>Orginalna poruka je:<br>' + orginalnaPoruka + '</div>');

      $('#result').append('<br><br><div>Ispravan niz:<br>' + niz + '</div>');
      return;
    }
  }

  $('#result').append('<br><br><div>Nema rjesenja za niz</div>');
}



/*
  CREATE ALL COMBINATIONS
*/

function checkArray(arr){

  // provjera horizontalna
  var errHor = [];
  for(var i = 0; i < arr.length; i++){
    var iNum = 0;
    for(var j = 0; j < arr[i].length; j++) 
      iNum += (arr[i][j] == '1' ? 1 : 0);

    if(iNum % 2 != 0) return false;
  }

  // provjera vertikalna
  var errVer = [];
  for(var i = 0; i < arr[0].length; i++){
    var iNum = 0;
    for(var j = 0; j < arr.length; j++)
      iNum += (arr[j][i] == '1' ? 1 : 0);

    if(iNum % 2 != 0) return false;
  }

  return true;
}

function createCombinations(n){
  var arr = [];
  arr.push(constructString(n, '0'));
  rec(arr, n, 0);
  return arr;
}

function rec(arr, len, n1){
  var str = '';
  var cRen = len - n1;

  if(n1 == len)
    return;

  for(var i = cRen - 1; i >=0; i--){
    var temp = constructString(n1, '1') + constructString(cRen, '0');
    temp = temp.replaceAt(n1 + i, '1');
    arr.push(temp);
  }

  rec(arr, len, ++n1);
}


function constructString(n, char){
  var r = '';
  for(var i = 0; i < n; i++)
    r += char;
  return r;
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}