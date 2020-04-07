

function init(){
  addInitialElements();
  selection();

  $('body').on('click', '.btnRemove', function(){ 
    unselectConnections();
    var parent = $(this).closest('.item');
    for(var name in connections.divConnections[parent.attr('id')]){
      var line = connections.divConnections[parent.attr('id')][name];
      $('#' + line).remove();
      delete connections[line];
      delete connections.divConnections[name][parent.attr('id')];
    }
    delete connections.divConnections[parent.attr('id')];
    parent.remove();
    onUpdate();
  });


  $('body').on('click', '#btnReset', function(){
    $('#content').html('');
    connections = {
      selectionPhase: false,
      selectionPhaseId: '',
      divConnections:{},
      lines:{}
    };
    onUpdate();
  });

  $('body').on('click', '.line', function(){
    var cline = connections.lines[$(this).attr('id')];
    delete connections.divConnections[cline[0]][cline[1]];
    delete connections.divConnections[cline[1]][cline[0]];
    $(this).remove();
    onUpdate();
  });

  $('body').on('click', '.btnPlus', function(){
    $(this).closest('.comp').find('input').val(parseInt($(this).closest('.comp').find('input').val()) + 1);
    onUpdate();
  });

  $('body').on('click', '.btnMinus', function(){
    $(this).closest('.comp').find('input').val(parseInt($(this).closest('.comp').find('input').val()) - 1);
    if(parseInt($(this).closest('.comp').find('input').val()) <= 0)
      $(this).closest('.comp').find('input').val(1);
    onUpdate();
  });
}

/*
  +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
  CONNECTION SELECTION
*/

var connections = {
  selectionPhase: false,
  selectionPhaseId: '',
  divConnections:{},
  lines:{}
};

function selection(){
  $('body').on('click', '.btnConnect', function(){ 
    var parent = $(this).closest('.item');
    if(parent.attr('id') == connections.selectionPhaseId)
      unselectConnections();
    else
      selectAllPotentialConnections($(this).parent('.item')); 
  });

  $('body').on('click', '.item', function(){ 
    if(!connections.selectionPhase) return;
    if($(this).attr('id') == connections.selectionPhaseId){ return; }
    if(!$(this).hasClass('item_canSelect')) return;
    connectDivs($(this).attr('id'), connections.selectionPhaseId);
    unselectConnections();
    onUpdate();
  });
}

function connectDivs(id1, id2){
  try{
    if(connections.connectDivs[id1][id2] == true || connections.connectDivs[id2][id1] == true)
      return;
  } catch{}

  var lineId = 'line_' + makeid();
  if(typeof connections.divConnections[id1] === 'undefined') connections.divConnections[id1] = {};
  if(typeof connections.divConnections[id2] === 'undefined') connections.divConnections[id2] = {};
  connections.divConnections[id1][id2] = lineId;
  connections.divConnections[id2][id1] = lineId;
  connections.lines[lineId] = [id1, id2];

  var line = $('<div class="line" id="'+lineId+'"></div>');
  $('#content').append(line);

  adjustLine(document.getElementById(id1), document.getElementById(id2), line[0]);

  return lineId;
}

function unselectConnections(){
  $('.item_canSelect').each(function(){
    $(this).removeClass('item_canSelect');
  })

  connections.selectionPhaseId = '';
  connections.selectionPhase = false;
}
function selectAllPotentialConnections(parent){
  unselectConnections();
  $('#content').find('.item').each(function(){
    if($(this).attr('id') == parent.attr('id'))
      return;

    if(parent.hasClass('comp') && $(this).hasClass('comp'))
      return;

    try{
      if(connections.divConnections[parent.attr('id')][$(this).attr('id')]) return;
    } catch{}

    $(this).addClass('item_canSelect');
  });

  connections.selectionPhaseId = parent.attr('id');
  connections.selectionPhase = true;
}


/*
  +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
  SYSTEM
*/

function makeid(length) {
  if(typeof length === 'undefined') length = 16;
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) 
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
}

