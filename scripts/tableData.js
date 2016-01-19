/**
 * Created by lukaszk on 19.01.16.
 */

$(document).ready(function(){
//the variable to be appended here
    $("#Autom").append("<ul></ul>");
});
$.ajax({
    type: "GET",
    url: "cars.xml",
    dataType: "xml",
    success: function(xml) {
    }
    $(xml).find('car').each(function(){
        var Titles = $(this).find('Title').text();
        var Manufacturers = $(this).find('Manufacturer').text();
        $("<li></li>").html(Titles + "-" + Manufacturers).appendTo("#Autom ul");
    });

})