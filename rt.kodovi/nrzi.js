var nrzi = {
  length:1,
  
  from: function(data){
    var result = '';
    var currentChar = '';
    var input = data.text;

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

  to: function(data) {
    var result = '';
    var currentChar = data.startPosition == 'up' ? '-' : '_';
    var input = data.text;
    
    for(var i = 0; i < input.length; i++) {
      if(input[i] == '1') 
        currentChar = currentChar == '_' ? '-' : '_';
      
      result += currentChar;
    }
    return result;
  }
};