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
