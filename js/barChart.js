/**
 * Created by lukaszk on 27.01.16.
 */
var orderedCurrency =["dolar amerykański","dolar australijski","dolar kanadyjski","euro","forint(Węgry)","frank szwajcarski","funt szterling","jen (Japonia)","korona czeska","korona duńska","korona norweska","korona szwedzka","SDR (MFW)"];
var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

var barChartData = {
    labels : ["dolar amerykański","dolar australijski","dolar kanadyjski","euro","forint(Węgry)","frank szwajcarski","funt szterling","jen (Japonia)","korona czeska","korona duńska","korona norweska","korona szwedzka","SDR (MFW)"],
    datasets : [

        {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,0.8)",
            highlightFill : "rgba(151,187,205,0.75)",
            highlightStroke : "rgba(151,187,205,1)",
            data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        }
    ]

};
window.onload = function(){
        var ctx = document.getElementById("canvas").getContext("2d");
        window.myBar = new Chart(ctx).Bar(barChartData, {
            responsive : true
        });
    };



function actualizeTableData (selectedOption, container){

    $.ajax({

        type: "GET",

        url: "xml/2016_01_19.xml",

        dataType: "xml",

        success: function (xml) {

            $(xml).find('pozycja').eq(selectedOption).each(function () {

                var nazwaWaluty = $(this).find('nazwa_waluty').text();
                var przelicznik = $(this).find('przelicznik').text();
                var kodWaluty = $(this).find('kod_waluty').text();
                var kursKupna = $(this).find('kurs_kupna').text();
                var kursSprzedazy = $(this).find('kurs_sprzedazy').text();
                var newCurrency ='<tr class="edit-tr"><td>'+nazwaWaluty + '</td>'+ '<td>'+ kodWaluty+'</td>'+'<td>'+kursKupna+'</td>'+'<td>'+kursSprzedazy+'</td></tr>';
                $('.table .edit-tr ', container).replaceWith(newCurrency);
            });
        }
    });
}