function addInitialElements(){
  
  /*
  var ruter = addElemenet('.ruter');
  ruter.css({top: 50, left: 150});

  var s1 = addElemenet('.switch');
  s1.css({top:150, left: 40});
  connectDivs(ruter.attr('id'), s1.attr('id'));

  var s2 = addElemenet('.switch');
  s2.css({top:150, left: 250});
  connectDivs(ruter.attr('id'), s2.attr('id'));



  var k1 = addElemenet('.comp');
  k1.css({top:280, left: 40});
  connectDivs(s1.attr('id'), k1.attr('id'));

  var k2 = addElemenet('.comp');
  k2.css({top:280, left: 150});
  connectDivs(s1.attr('id'), k2.attr('id'));

  var k3 = addElemenet('.comp');
  k3.css({top:280, left: 250});
  connectDivs(s2.attr('id'), k3.attr('id'));
  */
  
  initialState();
  $('#content').find('.item').each(function(){ dragElement($(this)[0]);  });
  onUpdate();
}

function addElemenet(classOf){
  unselectConnections();
  var elem = $('#template').find(classOf).clone();
  var id = makeid();
  elem.attr('id', id);
  $('#content').append(elem);
  dragElement(elem[0]);
  onUpdate();
  return elem;
}

/*
  +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
  DRAWINGS
*/

function adjustLine(from, to, line){

  var fT = from.offsetTop  + from.offsetHeight/2;
  var tT = to.offsetTop    + to.offsetHeight/2;
  var fL = from.offsetLeft + from.offsetWidth/2;
  var tL = to.offsetLeft   + to.offsetWidth/2;
  
  var CA   = Math.abs(tT - fT);
  var CO   = Math.abs(tL - fL);
  var H    = Math.sqrt(CA*CA + CO*CO);
  var ANG  = 180 / Math.PI * Math.acos( CA/H );

  if(tT > fT){ var top  = (tT-fT)/2 + fT; }
  else { var top  = (fT-tT)/2 + tT; }
  if(tL > fL){ var left = (tL-fL)/2 + fL; }
  else{ var left = (fL-tL)/2 + tL; }

  if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
    ANG *= -1;
  }
  top-= H/2;

  line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
  line.style["-transform"] = 'rotate('+ ANG +'deg)';
  line.style.top    = top+'px';
  line.style.left   = left+'px';
  line.style.height = H + 'px';
}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }


  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    if($(elmnt).find('input').is(':focus'))
      console.log('focused');
    else
      console.log('no focused');
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    for(var name in connections.divConnections[elmnt.getAttribute('id')])  {
      adjustLine(
        document.getElementById(elmnt.getAttribute('id')), 
        document.getElementById(name),
        document.getElementById(connections.divConnections[elmnt.getAttribute('id')][name])
      );
    }

    /*
    adjustLine(
      document.getElementById('div1'), 
      document.getElementById('div2'),
      document.getElementById('line')
    );*/
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    /*
    adjustLine(
      document.getElementById('div1'), 
      document.getElementById('div2'),
      document.getElementById('line')
    );
    */
  }
}


/*
  +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
  UPDATES
*/

var currentResult = {
  nodes:0,
  broadcast:0, collision:0,
  visited:[], 
  connections:[],
}

var TYPES =  { RUTER: 0, SWITCH: 1, HUB: 2, BRIDGE: 3, COMPUTER: 4 };

function onUpdate(){
  currentResult.visited = [];
  currentResult.connections = [];
  $('#sUkupno').text($('#content').find('.item').length);

  var komps = 0;
  $('#content').find('.comp').each(function(){ komps += parseInt($(this).find('input').val()); });
  $('#sKomp').text(komps);
  $('#sSvic').text($('#content').find('.switch').length);
  $('#sHubovi').text($('#content').find('.hub').length);
  $('#sBridzevi').text($('#content').find('.bridge').length);
  $('#sRuteri').text($('#content').find('.ruter').length);
  currentResult.broadcast = 0;
  currentResult.collision = 0;

  $('#content').find('.ruter').each(function(){ visitNode($(this).attr('id')); });
  $('#content').find('.switch').each(function(){ visitNode($(this).attr('id')); });
  $('#content').find('.bridge').each(function(){ visitNode($(this).attr('id')); });

  $('#sBroadcast').text(currentResult.broadcast);
  $('#sKolizion').text(currentResult.collision);

  return currentResult;
}

function getType(id){
  var elem = $('#' + id);
  if(elem.hasClass('ruter')) return TYPES.RUTER;
  else if(elem.hasClass('switch')) return TYPES.SWITCH;
  else if(elem.hasClass('bridge')) return TYPES.BRIDGE;
  else if(elem.hasClass('hub')) return TYPES.HUB;
  else if(elem.hasClass('comp')) return TYPES.COMPUTER;
}


