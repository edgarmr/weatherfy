var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var dias = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
var f = new Date();

$(document).ready(function(){
    
     for(var k=1; k<=localStorage.length; k++){
         var id = k.toString();
         var liSaved = localStorage.getItem(id);
             liSaved = JSON.parse(liSaved);
         $("#lista").append(liSaved.item);
         
     }
     //Acciona el mismo evento para el boton de busqueda y guardado.
     $("#search, #saveLocation").on('click',function(e){
        var location=$("#localidad").val();
        if(location!=""){
            //Obtenemos los datos relevantes del clima del día actual.
            $.get('http://api.openweathermap.org/data/2.5/weather?q='+location+'&APPID=914732d37fb626966c5bf9cf647e3342').done(
                function(wtherObject){
                    var name= wtherObject.name;
                    var photo="<img src='http://openweathermap.org/img/w/"+wtherObject.weather[0].icon+".png'>";
                    var description = wtherObject.weather[0].description;
                    var temp = (parseInt(wtherObject.main.temp)-273);
                    var tempMax = (parseInt(wtherObject.main.temp_max)-273);
                    var tempMin = (parseInt(wtherObject.main.temp_min)-273);
                    var wind = wtherObject.wind.speed;
                    var humidity = wtherObject.main.humidity;
                    var date = dias[f.getDay()]+', '+f.getDate()+' de '+meses[f.getMonth()]+' del '+f.getFullYear();
                    $("#titulop").html(name);
                    $("#iconop").html(photo);
                    $("#tempep").html(temp+'<sup>°</sup>');
                    $("#descp").html(description);
                    $("#tempMaxp").html(tempMax+'<sup>°</sup>');
                    $("#tempMinp").html(tempMin+'<sup>°</sup>');
                    $("#vientop").html(wind);
                    $("#humedadp").html(humidity);
                    $("#fechap").html(date);
                    
                    //Si el vento corresponde al boton "SaveLocation genera el elemento en la lista y guada su información en //localStorage."
                    if(e.target.id=="saveLocation"){
                        var count = parseInt($("#lista li").size());
                        count++;
                        var newItem = "<li id='"+count+"' class='item'>"
                                         +"<a class='button button-round'>"
                                            +location
                                         +"</a>" 
                                     +"</li>";
                        
                        $("#lista").append(newItem);
                        
                        var locacionJson = {
                            item: newItem.toString(),
                            name: name.toString(),
                            photo: photo.toString(),
                            description: description.toString(),
                            temp: temp.toString(),
                            tempMax: tempMax.toString(),
                            tempMin: tempMin.toString(),
                            wind: wind.toString(),
                            humidity: humidity.toString(),
                            date: date.toString()
                        }
                        
                        var locationString = JSON.stringify(locacionJson);
                        var key = count.toString();
                        localStorage.setItem(key,locationString);
                        
                    }
            }).fail(function(){
                alert("No hay conexión a internet");
            });
            //Obtenemos el clima de los siguientes 5 dias.
            $.get('http://api.openweathermap.org/data/2.5/forecast?q='+location+'&APPID=914732d37fb626966c5bf9cf647e3342',
                  function(forecast){
                    var inc=0;
                    for(var i=1; i<=5; i++){
                        var ftmin = (parseInt(forecast.list[1+inc].main.temp_min)-273);
                        var ftmax = (parseInt(forecast.list[1+inc].main.temp_max)-273);
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
        var key = $(this).attr("id").toString();
        var locacionGuardada = localStorage.getItem(key);
        
        locacionGuardada = JSON.parse(locacionGuardada);
        $("#titulop").html(locacionGuardada.name);
        $("#iconop").html(locacionGuardada.photo);
        $("#tempep").html(locacionGuardada.description);
        $("#descp").html(locacionGuardada.temp);
        $("#tempMaxp").html(locacionGuardada.tempMax);
        $("#tempMinp").html(locacionGuardada.tempMin);
        $("#vientop").html(locacionGuardada.wind);
        $("#humedadp").html(locacionGuardada.humidity);
        $("#fechap").html(locacionGuardada.date);
    });
});                  