$.fn.datepicker.defaults.format = "yyyy-mm-dd";
var currency = ['Dolar amerykański', 'Dolar australijski', 'Dolar kanadyjski', 'Euro', 'Forint (Węgry)', 'Frank szwajcarski', 'Funt szterling', 'Jen (Japonia)', 'Korona czeska', 'Korona duńska', 'Korona norweska', 'Korona szwedzka', 'SDR (MFW)'];
var currenciesShorts = ['USD','AUD','CAD','EUR','HUF','CHF','GBP','JPY','CZK','DKK','NOK','SEK','XDR'];
var currencyMap = {};

currency.forEach(function (item, idx) {
    currencyMap[currenciesShorts[idx]] = item;
})

var currencyDataFirst,
    currencyDataSecond;


$("#trendsForm").submit(function (event) {

    event.preventDefault();
    currencyDataFirst = $('#dateOne').val();
    console.log(currencyDataFirst);
    currencyDataSecond = $('#dateTwo').val();
    var rows = [];

    $.when.apply($, currenciesShorts.map(function (item) {
        var url = ('xml/' + item + '.xml');
        return fetchData(url);
    })).done(function () {
        var results = $.makeArray(arguments);
        console.log(results);

        $('#trendsTable tbody').html('');
       results.forEach(function(item){
            $xml = $(item[0]);
            var row = {

               name: $xml.find('nazwa').text(),

                fullName: currencyMap[$xml.find('nazwa').text().trim()],

               min: $xml.find('pozycja').filter(function () {
                   return $(this).find('data').text().trim() === currencyDataFirst;
               }).find('kurs').text(),

               max: $xml.find('pozycja').filter(function () {
                   return $(this).find('data').text().trim() === currencyDataSecond;

               }).find('kurs').text()
           };

           var percents = ((row.max / row.min)*100 - 100).toFixed(3);

           var insertedRow = $('#trendsTable tbody').append('<tr><td>' + row.fullName + '</td>' + '<td>' + row.name
               + '</td>' + '<td>' + row.min + '</td>' + '<td>' + row.max + '</td><td>' + percents + ' % ' + '</td></tr>');

           $(insertedRow).find('td').last().css('color', percents >= 0 ? 'green' : 'red');

       });
    });
    return false;
});


function fetchData(url,minDate,maxDate) {

    return $.ajax({
        type: "GET",
        url: url,
        dataType: "xml"
        });
}
