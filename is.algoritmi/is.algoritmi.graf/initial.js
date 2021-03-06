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

var html2 = `
<div class="node nodeRoot" id="nodeU55bA8Wz1Jb7ts9l" style="top: 20px; left: 35px;">
      
      <div class="node_inside">
        <input class="node_label" value="1" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="1"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodemyeElgQjPx5JHkdM" style="top: 121px; left: 36px;">
      
      <div class="node_inside">
        <input class="node_label" value="2" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="2"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodefswOAdQHMkwowb6X" style="top: 19px; left: 179px;">
      
      <div class="node_inside">
        <input class="node_label" value="5" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="5"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodeRrdZXb6lR4KHEL4J" style="top: 119px; left: 184px;">
      
      <div class="node_inside">
        <input class="node_label" value="3" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="3"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node nodeSelected" id="nodeAjQct3Hmx1YQiLwU" style="top: 118px; left: 346px;">
      
      <div class="node_inside">
        <input class="node_label" value="4" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="4"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="line doubleLine" id="line_nodemyeElgQjPx5JHkdM_nodeU55bA8Wz1Jb7ts9l" from="nodemyeElgQjPx5JHkdM" to="nodeU55bA8Wz1Jb7ts9l" style="transform: rotate(179.433deg); top: 38.4975px; left: 54px; height: 101.005px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeU55bA8Wz1Jb7ts9l_nodemyeElgQjPx5JHkdM" from="nodeU55bA8Wz1Jb7ts9l" to="nodemyeElgQjPx5JHkdM" style="transform: rotate(-0.567266deg); top: 38.4975px; left: 54px; height: 101.005px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="4">
    </div><div class="line doubleLine" id="line_nodefswOAdQHMkwowb6X_nodeU55bA8Wz1Jb7ts9l" from="nodefswOAdQHMkwowb6X" to="nodeU55bA8Wz1Jb7ts9l" style="transform: rotate(89.6021deg); top: -34.0017px; left: 125.5px; height: 144.003px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeU55bA8Wz1Jb7ts9l_nodefswOAdQHMkwowb6X" from="nodeU55bA8Wz1Jb7ts9l" to="nodefswOAdQHMkwowb6X" style="transform: rotate(269.602deg); top: -34.0017px; left: 125.5px; height: 144.003px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="3" style="transform: rotate(180deg);">
    </div><div class="line doubleLine" id="line_nodeRrdZXb6lR4KHEL4J_nodemyeElgQjPx5JHkdM" from="nodeRrdZXb6lR4KHEL4J" to="nodemyeElgQjPx5JHkdM" style="transform: rotate(89.2258deg); top: 64.4932px; left: 128.5px; height: 148.014px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodemyeElgQjPx5JHkdM_nodeRrdZXb6lR4KHEL4J" from="nodemyeElgQjPx5JHkdM" to="nodeRrdZXb6lR4KHEL4J" style="transform: rotate(269.226deg); top: 64.4932px; left: 128.5px; height: 148.014px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="2" style="transform: rotate(180deg);">
    </div><div class="line doubleLine" id="line_nodefswOAdQHMkwowb6X_nodeRrdZXb6lR4KHEL4J" from="nodefswOAdQHMkwowb6X" to="nodeRrdZXb6lR4KHEL4J" style="transform: rotate(-2.86241deg); top: 37.4375px; left: 200px; height: 100.125px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeRrdZXb6lR4KHEL4J_nodefswOAdQHMkwowb6X" from="nodeRrdZXb6lR4KHEL4J" to="nodefswOAdQHMkwowb6X" style="transform: rotate(177.138deg); top: 37.4375px; left: 200px; height: 100.125px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="2" style="transform: rotate(180deg);">
    </div><div class="line" id="line_nodeAjQct3Hmx1YQiLwU_nodefswOAdQHMkwowb6X" from="nodeAjQct3Hmx1YQiLwU" to="nodefswOAdQHMkwowb6X" style="transform: rotate(120.66deg); top: -10.0696px; left: 281px; height: 194.139px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="5" style="transform: rotate(180deg);">
    </div><div class="line" id="line_nodeU55bA8Wz1Jb7ts9l_nodeRrdZXb6lR4KHEL4J" from="nodeU55bA8Wz1Jb7ts9l" to="nodeRrdZXb6lR4KHEL4J" style="transform: rotate(-56.3988deg); top: -0.445514px; left: 129px; height: 178.891px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="5">
    </div><div class="line doubleLine" id="line_nodeAjQct3Hmx1YQiLwU_nodeRrdZXb6lR4KHEL4J" from="nodeAjQct3Hmx1YQiLwU" to="nodeRrdZXb6lR4KHEL4J" style="transform: rotate(89.6463deg); top: 55.9985px; left: 283.5px; height: 162.003px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeRrdZXb6lR4KHEL4J_nodeAjQct3Hmx1YQiLwU" from="nodeRrdZXb6lR4KHEL4J" to="nodeAjQct3Hmx1YQiLwU" style="transform: rotate(269.646deg); top: 55.9985px; left: 283.5px; height: 162.003px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="1" style="transform: rotate(180deg);">
    </div>`;

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


