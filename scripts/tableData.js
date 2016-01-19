/**
 * Created by lukaszk on 19.01.16.
 */

function pobierzDaneJson(){


    $.ajax({
        url: 'http://www.nbp.pl/kursy/xml/c011z160119.xml',
        dataType:'xml',
        success:function(response){
            var kontener = $('#posty');
            response.forEach(function(post){
                var kodWaluty = $(this).find('kod_waluty').text();
                kontener.html('<p>'+kodWaluty+'</p>')
            });
        }
    });
};




//
//$(document).ready(function(){
////the variable to be appended here
//    $("#Autom").append("<ul></ul>");
//});
//$.ajax({
//    type: "GET",
//    url: "cars.xml",
//    dataType: "xml",
//    success: function(xml) {
//    }
//    $(xml).find('car').each(function(){
//        var Titles = $(this).find('Title').text();
//        var Manufacturers = $(this).find('Manufacturer').text();
//        $("<li></li>").html(Titles + "-" + Manufacturers).appendTo("#Autom ul");
//    });
//error: function() {
//    alert("The XML File could not be processed correctly.");
//}
//});