var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var dias = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
var f = new Date();

$(document).ready(function(){
     //Acciona el mismo evento para el boton de busqueda y guardado.
     $("#search, #saveLocation").on('click',function(e){
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
                    var date = dias[f.getDay()]+', '+f.getDate()+' de '+meses[f.getMonth()]+' del '+f.getFullYear();
                    $("#titulop").html(name);
                    $("#iconop").html(photo);
                    $("#tempep").html(temp);
                    $("#descp").html(description);
                    $("#tempMaxp").html(tempMax);
                    $("#tempMinp").html(tempMin);
                    $("#vientop").html(wind);
                    $("#humedadp").html(humidity);
                    $("#fechap").html(date);
                    
                    //Si el vento corresponde al boton "SaveLocation genera el elemento en la lista y guada su información en //localStorage."
                    if(e.target.id=="saveLocation"){
                        var count = parseInt($("#lista li").size());
                        count++;
                        $("#lista").append("<li id='item"+count+"'>"
                                              +"<a class='button button-round item'>"
                                                +location
                                              +"</a>" 
                                          +"</li>");
                        localStorage.setItem(location+"Name",name.toString());
                        localStorage.setItem(location+"Photo",photo.toString());
                        localStorage.setItem(location+"Description",description.toString());
                        localStorage.setItem(location+"Temp",temp.toString());
                        localStorage.setItem(location+"TempMax",tempMax.toString());
                        localStorage.setItem(location+"TempMin",tempMin.toString());
                        localStorage.setItem(location+"Wind",wind.toString());
                        localStorage.setItem(location+"Humidity",humidity.toString());
                        localStorage.setItem(location+"Date",date.toString());
                    }
            }).fail(function(){
                alert("No hay conexión a internet");
            });
            //Obtenemos el clima de los siguientes 5 dias.
            $.get('http://api.openweathermap.org/data/2.5/forecast?q='+location+'&APPID=914732d37fb626966c5bf9cf647e3342',
                  function(forecast){
                    var inc=0;
                    for(var i=1; i<=5; i++){
                        var ftmin = forecast.list[1+inc].main.temp_min;
                        var ftmax = forecast.list[1+inc].main.temp_max;
                        var desc = forecast.list[1+inc].weather[0].description;
                        var icon1 = "<img src='http://openweathermap.org/img/w/"+forecast.list[1+inc].weather[0].icon+".png'>";
                        var wind = forecast.list[1+inc].wind.speed;
                        var date = (f.getDate()+i)+' de '+meses[f.getMonth()]+' del '+f.getFullYear();
                        inc+=8;
                        $("#dia"+i).html(dias[f.getDay()+i]);
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
    //Agrega el evento a todos los elementos de la lista y muestra su informacion dependiendo de la ciudad, mediante localStorage.
    $(document).on('click','.item',function(){
        var loc = $(this).html().toString();
        $("#titulop").html(localStorage.getItem(loc+"Name"));
        $("#iconop").html(localStorage.getItem(loc+"Photo"));
        $("#tempep").html(localStorage.getItem(loc+"Description"));
        $("#descp").html(localStorage.getItem(loc+"Temp"));
        $("#tempMaxp").html(localStorage.getItem(loc+"TempMax"));
        $("#tempMinp").html(localStorage.getItem(loc+"TempMin"));
        $("#vientop").html(localStorage.getItem(loc+"Wind"));
        $("#humedadp").html(localStorage.getItem(loc+"Humidity"));
        $("#fechap").html(localStorage.getItem(loc+"Date"));
    });
});


                  
                  
    
                  