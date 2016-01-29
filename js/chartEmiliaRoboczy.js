//$(document).ready(function () {

var wybranaWaluta;
var wybranaData1;
var wybranaData2;

$("select").change(function () {
    wybranaWaluta = $(this).val();
});

$("#currencyForm").submit(function (event) {
    event.preventDefault();
    wybranaData1 = $('#data1').val();
    wybranaData2 = $('#data2').val();
    var url = ('xml/' + wybranaWaluta + '.xml');
    pobierzDane(url);
    return false;
});

new JsDatePick({
    useMode: 2,
    target: "data1",
    isStripped: false,
    selectedDate: {
        year: 2000,
        month: 1,
        day: 3
    },
    yearsRange: new Array(2000, 2016),
    limitToToday: false,
    dateFormat: "%Y-%m-%d"
});

new JsDatePick({
    useMode: 2,
    target: "data2",
    isStripped: false,
    selectedDate: {
        year: 2000,
        month: 1,
        day: 4
    },
    yearsRange: new Array(2000, 2016),
    limitToToday: false,
    dateFormat: "%Y-%m-%d"
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

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.03)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: false,

            //Boolean - Whether the line is curved between points
            bezierCurve : true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension : 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot : false,

            //Number - Radius of each point dot in pixels
            pointDotRadius : 1,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 1,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,

            // Boolean - Whether to animate the chart
            animation: true,

            // Number - Number of animation steps
            animationSteps: 10,

            // String - Animation easing effect
            animationEasing: "easeOutQuart",

            // Boolean - If we should show the scale at all
            showScale: true,

            // Boolean - If we want to override with a hard coded scale
            scaleOverride: false,

            // ** Required if scaleOverride is true **
            // Number - The number of steps in a hard coded scale
            scaleSteps: null,
            // Number - The value jump in the hard coded scale
            scaleStepWidth: null,
            // Number - The scale starting value
            scaleStartValue: null,

            // String - Colour of the scale line
            scaleLineColor: "rgba(0,0,0,.1)",

            // Number - Pixel width of the scale line
            scaleLineWidth: 1,

            // Boolean - Whether to show labels on the scale
            scaleShowLabels: true,

            // Boolean or a positive integer denoting number of labels to be shown on x axis
            showXLabels: 10,

            // Interpolated JS string - can access value
            scaleLabel: "<%=value%>",

            // Boolean - Whether the scale should stick to integers, and not show any floats even if drawing space is there
            scaleIntegersOnly: true,

            // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero: false,

            // String - Scale label font declaration for the scale label
            scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Scale label font size in pixels
            scaleFontSize: 12,

            // String - Scale label font weight style
            scaleFontStyle: "normal",

            // String - Scale label font colour
            scaleFontColor: "#666",

            // Boolean - whether or not the chart should be responsive and resize when the browser does.
            responsive: true,

            // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
            maintainAspectRatio: true,

            // Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
            showTooltips: true,

            // Array - Array of string names to attach tooltip events
            tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],

            // String - Tooltip background colour
            tooltipFillColor: "rgb(9, 102, 163)",

            // String - Tooltip label font declaration for the scale label
            tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip label font size in pixels
            tooltipFontSize: 14,

            // String - Tooltip font weight style
            tooltipFontStyle: "normal",

            // String - Tooltip label font colour
            tooltipFontColor: "#fff",

            // String - Tooltip title font declaration for the scale label
            tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

            // Number - Tooltip title font size in pixels
            tooltipTitleFontSize: 14,

            // String - Tooltip title font weight style
            tooltipTitleFontStyle: "bold",

            // String - Tooltip title font colour
            tooltipTitleFontColor: "#fff",

            // Number - pixel width of padding around tooltip text
            tooltipYPadding: 6,

            // Number - pixel width of padding around tooltip text
            tooltipXPadding: 6,

            // Number - Size of the caret on the tooltip
            tooltipCaretSize: 8,

            // Number - Pixel radius of the tooltip border
            tooltipCornerRadius: 6,

            // Number - Pixel offset from point x to tooltip edge
            tooltipXOffset: 10,

            // String - Template string for single tooltips
            tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

            // String - Template string for single tooltips
            multiTooltipTemplate: "<%= value %>",

            // String - Colour behind the legend colour block
            multiTooltipKeyBackground: '#fff',

            // Function - Will fire on animation progression.
            onAnimationProgress: function(){},

            // Function - Will fire on animation completion.
            onAnimationComplete: function(){}


        };
        var ctx = document.getElementById("canvas").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, chartOptions);
    });

}



//});

//https://github.com/nnnick/Chart.js/issues/12
//https://github.com/hay-wire/Chart.js/blob/showXLabels/src/Chart.Line.js
//https://github.com/hay-wire/Chart.js/tree/showXLabels
//https://github.com/nnnick/Chart.js/pull/897/files
//https://github.com/nnnick/Chart.js/issues/963
//https://github.com/nnnick/Chart.js/issues/908


//https://github.com/nnnick/Chart.js/tree/v2.0-dev/samples/timeScale