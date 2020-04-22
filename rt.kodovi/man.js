var man = {
  length:2,
  
  from: function(input){
    var result = '';

    if(input.length % 2 != 0){
      console.error('input nije dijeliv sa dva!!');
      return null;
    }

    for(var i = 0; i < input.length; i+=2){
      var wrd = input[i] + input[i + 1];
      if(wrd == '_-') result += '1';
      else if(wrd == '-_') result += '0';
    }

    return result;
  },

  to: function(input, separate = false){
    var result = '';
    var sep = separate ? ' ' : '';
    for(var i = 0; i < input.length; i++){
      if(i == 0){
        result += (input[i] == '1' ? '_-' : '-_') + sep;
        continue;
      }

      if(input[i] == '1')
        result += '_-' + sep;
      else
        result += '-_' + sep;
    }
    return result;
  }
}