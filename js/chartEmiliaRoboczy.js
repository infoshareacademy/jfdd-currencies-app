$(document).ready(function () {

    var wybranaData1 = '2000-01-03';
    var wybranaData2 = '2015-12-31';
    var dateChartArray = [];
    var rateChartArray = [];


    new JsDatePick({
        useMode:2,
        target:"data1",
        isStripped:false,
        selectedDate:{
            year:2000,
            month:1,
            day:3
        },
        yearsRange: new Array(2000,2015),
        limitToToday:false,
    });


    function pobierzDane(url) {

        $.ajax({
            type: "GET",
            url: url,
            dataType: "xml",
            //async: false,
            error: function () {
                $('#canvas').text('wystąpil błąd');
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
                        pointColor: "rgb(228, 15, 122)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: rateChartArray
                    }
                ]
            };
            var chartOptions = {
                responsive: true,

                ///Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,

                //scaleFontColor:"#FFFFFF",

                //String - Colour of the grid lines
                scaleGridLineColor: "rgba(0,0,0,.05)",

                //Number - Width of the grid lines
                scaleGridLineWidth: 0.5,

                //Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: true,

                //Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: false,

                //Boolean - Whether the line is curved between points
                bezierCurve: true,

                //Number - Tension of the bezier curve between points
                bezierCurveTension: 0.4,

                //Boolean - Whether to show a dot for each point
                pointDot: false,

                //Number - Radius of each point dot in pixels
                pointDotRadius: 3,

                //Number - Pixel width of point dot stroke
                pointDotStrokeWidth: 1,

                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                pointHitDetectionRadius: 0.1,

                //Boolean - Whether to show a stroke for datasets
                datasetStroke: true,

                //Number - Pixel width of dataset stroke
                datasetStrokeWidth: 2,

                //Boolean - Whether to fill the dataset with a colour
                datasetFill: true,
                //{% raw %}
                //String - A legend template
                //legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>"
                //{% endraw %}

                //Boolean - Whether to horizontally center the label and point dot inside the grid
                offsetGridLines: false,
                showToolTips: true


            };
            var ctx = document.getElementById("canvas").getContext("2d");
            window.myLine = new Chart(ctx).Line(lineChartData, chartOptions);
        });

    }

    pobierzDane('../xml/JPY.xml');


});