function visitNode(id){
  if(currentResult.visited.indexOf(id) > -1) 
    return;

  console.warn('visiting', $('#' + id).attr('class'));

  currentResult.visited.push(id);
  
  var type = getType(id);

  if(type == TYPES.HUB){
    currentResult.collision++;
    return;
  }


  for(var connectedId in connections.divConnections[id]){
    var connectedType = getType(connectedId);

    if(currentResult.visited.indexOf(connectedId) > -1)
      continue;

    if(currentResult.connections.indexOf(id + '-' + connectedId) > -1){
      console.error('this connection has been recorded: ' + id + '-' + connectedId)
      continue;
    }

    currentResult.connections.push(id + '-' + connectedId);
    currentResult.connections.push(connectedId + '-' + id);

    if(type == TYPES.RUTER)
      currentResult.broadcast++;

    if(connectedType == TYPES.COMPUTER)
    {
      console.log('computer type ' + connectedType + ' adding kolizion ' + parseInt($('#' + connectedId).find('input').val()));
      currentResult.collision += parseInt($('#' + connectedId).find('input').val());
    }

    else if(connectedType == TYPES.HUB){
      console.log('hub ' + connectedType + ' adding kolizion 1');
      currentResult.collision += 1;
    }

    else
    {
      currentResult.collision++;
      visitNode(connectedId);
    }

  }

}


/*
  +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
  INITIAL
*/


