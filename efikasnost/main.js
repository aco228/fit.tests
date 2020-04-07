function Main(){

  this.init = function(){
    this.openCloseConfigurationBox();
    this.configureSelects();
    this.onAddNewNode();
    this.onRemoveNode();
    this.updateDefaultValues();
  }

  this.id= function(prefix){ return prefix + (new Date()).getTime(); }
  this.catchEvents = function(elem){
    if(typeof elem === 'undefined'){
      $('input').on('input', function(){ 
        if($(this)[0].hasAttribute('ignore'))
          return;
        calc.update(); 
      });
      $('select').change(function(){ 
        if($(this)[0].hasAttribute('ignore'))
          return;
        calc.update(); 
      });
    }
    else{
      elem.find('input').on('input', function(){ 
        if($(this)[0].hasAttribute('ignore'))
          return;
        calc.update(); 
      });
      elem.find('select').change(function(){ 
        if($(this)[0].hasAttribute('ignore'))
          return;
        calc.update(); 
      });
    }
  }

  this.configureSelects = function(){
    $('select[context]').each(function(){
      var parent = $('select[value-context=' + $(this).attr('context') + ']');
      $(this).html(parent.html());
    });
  }

  this.openCloseConfigurationBox = function(){
    $('.confHeader').click(function(){
      var box = $(this).closest('.confBox');
      if(box.hasClass('confBox_closed'))
        box.removeClass('confBox_closed');
      else
        box.addClass('confBox_closed');
    });
  }

  this.copyValues = function(elem){
    var origin = $('#' + elem.attr('defaults') + ' .hinput[context=' + elem.attr('context') + ']');
    elem.find('input').val(origin.find('input').val());
    elem.find('select').val(origin.find('select').val());
  }

  this.addHost = function(with_link){
    var self = this;
    var class_name = self.id('link_host');
    var host = $('#template').find('.host').clone();  
    host.attr('link_host', class_name);
    host.find('.node_inside').append($('#defaults_host').html());
    host.find('.node_inside').find('.hinput').each(function(){ 
      if($(this)[0].hasAttribute('do_not_copy'))
        $(this).remove()
      else
        self.copyValues($(this)); 
    });
    if(with_link === true)
      self.addLink(class_name);
    this.catchEvents(host);
    $('#canvas').append(host);
  }

  this.addLink = function(class_name){
    var self = this;
    var link = $('#template').find('.link').clone();  
    link.attr('link_host', class_name);
    link.find('.node_inside').append($('#defaults_link').html());
    link.find('.node_inside').find('.hinput').each(function(){ 
      if($(this)[0].hasAttribute('do_not_copy'))
        $(this).remove()
      else
        self.copyValues($(this)); 
    });
    this.catchEvents(link);
    $('#canvas').append(link); 
  }


  this.onAddNewNode = function(){
    var self = this;
    $('#addNewNode').click(function(){
      self.addHost(true);
      self.updateLabelings();
      calc.update();
    });
  }

  this.updateLabelings = function(){
    var index = 1;
    $('#canvas').find('.host').each(function(){
      $(this).find('.node_label').text('#H' + index);
      index++;
    });

    index = 1;
    $('#canvas').find('.link').each(function(){
      $(this).find('.node_label').text('#L' + index);
      index++;
    });
  }

  this.updateDefaultValues = function(){
    var self = this;
    $('#updateDefaultValues').click(function(){
      $('#canvas').find('.hinput').each(function(){
        self.copyValues($(this));       
      });
      calc.update();
    });
  }

  this.onRemoveNode = function(){
    var self = this;
    $('body').on('click', '.node_remove', function(){
      $('.node[link_host=' + $(this).closest('.host').attr('link_host') + ']').remove();
      self.updateLabelings();
      calc.update();
    });
  }

  this.addInitialNode = function(){
    this.addHost();
    this.addHost(true);
    $('#canvas').find('.node_remove').remove();
    this.updateLabelings();
  }

  /*
    +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=
    RESULTS
  */

  this.writeResults = function(state){
    console.log('result', state);
    this.writeResult('fileSize', state.fileSize, 'b', SIZES.FILE_SIZE);
    this.writeResult('efikasnost', this.toDecimalString(state.efikasnost) + '%');
    this.writeResult('velicinaHeadera', state.headerSize, 'b', SIZES.FILE_SIZE);
    this.writeResult('ukupnaVelicinaHeadera', state.segTotalHeaderSize, 'b', SIZES.FILE_SIZE);
    this.writeResult('brzinaPrenosa', state.speedOfTransmision, 'bs', SIZES.CAPACITY_SIZES);

    this.writeResult('podjelaNaBrojFajlova', state.segNumberOfParts);
    this.writeResult('podjelaNaVelicinu', state.segFileSize, 'b', SIZES.FILE_SIZE);

    this.writeResult('ukupnoKasnjenje', state.ukupnoVrijemeKasnjenja, 's', SIZES.TIMES);
    this.writeResult('ukupnoKasnjenjeSegmenta', state.kasnjenjeUsledPrenosaSegmenta, 's', SIZES.TIMES);
    
    this.writeResult('kasnjenjeUsredObrade', state.kasnjenjeUsledObrade, 's', SIZES.TIMES);
    this.writeResult('usledPropagacije', state.kasnjenjeUsledPropagacije, 's', SIZES.TIMES);
    this.writeResult('usledPrenosa', state.kasnjenjeUsledPrenosa, 's', SIZES.TIMES);

    this.createTable_kasnjenjeUsledPrenosa(state);
    this.createTable_kasnjenjeUsledPrenosaSegmenta(state);
    this.createTable_kasnjenjeUsledPropagacije(state);
  }

  this.toDecimalString = function(input){
    var decimals = parseInt($('#brojDecimala').val());
    var cnum = new BigNumber(input).toFixed(decimals).toString();

    var split = cnum.toString().split('.');
    var num = split[0], dec = '';
    var decs = '';
    if(split.length == 2){
      var hasNum = false;
      for(var i = split[1].length - 1; i >= 0; i--)
        if(hasNum || split[1][i] != '0' ) { hasNum = true; decs = split[1][i] + decs; continue }
    }
    //console.log(input + ' __ ' + cnum + ' __ ' + num + (decs != '' ? '.' : '') + decs);

    return num + (decs != '' ? '.' : '') + decs; 
  }

  this.writeResultTable = function(context, value){
    var result_box = $('.result_box[context=' + context + ']');
    return this.toDecimalString(calc.convert(SIZES.TIMES, value, 's', result_box.find('select').val())) + result_box.find('select').val();
  }

  this.writeResult = function(context, value, measure, sizes){
    var result_box = $('.result_box[context=' + context + ']');
    if(result_box.find('select').length > 0)
      value = calc.convert(sizes, value, measure, result_box.find('select').val());
    if(typeof measure !== 'undefined' || typeof sizes !== 'undefined')
      result_box.find('.result_value').text(this.toDecimalString(value));
    else
      result_box.find('.result_value').text(value);
  }

  // summary: 
  this.createTable_kasnjenjeUsledPropagacije = function(state){
    $('#tables').append('<div class="result_header">#tabela Kasnjenje usled propagacije</div>');
    var html = '';
    var table = state.result;

    for(var i = 0; i < table.length; i++) {
      var rezultat_sa_obradom = '<span class="tables_span" title="rezultat sa obradom">'+ this.writeResultTable('usledPropagacije', table[i].propagacija.result) +'</span>';
      var info = 'prop' + table[i].index + rezultat_sa_obradom +'<br>';

      html += info;
    }

    $('#tables').append(html);
  }

  // summary: 
  this.createTable_kasnjenjeUsledPrenosa = function(state){
    $('#tables').append('<div class="result_header">#tabela Kasnjenje usled prenosa</div>');
    var html = '';
    var table = state.result;

    for(var i = 0; i < table.length; i++) {
      var obrada = '<span class="tables_span" title="obrada">' + this.writeResultTable('usledPrenosa', table[i].obrada) + '</span>';
      var rezultat = '<span class="tables_span" title="rezultat">' + this.writeResultTable('usledPrenosa', table[i].prenos.result) + '</span>';
      var rezultat_sa_obradom = '<span class="tables_span" title="rezultat sa obradom">'+ this.writeResultTable('usledPrenosa', table[i].prenos.result_with_obrada) +'</span>';
      var info = 'pren' + table[i].index + ' ' +  obrada + ' + ' + rezultat + ' = ' + rezultat_sa_obradom +'<br>';

      html += info;
    }

    $('#tables').append(html);
  }

  // summary: 
  this.createTable_kasnjenjeUsledPrenosaSegmenta = function(state){
    $('#tables').append('<div class="result_header">#tabela Kasnjenje usled prenosa segmenta</div>');
    var html = '';
    var table = state.result;

    for(var i = 0; i < table.length; i++) {
      var obrada = '<span class="tables_span" title="obrada">' + this.writeResultTable('ukupnoKasnjenjeSegmenta', table[i].obrada) + '</span>';
      var rezultat = '<span class="tables_span" title="rezultat">' + this.writeResultTable('ukupnoKasnjenjeSegmenta', table[i].prenos.result_segment) + '</span>';
      var rezultat_sa_obradom = '<span class="tables_span" title="rezultat sa obradom">'+ this.writeResultTable('ukupnoKasnjenjeSegmenta', table[i].prenos.result_segment_obrada) +'</span>';
      var info = 'pren' + table[i].index + ' ' +  obrada + ' + ' + rezultat + ' = ' + rezultat_sa_obradom +'<br>';

      html += info;
    }

    $('#tables').append(html);
  }


  this.init();
}