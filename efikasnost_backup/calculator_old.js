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
        return convert_from_bits(bits, toMeasure).toFixed(3);
      case SIZES.LENGTHS:
        var meters = convert_to_meters(value, fromMeasure);
        return convert_from_meters(meters, toMeasure).toFixed(3);
      case SIZES.TIMES:
        var miliseconds = convert_to_milisecods(value, fromMeasure);
        return convert_from_milisecods(miliseconds, toMeasure).toFixed(3);
      case SIZES.CAPACITY:
        var meterscap = convert_to_capacity_meters(value, fromMeasure);
        return convert_from_capacity_meters(meterscap, toMeasure).toFixed(3);
      case SIZES.CAPACITY_SIZES:
        var bitsPerSecond = convert_to_bitsPerSeconds(value, fromMeasure);
        return convert_from_bitsPerSeconds(bitsPerSecond, toMeasure).toFixed(3);

    }
  }

  this.length = function(){ return $('#canvas').find('.host').length; }
  this.host = function(i){ return $($('#canvas').find('.host')[i]); }
  this.link = function(i){ return $($('#canvas').find('.link')[i]); }

  this.update = function(){
    $('#tables').html('');
    this.calculate_ukupnoVrijemePrenosa();
  }

  this.get_vrijemeObrade = function(){
    var time = 0;
    for(var i = 0; i < this.length() - 1; i++)
      time += this.takeValue('vrijeme_obrade', this.host(i));
    return time;
  }

  // PRENOS

  this.calculate_kasnjenjeUsledPrenosa = function(){
    var self = this;
    var result = 0;
    var originalFileSize = this.takeValue('file-size');
    var fileSize = originalFileSize;
    var brGresaka = parseInt($('#brGresaka').val());
    var splitBySize = this.takeValue('splitBySize');
    var headerSize = this.takeValue('segmentHeaderSize');
    var segmentacijaBrojDjelova = parseInt($('#segmentacijaBrojDjelova').val());
    var table = [];
    var hasSegments = false;

    if(splitBySize > 0 ){
      hasSegments = true;
      segmentacijaBrojDjelova = Math.ceil(fileSize / splitBySize);
      fileSize += segmentacijaBrojDjelova * headerSize;
    }
    else if(segmentacijaBrojDjelova > 0){
      hasSegments = true;
      splitBySize = Math.ceil(fileSize / segmentacijaBrojDjelova);
      fileSize += segmentacijaBrojDjelova * headerSize;
    }
    else
      fileSize += headerSize;

    for(var i = 0; i < this.length() - 1; i++){
      var obrada = i == this.length() - 1 ? 0 : this.takeValue('vrijeme_obrade', this.host(i));
      var kapacitet = this.takeValue('capacity_sizes', this.link(i));
      if(typeof kapacitet === 'undefined') continue;

      table.push({
        index: i,
        kapacitet: kapacitet,
        obrada: obrada,
        result_with_obrada:  obrada + (fileSize / kapacitet),
        result: fileSize / kapacitet
      });

      result += fileSize / kapacitet;
    }

    result += this.get_vrijemeObrade();
    this.writeResult('kasnjenjeUsredObrade', this.get_vrijemeObrade(), 's', SIZES.TIMES);
    console.log(originalFileSize, fileSize);
    this.writeResult('usledPrenosa', result, 's', SIZES.TIMES);
    this.writeResult('fileSize', fileSize, 'b', SIZES.FILE_SIZE);
    console.log('calculate_kasnjenjeUsledPrenosa', table);

    console.log('greske', brGresaka, splitBySize, hasSegments);
    var efikasnost = originalFileSize / fileSize * 100;
    if(brGresaka > 0 && hasSegments == false)
      efikasnost = originalFileSize  / (fileSize * brGresaka) * 100;
    else if(brGresaka > 0 && hasSegments == true)
      efikasnost = originalFileSize / ( (fileSize + splitBySize + headerSize) * brGresaka) * 100;

    this.writeResult('efikasnost', (efikasnost).toString().substr(0, 6) + '%');

    this.createTable_kasnjenjeUsledPrenosa(table);
    return result;
  }

  // summary: 
  this.createTable_kasnjenjeUsledPrenosa = function(table){
    $('#tables').append('<div style="color:blue; "> #tabela Kasnjenje usled prenosa</div>');
    var html = '';

    for(var i = 0; i < table.length; i++) {
      var obrada = '<span class="tables_span" title="obrada">' + this.writeResultTable('kasnjenjeUsredObrade', table[i].obrada) + '</span>';
      var rezultat = '<span class="tables_span" title="rezultat">' + this.writeResultTable('kasnjenjeUsredObrade', table[i].result)+ '</span>';
      var rezultat_sa_obradom = '<span class="tables_span" title="rezultat sa obradom">'+ this.writeResultTable('kasnjenjeUsredObrade', table[i].result_with_obrada) +'</span>';
      var info = 'pren' + table[i].index + ' ' +  obrada + ' + ' + rezultat + ' = ' + rezultat_sa_obradom +'<br>';

      html += info;
    }

    $('#tables').append(html);
  }


  // PROPAGACIJA

  this.calculate_kasnjenjeUsledPropagacije = function(){
    var self = this;
    var result = 0;
    var table = [];

    for(var i = 0; i < this.length() - 1; i++){
      var duzina = this.takeValue('lengths', this.link(i));
      if(typeof duzina === 'undefined') continue;

      var prenos = this.takeValue('capacity', this.link(i));
      if(typeof prenos === 'undefined') continue;

      table.push({
        index: i,
        duzina: duzina, prenos: prenos,
        result: duzina / prenos
      });

      result += duzina / prenos;
    }

    console.log('calculate_kasnjenjeUsledPropagacije', table);
    this.writeResult('usledPropagacije', result, 's', SIZES.TIMES);
    this.createTable_kasnjenjeUsledPropagacije(table);
    return result;
  }


  // summary: 
  this.createTable_kasnjenjeUsledPropagacije = function(table){
    $('#tables').append('<div style="color:blue; margin-top:15px; "> #tabela Kasnjenje usled propagacije</div>');
    var html = '';

    for(var i = 0; i < table.length; i++) {
      var obrada = ''; //'<span class="tables_span" title="obrada">' + this.writeResultTable('kasnjenjeUsredObrade', table[i].obrada) + '</span>';
      var rezultat = '';// '<span class="tables_span" title="rezultat">' + this.writeResultTable('kasnjenjeUsredObrade', table[i].result)+ '</span>';
      var rezultat_sa_obradom = '<span class="tables_span" title="rezultat sa obradom">'+ this.writeResultTable('usledPropagacije', table[i].result) +'</span>';
      var info = 'prop' + table[i].index + ' ' +  obrada + ' + ' + rezultat + ' = ' + rezultat_sa_obradom +'<br>';

      html += info;
    }

    $('#tables').append(html);
  }

  this.calculate_ukupnoVrijemePrenosa = function(){
    var result = this.calculate_kasnjenjeUsledPrenosa() + this.calculate_kasnjenjeUsledPropagacije();
    this.writeResult('ukupnoKasnjenje', result, 's', SIZES.TIMES);
  }

  this.writeResultTable = function(context, value){
    var result_box = $('.result_box[context=' + context + ']');
    return this.convert(SIZES.TIMES, value, 's', result_box.find('select').val()) + result_box.find('select').val();
  }

  this.writeResult = function(context, value, measure, sizes){
    var result_box = $('.result_box[context=' + context + ']');
    if(result_box.find('select').length > 0)
      value = this.convert(sizes, value, measure, result_box.find('select').val());
    result_box.find('.result_value').text(value);
  }


  this.init();
}