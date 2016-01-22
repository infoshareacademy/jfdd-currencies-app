$(document).ready(function () {

    var tableData;
    var wykresRoznic;



});
//1. Ściągnąć dane
//2. Przeliczyć dane - wyliczyć różnicę
//3.Wyrysować wykres


var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

var barChartData = {
    labels : ["Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota","Niedziela"],
    datasets : [
        {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data : [0.33, 0.70, 1.2, 0.76, 0.9, 2.0, 2.4]
        },

    ]

}
window.onload = function(){
        var ctx = document.getElementById("canvas").getContext("2d");
        window.myBar = new Chart(ctx).Bar(barChartData, {
            responsive : true
        });
    }

