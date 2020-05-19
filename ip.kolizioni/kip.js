class IP extends IPBase{

  constructor(address, subnetAddress){
    if(typeof subnetAddress === 'object') // u slucaju da saljemo objekat Subnet
      subnetAddress = subnetAddress.address;
    else if(typeof subnetAddress === 'undefined'){ // u slucaju da saljemo u formatu IP/24
      var a = address.split('/');
      if(a.length == 2){
        address = a[0].trim();
        subnetAddress = '/' + a[1].trim();
      }
    }

    super(address);

    this.defaultSubnet = this.createSubnet();
    this.subnet = typeof subnetAddress === 'string' ? new Subnet(this, subnetAddress) : this.defaultSubnet;
    this.subnets = [];
    
  }

  get subnetAddress(){ return this.subnet == null ? '' : this.subnet.address; }
  get ranges(){ return this.subnet == null ? null : this.subnet.ranges; }
  get broadcast(){ return this.subnet == null ? null : this.subnet.broadcast; }
  get mreza(){ return this.defaultSubnet != null ? this.defaultSubnet.network : null;  }
  get podmreza(){ return this.subnet != null ? this.subnet.network : null;  }


  get klasaMreze(){
    if(this.addressBinary.startsWith('0')) return 'A';
    else if(this.addressBinary.startsWith('10')) return 'B';
    else if(this.addressBinary.startsWith('110')) return 'C';
    else if(this.addressBinary.startsWith('1110')) return 'D';
    else if(this.addressBinary.startsWith('1111')) return 'E';
  }
  
  // dodavanje subnet-a
  addSubnet(address){
    this.defaultSubnet = this.subnet;
    this.subnet = new Subnet(this, address);
    return this;
  }

  // dodaj podmrezu ovoj submaski
  addSubNetwork(address){
    var subnetwork = new Subnet(this, address);
    subnetwork.isThisSubNetwork = true;
    this.subnets.push(subnetwork);
  }


}