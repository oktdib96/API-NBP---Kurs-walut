//`http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`

const request = require('request');
const fs = require('fs');

const validCodes = ['usd', 'gbp', 'eur', 'chf'];

const code = process.argv[2];

const isValid = validCodes.find(currency => currency === code) ? true : false;
console.log(isValid)


const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`

request(url, {json:true}, (err, res, body) => {
  if(err) {
      return console.log("Błąd: ", err)
  }
  if(res.statusCode !== 200) {
      return console.log("Coś poszło nie tak")
  }
    const message = `Średnia cena ${body.currency} w dniu ${body.rates[0].effectiveDate} wynosi ${body.rates[0].mid} złotych`
   
    fs.appendFile('currencies.txt', message + '\n', (err) => {
        console.log("dane dodane do pliku");

    })
    console.log(message)
} )