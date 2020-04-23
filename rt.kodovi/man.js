var man = {
  length:2,
  
  from: function(data){
    var result = '';
    var input = data.text;
    var dic = data.startPosition == 'up' ? ['_-',  '-_'] : ['-_',  '_-'];

    if(input.length % 2 != 0){
      console.error('input nije dijeliv sa dva!!');
      return null;
    }

    for(var i = 0; i < input.length; i+=2){
      var wrd = input[i] + input[i + 1];
      if(wrd == dic[0]) result += '1';
      else if(wrd == dic[1]) result += '0';
    }

    return result;
  },

  to: function(data, separate = false){
    var result = '';
    var sep = separate ? ' ' : '';
    var dic = data.startPosition == 'up' ? ['_-',  '-_'] : ['-_',  '_-'];
    var input = data.text;
    
    for(var i = 0; i < input.length; i++){
      if(i == 0){
        result += (input[i] == '1' ? dic[0] : dic[1]) + sep;
        continue;
      }

      if(input[i] == '1')
        result += dic[0] + sep;
      else
        result += dic[1] + sep;
    }
    return result;
  }
}