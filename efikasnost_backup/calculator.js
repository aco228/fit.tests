var SIZES = {
  FILE_SIZE: 0, LENGTHS: 1, TIMES: 2, CAPACITY: 3, CAPACITY_SIZES: 4
}

function Calculator(){

  this.init = function(){}

  this.selextContextValue = function(input){
    switch(input){
      case 'file_sizes': return SIZES.FILE_SIZE; break;
      case 'lengths': return SIZES.LENGTHS; break;
      case 'times': return SIZES.TIMES; break;
      case 'capacity_sizes': return SIZES.CAPACITY_SIZES; break;
      case 'capacity': return SIZES.CAPACITY; break;
    }
  }

  this.takeValue = function(valueName, parent){
    var box = (typeof parent === 'undefined') ?  
      $('.hinput[value-of=' + valueName + ']') : 
      parent.find('.hinput[value-of=' + valueName + ']');

    var value = parseFloat(box.find('input').val());
    if(value == 0) {
      if(isNaN(value))
        console.error('Could not parse input value: ' + box.find('input').val());
      return 0;
    }
    var selectContext = box.find('select').attr('context');
    var defaultMesure = box.find('select').find('option[default]').val();
    var option = box.find('select').find('option[value=' + box.find('select').val() + ']');

    /*    
    console.error('selectContext', selectContext);
    console.error('defaultMesure', defaultMesure);
    console.error('value', value);
    console.error('SIZES', this.selextContextValue(selectContext));
    console.error('option.val()', option.val());
    */

    return parseFloat(this.convert(this.selextContextValue(selectContext), value, option.val(), defaultMesure));
  }

  this.convert = function(context, value, fromMeasure, toMeasure){
    switch(context){
      case SIZES.FILE_SIZE: 
        var bits = convert_to_bits(value, fromMeasure); 
        return convert_from_bits(bits, toMeasure);
      case SIZES.LENGTHS:
        var meters = convert_to_meters(value, fromMeasure);
        return convert_from_meters(meters, toMeasure);
      case SIZES.TIMES:
        var miliseconds = convert_to_milisecods(value, fromMeasure);
        return convert_from_milisecods(miliseconds, toMeasure);
      case SIZES.CAPACITY:
        var meterscap = convert_to_capacity_meters(value, fromMeasure);
        return convert_from_capacity_meters(meterscap, toMeasure);
      case SIZES.CAPACITY_SIZES:
        var bitsPerSecond = convert_to_bitsPerSeconds(value, fromMeasure);
        return convert_from_bitsPerSeconds(bitsPerSecond, toMeasure);

    }
  }

  this.length = function(){ return $('#canvas').find('.host').length; }
  this.host = function(i){ return $($('#canvas').find('.host')[i]); }
  this.link = function(i){ return $($('#canvas').find('.link')[i]); }

  this.getState = function(){
    var result =  {
      originalFileSize: this.takeValue('file-size'),
      fileSize: this.takeValue('file-size'),
      numberOfErrors: parseInt($('#brGresaka').val()),
      speedOfTransmision:0,
      host_afterReceivedFirst: this.takeValue('komutator_nakon_primljenih_prvih'),

      result: [],
      kasnjenjeUsledObrade: 0,
      kasnjenjeUsledPrenosa: 0,
      kasnjenjeUsledPropagacije: 0,
      ukupnoVrijemeKasnjenja: 0,
      efikasnost: 0,

      hasSegmentation: false,
      segTotalHeaderSize:this.takeValue('segFileSize'),
      segNumberOfParts: parseInt($('#segNumberOfParts').val()),
      segFileSize: this.takeValue('segFileSize'),
      headerSize: this.takeValue('headerSize'),
      zaglavljeSize: this.takeValue('zaglavljeSize')
    };

    // segmentacija

    if(result.host_afterReceivedFirst > 0){
      result.hasSegmentation = true;
      result.segNumberOfParts = Math.ceil(result.fileSize / result.host_afterReceivedFirst);
      result.segTotalHeaderSize = result.headerSize * result.segNumberOfParts;
      result.fileSize += result.segTotalHeaderSize;
    }
    else if(result.segFileSize > 0){
      result.hasSegmentation = true;
      result.segNumberOfParts = Math.ceil(result.fileSize / result.segFileSize);
      result.segTotalHeaderSize = result.headerSize * result.segNumberOfParts;
      result.fileSize += result.segTotalHeaderSize;
    }
    else if(result.segNumberOfParts > 0){
      result.hasSegmentation = true;
      result.segFileSize = Math.ceil(result.fileSize / result.segNumberOfParts);
      result.segTotalHeaderSize = result.headerSize * result.segNumberOfParts;
      result.fileSize += result.segTotalHeaderSize;
    }
    else
      result.fileSize += result.headerSize;

    result.fileSize += result.zaglavljeSize;

    return result;
  }

  this.update = function(){
    $('#tables').html('');
    var result = this.calculate();
    result = this.calculateError(result);

    if(result.host_afterReceivedFirst > 0)
      result.kasnjenjeUsledPrenosa *= (result.segNumberOfParts + this.length() - 3);
    if(result.segFileSize > 0){
      result.kasnjenjeUsledPrenosa = 2 * result.segNumberOfParts * result.result[0].prenos.result;
    }

    result.ukupnoVrijemeKasnjenja = result.kasnjenjeUsledObrade + result.kasnjenjeUsledPrenosa + result.kasnjenjeUsledPropagacije;
    result.speedOfTransmision = result.fileSize / result.ukupnoVrijemeKasnjenja;

    window.result = result;
    main.writeResults(result);
  }

  this.calculateObrada = function(){
    var time = 0;
    for(var i = 0; i < this.length() - 1; i++)
      time += this.takeValue('vrijeme_obrade', this.host(i));
    return time;    
  }

  this.calculate = function(){
    var state = this.getState();
    state.kasnjenjeUsledObrade = this.calculateObrada();

    for(var i = 0; i < this.length() - 1; i++){
      var obrada = i == this.length() - 1 ? 0 : this.takeValue('vrijeme_obrade', this.host(i));
      var nakonPrimljenih = i == this.length() - 1 ? 0 : this.takeValue('komutator_nakon_primljenih_prvih', this.host(i + 1));
      var dodavanjeHeadera = i == this.length() - 1 ? 0 : this.takeValue('dodavanje_headera', this.host(i));
      state.fileSize += dodavanjeHeadera;
      state.segTotalHeaderSize += dodavanjeHeadera;

      var kapacitet = this.takeValue('capacity_sizes', this.link(i));

      var kasnjenje = state.fileSize / kapacitet
      if(state.host_afterReceivedFirst > 0)
        kasnjenje = state.host_afterReceivedFirst / kapacitet;
      if(state.segFileSize > 0)
        kasnjenje = state.segFileSize / kapacitet;

      state.kasnjenjeUsledPrenosa += kasnjenje;

      var duzina = this.takeValue('lengths', this.link(i));
      var prenos = this.takeValue('capacity', this.link(i));
      state.kasnjenjeUsledPropagacije += duzina / prenos;

      state.result.push({
        index:i,
        obrada: obrada,
        dodatHeader:dodavanjeHeadera,
        prenos:{
          kapacitet: kapacitet,
          result: kasnjenje,
          result_with_obrada: obrada + kasnjenje
        },
        propagacija:{
          duzina: duzina,
          prenos: prenos,
          result: duzina / prenos
        }
      });
    }

    return state;
  }

  this.calculateError = function(result){
    result.efikasnost = result.originalFileSize / result.fileSize;
    if(result.numberOfErrors > 0 && !result.hasSegmentation)
      result.efikasnost = result.originalFileSize / (result.fileSize * (result.numberOfErrors + 1));
    else if(result.numberOfErrors > 0 && result.hasSegmentation)
      result.efikasnost = result.originalFileSize / (result.originalFileSize + (result.segNumberOfParts * result.headerSize) + ((result.segFileSize + result.headerSize) * (result.numberOfErrors)));
      //result.efikasnost = result.originalFileSize / (result.originalFileSize + (result.headerSize + result.segFileSize + (result.segNumberOfParts * result.headerSize)) * (result.numberOfErrors + 1));
    result.efikasnost *= 100;

    return result;
  }




  this.init();
}