/**
 * Created by tomekn on 21.01.16.
 */
$(document).ready(function () {

    var ctx = document.getElementById("myChart").getContext("2d");

    var data = {
        labels: ["PN", "WT", "ŚR", "CZW", "PT", "SB", "ND"],
        datasets: [
            {
                label: "Kupno",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [4.32, 4.11, 4.54, 4.21, 4.04, 3.99]
            },
            {
                label: "Sprzedaż",
                fillColor: "rgba(251,187,205,0.2)",
                strokeColor: "rgba(251,187,205,1)",
                pointColor: "rgba(251,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [4.52, 4.44, 4.64, 4.32, 4.10, 4.21]
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
        datasetFill: true

    };


    $.ajax({

        type: "GET",

        url: "xml/2016_01_11.xml",

        dataType: "xml",

        success: function (xml) {
            $(xml).find('pozycja').eq(0).each(function () {

                var nazwaWaluty = $(this).find('nazwa_waluty').text();
                var przelicznik = $(this).find('przelicznik').text();
                var kodWaluty = $(this).find('kod_waluty').text();
                var kursKupna = $(this).find('kurs_kupna').text();
                var kursSprzedazy = $(this).find('kurs_sprzedazy').text();

                data.datasets[0].data.push(+kursKupna.replace(',', '.'));
                data.datasets[1].data.push(+kursSprzedazy.replace(',', '.'));
            });

            new Chart(ctx).Line(data, options);
        },

        error: function () {

            console.log("An error occurred while processing XML file.");

        }

    });

});

