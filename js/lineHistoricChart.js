$(document).ready(function () {

    var wybranaWaluta;
    var wybranaData1;
    var wybranaData2;

    $("select").change(function () {
        wybranaWaluta = $(this).val();
    });

    $("#currencyForm").submit(function (event) {
        event.preventDefault();
        $('#canvas').remove();
        $('#canvasDiv').append('<canvas></canvas>');
        $('canvas').attr('id', 'canvas');
        $('canvas').attr('style', 'height:500px');
        wybranaData1 = $('#data1').val();
        wybranaData2 = $('#data2').val();
        var url = ('xml/' + wybranaWaluta + '.xml');
        pobierzDane(url);
        return false;
    });

    var $datepicker = $('.datepicker').datepicker({
        daysOfWeekDisabled: '06',
        weekStart: 1,
        format: "yyyy-mm-dd",
        endDate: '2015-12-31',
        startDate: '2000-01-03'
    });

    $datepicker.on('changeDate', function () {
        $(this).datepicker('hide');
        wybranaData1 = $("#data1").val();
        wybranaData2 = $("#data2").val();

    });

    var dateChartArray = [];
    var rateChartArray = [];


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
                        fillColor: "rgba(77, 145, 228, 0.27)",
                        strokeColor: "rgba(18, 89, 175, 0.51)",
                        pointColor: "rgb(228, 15, 122)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: rateChartArray

                    }
                ]
            };
            var chartOptions = {

                scaleShowHorizontalLines: true,
                scaleShowVerticalLines: false,
                bezierCurveTension: 0.4,
                pointDot: false,
                pointDotRadius: 1,
                pointHitDetectionRadius: 1,
                animationSteps: 10,
                animationEasing: "easeOutQuart",
                showXLabels: 10,
                responsive: true,
                showTooltips: true,
                tooltipFillColor: "rgb(9, 102, 163)"

            };
            var ctx = document.getElementById("canvas").getContext("2d");

            window.myLine = new Chart(ctx).Line(lineChartData, chartOptions);
        });

    }


});

