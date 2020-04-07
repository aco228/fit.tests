function initial(){
  root = new Node();
  root.isRoot = true;
  nodes.push(root);

  // 1.

  var n1 = root.add();
  var n2 = root.add();
  var n3 = root.add();

  // 2.

  var n11 = n1.add();

  var n21 = n2.add();
  var n22 = n2.add();

  var n31 = n3.add();
  var n32 = n3.add();
  var n33 = n3.add();

  // 3.

  var n111 = n11.add();

  var n311 = n31.add();
  var n321 = n32.add();
  var n322 = n32.add();

  // 4.

  var n1111 = n111.add();
  var n1112 = n111.add();
  var n1113 = n111.add();

  var n3111 = n311.add();
  var n3112 = n311.add();
  var n3113 = n311.add();

  var n3211 = n321.add();
  var n3212 = n321.add();
  var n3213 = n321.add();
}

function initial_tehnikePretrazivanja(){
  root = new Node(8, 0);
  root.isRoot = true;
  nodes.push(root);

  var b = root.add(6, 3);  b.label = 'B';
  var c = root.add(7, 1);  c.label = 'C';

  var d = b.add(7, 2);  d.label = 'D';
  var e = b.add(2, 3); e.label = 'E';
  var f = c.add(3, 3); f.label = 'F';
  var g = c.add(9, 1); g.label = 'G';
  var h = c.add(6, 7); h.label = 'H';

  var k = d.add(11, 4);  k.label = 'K';
  var u = e.add(9, 8); u.label = 'U';
  var p = e.add(7, 9); p.label = 'P';
  var n = f.add(3, 9); n.label = 'N';
  var t = f.add(2, 3); t.label = 'T';
  var m = h.add(8, 4); m.label = 'M';

  var r = k.add(10, 2); r.label = 'R';
  var s = n.add(2, 2); s.label = 'S';
  var q = t.add(0, 3); q.label = 'Q';
  q.selected = true;
}