function initialState(){
  connections = {"selectionPhase":false,"selectionPhaseId":"","divConnections":{"8UswtekX6NuCGtr9":{"T27SF8fYLxr5Dawi":"line_sShIoXTt6zVtIBAg","RaGbl09GIznFZyNn":"line_U0eJq4zugAm2AyjK"},"T27SF8fYLxr5Dawi":{"8UswtekX6NuCGtr9":"line_sShIoXTt6zVtIBAg"},"RaGbl09GIznFZyNn":{"8UswtekX6NuCGtr9":"line_U0eJq4zugAm2AyjK","82SQuFpyzeTB7O93":"line_G2kmXsTuQoETHj4C","QqExMtYvAx6CUxWH":"line_AQDa3hLZotwY1ew2"},"82SQuFpyzeTB7O93":{"RaGbl09GIznFZyNn":"line_G2kmXsTuQoETHj4C","Lu9jqQpbOkcXScuV":"line_CZ9R318DsEl8FjCJ"},"Lu9jqQpbOkcXScuV":{"82SQuFpyzeTB7O93":"line_CZ9R318DsEl8FjCJ","fib757PM0lGtCnL5":"line_wVSdqPkcPBuAVIBW","3Dx2syCBx76m4MYb":"line_xerhmHRzlJWZemPN","7KkZcAFsMDR1Lmzp":"line_cqRapcpnfulPrhhF"},"fib757PM0lGtCnL5":{"Lu9jqQpbOkcXScuV":"line_wVSdqPkcPBuAVIBW"},"3Dx2syCBx76m4MYb":{"Lu9jqQpbOkcXScuV":"line_xerhmHRzlJWZemPN","yhL1DYOsYtWZcI5t":"line_2A8Ee8O92Y79nzCr"},"yhL1DYOsYtWZcI5t":{"3Dx2syCBx76m4MYb":"line_2A8Ee8O92Y79nzCr"},"7KkZcAFsMDR1Lmzp":{"Lu9jqQpbOkcXScuV":"line_cqRapcpnfulPrhhF","BTRSpSXmIpnlTz9q":"line_n61zuNeIi4CjfGVR"},"BTRSpSXmIpnlTz9q":{"7KkZcAFsMDR1Lmzp":"line_n61zuNeIi4CjfGVR"},"QqExMtYvAx6CUxWH":{"A29ri0CIj12Ktv9F":"line_C80sO9Eg0QTZLJfG","RaGbl09GIznFZyNn":"line_AQDa3hLZotwY1ew2","7cRqx3gCSChdq5cS":"line_xf9mBkADhnkauvC3","ZMMHfGXmfhBlnZoE":"line_pyjtKoNKl3FJDYPr"},"A29ri0CIj12Ktv9F":{"QqExMtYvAx6CUxWH":"line_C80sO9Eg0QTZLJfG","7cRqx3gCSChdq5cS":"line_gakZg3eJkDtg9lxT","olNPL1DRvvry54kT":"line_paTW2WLrWcpQv11T"},"7cRqx3gCSChdq5cS":{"A29ri0CIj12Ktv9F":"line_gakZg3eJkDtg9lxT","QqExMtYvAx6CUxWH":"line_xf9mBkADhnkauvC3","xPrid99Ca9w48P3p":"line_vUvXXYndKqPzEiN7"},"olNPL1DRvvry54kT":{"A29ri0CIj12Ktv9F":"line_paTW2WLrWcpQv11T"},"flkRSyhukm7lhcP3":{"ZMMHfGXmfhBlnZoE":"line_dFEcO2lwRYD1klqg","xPrid99Ca9w48P3p":"line_NhOs1efQ8rn4wfsl","gxiAu5oI90Js2Wof":"line_Tq525H23FlUWRJNn"},"ZMMHfGXmfhBlnZoE":{"flkRSyhukm7lhcP3":"line_dFEcO2lwRYD1klqg","QqExMtYvAx6CUxWH":"line_pyjtKoNKl3FJDYPr","gxiAu5oI90Js2Wof":"line_Ye4qlNAlFD89ISL5"},"xPrid99Ca9w48P3p":{"7cRqx3gCSChdq5cS":"line_vUvXXYndKqPzEiN7","flkRSyhukm7lhcP3":"line_NhOs1efQ8rn4wfsl","XhBhDjs0k6saHTNM":"line_7eLaWrt4mihMZWcL","kJCVyPLVEIwmkJ07":"line_C3KgDBjoZSkAT4C7"},"XhBhDjs0k6saHTNM":{"xPrid99Ca9w48P3p":"line_7eLaWrt4mihMZWcL"},"kJCVyPLVEIwmkJ07":{"xPrid99Ca9w48P3p":"line_C3KgDBjoZSkAT4C7","mORHQXjEyFBz4Fwy":"line_hAGD1pyxU5jYoXsv","93OiyHg6AGSc6JZi":"line_1Pyl66UoYiv9fQci","zGMhlgLXuzaWMZU7":"line_Sw8QdWOVWAAWmk1j"},"gxiAu5oI90Js2Wof":{"ZMMHfGXmfhBlnZoE":"line_Ye4qlNAlFD89ISL5","flkRSyhukm7lhcP3":"line_Tq525H23FlUWRJNn","e6yYZzghXfpz5Iq6":"line_nodk2AY3FkEn1mm5"},"e6yYZzghXfpz5Iq6":{"gxiAu5oI90Js2Wof":"line_nodk2AY3FkEn1mm5"},"mORHQXjEyFBz4Fwy":{"kJCVyPLVEIwmkJ07":"line_hAGD1pyxU5jYoXsv"},"93OiyHg6AGSc6JZi":{"kJCVyPLVEIwmkJ07":"line_1Pyl66UoYiv9fQci"},"zGMhlgLXuzaWMZU7":{"kJCVyPLVEIwmkJ07":"line_Sw8QdWOVWAAWmk1j"}},"lines":{"line_sShIoXTt6zVtIBAg":["8UswtekX6NuCGtr9","T27SF8fYLxr5Dawi"],"line_U0eJq4zugAm2AyjK":["RaGbl09GIznFZyNn","8UswtekX6NuCGtr9"],"line_G2kmXsTuQoETHj4C":["82SQuFpyzeTB7O93","RaGbl09GIznFZyNn"],"line_CZ9R318DsEl8FjCJ":["Lu9jqQpbOkcXScuV","82SQuFpyzeTB7O93"],"line_wVSdqPkcPBuAVIBW":["fib757PM0lGtCnL5","Lu9jqQpbOkcXScuV"],"line_xerhmHRzlJWZemPN":["Lu9jqQpbOkcXScuV","3Dx2syCBx76m4MYb"],"line_2A8Ee8O92Y79nzCr":["yhL1DYOsYtWZcI5t","3Dx2syCBx76m4MYb"],"line_cqRapcpnfulPrhhF":["Lu9jqQpbOkcXScuV","7KkZcAFsMDR1Lmzp"],"line_n61zuNeIi4CjfGVR":["7KkZcAFsMDR1Lmzp","BTRSpSXmIpnlTz9q"],"line_C80sO9Eg0QTZLJfG":["QqExMtYvAx6CUxWH","A29ri0CIj12Ktv9F"],"line_AQDa3hLZotwY1ew2":["RaGbl09GIznFZyNn","QqExMtYvAx6CUxWH"],"line_gakZg3eJkDtg9lxT":["7cRqx3gCSChdq5cS","A29ri0CIj12Ktv9F"],"line_xf9mBkADhnkauvC3":["7cRqx3gCSChdq5cS","QqExMtYvAx6CUxWH"],"line_paTW2WLrWcpQv11T":["olNPL1DRvvry54kT","A29ri0CIj12Ktv9F"],"line_DPQDDcehJfE1vZDz":["7cRqx3gCSChdq5cS","flkRSyhukm7lhcP3"],"line_dFEcO2lwRYD1klqg":["ZMMHfGXmfhBlnZoE","flkRSyhukm7lhcP3"],"line_pyjtKoNKl3FJDYPr":["QqExMtYvAx6CUxWH","ZMMHfGXmfhBlnZoE"],"line_vUvXXYndKqPzEiN7":["xPrid99Ca9w48P3p","7cRqx3gCSChdq5cS"],"line_NhOs1efQ8rn4wfsl":["flkRSyhukm7lhcP3","xPrid99Ca9w48P3p"],"line_7eLaWrt4mihMZWcL":["XhBhDjs0k6saHTNM","xPrid99Ca9w48P3p"],"line_C3KgDBjoZSkAT4C7":["xPrid99Ca9w48P3p","kJCVyPLVEIwmkJ07"],"line_8Oq2JFOSOdy9ei4d":["kJCVyPLVEIwmkJ07","551LUc6j3hy6KFjw"],"line_ezReBjdcPPLLwlcD":["3Dx2syCBx76m4MYb","gxiAu5oI90Js2Wof"],"line_Ye4qlNAlFD89ISL5":["ZMMHfGXmfhBlnZoE","gxiAu5oI90Js2Wof"],"line_Tq525H23FlUWRJNn":["flkRSyhukm7lhcP3","gxiAu5oI90Js2Wof"],"line_nodk2AY3FkEn1mm5":["gxiAu5oI90Js2Wof","e6yYZzghXfpz5Iq6"],"line_hAGD1pyxU5jYoXsv":["kJCVyPLVEIwmkJ07","mORHQXjEyFBz4Fwy"],"line_1Pyl66UoYiv9fQci":["kJCVyPLVEIwmkJ07","93OiyHg6AGSc6JZi"],"line_Sw8QdWOVWAAWmk1j":["kJCVyPLVEIwmkJ07","zGMhlgLXuzaWMZU7"]}};
  $('#content').html(`<div class="item hub" id="8UswtekX6NuCGtr9" style="top: 147px; left: 197px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./hub.png')"></div>
  <div class="host_name">#HUB</div>
</div><div class="item comp" id="T27SF8fYLxr5Dawi" style="top: 31px; left: 198px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <button class="btnPlus">+</button><button class="btnMinus">-</button> <br>
  <div class="icon" style="background-image: url('./pc.png')"></div>
  <div class="host_name">#KOMP</div>
  <input type="number" value="2">
</div><div class="line" id="line_sShIoXTt6zVtIBAg" style="transform: rotate(0.612766deg); top: 78.9973px; left: 230.5px; height: 93.5053px;"></div><div class="item bridge" id="RaGbl09GIznFZyNn" style="top: 221px; left: 196px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./bridge.png')"></div>
  <div class="host_name">#BRIDGE</div>
</div><div class="item switch" id="82SQuFpyzeTB7O93" style="top: 366px; left: 195px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./switch.png')"></div>
  <div class="host_name">#SWITCH</div>
</div><div class="item switch" id="Lu9jqQpbOkcXScuV" style="top: 459px; left: 198px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./switch.png')"></div>
  <div class="host_name">#SWITCH</div>
</div><div class="line" id="line_U0eJq4zugAm2AyjK" style="transform: rotate(0.77422deg); top: 172.497px; left: 229.5px; height: 74.0068px;"></div><div class="line" id="line_G2kmXsTuQoETHj4C" style="transform: rotate(0.395137deg); top: 246.498px; left: 228.5px; height: 145.003px;"></div><div class="line" id="line_CZ9R318DsEl8FjCJ" style="transform: rotate(-1.84761deg); top: 392.476px; left: 230.5px; height: 93.0484px;"></div><div class="item comp" id="fib757PM0lGtCnL5" style="top: 547px; left: 199px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <button class="btnPlus">+</button><button class="btnMinus">-</button> <br>
  <div class="icon" style="background-image: url('./pc.png')"></div>
  <div class="host_name">#KOMP</div>
  <input type="number" value="3">
</div><div class="line" id="line_wVSdqPkcPBuAVIBW" style="transform: rotate(-0.5185deg); top: 485.498px; left: 232.5px; height: 110.505px;"></div><div class="item hub" id="3Dx2syCBx76m4MYb" style="top: 458px; left: 312px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./hub.png')"></div>
  <div class="host_name">#HUB</div>
</div><div class="item comp" id="yhL1DYOsYtWZcI5t" style="top: 549px; left: 313px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <button class="btnPlus">+</button><button class="btnMinus">-</button> <br>
  <div class="icon" style="background-image: url('./pc.png')"></div>
  <div class="host_name">#KOMP</div>
  <input type="number" value="2">
</div><div class="line" id="line_xerhmHRzlJWZemPN" style="transform: rotate(89.4974deg); top: 427.998px; left: 289px; height: 114.004px;"></div><div class="line" id="line_2A8Ee8O92Y79nzCr" style="transform: rotate(-0.504796deg); top: 483.498px; left: 345.5px; height: 113.504px;"></div><div class="item hub" id="7KkZcAFsMDR1Lmzp" style="top: 458px; left: 116px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./hub.png')"></div>
  <div class="host_name">#HUB</div>
</div><div class="item comp" id="BTRSpSXmIpnlTz9q" style="top: 435px; left: 21px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <button class="btnPlus">+</button><button class="btnMinus">-</button> <br>
  <div class="icon" style="background-image: url('./pc.png')"></div>
  <div class="host_name">#KOMP</div>
  <input type="number" value="5">
</div><div class="line" id="line_cqRapcpnfulPrhhF" style="transform: rotate(-88.6196deg); top: 442.988px; left: 190.5px; height: 83.0241px;"></div><div class="line" id="line_n61zuNeIi4CjfGVR" style="transform: rotate(-89.6984deg); top: 435.749px; left: 101.5px; height: 95.0013px;"></div><div class="item ruter" id="QqExMtYvAx6CUxWH" style="top: 220px; left: 396px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./ruter.png')"></div>
  <div class="host_name">#RUTER</div>
</div><div class="item ruter" id="A29ri0CIj12Ktv9F" style="top: 122px; left: 494px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./ruter.png')"></div>
  <div class="host_name">#RUTER</div>
</div><div class="item comp" id="olNPL1DRvvry54kT" style="top: 3px; left: 494px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <button class="btnPlus">+</button><button class="btnMinus">-</button> <br>
  <div class="icon" style="background-image: url('./pc.png')"></div>
  <div class="host_name">#KOMP</div>
  <input type="number" value="1">
</div><div class="item ruter" id="7cRqx3gCSChdq5cS" style="top: 221px; left: 588px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./ruter.png')"></div>
  <div class="host_name">#RUTER</div>
</div><div class="line" id="line_C80sO9Eg0QTZLJfG" style="transform: rotate(45deg); top: 127.204px; left: 478px; height: 138.593px;"></div><div class="line" id="line_AQDa3hLZotwY1ew2" style="transform: rotate(89.7135deg); top: 145.999px; left: 329px; height: 200.002px;"></div><div class="line" id="line_gakZg3eJkDtg9lxT" style="transform: rotate(-43.516deg); top: 128.741px; left: 574px; height: 136.517px;"></div><div class="line" id="line_xf9mBkADhnkauvC3" style="transform: rotate(-89.7016deg); top: 149.999px; left: 525px; height: 192.003px;"></div><div class="line" id="line_paTW2WLrWcpQv11T" style="transform: rotate(0deg); top: 51px; left: 527px; height: 96.5px;"></div><div class="item ruter" id="ZMMHfGXmfhBlnZoE" style="top: 351px; left: 445px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./ruter.png')"></div>
  <div class="host_name">#RUTER</div>
</div><div class="item ruter" id="flkRSyhukm7lhcP3" style="top: 354px; left: 625px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./ruter.png')"></div>
  <div class="host_name">#RUTER</div>
</div><div class="line" id="line_dFEcO2lwRYD1klqg" style="transform: rotate(-89.0452deg); top: 287.988px; left: 568px; height: 180.025px;"></div><div class="line" id="line_pyjtKoNKl3FJDYPr" style="transform: rotate(-20.2657deg); top: 242.211px; left: 454px; height: 138.578px;"></div><div class="item ruter" id="xPrid99Ca9w48P3p" style="top: 221px; left: 726px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./ruter.png')"></div>
  <div class="host_name">#RUTER</div>
</div><div class="line" id="line_vUvXXYndKqPzEiN7" style="transform: rotate(90deg); top: 177.5px; left: 690px; height: 138px;"></div><div class="line" id="line_NhOs1efQ8rn4wfsl" style="transform: rotate(37.213deg); top: 229.499px; left: 708.5px; height: 167.003px;"></div><div class="item comp" id="XhBhDjs0k6saHTNM" style="top: 77px; left: 727px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <button class="btnPlus">+</button><button class="btnMinus">-</button> <br>
  <div class="icon" style="background-image: url('./pc.png')"></div>
  <div class="host_name">#KOMP</div>
  <input type="number" value="1">
</div><div class="line" id="line_7eLaWrt4mihMZWcL" style="transform: rotate(0.47156deg); top: 124.998px; left: 759.5px; height: 121.504px;"></div><div class="item hub" id="kJCVyPLVEIwmkJ07" style="top: 222px; left: 824px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./hub.png')"></div>
  <div class="host_name">#HUB</div>
</div><div class="line" id="line_C3KgDBjoZSkAT4C7" style="transform: rotate(-89.4154deg); top: 198.997px; left: 809px; height: 98.0051px;"></div><div class="item switch" id="gxiAu5oI90Js2Wof" style="top: 460px; left: 628px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <br>
  <div class="icon" style="background-image: url('./switch.png')"></div>
  <div class="host_name">#SWITCH</div>
</div><div class="line" id="line_Ye4qlNAlFD89ISL5" style="transform: rotate(-59.2208deg); top: 324.499px; left: 569.5px; height: 213.002px;"></div><div class="line" id="line_Tq525H23FlUWRJNn" style="transform: rotate(-1.09122deg); top: 380.49px; left: 660px; height: 105.019px;"></div><div class="item comp" id="e6yYZzghXfpz5Iq6" style="top: 545px; left: 629px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <button class="btnPlus">+</button><button class="btnMinus">-</button> <br>
  <div class="icon" style="background-image: url('./pc.png')"></div>
  <div class="host_name">#KOMP</div>
  <input type="number" value="3">
</div><div class="line" id="line_nodk2AY3FkEn1mm5" style="transform: rotate(0deg); top: 486.5px; left: 662px; height: 106.5px;"></div><div class="item comp" id="zGMhlgLXuzaWMZU7" style="top: 101px; left: 939px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <button class="btnPlus">+</button><button class="btnMinus">-</button> <br>
  <div class="icon" style="background-image: url('./pc.png')"></div>
  <div class="host_name">#KOMP</div>
  <input type="number" value="1">
</div><div class="item comp" id="93OiyHg6AGSc6JZi" style="top: 221px; left: 940px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <button class="btnPlus">+</button><button class="btnMinus">-</button> <br>
  <div class="icon" style="background-image: url('./pc.png')"></div>
  <div class="host_name">#KOMP</div>
  <input type="number" value="1">
</div><div class="item comp" id="mORHQXjEyFBz4Fwy" style="top: 339px; left: 941px;">
  <button class="btnConnect">C</button><button class="btnRemove">X</button> <button class="btnPlus">+</button><button class="btnMinus">-</button> <br>
  <div class="icon" style="background-image: url('./pc.png')"></div>
  <div class="host_name">#KOMP</div>
  <input type="number" value="1">
</div><div class="line" id="line_hAGD1pyxU5jYoXsv" style="transform: rotate(-39.9869deg); top: 226.215px; left: 915.5px; height: 182.069px;"></div><div class="line" id="line_1Pyl66UoYiv9fQci" style="transform: rotate(-79.8926deg); top: 200.344px; left: 915.5px; height: 116.813px;"></div><div class="line" id="line_Sw8QdWOVWAAWmk1j" style="transform: rotate(49.4192deg); top: 122.541px; left: 914.5px; height: 151.417px;"></div>`);
}