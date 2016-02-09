/**
 * Created by lukaszk on 27.01.16.
 */
$( document ).ready(function() {

var inputValue="brak";
var currenciesShorts = ['USD','AUD','CAD','EUR','HUF','CHF','GBP','JPY','CZK','DKK','NOK','SEK','XDR'];
var averageCurrencyBefore=[];
var averageCurrencyToday=[];
var changeAverage=[];
createBarChart();

    var $datepicker = $('.datepicker').datepicker({
        daysOfWeekDisabled:'06',
        weekStart: 1,
        format: "yyyy-mm-dd",
        endDate: '2014-12-31',
        startDate:'2000-01-03'


    });
    $datepicker.on('changeDate', function(){

        $("#loader").css('background', 'url("images/loader.gif") no-repeat 50% 50% fixed');
        $(this).datepicker('hide');
        inputValue = $("#data1").val();

        $.when(

            actualizeChartData(inputValue,currenciesShorts[0],0),
            actualizeChartData(inputValue,currenciesShorts[1],1),
            actualizeChartData(inputValue,currenciesShorts[2],2),
            actualizeChartData(inputValue,currenciesShorts[3],3),
            actualizeChartData(inputValue,currenciesShorts[4],4),
            actualizeChartData(inputValue,currenciesShorts[5],5),
            actualizeChartData(inputValue,currenciesShorts[6],6),
            actualizeChartData(inputValue,currenciesShorts[7],7),
            actualizeChartData(inputValue,currenciesShorts[8],8),
            actualizeChartData(inputValue,currenciesShorts[9],9),
            actualizeChartData(inputValue,currenciesShorts[10],10),
            actualizeChartData(inputValue,currenciesShorts[11],11),
            actualizeChartData(inputValue,currenciesShorts[12],12)
        ).then(function () {
            countChangeAverage();
            createBarChart();
            $("#loader").css('background', 'none');
        });
    });




function countChangeAverage(){
    for(var i=0;i<averageCurrencyToday.length;i++){

        changeAverage[i]= parseFloat((averageCurrencyToday[i]-averageCurrencyBefore[i]).toFixed(2));

    }

}

    function createBarChart() {

        var data = {
            labels: ['USD','AUD','CAD','EUR','HUF','CHF','GBP','JPY','CZK','DKK','NOK','SEK','XDR'],
            series: [
                changeAverage

            ]
        };

        var options = {
            seriesBarDistance: 15
        };

        var responsiveOptions = [
            ['screen and (min-width: 641px) and (max-width: 1024px)', {
                seriesBarDistance: 10,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value;
                    }
                }
            }],
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];

        new Chartist.Bar('.ct-chart', data, options, responsiveOptions);

    }

function actualizeChartData(clickedDate,currencyType,numberArray) {


        return $.ajax({

            type: "GET",

            url: "xml/" + currencyType + ".xml",

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
                averageCurrencyBefore[numberArray]=beforeNumber;
                averageCurrencyToday[numberArray]=todayNumber;
            }
        });

}


});

