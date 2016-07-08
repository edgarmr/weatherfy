$(document).ready(function(){
    $("#search").on('click',function(){
        var location=$("#localidad").val();
        if(location!=""){
            //Obtenemos los datos relevantes del clima del día actual.
            $.get('http://api.openweathermap.org/data/2.5/weather?q='+location+'&APPID=914732d37fb626966c5bf9cf647e3342').done(
            function(wtherObject){
                    var name= wtherObject.name;
                    var photo="<img src='http://openweathermap.org/img/w/"+wtherObject.weather[0].icon+".png' width='40%'>";
                    var description = wtherObject.weather[0].description;
                    var temp = wtherObject.main.temp;
                    var tempMax = wtherObject.main.temp_max;
                    var tempMin = wtherObject.main.temp_min;
                    var wind = wtherObject.wind.speed;
                    var humidity = wtherObject.main.humidity;
                    $("#swiper1").html("Nombre: "+name+" Foto: "+photo+" description: "+description+" temperatura: "+temp+" teperatura máxima: "+tempMax+" temperatura miníma: "+tempMin+" viento: "+wind+" humedad: "+humidity);
                }).fail(function(){
                    alert("No hay conexión a internet");
                });
        }else{
            alert('Inserte una localidad');
        }
    });
});