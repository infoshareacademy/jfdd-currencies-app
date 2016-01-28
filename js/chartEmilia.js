//http://stackoverflow.com/questions/10950650/parsing-multiple-xml-files-with-jquery
$(document).ready(function () {

    //var tableData;
    //var wykresRoznic;
(function(){
    $('#tresc').append('<ul></ul>');
    $.ajax({
    type: "GET",
    url:"../xml/2016_01_11.xml",
    dataType:"xml",
    error: function() {
        $('#tresc').text('wystapil blad');
    },
    success: function(response)   {
        $(response).find('tabela_kursow').each( function ()    {
            var data = $(this).find('data_notowania').text();

         $(response).find('pozycja').each(function () {
             var nazwaWaluty = $(this).find('nazwa_waluty').text();
             //var przelicznik = $(this).find('przelicznik').text();
             var kodWaluty = $(this).find('kod_waluty').text();
             var kursKupna = parseFloat(($(this).find('kurs_kupna').text()).replace(',','.'));
             var kursSprzedazy = parseFloat(($(this).find('kurs_sprzedazy').text()).replace(',','.'));
             var roznica = ((kursSprzedazy) - (kursKupna)).toFixed(4);
             $('<li></li>').html(nazwaWaluty +' ,kod waluty: '+ kodWaluty +' ,kurs kupna:  '+ kursKupna +' ,kurs sprzedaży:  '+ kursSprzedazy+ ' ,różnica: '+roznica +' ,data: ' +data)
                 .appendTo('#tresc');



             //var tabliczka = [kodWaluty, kursKupna, kursSprzedazy, roznica, data];
             //if (tabliczka[0]='AUD')  {
             //    console.log(tabliczka[3]);
             //}


             //var obiekcik= {
             //    nazwa_waluty: nazwaWaluty,
             //    kod_waluty: kodWaluty,
             //    kurs_kupna: kursKupna,
             //    kurs_sprzedazy: kursSprzedazy,
             //    roznica_kursow: roznica,
             //    data_notowania: data
             //};
             //if (obiekcik.kod_waluty ='AUD')    {
             //    console.log(this.obiekcik.kurs_sprzedazy)
             //}

         });
            $(response).find('pozycja').each(function ()    {
                $(response):contains('AUD')
            })


        })
    }

    });

})();











//1. Ściągnąć dane
//2. Przeliczyć dane - wyliczyć różnicę
//3.Wyrysować wykres

//
//var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
//
//var barChartData = {
//    labels : ["Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota","Niedziela"],
//    datasets : [
//        {
//            fillColor : "rgba(220,220,220,0.5)",
//            strokeColor : "rgba(220,220,220,0.8)",
//            highlightFill: "rgba(220,220,220,0.75)",
//            highlightStroke: "rgba(220,220,220,1)",
//            data : [0.33, 0.70, 1.2, 0.76, 0.9, 2.0, 2.4]
//        },
//
//    ]
//
//}
//window.onload = function(){
//        var ctx = document.getElementById("canvas").getContext("2d");
//        window.myBar = new Chart(ctx).Bar(barChartData, {
//            responsive : true
//        });
//    }

});


//PONIŻEJ PLIKI TOMKA
///**
// * Created by tomekn on 21.01.16.
// */
//$(document).ready(function () {
//
//    var ctx = document.getElementById("myChart").getContext("2d");
//
//    var data = {
//        labels: ["PN", "WT", "ŚR", "CZW", "PT"],
//        datasets: [
//            {
//                label: "Kupno",
//                fillColor: "rgba(220,220,220,0.2)",
//                strokeColor: "rgba(220,220,220,1)",
//                pointColor: "rgba(220,220,220,1)",
//                pointStrokeColor: "#fff",
//                pointHighlightFill: "#fff",
//                pointHighlightStroke: "rgba(220,220,220,1)",
//                data: []
//            },
//            {
//                label: "Sprzedaż",
//                fillColor: "rgba(251,187,205,0.2)",
//                strokeColor: "rgba(251,187,205,1)",
//                pointColor: "rgba(251,187,205,1)",
//                pointStrokeColor: "#fff",
//                pointHighlightFill: "#fff",
//                pointHighlightStroke: "rgba(151,187,205,1)",
//                data: []
//            }
//        ]
//    };
//
//    var options = {
//
//        ///Boolean - Whether grid lines are shown across the chart
//        scaleShowGridLines: true,
//
//        //String - Colour of the grid lines
//        scaleGridLineColor: "rgba(0,0,0,.05)",
//
//        //Number - Width of the grid lines
//        scaleGridLineWidth: 1,
//
//        //Boolean - Whether to show horizontal lines (except X axis)
//        scaleShowHorizontalLines: true,
//
//        //Boolean - Whether to show vertical lines (except Y axis)
//        scaleShowVerticalLines: true,
//
//        //Boolean - Whether the line is curved between points
//        bezierCurve: true,
//
//        //Number - Tension of the bezier curve between points
//        bezierCurveTension: 0.4,
//
//        //Boolean - Whether to show a dot for each point
//        pointDot: true,
//
//        //Number - Radius of each point dot in pixels
//        pointDotRadius: 4,
//
//        //Number - Pixel width of point dot stroke
//        pointDotStrokeWidth: 1,
//
//        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
//        pointHitDetectionRadius: 20,
//
//        //Boolean - Whether to show a stroke for datasets
//        datasetStroke: true,
//
//        //Number - Pixel width of dataset stroke
//        datasetStrokeWidth: 2,
//
//        //Boolean - Whether to fill the dataset with a colour
//        datasetFill: true
//
//    };
//
//    var chart = new Chart(ctx);
//
//    function fetchDataset(url, index) {
//        $.ajax({
//
//            type: "GET",
//
//            url: url,
//
//            dataType: "xml",
//
//            success: function (xml) {
//                $(xml).find('pozycja').eq(index).each(function () {
//
//                    var nazwaWaluty = $(this).find('nazwa_waluty').text();
//                    var przelicznik = $(this).find('przelicznik').text();
//                    var kodWaluty = $(this).find('kod_waluty').text();
//                    var kursKupna = $(this).find('kurs_kupna').text();
//                    var kursSprzedazy = $(this).find('kurs_sprzedazy').text();
//
//                    data.datasets[0].data[index] = +kursKupna.replace(',', '.');
//                    data.datasets[1].data[index] = +kursSprzedazy.replace(',', '.');
//                });
//
//                for (var i = 0 ; i < 5 ; i++) {
//
//                }
//                chart.Line(data, options);
//            },
//
//            error: function () {
//
//                console.log("An error occurred while processing XML file.");
//
//            }
//
//        });
//    }
//
//    fetchDataset('xml/2016_01_11.xml',0);
//    fetchDataset('xml/2016_01_12.xml',1);
//    fetchDataset('xml/2016_01_13.xml',2);
//    fetchDataset('xml/2016_01_14.xml',3);
//    fetchDataset('xml/2016_01_15.xml',4);
//
//
//
//});
