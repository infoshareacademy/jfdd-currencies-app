$(document).ready(function () {

    var wybranaData1 = 20100409;
    var wybranaData2 = 20100421;
    var dateChartArray = [];
    var rateChartArray = [];


    function pobierzDane(url) {


        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            //async: false,
            error: function () {
                $('#tresc').text('wystąpil błąd');
            },
            success: function (response) {

                var data = [];
                var kurs = [];

                $(response).find('pozycja').each(function () {

                    $(this).find('data').each(function () {
                        data.push(parseFloat($(this).text()));
                    });
                    $(this).find('kurs').each(function () {
                        kurs.push(parseFloat($(this).text()));
                    });
                });



                var startPosition = data.indexOf(wybranaData1);
                var stopPosition = data.indexOf(wybranaData2);

                var dateChartArray = data.slice(startPosition, stopPosition+1);
                var rateChartArray = kurs.slice(startPosition, stopPosition+1);

                console.log(dateChartArray);
                console.log(rateChartArray);



            }
        });
    };

    pobierzDane("../xml/GBP.xml");




    var lineChartData = {
        labels : [20100409, 20100412, 20100413, 20100414, 20100415, 20100416, 20100419, 20100420, 20100421],
        datasets : [
            {
                label: "My First dataset",
                fillColor : "rgba(220,220,220,0.2)",
                strokeColor : "rgba(220,220,220,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStroke : "rgba(220,220,220,1)",
                data : rateChartArray
            }

        ]

    };

    window.onload = function(){
        var ctx = document.getElementById("canvas").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, {
            responsive: true
        });
    }

    console.log(Array.isArray(dateChartArray));
    console.log(Array.isArray(rateChartArray));




});
