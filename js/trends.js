$.fn.datepicker.defaults.format = "yyyy-mm-dd";
var currency = ['Dolar amerykański', 'Dolar australijski', 'Dolar kanadyjski', 'Euro', 'Forint (Węgry)', 'Frank szwajcarski', 'Funt szterling', 'Jen (Japonia)', 'Korona czeska', 'Korona duńska', 'Korona norweska', 'Korona szwedzka', 'SDR (MFW)'];
var currenciesShorts = ['USD','AUD','CAD','EUR','HUF','CHF','GBP','JPY','CZK','DKK','NOK','SEK','XDR'];


var currencyDataFirst,
    currencyDataSecond;


$("#trendsForm").submit(function (event) {

    event.preventDefault();
    currencyDataFirst = $('#dateOne').val();
    currencyDataSecond = $('#dateTwo').val();
    var rows = [];

    $.when.apply($, currenciesShorts.map(function (item) {
        var url = ('xml/' + item + '.xml');
        return fetchData(url);
    })).done(function () {
        var results = $.makeArray(arguments);
        console.log(results);

       results.forEach(function(item){
            $xml = $(item[0]);
           rows.push({
               name: $xml.find('nazwa').text(),
               min: $xml.find('pozycja').filter(function () {
                   var x = $(this).text().trim();
                   return x === currencyDataFirst;

               }).text(),
               max: $xml.find('pozycja').filter(function () {
                   return $(this).text().trim() === currencyDataSecond
               }).text()
           })

       });

        console.log(rows);


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
