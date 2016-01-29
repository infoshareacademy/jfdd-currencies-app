/**
 * Created by lukaszk on 27.01.16.
 */


var inputValue;
var currenciesShorts = ['USD','AUD','CAD','EUR','HUF','CHF','GBP','JPY','CZK','DKK','NOK','SEK','XDR'];
var averageCurrencyBefore=[];
var averageCurrencyToday=[];
var changeAverage=[];
createBarChart();

var checker = setInterval('checkIfValueChanged()', 500);



function checkIfValueChanged() {


    if ($("#data1").val() && !($("#data1").val() == inputValue)) {
        inputValue = $("#data1").val();
        actualizeChartData(inputValue,currenciesShorts[0],0);
        actualizeChartData(inputValue,currenciesShorts[1],1);
        actualizeChartData(inputValue,currenciesShorts[2],2);
        actualizeChartData(inputValue,currenciesShorts[3],3);
        actualizeChartData(inputValue,currenciesShorts[4],4);
        actualizeChartData(inputValue,currenciesShorts[5],5);
        actualizeChartData(inputValue,currenciesShorts[6],6);
        actualizeChartData(inputValue,currenciesShorts[7],7);
        actualizeChartData(inputValue,currenciesShorts[8],8);
        actualizeChartData(inputValue,currenciesShorts[9],9);
        actualizeChartData(inputValue,currenciesShorts[10],10);
        actualizeChartData(inputValue,currenciesShorts[11],11);
        actualizeChartData(inputValue,currenciesShorts[12],12);
        countChangeAverage();
        createBarChart();
    }
}

function countChangeAverage(){
    for(var i=0;i<averageCurrencyToday.length;i++){

        changeAverage[i]= parseFloat((averageCurrencyToday[i]-averageCurrencyBefore[i]).toFixed(2));

    }

}

    function createBarChart() {

    var barChartData = {
        labels: ["dolar amerykański", "dolar australijski", "dolar kanadyjski", "euro", "forint(Węgry)", "frank szwajcarski", "funt szterling", "jen (Japonia)", "korona czeska", "korona duńska", "korona norweska", "korona szwedzka", "SDR (MFW)"],
        datasets: [

            {
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: changeAverage
            }
        ]

    };
        var ctx = document.getElementById("canvas").getContext("2d");
        window.myBar = new Chart(ctx).Bar(barChartData, {
            responsive: true
        });


}

function actualizeChartData(clickedDate,currencyType,numberArray) {

        $.ajax({

            type: "GET",

            url: "../xml/" + currencyType + ".xml",

            dataType: "xml",

            success: function (xml) {

                var date = [];
                var currency = [];

                $(xml).find('pozycja').each(function () {

                    $(this).find('data').each(function () {
                        date.push($(this).text());
                    });
                    $(this).find('kurs').each(function () {
                        currency.push(parseFloat($(this).text()));
                    });
                });
                var positionDateToday = date.length -1;
                var positionDate = date.indexOf(clickedDate);
                var beforeNumber=currency[positionDate];
                var todayNumber=currency[positionDateToday];
                averageCurrencyBefore[numberArray]=parseFloat(beforeNumber.toFixed(2));
                averageCurrencyToday[numberArray]=parseFloat(todayNumber.toFixed(2));
            }
        });

}



new JsDatePick({
    useMode: 2,
    target: "data1",
    isStripped: false,
    selectedDate: {
        year: 2015,
        month: 1,
        day: 3
    },
    yearsRange: new Array(2000, 2015),
    limitToToday: false,
    dateFormat: "%Y-%m-%d"
});