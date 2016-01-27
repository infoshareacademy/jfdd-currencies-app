$(document).ready(function () {

    var wybranaData1 = '2010-03-09';
    var wybranaData2 = '2010-04-09';
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
                        data.push($(this).text());
                    });
                    $(this).find('kurs').each(function () {
                        kurs.push(parseFloat($(this).text()));
                    });
                });


                var startPosition = data.indexOf(wybranaData1);
                var stopPosition = data.indexOf(wybranaData2);

                dateChartArray = data.slice(startPosition, stopPosition + 1);
                rateChartArray = kurs.slice(startPosition, stopPosition + 1);

            }

        }).then(function () {

            var lineChartData = {
                labels: dateChartArray,
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: rateChartArray
                    }

                ]

            };
            var ctx = document.getElementById("canvas").getContext("2d");
            window.myLine = new Chart(ctx).Line(lineChartData, {
                responsive: true
            });
        });

    }

    pobierzDane('../xml/AUD.xml');





});
