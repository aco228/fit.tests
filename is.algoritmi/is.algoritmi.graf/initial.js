function loadInitial(){
  $('#content').html(html);
  $('#content').find('.node').each(function(){
    var node = new Node(parseInt($(this).find('.node_value').val()), 0);
    node.label = $(this).find('.node_label').val();
    node.isRoot = $(this).hasClass('nodeRoot');
    node.selected = $(this).hasClass('nodeSelected');
    node.id = $(this).attr('id');

    if(node.isRoot)
      root = node;

    nodes.push(node);
    main.dragNode(node);
  });

  $('#content').find('.line').each(function(){
    var parent = main.getNode($(this).attr('from'));
    var child = main.getNode($(this).attr('to'));

    parent.children.push(child);
    child.parent.push(parent);
    child.cost = parseInt($(this).find('.node_cost').val());
  });


  main.updateContentHeight();
}

var html = `<div class="node nodeRoot" id="nodePL8q9r7MFp04RH1T" style="top: 35px; left: 163px;">
  
  <div class="node_inside">
    <input class="node_label" value="S" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="4"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="node" id="nodezgeskeiKK7tcPnyb" style="top: 132px; left: 87px;">
  
  <div class="node_inside">
    <input class="node_label" value="A" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="2"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="node" id="nodeyYooOjBmr8Jl3riS" style="top: 130px; left: 180px;">
  
  <div class="node_inside">
    <input class="node_label" value="C" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="4"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="node" id="nodeG62zyqbVQgU6gJrr" style="top: 127px; left: 265px;">
  
  <div class="node_inside">
    <input class="node_label" value="K" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="5"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="node" id="nodedvID5iudNlO9s0WE" style="top: 39px; left: 354px;">
  
  <div class="node_inside">
    <input class="node_label" value="L" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="6"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="line" id="line_nodePL8q9r7MFp04RH1T_nodezgeskeiKK7tcPnyb" from="nodePL8q9r7MFp04RH1T" to="nodezgeskeiKK7tcPnyb" style="transform: rotate(38.0789deg); top: 41.3863px; left: 144.5px; height: 123.227px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="2">
</div><div class="line" id="line_nodePL8q9r7MFp04RH1T_nodeyYooOjBmr8Jl3riS" from="nodePL8q9r7MFp04RH1T" to="nodeyYooOjBmr8Jl3riS" style="transform: rotate(-10.1455deg); top: 53.7455px; left: 191px; height: 96.5091px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="1">
</div><div class="line" id="line_nodePL8q9r7MFp04RH1T_nodeG62zyqbVQgU6gJrr" from="nodePL8q9r7MFp04RH1T" to="nodeG62zyqbVQgU6gJrr" style="transform: rotate(-47.9508deg); top: 31.8196px; left: 233.5px; height: 137.361px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="2">
</div><div class="line" id="line_nodeG62zyqbVQgU6gJrr_nodedvID5iudNlO9s0WE" from="nodeG62zyqbVQgU6gJrr" to="nodedvID5iudNlO9s0WE" style="transform: rotate(225.324deg); top: 39.9201px; left: 329px; height: 125.16px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="1" style="transform: rotate(180deg);">
</div><div class="node" id="nodewB9AjhsAiB2iNl2U" style="top: 228px; left: 75px;">
  
  <div class="node_inside">
    <input class="node_label" value="B" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="3"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="node" id="nodeCGkLdg7qe4Zcvvt0" style="top: 211px; left: 222px;">
  
  <div class="node_inside">
    <input class="node_label" value="D" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="3"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="line" id="line_nodezgeskeiKK7tcPnyb_nodewB9AjhsAiB2iNl2U" from="nodezgeskeiKK7tcPnyb" to="nodewB9AjhsAiB2iNl2U" style="transform: rotate(7.12502deg); top: 150.126px; left: 99.5px; height: 96.7471px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="2">
</div><div class="line" id="line_nodeyYooOjBmr8Jl3riS_nodeCGkLdg7qe4Zcvvt0" from="nodeyYooOjBmr8Jl3riS" to="nodeCGkLdg7qe4Zcvvt0" style="transform: rotate(-27.4076deg); top: 143.379px; left: 219.5px; height: 91.2414px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="1">
</div><div class="node" id="nodee87j3mFHyYAwTwio" style="top: 289px; left: 298px;">
  
  <div class="node_inside">
    <input class="node_label" value="E" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="2"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="node nodeSelected" id="nodemj6vACbnOOGxAxPY" style="top: 292px; left: 195px;">
  
  <div class="node_inside">
    <input class="node_label" value="G" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="0"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="node" id="node0jMTwjpneYQX3A1X" style="top: 326px; left: 59px;">
  
  <div class="node_inside">
    <input class="node_label" value="H" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="4"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="line" id="line_nodewB9AjhsAiB2iNl2U_node0jMTwjpneYQX3A1X" from="nodewB9AjhsAiB2iNl2U" to="node0jMTwjpneYQX3A1X" style="transform: rotate(9.2726deg); top: 245.851px; left: 85.5px; height: 99.2975px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="2">
</div><div class="line" id="line_nodewB9AjhsAiB2iNl2U_nodemj6vACbnOOGxAxPY" from="nodewB9AjhsAiB2iNl2U" to="nodemj6vACbnOOGxAxPY" style="transform: rotate(-61.9275deg); top: 210.5px; left: 153.5px; height: 136px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="3">
</div><div class="line" id="line_nodeCGkLdg7qe4Zcvvt0_nodee87j3mFHyYAwTwio" from="nodeCGkLdg7qe4Zcvvt0" to="nodee87j3mFHyYAwTwio" style="transform: rotate(-44.2559deg); top: 214.048px; left: 278.5px; height: 108.904px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="1">
</div><div class="node" id="nodecY89ql0H96LMBLo9" style="top: 458px; left: 111px;">
  
  <div class="node_inside">
    <input class="node_label" value="J" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="6"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="node" id="nodeRU9z43Tu3UqHdDgr" style="top: 388px; left: 272px;">
  
  <div class="node_inside">
    <input class="node_label" value="F" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="1"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="node" id="nodeSXsOCI4zjNl6sCYb" style="top: 366px; left: 140px;">
  
  <div class="node_inside">
    <input class="node_label" value="I" minlength="1" maxlength="1">
    <input type="text" class="node_value" value="5"> <br>
    <div class="node_actions">
      <button class="btnDrag">M</button>
      <button class="btnConnectNode">C</button> <br>
      <button class="btnRemoveNode">X</button>
      <button class="btnFindThisOne">✓</button>
    </div>
  </div>
</div><div class="line" id="line_node0jMTwjpneYQX3A1X_nodeSXsOCI4zjNl6sCYb" from="node0jMTwjpneYQX3A1X" to="nodeSXsOCI4zjNl6sCYb" style="transform: rotate(-63.7186deg); top: 319.331px; left: 118px; height: 90.3383px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="2">
</div><div class="line" id="line_nodeSXsOCI4zjNl6sCYb_nodemj6vACbnOOGxAxPY" from="nodeSXsOCI4zjNl6sCYb" to="nodemj6vACbnOOGxAxPY" style="transform: rotate(216.621deg); top: 301.4px; left: 186px; height: 92.2009px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="5" style="transform: rotate(180deg);">
</div><div class="line" id="line_nodeRU9z43Tu3UqHdDgr_nodemj6vACbnOOGxAxPY" from="nodeRU9z43Tu3UqHdDgr" to="nodemj6vACbnOOGxAxPY" style="transform: rotate(141.267deg); top: 296.967px; left: 252px; height: 123.065px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="1" style="transform: rotate(180deg);">
</div><div class="line" id="line_nodee87j3mFHyYAwTwio_nodeRU9z43Tu3UqHdDgr" from="nodee87j3mFHyYAwTwio" to="nodeRU9z43Tu3UqHdDgr" style="transform: rotate(14.7151deg); top: 305.821px; left: 303.5px; height: 102.357px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="1">
</div><div class="line" id="line_nodeSXsOCI4zjNl6sCYb_nodecY89ql0H96LMBLo9" from="nodeSXsOCI4zjNl6sCYb" to="nodecY89ql0H96LMBLo9" style="transform: rotate(17.4958deg); top: 382.269px; left: 144px; height: 96.4624px;">
  <div class="line_pointer">◄</div>
  <input type="text" class="node_cost" value="1">
</div>`;