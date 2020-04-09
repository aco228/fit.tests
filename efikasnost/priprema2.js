
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
/*
  
  Komponenta kasnjenja usled prenosa je obicno veca od komponente kasnjenja usled propagacije

    - tacno

  Efikasnost prenosa podataka bez segmentacije je veca nego u slucaju segmentacije, u slucaju da pri prenosu nema gresaka ni gubitaka

    - tacno

  Komponenta kasnjenja koja podrazumjeva vrijeme potrebno da se podaci ubace u link je kasnjenje usled

    - prenosa

  Efikasnost prenosa poruka sa segmentacijom, u odnosu na prenos poruke bez segmentacije, u slucaju da je kanal podlozan greskama ili gubicima je

    - znacajno veca

  
*/


// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
// Svaki segment mora biti potvrdjen

result.kasnjenjeUsledPrenosaSegmenta.add(calc.length().mul(result.kasnjenjeUsledPropagacije)).mul(result.segNumberOfParts) + 's';


// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
 // .. a komutator moze da pocne slanje podataka nakon prijema prvih 250B

var F = calc.convert(SIZES.FILE_SIZE, '250', 'B', 'b');
var R = result.result[0].prenos.result.add(result.kasnjenjeUsledPropagacije);
for(var i = 0; i < calc.length() - 1; i++){
  var kapacitet = calc.takeValue('capacity_sizes', calc.link(i));
  R = R.add(F.div(kapacitet));
}

var efektivnaBrzinaPrenosa = calc.convert(SIZES.CAPACITY_SIZES, result.originalFileSize.div(R), 'bs', 'Mbs');

console.log('Ukupno kasnjenje', calc.convert(SIZES.TIMES, R, 's', 'ms'));
console.log('Efektivna brzina', efektivnaBrzinaPrenosa);



// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
// Zadatak 8

// Neka je kasnjenje usled propagacije na jednom linku 3.6us, a kasnjenje usled prenosa jednog paketa 1.2ms. 
// Ako je velicina fajla F=37MB, a velicina jednog segmenta S=1KB, uz uslov da izmedju racunara A i B postoji
// N=8 swicheva, odrediti koliko iznosi ukupno kasnjenje koje je potrebno da se cijela poruka isporuci racunaru B


var fileSize = calc.convert(SIZES.FILE_SIZE, '3', 'MB', 'b');
var S = calc.convert(SIZES.FILE_SIZE, '1', 'KB', 'b');
var propagacija = calc.convert(SIZES.TIMES, '4.0', 'us', 's');
var prenos = calc.convert(SIZES.TIMES, '0.4', 'ms', 's');
var N = 8; // switchevi


var L = N + 1; // linkovi
var brSegmenata = Math.ceil(fileSize.div(S)).toString();
propagacija.add(prenos).mul(N)

var time = L.mul(propagacija).add(N.add(brSegmenata).mul(prenos));
console.log(calc.convert(SIZES.TIMES, time, 's', 's'));


