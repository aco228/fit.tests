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

    var value = box.find('input').val();
    if(value == '') {
      console.error('Could not parse input value: ' + box.find('input').val());
      return '0';
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

    return this.convert(this.selextContextValue(selectContext), value, option.val(), defaultMesure);
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
  this.links = function(){ return $('#canvas').find('.link').length; }
  this.host = function(i){ return $($('#canvas').find('.host')[i]); }
  this.link = function(i){ return $($('#canvas').find('.link')[i]); }

  this.getState = function(){
    var result =  {
      preventStackOverflow: false,

      originalFileSize: this.takeValue('file-size'),
      fileSize: this.takeValue('file-size'),
      numberOfErrors: $('#brGresaka').val(),
      speedOfTransmision:'0',
      host_afterReceivedFirst: this.takeValue('komutator_nakon_primljenih_prvih'),

      result: [],
      kasnjenjeUsledObrade: '0',
      kasnjenjeUsledPrenosa: '0',
      kasnjenjeUsledPrenosaSegmenta: '0',
      kasnjenjeUsledPropagacije: '0',
      ukupnoVrijemeKasnjenja: '0',
      ukupnoVrijemeKasnjenjaSegmenta: '0',
      efikasnost: '0', efikasnostSegmenata:'',

      hasSegmentation: false,
      segmentMoraBitiPotvrdjen: $('#segmentMoraBitiPotvrdjen').is(':checked'),
      segTotalHeaderSize:this.takeValue('segFileSize'),
      segNumberOfParts: $('#segNumberOfParts').val(),
      segFileSize: this.takeValue('segFileSize'),
      headerSize: this.takeValue('headerSize'),
      zaglavljeSize: this.takeValue('zaglavljeSize')
    };

    // segmentacija

    /*if(!result.host_afterReceivedFirst.equal('0')){
      result.hasSegmentation = true;
      result.segNumberOfParts = Math.ceil(result.fileSize.div( result.host_afterReceivedFirst)).toString();
      result.segTotalHeaderSize = result.headerSize.mul(result.segNumberOfParts);
      result.fileSize = result.fileSize.add(result.segTotalHeaderSize);
    }
    else */if(!result.segFileSize.equal('0')){
      result.hasSegmentation = true;
      result.segNumberOfParts = Math.ceil(result.fileSize.div(result.segFileSize)).toString();
      result.segTotalHeaderSize = result.headerSize.mul(result.segNumberOfParts);
      result.fileSize = result.fileSize.add(result.segTotalHeaderSize);
    }
    else if(!result.segNumberOfParts.equal('0')){
      result.hasSegmentation = true;
      result.segFileSize = Math.ceil(result.fileSize.div(result.segNumberOfParts)).toString();
      result.segTotalHeaderSize = result.headerSize.mul(result.segNumberOfParts);
      result.fileSize = result.fileSize.add(result.segTotalHeaderSize);
    }
    else
      result.fileSize = result.fileSize.add(result.segTotalHeaderSize);

    // dodaj velicinu headera za svaki segment, iako segmentacija nije podesena
    if(!result.headerSize.equal('0') && result.segFileSize.equal('0'))
      result.fileSize = result.fileSize.add(result.headerSize);

    result.fileSize = result.fileSize.add(result.zaglavljeSize);

    return result;
  }

  this.update = function(){
    $('#tables').html('');
    var result = this.calculate(this.getState());
    window.result = result;
    main.writeResults(result);
  }

  this.calculateObrada = function(){
    var time = '0';
    for(var i = 0; i < this.length() - 1; i++)
      time = time.add(this.takeValue('vrijeme_obrade', this.host(i)));
    return time;    
  }

  this.calculate = function(state){
    state.kasnjenjeUsledObrade = this.calculateObrada();

    for(var i = 0; i < this.length() - 1; i++){
      var obrada = i == this.length() - 1 ? 0 : this.takeValue('vrijeme_obrade', this.host(i));
      var nakonPrimljenih = i == this.length() - 1 ? 0 : this.takeValue('komutator_nakon_primljenih_prvih', this.host(i + 1));
      var dodavanjeHeadera = i == this.length() - 1 ? 0 : this.takeValue('dodavanje_headera', this.host(i));
      state.fileSize = state.fileSize.add(dodavanjeHeadera);
      state.segTotalHeaderSize = state.segTotalHeaderSize.add(dodavanjeHeadera);

      var kapacitet = this.takeValue('capacity_sizes', this.link(i));

      var kasnjenje = state.fileSize.div(kapacitet);
      var kasnjenjeSegment = state.segFileSize.add(state.headerSize).div(kapacitet);

      /*
      if(!state.host_afterReceivedFirst.equal('0'))
        kasnjenje = state.host_afterReceivedFirst.div(kapacitet);
      */
      /*
      if(!state.segFileSize.equal('0'))
        kasnjenje = state.segFileSize.div(kapacitet);
      */

      state.kasnjenjeUsledPrenosa = state.kasnjenjeUsledPrenosa.add(kasnjenje);
      state.kasnjenjeUsledPrenosaSegmenta = state.kasnjenjeUsledPrenosaSegmenta.add(kasnjenjeSegment).add(obrada);

      var duzina = this.takeValue('lengths', this.link(i));
      var prenos = this.takeValue('capacity', this.link(i));
      state.kasnjenjeUsledPropagacije =state.kasnjenjeUsledPropagacije.add(duzina.div(prenos));

      state.result.push({
        index:i,
        obrada: obrada,
        fileSize: state.fileSize,
        dodatHeader:dodavanjeHeadera,
        prenos:{
          kapacitet: kapacitet,
          result: kasnjenje,
          result_with_obrada: obrada.add(kasnjenje),

          result_segment: kasnjenjeSegment,
          result_segment_obrada: kasnjenjeSegment.add(obrada)
        },
        propagacija:{
          duzina: duzina,
          prenos: prenos,
          result: duzina.div(prenos)
        }
      });
    }

    state = this.finishCalculations(state);
    return state;
  }


  this.finishCalculations = function(result){

    if(!result.host_afterReceivedFirst.equal('0')){
      /*
      result.kasnjenjeUsledPrenosa = result.kasnjenjeUsledPrenosa.add(result.result[0].prenos.result).add(result.kasnjenjeUsledPropagacije);
      for(var i = 0; i < calc.length() - 1; i++)
        result.kasnjenjeUsledPrenosa = result.kasnjenjeUsledPrenosa.add(result.host_afterReceivedFirst.div(result.result[0].prenos.kapacitet));
      //result.kasnjenjeUsledPrenosa = result.kasnjenjeUsledPrenosa.mul(result.segNumberOfParts.add(this.length() - 3));
      */
    }
    if(!result.segFileSize.equal('0')){
      result.kasnjenjeUsledPrenosa = result.result[0].prenos.result.mul(result.segNumberOfParts.mul(2));
    }

    result.ukupnoVrijemeKasnjenja = result.kasnjenjeUsledObrade.add(result.kasnjenjeUsledPrenosa).add(result.kasnjenjeUsledPropagacije);

    if(result.hasSegmentation)
      result.ukupnoVrijemeKasnjenjaSegmenta = (calc.length()-2).mul(result.segFileSize.div(result.result[0].prenos.kapacitet)).add(result.originalFileSize.div(result.result[0].prenos.kapacitet));
    else
      result.ukupnoVrijemeKasnjenjaSegmenta = '0';

    if(!result.preventStackOverflow)
    {
        //result.kasnjenjeUsledPrenosa = result.segFileSize.div(result.result[0].prenos.kapacitet).add(result.kasnjenjeUsledPropagacije).mul(result.segNumberOfParts);
      
      /*
      // segmentacija, uzimanje tabele prenosa i propagacije
      else if(result.hasSegmentation && !result.segmentMoraBitiPotvrdjen){
        var newState = this.getState();
        newState.preventStackOverflow = true;
        newState.fileSize = newState.segFileSize.add(newState.headerSize);
        newState.originalFileSize = newState.segFileSize;
        console.log('newState', newState);

        var ns = this.calculate(newState);
        result.result = ns.result;
      }
      */
    }

    result.speedOfTransmision = result.fileSize.div(result.ukupnoVrijemeKasnjenja);

    result = this.calculateError(result);

    return result;
  }

  this.calculateError = function(result){
    result.efikasnost = result.originalFileSize.div(result.fileSize);
    /*
    if(!result.numberOfErrors.equal('0') && !result.hasSegmentation)
      result.efikasnost = result.originalFileSize.div(result.fileSize.mul(result.numberOfErrors.add(1)));
    else if(!result.numberOfErrors.equal('0') && result.hasSegmentation)
      result.efikasnost = result.originalFileSize.div(result.originalFileSize.add(result.segNumberOfParts.mul(result.headerSize)).add((result.segFileSize.add(result.headerSize)).mul(result.numberOfErrors)));
      //result.efikasnost = result.originalFileSize / (result.originalFileSize + (result.headerSize + result.segFileSize + (result.segNumberOfParts * result.headerSize)) * (result.numberOfErrors + 1));
      */

    if(!result.numberOfErrors.equal('0'))
      result.efikasnost = result.originalFileSize.div(result.originalFileSize.add(result.headerSize).mul(result.numberOfErrors.add(1)))
    else
      result.efikasnost = result.originalFileSize.div(result.originalFileSize.add(result.headerSize));

    result.efikasnost = result.efikasnost.mul(100);

    result.efikasnostSegmenata = result.originalFileSize.div(result.originalFileSize.add(result.segNumberOfParts.mul(result.headerSize)).add((result.segFileSize.add(result.headerSize)).mul(result.numberOfErrors)));
    result.efikasnostSegmenata = result.efikasnostSegmenata.mul(100);


    return result;
  }




  this.init();
}