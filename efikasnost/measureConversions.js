
// FILE SIZES

function convert_to_bits(value, measure){
  if(measure == 'b') return value;
  if(measure == 'B') return value.mul(8);
  if(measure == 'KB') return value.mul(8).mul(1024);
  if(measure == 'Kb') return value.mul(1000);
  if(measure == 'MB') return value.mul(8).mul(1024).mul(1024);
  if(measure == 'Mb') return value.mul(1000).mul(1000);
  if(measure == 'GB') return value.mul(8).mul(1024).mul(1024).mul(1024);
  if(measure == 'Gb') return value.mul(1000).mul(1000).mul(1000);
}

function convert_from_bits(value, measure){
  if(measure == 'b') return value;
  if(measure == 'B') return value.div(8.0);
  if(measure == 'KB') return value.div(8.0).div(1024.0);
  if(measure == 'Kb') return value.div(1000);
  if(measure == 'MB') return value.div(8.0).div(1024.0).div(1024.0);
  if(measure == 'Mb') return value.div(1000).div(1000);
  if(measure == 'GB') return value.div(8.0).div(1024.0).div(1024.0).div(1024.0);
  if(measure == 'Gb') return value.div(1000).div(1000).div(1000);
}

// LENGTH

function convert_to_meters(value, measure){
  if(measure == 'm') return value;
  if(measure == 'km') return value.mul(1000);
}

function convert_from_meters(value, measure){
  if(measure == 'm') return value;
  if(measure == 'km') return value.div(1000);
}

// CAPACITY

function convert_to_capacity_meters(value, measure){
  if(measure == 'ms') return value;
  if(measure == 'kms') return value.mul(1000);
}

function convert_from_capacity_meters(value, measure){
  if(measure == 'ms') return value;
  if(measure == 'kms') return value.div(1000);
}

// TIMES

function convert_to_milisecods(value, measure){
  if(measure == 'ms') return value;
  if(measure == 'min') return value.mul(60000);
  if(measure == 's') return value.mul(1000);
  if(measure == 'μs') return value.mul(0.001);
  if(measure == 'ns') return value.mul(0.0000001);
  if(measure == 'ps') return value.mul(0.0000000001);
}

function convert_from_milisecods(value, measure){
  if(measure == 'ms') return value;
  if(measure == 'min') return value.div(60000);
  if(measure == 'μs') return value.mul(1000);
  if(measure == 's') return value.div(1000);
  if(measure == 'ns') return value.mul(1000000);
  if(measure == 'ps') return value.mul(1000000000);
}

// CAPACITY SIZES

function convert_to_bitsPerSeconds(value, measure){
  if(measure == 'bs') return value;
  if(measure == 'Kbs') return value.mul(1000);
  if(measure == 'Mbs') return value.mul(1000000);
  if(measure == 'Gbs') return value.mul(1000000000);
}

function convert_from_bitsPerSeconds(value, measure){
  if(measure == 'bs') return value;
  if(measure == 'Kbs') return value.div(1000);
  if(measure == 'Mbs') return value.div(1000000);
  if(measure == 'Gbs') return value.div(1000000000);
}
