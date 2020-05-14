/*
  1. +========================================================================================
  Kojoj klasi pripadaju sledece adrese
*/

new kIP('64.25.115.3').klasaMreze;
new kIP('147.91.168.9').klasaMreze;
new kIP('202.233.141.213').klasaMreze;
new kIP('234.11.153.16').klasaMreze;

/*
  2. +========================================================================================
   Odrediti adresu mreže i podmreže kojim pripadaju hostovi čije su adrese i subnet maske date. Zatim odrediti opsege dobijenih podmreža i njihove broadcast adrese. 

    a) 147.91.168.3 i subnet masku 255.255.224.0
    b) 140.98.193.141 i subnet masku 255.255.240.0
    c) 204.225.126.4 i subnet masku 255.255.255.252
    d) 63.240.14.250 i subnet masku 255.255.192.0
    e) 202.233.141.213 i subnet masku 255.255.255.240

*/

var ip = new kIP('147.91.168.3', '255.255.224.0');
console.log('Klasa: ' + ip.klasaMreze);
console.log('Default subnet maska: ' + ip.defaultSubnet.address + ' / ' + ip.defaultSubnet.addressBinary);
console.log('Adresa mreze default s: ' + ip.defaultSubnet.network.address + ' / ' + ip.defaultSubnet.network.addressBinary);
console.log('Subnet maska: ' + ip.subnet.address + ' / ' + ip.subnet.addressBinary);
console.log('Adresa subnet maske: ' + ip.subnet.network.address + ' / ' + ip.subnet.network.addressBinary);



