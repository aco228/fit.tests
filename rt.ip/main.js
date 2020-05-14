var system = new function System(){

  this.init = function(){
    $(window).keydown(function (e) {

      if (e.ctrlKey && e.keyCode == 13) {
        if(editor == null)
          return;
        
        try{
          eval(editor.getValue());
        }
        catch(e){
          console.error(e);
        }
      }
    });
  }

  this.intToBin = function(input, length = 8){
    if(typeof input !== 'number')
      input = parseInt(input);

    if(length == 8 && (input > 255 || input < 0))
      throw 'intToBin:: Broj mora biti izmedju 0 i 255';

    var r =  (input >>> 0).toString(2);
    if(r.length < length)
      for(var i  = r.length; i < length; i++) r = '0' + r;
    
    return r;
  }

  this.binToInt = function(input){
    return parseInt(input, 2);
  }

  this.ipToBin = function(input, solid){
    var r = '';

    if(typeof input == 'string'){
      var split = input.split('.');
      if(split.length != 4)
        throw `system.ipToBin:: input:${input} mora imati 4 tacke`;
      input = [];
      split.forEach((e)=> input.push(system.intToBin(parseInt(e))) );
    }

    for(var i = 0; i < 4; i++)
      r += (i != 0 && !solid ? '.' : '') + input[i];

    return r;
  }


  this.binToIP = function(input){
    var hasDot = false;
    if(input.length == 32){
      hasDot = false;
      input = input.substr(0, 8) + '.' + input.substr(8, 8) + '.' + input.substr(16,8) + '.' + input.substr(24, 8);
    }
    else if(input.length == 35) hasDot = true;
    else throw 'Pogresan format - ' + input;

    var split = input.split('.');
    if(split.length != 4)
      throw `Binarn '${input}' mora imati 4 tacke`;
    
    var r = '';
    for(var i = 0; i < split.length; i++)
      r += (i == 0 ? '' : '.') + system.binToInt(split[i]);

    return r;
  }

  // uzima koliko bita je potrebno da se napravi 'num' uredjaja
  this.getBits = function(num){
    var p = 0;
    for(;;){
      if(Math.pow(2, p) - 2 >= num) break;
      p++;
    }
    return p;
  }
  
  // vraca koliko je moguce uredjaja povezati na ovaj broj dostupnih nula u subnet maski
  this.getDevices = function(zeros){
    return Math.pow(2, zeros) - 2;
  }

  this.int2ip  = function(ipInt) { return ( (ipInt>>>24) +'.' + (ipInt>>16 & 255) +'.' + (ipInt>>8 & 255) +'.' + (ipInt & 255) ); }
  this.ip2int = function(ip) { return ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0; }

  this.constructSubnetIP = function(zeros){ return '1'.repeat('1', 31 - zeros).repeat('0', zeros); }

  this.init();
}


String.prototype.repeat = function(char, num){
  if(typeof num === 'undefined' && typeof char === 'number'){
    num = char - 1;
    char = this.toString();
  }

  var r = this.toString();
  for(var i = 0; i < num; i++)
    r += char;
  return r;
}

function isCharNumber(c){
  return c >= '0' && c <= '9';
}