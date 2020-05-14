class Subnet extends IPBase{
 
  constructor(parent, address){
    if(typeof address === 'undefined')
      address = parent;

    super(address);

    if(typeof parent === 'object')
      this.parent = parent;

    this.isThisSubNetwork = false;
    this.network = null;
    this.ranges = null;
    this.broadcast = null;
    this.prefix = '';

    if(this.parent != null)
      this.createRange();
  }

  get addressWithPrefix(){ return this.address + this.prefix; }

  // racuna range od ove subnet maske i broadcast domen
  createRange(){
    //console.warn(this.address);

    var zeros = this.zeros;
    this.prefix = '/' + (32 - this.zeros);
    var networkBinarySolid = this.parent.addressBinarySolid.substr(0, (32 - zeros));
    this.network = new IPBase(networkBinarySolid.repeat('0', zeros));
    this.network.subnet = this;

    this.ranges = [];
    this.ranges.push(new IPBase(networkBinarySolid.repeat('0', zeros - 1) + '1'));
    this.ranges.push(new IPBase(networkBinarySolid.repeat('1', zeros - 1) + '0'));

    this.ranges[0].subnet = this;
    this.ranges[1].subnet = this;

    this.broadcast = new IPBase(networkBinarySolid.repeat('1', zeros));

    //console.log(this.network);
  }

  // provjera da li neka IP adresa pripada ovoj subnet maski
  isIn(network){
    if(typeof network == 'string')
      network = new IP(network);
    
    return (network.long > this.ranges[0].long && network.long < this.ranges[1].long)
  }

  // broj bita koji je potreban da se poveze broj network i devices
  bits(network, devices){
    if(typeof network === 'undefined') 
      return 0;

    var p = system.getBits(network);
    if(typeof devices === 'number')
      p += system.getBits(devices);
    return p;
  }

  // Vraca maksimum uredjaja koji se mogu povezati na ovu mrezu (i mreza i uredjaja)
  get maxNetAndDevices(){
    var networks = 0;

    if(this.parent == null)
      throw "Ova subnet mreza nema parent objekat";

    if(this.isThisSubNetwork == false)
      networks = system.getDevices(this.parent.defaultSubnet.zeros - this.zeros) + 2;
    else
      networks = system.getDevices(this.parent.subnet.zeros -  this.zeros) + 2;
      
    return{
      networks: networks,
      devices: this.maxDevices
    }
  }

  // maksimalni broj uredjaja koji se mogu povezati na ovaj subetn
  get maxDevices(){
    return Math.pow(2, this.zeros) - 2;
  }

  

  
}