var html3 = `
<div class="node nodeRoot" id="nodeezfG4Ww2LhENxWKt" style="top: 14px; left: 155px;">
      
      <div class="node_inside">
        <input class="node_label" value="0" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="1"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodenRmMUCHMlExIDr7f" style="top: 167px; left: 66px;">
      
      <div class="node_inside">
        <input class="node_label" value="8" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="1"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodeGVLmG02ycPhp9bb1" style="top: 167px; left: 188px;">
      
      <div class="node_inside">
        <input class="node_label" value="3" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="1"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodefcdoB67ZxgbdiUmh" style="top: 296px; left: 250px;">
      
      <div class="node_inside">
        <input class="node_label" value="4" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="1"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodekSsLOhbyYohrMcl2" style="top: 14px; left: 344px;">
      
      <div class="node_inside">
        <input class="node_label" value="1" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="1"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodeTjFlXGCmw2IyvJjw" style="top: 167px; left: 347px;">
      
      <div class="node_inside">
        <input class="node_label" value="2" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="1"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodewdGT8IUgacKkQRlT" style="top: 62px; left: 467px;">
      
      <div class="node_inside">
        <input class="node_label" value="7" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="1"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="noder1OUDubxXWhFtI5e" style="top: 254px; left: 483px;">
      
      <div class="node_inside">
        <input class="node_label" value="5" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="1"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodeFw33uUs0uyXmnmdb" style="top: 135px; left: 603px;">
      
      <div class="node_inside">
        <input class="node_label" value="6" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="1"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="line doubleLine" id="line_nodenRmMUCHMlExIDr7f_nodeezfG4Ww2LhENxWKt" from="nodenRmMUCHMlExIDr7f" to="nodeezfG4Ww2LhENxWKt" style="transform: rotate(210.187deg); top: 21.4986px; left: 130px; height: 177.003px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeezfG4Ww2LhENxWKt_nodenRmMUCHMlExIDr7f" from="nodeezfG4Ww2LhENxWKt" to="nodenRmMUCHMlExIDr7f" style="transform: rotate(30.1865deg); top: 21.4986px; left: 130px; height: 177.003px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0">
    </div><div class="line doubleLine" id="line_nodekSsLOhbyYohrMcl2_nodeezfG4Ww2LhENxWKt" from="nodekSsLOhbyYohrMcl2" to="nodeezfG4Ww2LhENxWKt" style="transform: rotate(90deg); top: -61px; left: 269px; height: 189px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeezfG4Ww2LhENxWKt_nodekSsLOhbyYohrMcl2" from="nodeezfG4Ww2LhENxWKt" to="nodekSsLOhbyYohrMcl2" style="transform: rotate(90deg); top: -61px; left: 269px; height: 189px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0">
    </div><div class="line doubleLine" id="line_nodeGVLmG02ycPhp9bb1_nodeezfG4Ww2LhENxWKt" from="nodeGVLmG02ycPhp9bb1" to="nodeezfG4Ww2LhENxWKt" style="transform: rotate(167.829deg); top: 31.7408px; left: 191px; height: 156.518px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeezfG4Ww2LhENxWKt_nodeGVLmG02ycPhp9bb1" from="nodeezfG4Ww2LhENxWKt" to="nodeGVLmG02ycPhp9bb1" style="transform: rotate(-12.1715deg); top: 31.7408px; left: 191px; height: 156.518px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0">
    </div><div class="line doubleLine" id="line_nodefcdoB67ZxgbdiUmh_nodenRmMUCHMlExIDr7f" from="nodefcdoB67ZxgbdiUmh" to="nodenRmMUCHMlExIDr7f" style="transform: rotate(125.034deg); top: 138.642px; left: 177.5px; height: 224.715px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodenRmMUCHMlExIDr7f_nodefcdoB67ZxgbdiUmh" from="nodenRmMUCHMlExIDr7f" to="nodefcdoB67ZxgbdiUmh" style="transform: rotate(-54.9662deg); top: 138.642px; left: 177.5px; height: 224.715px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0">
    </div><div class="line doubleLine" id="line_nodeGVLmG02ycPhp9bb1_nodefcdoB67ZxgbdiUmh" from="nodeGVLmG02ycPhp9bb1" to="nodefcdoB67ZxgbdiUmh" style="transform: rotate(-25.6699deg); top: 179.437px; left: 238.5px; height: 143.126px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodefcdoB67ZxgbdiUmh_nodeGVLmG02ycPhp9bb1" from="nodefcdoB67ZxgbdiUmh" to="nodeGVLmG02ycPhp9bb1" style="transform: rotate(154.33deg); top: 179.437px; left: 238.5px; height: 143.126px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0" style="transform: rotate(180deg);">
    </div><div class="line doubleLine" id="line_nodeTjFlXGCmw2IyvJjw_nodeGVLmG02ycPhp9bb1" from="nodeTjFlXGCmw2IyvJjw" to="nodeGVLmG02ycPhp9bb1" style="transform: rotate(90deg); top: 107px; left: 287px; height: 159px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeGVLmG02ycPhp9bb1_nodeTjFlXGCmw2IyvJjw" from="nodeGVLmG02ycPhp9bb1" to="nodeTjFlXGCmw2IyvJjw" style="transform: rotate(90deg); top: 107px; left: 287px; height: 159px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0">
    </div><div class="line doubleLine" id="line_nodewdGT8IUgacKkQRlT_nodeTjFlXGCmw2IyvJjw" from="nodewdGT8IUgacKkQRlT" to="nodeTjFlXGCmw2IyvJjw" style="transform: rotate(48.8141deg); top: 54.2739px; left: 426.5px; height: 159.452px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeTjFlXGCmw2IyvJjw_nodewdGT8IUgacKkQRlT" from="nodeTjFlXGCmw2IyvJjw" to="nodewdGT8IUgacKkQRlT" style="transform: rotate(228.814deg); top: 54.2739px; left: 426.5px; height: 159.452px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0" style="transform: rotate(180deg);">
    </div><div class="line doubleLine" id="line_nodekSsLOhbyYohrMcl2_nodewdGT8IUgacKkQRlT" from="nodekSsLOhbyYohrMcl2" to="nodewdGT8IUgacKkQRlT" style="transform: rotate(-68.6821deg); top: -8.51704px; left: 425px; height: 132.034px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodewdGT8IUgacKkQRlT_nodekSsLOhbyYohrMcl2" from="nodewdGT8IUgacKkQRlT" to="nodekSsLOhbyYohrMcl2" style="transform: rotate(111.318deg); top: -8.51704px; left: 425px; height: 132.034px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0" style="transform: rotate(180deg);">
    </div><div class="line doubleLine" id="line_noder1OUDubxXWhFtI5e_nodeTjFlXGCmw2IyvJjw" from="noder1OUDubxXWhFtI5e" to="nodeTjFlXGCmw2IyvJjw" style="transform: rotate(122.607deg); top: 149.277px; left: 434.5px; height: 161.447px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeTjFlXGCmw2IyvJjw_noder1OUDubxXWhFtI5e" from="nodeTjFlXGCmw2IyvJjw" to="noder1OUDubxXWhFtI5e" style="transform: rotate(-57.3927deg); top: 149.277px; left: 434.5px; height: 161.447px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0">
    </div><div class="line doubleLine" id="line_nodeFw33uUs0uyXmnmdb_noder1OUDubxXWhFtI5e" from="nodeFw33uUs0uyXmnmdb" to="noder1OUDubxXWhFtI5e" style="transform: rotate(45.2397deg); top: 129.5px; left: 562.5px; height: 169px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_noder1OUDubxXWhFtI5e_nodeFw33uUs0uyXmnmdb" from="noder1OUDubxXWhFtI5e" to="nodeFw33uUs0uyXmnmdb" style="transform: rotate(225.24deg); top: 129.5px; left: 562.5px; height: 169px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0" style="transform: rotate(180deg);">
    </div>

`;


