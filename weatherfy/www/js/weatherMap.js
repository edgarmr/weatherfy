$(document).ready(function(){
     $("#search").on('click',function(){
        var location=$("#localidad").val();
        if(location!=""){
            //Obtenemos los datos relevantes del clima del día actual.
            $.get('http://api.openweathermap.org/data/2.5/weather?q='+location+'&APPID=914732d37fb626966c5bf9cf647e3342').done(
                function(wtherObject){
                    var name= wtherObject.name;
                    var photo="<img src='http://openweathermap.org/img/w/"+wtherObject.weather[0].icon+".png' width='50%'>";
                    var description = wtherObject.weather[0].description;
                    var temp = wtherObject.main.temp;
                    var tempMax = wtherObject.main.temp_max;
                    var tempMin = wtherObject.main.temp_min;
                    var wind = wtherObject.wind.speed;
                    var humidity = wtherObject.main.humidity;
                    $("#swiper1 #tarjetap .card-header h1").html(name);
                    $("#swiper1 #tarjetap .icono").html(photo);
                    $("#swiper1 #tarjetap .temp").html(temp);
                    $("#swiper1 #tarjetap .desc").html(description);
                    $("#swiper1 #tarjetap .tmax p").html(tempMax);
                    $("#swiper1 #tarjetap .tmin p").html(tempMin);
                    $("#swiper1 #tarjetap .viento p").html(wind);
                    $("#swiper1 #tarjetap .humedad p").html(humidity);
            }).fail(function(){
                alert("No hay conexión a internet");
            });   
            
            $.get('http://api.openweathermap.org/data/2.5/forecast?q='+location+'&APPID=914732d37fb626966c5bf9cf647e3342',
                  function(forecast){
                    /**var ftmin = forecast.list[1+8].main.temp_min;
                    var ftmax = forecast.list[1+8].main.temp_max;
                    var desc = forecast.list[1+8].weather[0].description;
                    var icon1 = forecast.list[1+8].weather[0].icon+'.png';
                    var wind = forecast.list[1+8].wind.speed;
                    var date = forecast.list[1+8].dt_txt;*/
                    var inc=0;
                    var cad='';
                    for(var i=1; i<=5; i++){
                        var ftmin = forecast.list[1+inc].main.temp_min;
                        var ftmax = forecast.list[1+inc].main.temp_max;
                        var desc = forecast.list[1+inc].weather[0].description;
                        var icon1 = "<img src='http://openweathermap.org/img/w/"+forecast.list[1+inc].weather[0].icon+".png'>";
                        var wind = forecast.list[1+inc].wind.speed;
                        var date = forecast.list[1+inc].dt_txt;
                        inc+=8;
                        cad+=ftmin+' '+ftmax+' '+desc+' '+icon1+' '+wind+' '+date+'<br>';
                        $("#swiper2 #tarjeta"+i+" .icono").html(icon1);
                        $("#swiper2 #tarjeta"+i+" .desc").html(desc);
                        $("#swiper2 #tarjeta"+i+" .tmax p").html(ftmax);
                        $("#swiper2 #tarjeta"+i+" .tmin p").html(ftmin);
                        $("#swiper2 #tarjeta"+i+" .viento p").html(wind);
                        $("#swiper2 #tarjeta"+i+" .fecha p").html(date);
                    }
                });
        }
        else{
            alert('Inserte una localidad');
        }
        
        
     });
});
                  
                  
    
                  