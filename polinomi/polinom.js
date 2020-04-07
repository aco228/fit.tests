function Polinom(){
  this.init = function(){
    this.onClick();
  }

  this.onClick = function(){
    var self = this;
    $('#btn').click(function(){ self.calculate(); });
    $('#btn_bit2Polinom').click(function(){
      var text = $('#inputBit2Polinom').val();
      var pol = self.bitToPolinomArray(text);
      $('#inputPolinom').val(self.bitToPolinomString(pol));
    });
  }

  this.calculate = function(){
    $('#result').html('');

    var crcPolinom = this.getPolinomArray();
    var stepenPolinoma = crcPolinom[0];
    var bits = this.getBitString(stepenPolinoma);
    var bitsPolinom = this.bitToPolinomArray(bits);

    console.log('crcPolinom', crcPolinom);
    console.log('stepenPolinoma', stepenPolinoma);
    console.log('bits', bits);
    console.log('bitsPolinom', bitsPolinom);

    this.printBits(bits, stepenPolinoma);
    this.printDeljenje(bitsPolinom, crcPolinom);

    var result = [];

    var comparePolinom = [...bitsPolinom];

    for(;;){
      var bD = comparePolinom.getFirstAvaliable();
      if(bD == null){
        console.error('bD is null');
      }

      var cD = crcPolinom.getFirstAvaliable();
      if(cD == null){
        console.error('bD is null');
      }

      if(bD.value < cD.value){
        console.error('STOP! because bd(' + bD.value + ') less than (' + cD.value + ')');
        this.printFinalResult(comparePolinom, stepenPolinoma, bits);
        break;
      }

      var r = bD.value - cD.value;
      this.addResultNumber(r);
      result.push(r);

      var crcWithR = [];
      for(var i = 0; i < crcPolinom.length; i++)
        crcWithR.push(r + crcPolinom[i]);

      comparePolinom = mergeArray(comparePolinom, crcWithR);
      this.addStep(comparePolinom);

      console.warn(bD, cD, r, 'crcWithR', crcWithR, 'newBitsPolinom', comparePolinom);
    }
  }

  this.getBitString = function(stepenPolinoma){
    var text = $('#inputBit').val();
    var result = '';
    for(var i = 0; i < text.length; i++)
      if(text[i] == '1' || text[i] == '0') result += text[i];

    for(var i = 0; i < stepenPolinoma; i++)
      result += '0';

    return result;
  }

  this.bitToPolinomArray = function(bits){
    var reverse = this.reverseString(bits);

    var result = [];
    for(var i = 0; i < reverse.length; i++)
      if(reverse[i] == '1')
        result.unshift(i );

    result = result.sort(function (a, b) {  return b - a;  });    
    return result;
  }

  this.bitToPolinomString = function(pol){
    var str = '';
    var hasEntries = false;
    pol.forEach(e =>{
      if(e == 0)
        str += (hasEntries ? ' + ' : '') + ' 1 ';
      else if(e == 1)
        str += (hasEntries ? ' + ' : '') + ' x ';
      else
        str += (hasEntries ? ' + ' : '') + ' x' + e + ' ';
      hasEntries = true;
    });
    return str;
  }

  this.reverseString = function(str){
    var reverse = '';
    for(var i = str.length - 1; i >= 0; i--)
      reverse =  reverse + str[i];
    return reverse;
  }

  this.polinomToBitString = function(pol, num){
    var str = '';
    for(var i = 0; i < num; i++) str += '0';
    pol.forEach(e => {
      str = str.replaceAt(e, '1');
    });
    str = this.reverseString(str);
    return str;
  }

  this.getPolinomArray = function(){
    var splitByPlus = $('#inputPolinom').val().replace(/\s/g, "").toLowerCase().split('+');
    var result = [];
    for(var i = 0; i < splitByPlus.length; i++){
      if(splitByPlus[i] == '')
        continue;
      else if(splitByPlus[i] == 'x')
        result.push(1);
      else if(splitByPlus[i] == '1')
        result.push(0);
      else
        result.push(parseInt(splitByPlus[i].replace(/\x/g, "")));
    }

    result = result.sort(function (a, b) {  return b - a;  });
    return result;
  }

  /*
    +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
    PRINTINGS
  */



  this.printBits = function(bits, stepenPolinoma){
    var to = bits.length + 1 - stepenPolinoma;
    var bitsHtml = bits.substr(0, to - 1) + '<span class="rBits_crc">' + bits.substr(to - 1, bits.length - 1) + "</span>";
    $('#result').append('<div id="rBits">' + bitsHtml+ '</div>');
  }

  this.addResultNumber = function(x){
    $('#dRezultat').append('<span class="word">x<sup class="stepen">'+x+'</sup></span>');
  }

  this.addStep = function(pol){
    $('#result').append('<div>' + this.printGetPolinomSentence(pol) + '</div>');
  }

  this.printDeljenje = function(bitsPolinom, crcPolinom){
    $('#result').append(
      '<div id="razlomak">' + 
        this.printGetPolinomSentence(bitsPolinom) + ' : ' + 
        this.printGetPolinomSentence(crcPolinom) + ' = ' + 
        '<div id="dRezultat"></div>' + 
      '</div>');
  }

  this.printGetPolinomSentence = function(polinom){
    var html = '';
    for(var i = 0; i < polinom.length; i++)
      html +='<span class="word">x<sup class="stepen">'+polinom[i]+'</sup></span>';
    return '<div class="sentence">' + html + '</div>';

  }

  this.printFinalResult = function(pol, stepenPolinoma, originalBits){
    var html = this.printGetPolinomSentence(pol);
    html += '<strong>OSTATAK</strong><br>';
    var bits = this.polinomToBitString(pol, stepenPolinoma);
    html += '<div>' + originalBits.substr(0, originalBits.length - 4) + '<span style="color:red">' +  bits + '</span></div>';
    $('#result').append('<br><br>' + html);

  }

  this.init();
}


Array.prototype.getFirstAvaliable = function(){
  for(var i = 0; i < this.length; i++)
    if(this[i] != 0)
      return {
        value:this[i],
        index: i
      };
  return null;
}

function mergeArray(fromArray, inputArray){
  inputArray.forEach(e=>{
    if(fromArray.indexOf(e) == -1)
      fromArray.push(e);
    else
      fromArray.splice(fromArray.indexOf(e), 1);
  });

  fromArray = fromArray.sort(function (a, b) {  return b - a;  });
  console.log('sorted', fromArray);
  return fromArray;
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}