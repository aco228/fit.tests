// kreiranje defualt subnet maske
IP.prototype.createSubnet = function(){
  switch(this.klasaMreze){
    case 'A': return new Subnet(this, '255.0.0.0'); break;
    case 'B': return new Subnet(this, '255.255.0.0'); break;
    case 'C': return new Subnet(this, '255.255.255.0'); break;
    case 'D': 
    case 'E': 
    default:
      return null;
  }
}

// kreiranje defualt IP sa klasom 
IP.createDefault = function(type){
  switch(type.toLowerCase()){
    case 'a': return new IP('0'.repeat('0', 31));
    case 'b': return new IP('10'.repeat('0', 30));
    case 'c': return new IP('110'.repeat('0', 29));
    case 'd': return new IP('1110'.repeat('0', 28));
    case 'e': return new IP('1111'.repeat('0', 28));
  }
}

// da li je IP u komercijalnoj upotrebi
IP.prototype.__defineGetter__('isCommercial', function(){ 
  if(this.klasaMreze == 'D' || this.klasaMreze == 'E'){
    console.log(`Ova mreza nije za komercijalnu upotretbu jer je klase ${this.klasaMreze}`);
    return false;
  }

  if(this.address.startsWith('10.') || (this.address.startsWith('172.') && this.addressSplit[1] >= 16 && this.addressSplit[1] <= 31) || this.address.startsWith('192.168')){
    console.log(`Ova mreza nije za komercijalnu upotretbu jer pripada privatnoj mrezi`);
    return false;
  }

  if(this.address == this.broadcast.address){
    console.log(`Ova je broadcast adresa`);
    return false;
  }

  if(this.subnet != null && (this.address == this.subnetAddress || this.zeros == this.subnet.zeros)){
    console.log(`Ova je adresa subnet`);
    return false;
  }

  return true;
});

// tip IP adrese
IP.prototype.__defineGetter__('tip', function(){
  if(this.address == this.broadcast.address)
    return 'Broadcast';
  if(this.address == this.subnet.network.address)
    return 'Mreza/Podmreza'
  return 'Host'
    
});