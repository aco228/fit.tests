
/*
    Adresiranje mreza u uslov koji od podmreza ili uredjaja da koriste maksimalni broj bita
  */

Subnet.prototype.adresiranje_saNajmanjimMogucimBrojemPodmreza = function(subnetworks, devices) { return this.adresiranje(subnetworks, devices, false); }
Subnet.prototype.adresiranje_saNajmanjimBrojemHostova = function(subnetworks, devices){ return this.adresiranje(subnetworks, devices, true); }
Subnet.prototype.adresiranje = function(subnetworks, devices, focusSubnet){
  if(this.isPosible(subnetworks, devices) == null){
    var bits = this.bits(subnetworks, devices);
    throw `Nije moguce adresirati prostor za ${subnetworks} podmmreza i ${devices} uredjaja jer na raspolaganju imamo ${this.zeros} bita a potrebno je ${bits}`;
  }

  var nBitsForSubnets = system.getBits(subnetworks);
  var nBitsDevices = system.getBits(devices);

  if(focusSubnet)
    nBitsForSubnets = this.zeros - nBitsDevices;
  else
    nBitsDevices = this.zeros - nBitsForSubnets;

  var zeros = this.zeros - nBitsForSubnets;
  var subnet = new Subnet(this.parent, '1'.repeat('1', 31 - zeros).repeat('0', zeros));

  return {
    subnet: subnet,
    subnets: system.getDevices(nBitsForSubnets),
    devices: system.getDevices(nBitsDevices)
  }
}

  /*
    Da li je moguce adresirati unijeti broj mreza i uredjaja
  */
  
 Subnet.prototype.isPosible = function(network, devices){
  var networkBits = this.bits(network);
  var deviceBits = this.bits(devices);

  if((networkBits + deviceBits) > this.zeros)
    return null;
  
  var newIP = this.addressBinarySolid.substr(0, this.addressBinarySolid.length -  this.zeros);
  var zeros = 32 - networkBits - newIP.length;
  newIP = newIP.repeat('1', networkBits).repeat('0', zeros);

  return {
    subnet: new Subnet(this.parent, newIP),
    ukupnoBita: networkBits + deviceBits,
    dostupnoBita: this.zeros,
    networkBits: networkBits,
    deviceBits: deviceBits
  }
}


/*
  11.	Dat je opseg adresa ISP 96.88.160.0/21. ISP treba da podijeli svoj adresni prostor na mreže koje će imati po 80 računara. 
*/

Subnet.prototype.podjeli_naBrojKompjutera = function(devices){
  var deviceBits = system.getBits(devices);
  if(deviceBits > this.zeros)
    throw `Nemoguce je podjeliti jer za ${devices} uredjaja nam treba ${deviceBits} a imamo samo ${this.zeros} dostupnih bita`;
  
  var networkBits = this.zeros - deviceBits;
  return this.createNetworks(networkBits, deviceBits);
}

Subnet.prototype.podjeli_naMreze = function(brMreza){
  var networkBits = system.getBits(brMreza);
  if(networkBits > this.zeros)
    throw `Nemoguce je podjeliti jer za ${brMreza} mreza nam treba ${networkBits} a imamo samo ${this.zeros} dostupnih bita`;

  var deviceBits = this.zeros - networkBits;
  return this.createNetworks(networkBits, deviceBits, brMreza);
}

// vraca mrezu sa predefinisanim bitima
Subnet.prototype.createNetworks = function(networkbits, deviceBits, numOfNetworks){
  var result = {
    subnet: null,
    networks: [],

    deviceBits: deviceBits,
    networkBits: networkbits,
    numOfNetworks: numOfNetworks,

    maxNumberOfNetworks: system.getDevices(networkbits) + 2,
    maxNumberOfDevices: system.getDevices(deviceBits)
  }

  if(typeof result.numOfNetworks === 'undefined' )
    result.numOfNetworks = system.getDevices(networkbits);

  result.subnet = new Subnet(this.parent, system.constructSubnetIP(this.zeros - result.networkBits));
  result.subnet.isThisSubNetwork = true;

  for(var i = 0; i < result.numOfNetworks; i++){
    var bin = system.intToBin(i, result.networkBits);
    var newIP = this.network.addressBinarySolid.substr(0, this.ones) + bin + '0'.repeat(result.deviceBits);
    var ip = new IP(newIP, result.subnet);
    ip.defaultSubnet = this;
    result.networks.push(ip);
  }

  return result;
}