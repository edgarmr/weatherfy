$(document).ready(function(){
    $("#search").on('click',function(){
        var location=$("#localidad").val();
        if(location!=""){
            //Obtenemos los datos relevantes del clima del día actual.
            $.get('http://api.openweathermap.org/data/2.5/weather?q='+location+'&APPID=914732d37fb626966c5bf9cf647e3342',
                  function(wtherObject){
                    var name= wtherObject.name;
                    var photo="<img src='http://openweathermap.org/img/w/"+wtherObject.weather[0].icon+".png' width='50%'>";
                    var description = wtherObject.weather[0].description;
                    var temp = wtherObject.main.temp;
                    var tempMax = wtherObject.main.temp_max;
                    var tempMin = wtherObject.main.temp_min;
                    var wind = wtherObject.wind.speed;
                    var humidity = wtherObject.main.humidity;
                    //$("#swiper1").html("Nombre: "+name+" Foto: "+photo+" description: "+description+" temperatura: "+temp+" teperatura máxima: "+tempMax+" temperatura miníma: "+tempMin+" viento: "+wind+" humedad: "+humidity);
                    $("#swiper1 .tarjeta .titulo h1").html(name);
                    $("#swiper1 .tarjeta .icono").html(photo);
                    $("#swiper1 .tarjeta .temp").html(temp);
                    $("#swiper1 .tarjeta .desc").html(description);
                    $("#swiper1 .tarjeta .tmax p").html(tempMax);
                    $("#swiper1 .tarjeta .tmin p").html(tempMin);
                    $("#swiper1 .tarjeta .viento p").html(wind);
                    $("#swiper1 .tarjeta .humedad p").html(humidity);
                }); 
        }else{
            alert('Inserte una localidad');
        }
    });
});