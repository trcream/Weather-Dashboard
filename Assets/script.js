$(document).ready(function(){
    
    var cacheKey = 'KnownCities'
    var cities = JSON.parse(localStorage.getItem(cacheKey));
    var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
     

    var searchButton = $('#searchBtn')
 

    searchButton.on('click',function(){
     
      var searchCity = $('.input').val();
      searchWeather(searchCity);
      displayUVData();
     


      
     // var cityInput= $('#cityInput').val();
  
        
    })

        
     if (! cities) {

        cities = [];
      
       
        

        
     }

     else{
    
      renderHistory(cities);

     }




     function renderHistory(cities){

      for (var i = 0; i < cities.length;i++ ){

        newDiv = $('<div>')
        newDiv.text(cities[i])
        $('#History').append(newDiv)
       // $('#History').append(cities[i]);
        console.log(cities[i])
   

      }

     }
  
     // starting point
     function searchWeather ( city ){

        addNewCity(city);      
        fetchWeather(city);
        fetchForecast(city);   
                  
      }


    // get weather data from the API
     function fetchWeather(city){

        var queryParams =$.param({
            q:city,
            appid: "7bb104f282f38f6d6a105af6428f8f9f"

        });

      // Here we are building the URL we need to query the database

      var queryURL = 'https://api.openweathermap.org/data/2.5/weather?' + queryParams




    
      // Here we run our AJAX call to the OpenWeatherMap API
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
  
          // Log the queryURL
       
  
          // Log the resulting object
     

            fetchUV(response.coord);
            displayWeather(response);
            var cityData = response


        });

     }

     function displayWeather(cityData){

       // $(".city").html("<h1>" + response.name + " Weather Details</h1>");

       var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

       $(".cityName").text('Weather for: ' + cityData.name ); 
       $(".date").text('Date: '+ currentDate);
       $(".temp").text('Temperature: ' + cityData.main.temp);
       $(".humidity").text('Humidity: ' + cityData.main.humidity);
  
    
    
     }
  

     function fetchUV(coords){

      
        var lattitude = coords.lat;
      
        var longitude = coords.lon;
  



        var queryParams =$.param({
          
           lon: coords.lon,
           lat: coords.lat,
           appid: "7bb104f282f38f6d6a105af6428f8f9f"
        });
 
    

      // Here we are building the URL we need to query the database

      var queryURL = 'https://api.openweathermap.org/data/2.5/uvi?' + queryParams
     

    
      // Here we run our AJAX call to the OpenWeatherMap API
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
  
          // Log the queryURL
        


          displayUVData(response.value)
          

           // fetchUV(response.coord)

        });

    };

    function displayUVData( cityData){
  
        $(".uv").html( ' UV Score: ' + cityData);



    }
    
   

    function fetchForecast(city){

  
      var queryParams =$.param({
                q:city,
        appid: "7bb104f282f38f6d6a105af6428f8f9f"
      });

  

    // Here we are building the URL we need to query the database

    var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?' + queryParams
    console.log(queryURL)
  
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {

        console.log(queryURL)
      
        displayForecast(response);

      
        

      

      });
    }

    function displayForecast( response){
      console.log('Trenton');
      console.log(response)

    }

    function addNewCity(city){

        console.log('Add new city')

        if(cities.indexOf(city) === -1 ){
            console.log('AddNewCity');

            cities.push(city);

            console.log(cities);
            console.log(cacheKey);

            localStorage.setItem(cacheKey, JSON.stringify(cities))

        }

    }

    

        });