var html4 = `
<div class="node nodeRoot" id="nodeNcsvSfKOWZ0PNePJ" style="top: 161px; left: 55px;">
      
      <div class="node_inside">
        <input class="node_label" value="s" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="0"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodextHFTOgaffthSOD2" style="top: 47px; left: 206px;">
      
      <div class="node_inside">
        <input class="node_label" value="a" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="0"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodeLCqxIjnpiPcqkMBh" style="top: 135px; left: 205px;">
      
      <div class="node_inside">
        <input class="node_label" value="b" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="0"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodextmuSH2kJgBYqjfH" style="top: 257px; left: 190px;">
      
      <div class="node_inside">
        <input class="node_label" value="c" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="0"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodeSYvOBObjmJk2XoFi" style="top: 88px; left: 387px;">
      
      <div class="node_inside">
        <input class="node_label" value="d" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="0"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="nodesvWpEjtUATBbNuVG" style="top: 197px; left: 386px;">
      
      <div class="node_inside">
        <input class="node_label" value="e" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="0"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node" id="node9Bbz8GMYEHxMOtfI" style="top: 99px; left: 553px;">
      
      <div class="node_inside">
        <input class="node_label" value="f" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="0"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="node nodeSelected" id="nodeDcLwkDyXLGu2zGLq" style="top: 182px; left: 544px;">
      
      <div class="node_inside">
        <input class="node_label" value="g" minlength="1" maxlength="1">
        <input type="text" class="node_value" value="0"> <br>
        <div class="node_actions">
          <button class="btnDrag">M</button><br>
          <button class="btnConnectNode" type="1">C1</button>
          <button class="btnConnectNode" type="2">C2</button> <br>
          <button class="btnRemoveNode">X</button>
          <button class="btnFindThisOne">✓</button>
        </div>
      </div>
    </div><div class="line doubleLine" id="line_nodextmuSH2kJgBYqjfH_nodeNcsvSfKOWZ0PNePJ" from="nodextmuSH2kJgBYqjfH" to="nodeNcsvSfKOWZ0PNePJ" style="transform: rotate(125.417deg); top: 145.673px; left: 142px; height: 165.653px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeNcsvSfKOWZ0PNePJ_nodextmuSH2kJgBYqjfH" from="nodeNcsvSfKOWZ0PNePJ" to="nodextmuSH2kJgBYqjfH" style="transform: rotate(-54.5829deg); top: 145.673px; left: 142px; height: 165.653px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0">
    </div><div class="line doubleLine" id="line_nodeLCqxIjnpiPcqkMBh_nodextmuSH2kJgBYqjfH" from="nodeLCqxIjnpiPcqkMBh" to="nodextmuSH2kJgBYqjfH" style="transform: rotate(7.00938deg); top: 154.041px; left: 217px; height: 122.919px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodextmuSH2kJgBYqjfH_nodeLCqxIjnpiPcqkMBh" from="nodextmuSH2kJgBYqjfH" to="nodeLCqxIjnpiPcqkMBh" style="transform: rotate(187.009deg); top: 154.041px; left: 217px; height: 122.919px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0" style="transform: rotate(180deg);">
    </div><div class="line doubleLine" id="line_nodeLCqxIjnpiPcqkMBh_nodeNcsvSfKOWZ0PNePJ" from="nodeLCqxIjnpiPcqkMBh" to="nodeNcsvSfKOWZ0PNePJ" style="transform: rotate(80.1664deg); top: 91.3817px; left: 149.5px; height: 152.237px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeNcsvSfKOWZ0PNePJ_nodeLCqxIjnpiPcqkMBh" from="nodeNcsvSfKOWZ0PNePJ" to="nodeLCqxIjnpiPcqkMBh" style="transform: rotate(260.166deg); top: 91.3817px; left: 149.5px; height: 152.237px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0" style="transform: rotate(180deg);">
    </div><div class="line doubleLine" id="line_nodextHFTOgaffthSOD2_nodeNcsvSfKOWZ0PNePJ" from="nodextHFTOgaffthSOD2" to="nodeNcsvSfKOWZ0PNePJ" style="transform: rotate(52.9484deg); top: 28.8995px; left: 150px; height: 189.201px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeNcsvSfKOWZ0PNePJ_nodextHFTOgaffthSOD2" from="nodeNcsvSfKOWZ0PNePJ" to="nodextHFTOgaffthSOD2" style="transform: rotate(232.948deg); top: 28.8995px; left: 150px; height: 189.201px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0" style="transform: rotate(180deg);">
    </div><div class="line doubleLine" id="line_nodeLCqxIjnpiPcqkMBh_nodextHFTOgaffthSOD2" from="nodeLCqxIjnpiPcqkMBh" to="nodextHFTOgaffthSOD2" style="transform: rotate(180.651deg); top: 66.4972px; left: 225px; height: 88.0057px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodextHFTOgaffthSOD2_nodeLCqxIjnpiPcqkMBh" from="nodextHFTOgaffthSOD2" to="nodeLCqxIjnpiPcqkMBh" style="transform: rotate(0.65106deg); top: 66.4972px; left: 225px; height: 88.0057px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0">
    </div><div class="line doubleLine" id="line_nodeSYvOBObjmJk2XoFi_nodextHFTOgaffthSOD2" from="nodeSYvOBObjmJk2XoFi" to="nodextHFTOgaffthSOD2" style="transform: rotate(102.763deg); top: -5.79278px; left: 316px; height: 185.586px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodextHFTOgaffthSOD2_nodeSYvOBObjmJk2XoFi" from="nodextHFTOgaffthSOD2" to="nodeSYvOBObjmJk2XoFi" style="transform: rotate(-77.2368deg); top: -5.79278px; left: 316px; height: 185.586px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0">
    </div><div class="line doubleLine" id="line_nodeSYvOBObjmJk2XoFi_nodeLCqxIjnpiPcqkMBh" from="nodeSYvOBObjmJk2XoFi" to="nodeLCqxIjnpiPcqkMBh" style="transform: rotate(75.5202deg); top: 37.0146px; left: 315.5px; height: 187.971px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeLCqxIjnpiPcqkMBh_nodeSYvOBObjmJk2XoFi" from="nodeLCqxIjnpiPcqkMBh" to="nodeSYvOBObjmJk2XoFi" style="transform: rotate(255.52deg); top: 37.0146px; left: 315.5px; height: 187.971px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0" style="transform: rotate(180deg);">
    </div><div class="line doubleLine" id="line_node9Bbz8GMYEHxMOtfI_nodeLCqxIjnpiPcqkMBh" from="node9Bbz8GMYEHxMOtfI" to="nodeLCqxIjnpiPcqkMBh" style="transform: rotate(84.0939deg); top: -38.4286px; left: 398.5px; height: 349.857px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeLCqxIjnpiPcqkMBh_node9Bbz8GMYEHxMOtfI" from="nodeLCqxIjnpiPcqkMBh" to="node9Bbz8GMYEHxMOtfI" style="transform: rotate(264.094deg); top: -38.4286px; left: 398.5px; height: 349.857px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0" style="transform: rotate(180deg);">
    </div><div class="line doubleLine" id="line_nodesvWpEjtUATBbNuVG_nodeLCqxIjnpiPcqkMBh" from="nodesvWpEjtUATBbNuVG" to="nodeLCqxIjnpiPcqkMBh" style="transform: rotate(108.908deg); top: 89.8378px; left: 315px; height: 191.324px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeLCqxIjnpiPcqkMBh_nodesvWpEjtUATBbNuVG" from="nodeLCqxIjnpiPcqkMBh" to="nodesvWpEjtUATBbNuVG" style="transform: rotate(-71.0915deg); top: 89.8378px; left: 315px; height: 191.324px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0">
    </div><div class="line doubleLine" id="line_nodesvWpEjtUATBbNuVG_nodeSYvOBObjmJk2XoFi" from="nodesvWpEjtUATBbNuVG" to="nodeSYvOBObjmJk2XoFi" style="transform: rotate(180.526deg); top: 107.498px; left: 406px; height: 109.005px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeSYvOBObjmJk2XoFi_nodesvWpEjtUATBbNuVG" from="nodeSYvOBObjmJk2XoFi" to="nodesvWpEjtUATBbNuVG" style="transform: rotate(0.525635deg); top: 107.498px; left: 406px; height: 109.005px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0">
    </div><div class="line doubleLine" id="line_nodeDcLwkDyXLGu2zGLq_nodesvWpEjtUATBbNuVG" from="nodeDcLwkDyXLGu2zGLq" to="nodesvWpEjtUATBbNuVG" style="transform: rotate(84.5768deg); top: 129.645px; left: 484.5px; height: 158.71px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodesvWpEjtUATBbNuVG_nodeDcLwkDyXLGu2zGLq" from="nodesvWpEjtUATBbNuVG" to="nodeDcLwkDyXLGu2zGLq" style="transform: rotate(264.577deg); top: 129.645px; left: 484.5px; height: 158.71px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0" style="transform: rotate(180deg);">
    </div><div class="line doubleLine" id="line_node9Bbz8GMYEHxMOtfI_nodeDcLwkDyXLGu2zGLq" from="node9Bbz8GMYEHxMOtfI" to="nodeDcLwkDyXLGu2zGLq" style="transform: rotate(6.18862deg); top: 118.257px; left: 568px; height: 83.4865px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_nodeDcLwkDyXLGu2zGLq_node9Bbz8GMYEHxMOtfI" from="nodeDcLwkDyXLGu2zGLq" to="node9Bbz8GMYEHxMOtfI" style="transform: rotate(186.189deg); top: 118.257px; left: 568px; height: 83.4865px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0" style="transform: rotate(180deg);">
    </div><div class="line doubleLine" id="line_nodeSYvOBObjmJk2XoFi_node9Bbz8GMYEHxMOtfI" from="nodeSYvOBObjmJk2XoFi" to="node9Bbz8GMYEHxMOtfI" style="transform: rotate(-86.2088deg); top: 29.818px; left: 489.5px; height: 166.364px;">
      <div class="line_pointer">◄</div>
      
    </div><div class="line" id="line_node9Bbz8GMYEHxMOtfI_nodeSYvOBObjmJk2XoFi" from="node9Bbz8GMYEHxMOtfI" to="nodeSYvOBObjmJk2XoFi" style="transform: rotate(93.7912deg); top: 29.818px; left: 489.5px; height: 166.364px;">
      <div class="line_pointer">◄</div>
      <input type="text" class="node_cost" value="0" style="transform: rotate(180deg);">
    </div>`;