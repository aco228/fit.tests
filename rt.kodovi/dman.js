var dman = {
  length:2,

  from: function(data){
    var result = '';
    var input = data.text;
    var last = '';
    var dic = data.startPosition == 'up' ? ['_-',  '-_'] : ['-_',  '_-'];

    if(input.length % 2 != 0){
      console.error('input nije dijeliv sa dva!!');
      return null;
    }

    for(var i = 0; i < input.length; i+=2){
      var wrd = input[i] + input[i + 1];

      if(i == 0){
        result += wrd == dic[0] ? '1' : '0';
        last = wrd;
        continue;
      }

      if(input[i] == last[1])
        result += '1';
      else
        result += '0';

      last = wrd;
      /*if(i == 0){
        result += wrd == '_-' ? '1' : '0';
        last = wrd;
        continue;
      }

      if(wrd == '-_') result += '0';
      else result += '1';
      */
    }
    
    return result;
  },

  to: function(data, separate = false){
    var result = '';
    var sep = separate ? ' | ' : '';
    var last = '';
    var input = data.text;
    var dic = data.startPosition == 'up' ? ['_-',  '-_'] : ['-_',  '_-'];

    for(var i = 0; i < input.length; i++){
      if(i == 0){
        last = (input[i] != '0' ? dic[0] : dic[1]);
        result += last + sep;
        continue;
      }

      if(input[i] == '0'){
        last = last != dic[1] ? dic[0] : dic[1];
        result += last + sep;
      }
      else{
        last = last == dic[1] ? dic[0] : dic[1];
        result += last + sep;
      }
    }
    return result;
  }
}