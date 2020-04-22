var bami = {
  length:1,

  from: function(input){
    var result = '';

    for(var i = 0; i < input.length; i++)
      result += input[i] == BAMI_CHAR ? '0' : '1';

    return result;
  },

  to: function(input){
    var result = '';
    var ones = 0;

    for(var i = 0; i < input.length; i++){
      if(input[i] == '0'){
        result += BAMI_CHAR;
        continue;
      }

      ones++;
      result += (ones %2 == 0) ? '_' : '-';
    }

    return result;
  }

};