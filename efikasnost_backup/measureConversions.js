
// FILE SIZES

function convert_to_bits(value, measure){
  if(measure == 'b') return value;
  if(measure == 'B') return value * 8;
  if(measure == 'KB') return value * 8 * 1024;
  if(measure == 'Kb') return value * 1000;
  if(measure == 'MB') return value * 8 * 1024 * 1024;
  if(measure == 'Mb') return value * 1000 * 1000;
  if(measure == 'GB') return value * 8 * 1024 * 1024 * 1024;
  if(measure == 'Gb') return value * 1000 * 1000 * 1000;
}

function convert_from_bits(value, measure){
  value = value * 1.0;
  if(measure == 'b') return value;
  if(measure == 'B') return value / 8.0;
  if(measure == 'KB') return value / 8.0 / 1024.0;
  if(measure == 'Kb') return value / 1000;
  if(measure == 'MB') return value / 8.0 / 1024.0 / 1024.0;
  if(measure == 'Mb') return value / 1000 / 1000;
  if(measure == 'GB') return value / 8.0 / 1024.0 / 1024.0 / 1024.0;
  if(measure == 'Gb') return value / 1000 / 1000 / 1000;
}

// LENGTH

function convert_to_meters(value, measure){
  if(measure == 'm') return value;
  if(measure == 'km') return value * 1000;
}

function convert_from_meters(value, measure){
  if(measure == 'm') return value;
  if(measure == 'km') return value / 1000;
}

// CAPACITY

function convert_to_capacity_meters(value, measure){
  if(measure == 'ms') return value;
  if(measure == 'kms') return value * 1000;
}

function convert_from_capacity_meters(value, measure){
  if(measure == 'ms') return value;
  if(measure == 'kms') return value / 1000;
}

// TIMES

function convert_to_milisecods(value, measure){
  if(measure == 'ms') return value;
  if(measure == 'min') return value * 60000;
  if(measure == 's') return value * 1000;
  if(measure == 'μs') return value * 0.001;
  if(measure == 'ns') return value * 0.0000001;
  if(measure == 'ps') return value * 0.0000000001;
}

function convert_from_milisecods(value, measure){
  if(measure == 'ms') return value;
  if(measure == 'min') return value / 60000;
  if(measure == 'μs') return value * 1000;
  if(measure == 's') return value / 1000;
  if(measure == 'ns') return value * 1000000;
  if(measure == 'ps') return value * 1000000000;
}

// CAPACITY SIZES

function convert_to_bitsPerSeconds(value, measure){
  if(measure == 'bs') return value;
  if(measure == 'Kbs') return value * 1000;
  if(measure == 'Mbs') return value * 1000000;
  if(measure == 'Gbs') return value * 1000000000;
}

function convert_from_bitsPerSeconds(value, measure){
  if(measure == 'bs') return value;
  if(measure == 'Kbs') return value / 1000;
  if(measure == 'Mbs') return value / 1000000;
  if(measure == 'Gbs') return value / 1000000000;
}

function toFixed( num, precision ) {
  return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}