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
    $('#btn_polinom2nizBita').click(function(){
      var text = $('#inputPolinom2NizBita').val();
      var pol = self.getPolinomArray(text);
      var stepenPolinoma = pol[0];
      $('#inputBit').val(self.polinomToBitString(pol, stepenPolinoma));
    });
  }

  this.calculate = function(){
    $('#result').html('');

    var crcPolinom = this.getPolinomArray($('#inputPolinom').val());
    var stepenPolinoma = crcPolinom[0];
    if($('#iskulirajStepenGeneratora').is(':checked'))
      stepenPolinoma = 0;

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
    var offset = 0;

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

      var merge = mergeArray(comparePolinom, crcWithR);
      comparePolinom = merge.result;

      this.addStep(comparePolinom, merge.deleted, offset);
      offset += merge.deleted.length;

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

  this.getPolinomArray = function(input){
    //input = input.replace(/\s/g, "").toLowerCase().split('+');
    input = this.preparePolinomString(input).split('+');
    var splitByPlus = input;
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

  this.preparePolinomString = function(input){
    input = input.replace(/\s/g, "").toLowerCase();
    var acptChars = '+x';
    var result = '';
    for(var i = 0; i < input.length; i++)
      if(isDigit(input[i]) || acptChars.indexOf(input[i]) !== -1)
        result += input[i];
    
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

  this.addStep = function(pol, deletedPol, offset){
    console.log('addstep', pol, deletedPol, offset);
    var offsetStr = '';
    if(typeof offset !== 'undefined')
      for(var i = 0; i < offset; i++)
        offsetStr += '<span class="word"></span>';

    $('#result').append('<div>' + this.printGetPolinomSentence(pol, deletedPol, offsetStr) + '</div>');
  }

  this.printDeljenje = function(bitsPolinom, crcPolinom){
    $('#result').append(
      '<div id="razlomak">' + 
        this.printGetPolinomSentence(bitsPolinom) + ' : ' + 
        this.printGetPolinomSentence(crcPolinom) + ' = ' + 
        '<div id="dRezultat"></div>' + 
      '</div>');
  }

  this.printGetPolinomSentence = function(polinom, deletedPolinom, offsetStr){
    var html = '';

    if(typeof deletedPolinom !== 'undefined' )
      for(var i = 0; i < deletedPolinom.length; i++)
        html += this.getWord(deletedPolinom[i], 'word_rmv');

    for(var i = 0; i < polinom.length; i++)
      html += this.getWord(polinom[i]);
    return '<div class="sentence">' + (typeof offsetStr === 'string' ? offsetStr : '') + html + '</div>';

  }

  this.getWord = function(pol, extraClass){
    extraClass = typeof extraClass === 'undefined' ? '' : ' ' + extraClass;

    if(pol == 0)
     return '<span class="word'+ extraClass +'">1<sup class="stepen"></sup></span> + '
    else if(pol == 1)
      return '<span class="word'+ extraClass +'">x<sup class="stepen"></sup></span> + '
    else
      return '<span class="word'+ extraClass +'">x<sup class="stepen">'+pol+'</sup></span> + '
  }


  this.printFinalResult = function(pol, stepenPolinoma, originalBits){
    var html = this.printGetPolinomSentence(pol);
    html += '<strong>OSTATAK</strong><br>';
    var bits = this.polinomToBitString(pol, stepenPolinoma);
    html += '<div>' + originalBits.substr(0, originalBits.length - stepenPolinoma) + '<span style="color:red">' +  bits + '</span></div>';
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
  var deleted = [];
  inputArray.forEach(e=>{
    if(fromArray.indexOf(e) == -1)
      fromArray.push(e);
    else{
      deleted.push(e);
      fromArray.splice(fromArray.indexOf(e), 1);
    }
  });
  
  fromArray = fromArray.sort(function (a, b) {  return b - a;  });
  console.log('sorted', fromArray);
  console.log('deleted', deleted);
  return {
    result: fromArray,
    deleted: deleted
  };
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function getInt(input) {
  var nums = input.replace(/[^0-9]/g, '');
  if(nums == '')
    return null;
  return parseInt(input.replace(/[^0-9]/g, ''));
}

// Test for digits
function isDigit(aChar)
{
   myCharCode = aChar.charCodeAt(0);

   if((myCharCode > 47) && (myCharCode <  58))
   {
      return true;
   }

   return false;
}