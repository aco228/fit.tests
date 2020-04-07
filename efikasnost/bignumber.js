
function bn(input){ return new BigNumber(input); }

// strings


String.prototype.div = function(num){ return new BigNumber(this).dividedBy(bn(num)).toFixed().toString(); }
String.prototype.mul = function(num){ return new BigNumber(this).multipliedBy(bn(num)).toFixed().toString(); }
String.prototype.add = function(num){ return new BigNumber(this).plus(bn(num)).toFixed().toString(); }
String.prototype.sub = function(num){ return new BigNumber(this).minus(bn(num)).toFixed().toString(); }
String.prototype.equal = function(num){ return new BigNumber(this).isEqualTo(bn(num)); }
  


// number

Number.prototype.div = function(num){ return new BigNumber(this).dividedBy(bn(num)).toNumber(); }
Number.prototype.mul = function(num){ return new BigNumber(this).multipliedBy(bn(num)).toNumber(); }
Number.prototype.add = function(num){ return new BigNumber(this).plus(bn(num)).toNumber(); }
Number.prototype.sub = function(num){ return new BigNumber(this).minus(bn(num)).toNumber(); }
Number.prototype.equal = function(num){ return new BigNumber(this).isEqualTo(bn(num)); }
