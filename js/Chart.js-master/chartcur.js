/**
 * Created by tomekn on 21.01.16.
 */
$(document).ready(function () {

    // 1. funkcja, która zwraca context, przyjmuje id charta
    // 2. funkcja będzie znajdywać canvas o id takim jak id charta (zapisuje sobie referencje na parenta)
    // 3. tworzy nowy canvas

    function getContext(chartId) {
        var find = $('#' + chartId).parent();
        find.remove();
        var canvas = find.append($('<canvas width="auto" height="auto"></canvas>'));
        canvas.attr('id',chartId);
        document.getElementById(chartId).getContext("2d");
    }

    var ctx = getContext('myChart');


    var data = {
        labels: ["PN", "WT", "ŚR", "CZW", "PT"],
        datasets: [
            {
                label: "Kupno",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            },
            {
                label: "Sprzedaż",
                fillColor: "rgba(251,187,205,0.2)",
                strokeColor: "rgba(251,187,205,1)",
                pointColor: "rgba(251,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: []
            }
        ]
    };

    var options = {

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve: true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension: 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot: true,

        //Number - Radius of each point dot in pixels
        pointDotRadius: 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth: 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius: 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke: true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth: 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill: true,

        responsive: true
    };



    var currencies = {};


    function fetchDataset(url, index) {
        return $.ajax({

            type: "GET",

            url: url,

            dataType: "xml",

            success: function (xml) {
                $(xml).find('pozycja').each(function () {

                    var nazwaWaluty = $(this).find('nazwa_waluty').text();
                    var przelicznik = $(this).find('przelicznik').text();
                    var kodWaluty = $(this).find('kod_waluty').text();
                    var kursKupna = $(this).find('kurs_kupna').text();
                    var kursSprzedazy = $(this).find('kurs_sprzedazy').text();

                    currencies[kodWaluty] = currencies[kodWaluty] || {};

                    currencies[kodWaluty].nazwaWaluty = nazwaWaluty;
                    currencies[kodWaluty].przelicznik = przelicznik;
                    currencies[kodWaluty].kodWaluty = kodWaluty;

                    currencies[kodWaluty].kursyKupna = currencies[kodWaluty].kursyKupna || [];
                    currencies[kodWaluty].kursySprzedazy = currencies[kodWaluty].kursySprzedazy || [];

                    currencies[kodWaluty].kursyKupna[index] = +kursKupna.replace(',', '.');
                    currencies[kodWaluty].kursySprzedazy[index] = +kursSprzedazy.replace(',', '.');
                });
            },

            error: function () {

                console.log("An error occurred while processing XML file.");

            }
        });
    }
    $.when(
    fetchDataset('xml/2016_01_11.xml',0),
    fetchDataset('xml/2016_01_12.xml',1),
    fetchDataset('xml/2016_01_13.xml',2),
    fetchDataset('xml/2016_01_14.xml',3),
    fetchDataset('xml/2016_01_15.xml',4)
    ).then(function(){
        var chartLeft = localStorage.getItem('chartLeft');
        drawChart(chartLeft || 'USD', ctx);
        drawChart('USD', ctx2);
        drawChart('USD', ctx3);
    });


    function drawChart(currencySymbol,context) {
        data.datasets[0].data = currencies[currencySymbol].kursyKupna;
        data.datasets[1].data = currencies[currencySymbol].kursySprzedazy;

        var chart = new Chart(context);
        chart.Line(data, options);
    }

    $('#selectLeft').change(function() {
            drawChart($(this).val(),ctx);
            localStorage.setItem('chartLeft',$(this).val());
    });
    $('#selectCenter').change(function() {
        drawChart($(this).val(),ctx2);
    });
    $('#selectRight').change(function() {
        drawChart($(this).val(),ctx3);
    });



});

