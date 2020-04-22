var nrzi = {
  length:1,
  
  from: function(input){
    var result = '';
    var currentChar = '';
    for(var i = 0; i < input.length; i++) {
      if(currentChar == ''){
        currentChar = input[i];
        result += currentChar == '-' ? '1' : '0';
        continue;
      }

      if(input[i] != currentChar){
        result += '1';
        currentChar = input[i];
      }
      else
        result += '0';

    }
    return result;
  },

  to: function(input, startWith = '_') {
    var result = '';
    var currentChar = startWith;
    for(var i = 0; i < input.length; i++) {
      if(input[i] == '1') 
        currentChar = currentChar == '_' ? '-' : '_';
      
      result += currentChar;
    }
    return result;
  }
};