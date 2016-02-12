$.fn.datepicker.defaults.format = "yyyy-mm-dd";
var currency = ['Dolar amerykański', 'Dolar australijski', 'Dolar kanadyjski', 'Euro',
    'Forint (Węgry)', 'Frank szwajcarski', 'Funt szterling', 'Jen (Japonia)', 'Korona czeska',
    'Korona duńska', 'Korona norweska', 'Korona szwedzka', 'SDR (MFW)'],
    currenciesShorts = ['USD','AUD','CAD','EUR','HUF','CHF','GBP','JPY','CZK','DKK','NOK','SEK','XDR'],
    currencyMap = {},
    currencyDataFirst,
    currencyDataSecond;

    currency.forEach(function (item, idx) {
    currencyMap[currenciesShorts[idx]] = item;
});


$("#trendsForm").submit(function (event) {

    event.preventDefault();
    currencyDataFirst = $('#dateOne').val();
    currencyDataSecond = $('#dateTwo').val();

    $.when.apply($, currenciesShorts.map(function (item) {
        var url = ('xml/' + item + '.xml');
        return fetchData(url);
    })).done(function () {
        var results = $.makeArray(arguments);
        var tableBody = $('#trendsTable tbody');

        tableBody.html('');
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
           var insertedRow = tableBody.append('<tr><td>' + [row.fullName,row.name,row.min,row.max,percents + '%'].join('</td><td>') + '</td></tr>')
           .find('td').last().css('color', percents >= 0 ? 'green' : 'red');

       });
    });
    return false;
});

function fetchData(url) {
    return $.ajax({
        type: "GET",
        url: url,
        dataType: "xml"
        });
}
