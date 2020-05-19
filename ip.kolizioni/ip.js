class IPBase{
  
  constructor(address){
    address = this.prepareAddressString(address);
    if(address.length == 35 || address.length == 32){
      // u pitanju je binarni zapis
      this.address = system.binToIP(address);
    }
    else if(address[0] == '/')
      this.address = this.createPrefixAddress(address);
    else
      this.address = address;

    this.addressSplit = [];
    this.addressBinarySplit = [];
    this.constructSplit();
  }

  get addressWithPrefix(){ return this.address + this.subnet.prefix; }
  get long(){ return system.ip2int(this.address); }
  get addressBinary(){ return system.ipToBin(this.addressBinarySplit, false); }
  get addressBinarySolid(){ return system.ipToBin(this.addressBinarySplit, true); }

  get isValid(){
    // provjera broja
    for(var i = 0; i < 4; i++)
      if(this.addressSplit[i] < 0 || this.addressSplit[i] > 255){
        console.error(`adresa ${i}/${this.addressSplit[i]} je veca od 255 ili manja od 0!`)
        return false;
      }
    
    return true;
  }

  // u slucaju subnet, kada dobijamo /27
  createPrefixAddress(address){
    var num = parseInt(address.substr(1));
    var bits = '1'.repeat('1', num - 1).repeat('0', 32 - num);
    return system.binToIP(bits);
  }

  // broj nula unutar binarnog zapisa
  get zeros(){
    var r = 0; for(var i = this.addressBinarySolid.length - 1; i >= 0; i--)
      if(this.addressBinarySolid[i] == '0') r++;
      else break;
    return r;
  }

  get ones(){
    var r = 0; for(var i = 0; i < this.addressBinarySolid.length; i++)
      if(this.addressBinarySolid[i] == '1') r++;
      else break;
    return r;
  }

  // SUMMARY: prepare input string, remoe all chars that are not neceseary
  prepareAddressString(input){
    var r = '';
    for(var i = 0; i < input.length; i++)
      if(i == 0 && input[i] == '/') // u slucaju subnet
        r += input[i];
      else if(input[i] == '.' || isCharNumber(input[i]))
        r += input[i];

    return r;
  }

  // SUMMARY: construct split where we split all INTS from address
  constructSplit(){
    var a = this.address.trim().split('.');
    if(a.length != 4)
      throw `Nije pravilan format adrese :${this.address}`;
    
    a.forEach((e)=> {
      this.addressBinarySplit.push(system.intToBin(parseInt(e)));
      this.addressSplit.push(parseInt(e))
    });
  }


}
