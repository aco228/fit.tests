

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

  $('#btnUpdate').click(function(){ onUpdate(); });


  $('body').on('click', '#btnReset', function(){
    $('#content').html('');
    connections = {
      selectionPhase: false,
      selectionPhaseId: '',
      divConnections:{},
      lines:{}
    };
    //setTimeout(function(){ onUpdate(); }, 100);
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
  $('#content').find('.item').each(function(){ dragElement($(this));  });
  onUpdate();
}

function addElemenet(classOf){
  unselectConnections();
  var elem = $('#template').find(classOf).clone();
  var id = makeid();
  elem.attr('id', id);
  $('#content').append(elem);
  dragElement(elem);
  //dragElement(elem.find('.btnMove')[0]);
  //console.log(elem.find('.btnMove')[0]);
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


//var elmnt = null;
function dragElement(elem) {
  var elmnt = elem[0];
  var btn = elem.find('.btnMove')[0];

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    btn.onmousedown = dragMouseDown;
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
    //elmnt = null;
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
var _result = null;

function onUpdate(){
  $('#brojPodmreza').text('');
  $('#rPrefix').text('');
  $('#resultTable').html('');

  if($('#content').find('.ruter').length <= 1)
    return;

  var ip = new IP($('#ipaddress').val());
  if(ip.isValid == false){
    alert(`IP Adresa ${$('#ipaddress').val()} nije validna`);
    return;
  }
  

  var result =  {
    data: run(),
    sorted: [],
    deviceBits: 0,
    networkBits:0,
    subnetPrefix: 0,
    networks:[]
  }
  $('#brojPodmreza').text(result.data.data.length);
  result.sorted = result.data.data.sort( function(a, b) {return a-b} );
  if(result.sorted.length == 0){
    console.error(`Nema dovovljno bita za uredjaje, tj. nema uredjaja`);
    return;
  }
  result.deviceBits = system.getBits(result.sorted[result.sorted.length - 1]);
  result.networkBits = ip.zeros - result.deviceBits;
  if(result.deviceBits + result.networkBits > ip.zeros){
    alert(`Nema dovoljno bita u ip, treba ${result.deviceBits}, a ip ima ${ip.zeros}`);
    return;
  }
  result.subnetPrefix = 32 - result.deviceBits;
  $('#rPrefix').text('/' + result.subnetPrefix);
  //ip.addSubnet();

  for(var i = 1; i <= result.sorted.length; i++){
    var row = $('<tr></tr>');
    var newIPAddress = ip.addressBinarySolid.substr(0, 32 - (result.networkBits + result.deviceBits)) + system.intToBin(i, result.networkBits) + '0'.repeat(result.deviceBits);
    var newIP = new IP(newIPAddress);
    result.networks.push(newIP);

    row.append(`<td>${i}</td>`);
    row.append(`<td>${result.sorted[i - 1] == 1 ? 2 : result.sorted[i - 1]}</td>`);
    row.append(`<td>${newIP.addressWithPrefix}</td>`);
    row.append(`<td>${newIP.broadcast.address}</td>`);
    row.append(`<td>${newIP.ranges[0].address} - ${newIP.ranges[1].address}</td>`);
    $('#resultTable').append(row);
  }

  _result = result;
  console.log('onupdate', result);
  return result;
}

function getType(id){
  var elem = $('#' + id);
  if(elem.hasClass('ruter')) return TYPES.RUTER;
  else if(elem.hasClass('switch')) return TYPES.SWITCH;
  else if(elem.hasClass('bridge')) return TYPES.BRIDGE;
  else if(elem.hasClass('hub')) return TYPES.HUB;
  else if(elem.hasClass('comp')) return TYPES.COMPUTER;
}

function run(){
  var result = {
    num: 0,
    visited: [],
    routerConnections:[],
    data:[]
  };
  visitedInPreviousIterations = [];


  $('#content').find('.ruter').each(function(){
    var id = $(this).attr('id');
    for(var name in connections.divConnections[id]){

      if(result.routerConnections.includes(id + name) || result.routerConnections.includes(name + id)) 
        continue;

      result.routerConnections.push(id + name);
      result.num++;
      result.visited.push(name);
    }
  });

  result.visited.forEach((e)=>{
    var computers = getComps($('#' + e));
    if(computers != 0)
      result.data.push(computers);
  });

  return result;
}

var visitedInPreviousIterations = [];

function getComps(elem, r = 0){
  
  var type = getType(elem.attr('id'));
  if(type == TYPES.RUTER){
    //console.log('ruter vracam 0');
    return r + 1;
  }
  
  if(visitedInPreviousIterations.includes(elem.attr('id')))
    return r;
  visitedInPreviousIterations.push(elem.attr('id'));

  if(type == TYPES.COMPUTER){
    //console.log(`vracam komp  ${elem.attr('id')} = ${ elem.find('input[type=number]').val()}, trenutni r=${r}`);
    r += parseInt(elem.find('input[type=number]').val());
  }

  for(var id in connections.divConnections[elem.attr('id')])
    r = getComps($('#' + id), r);
  
  //console.log('vracam ' + r);
  return r;
}

function saveComps(){
  var data = [];
  $('.comp').each(function(){
    data.push({
      id: $(this).attr('id'),
      num: parseInt($(this).find('input[type=number]').val())
    });
  });
  return data;
}




/*
  +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
  INITIAL
*/


function initialState(){
  var INDEX = 3;
  connections = initial[INDEX].connections;
  $('#content').html(initial[INDEX].data);
  
  if(typeof initial[INDEX].ip === 'string')
    $('#ipaddress').val(initial[INDEX].ip);

  for(var i = 0; i < initial[INDEX].compsData.length; i++){
    $('#' + initial[INDEX].compsData[i].id).find('input[type=number]').val(initial[INDEX].compsData[i].num);
  }

}

