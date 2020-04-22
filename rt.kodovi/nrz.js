var nrz = {
  length:1,
  
  from: function(input){
    var result = '';
    for(var i = 0; i < input.length; i++)
      if(input[i] == '_') result += '1';
      else result += '0';
    return result;
  },

  to: function(input){
    var result = '';
    for(var i = 0; i < input.length; i++)
      if(input[i] == '1') result += '_';
      else result += '-';
    return result;
  }
};