var dman = {
  length:2,

  from: function(input){
    
  },

  to: function(input, separate = false){
    var result = '';
    var sep = separate ? ' | ' : '';
    var last = '';

    for(var i = 0; i < input.length; i++){
      if(i == 0){
        last = (input[i] != '0' ? '_-' : '-_');
        result += last + sep;
        continue;
      }

      if(input[i] == '0'){
        last = last != '-_' ? '_-' : '-_';
        result += last + sep;
      }
      else
        last = last == '-_' ? '_-' : '-_';
        result += last + sep;

    }
    return result;
  }
}