var bami = {
  length:1,

  from: function(data){
    var result = '';
    var input = data.text;

    for(var i = 0; i < input.length; i++)
      result += input[i] == BAMI_CHAR ? '0' : '1';

    return result;
  },

  to: function(data){
    var result = '';
    var ones = 0;
    var input = data.text;

    for(var i = 0; i < input.length; i++){
      if(input[i] == '0'){
        result += data.bamiChar;
        continue;
      }

      ones++;
      result += (ones %2 == 0) ? '_' : '-';
    }

    return result;
  }

};