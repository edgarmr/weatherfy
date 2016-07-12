$(document).ready(function(){
    $("#saveLoc").on('click',function(){
       $("#lista").append("<li> "+$("#localidad").val()+" </li>");
        
    });
});