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
    //  console.log(cityInput)
  
     // console.log('alert')
        
    })

        
     if (! cities) {

        cities = [];
      
       
        

        console.log(cities)
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
     console.log(cities)
     // starting point
     function searchWeather ( city ){

        addNewCity(city);      
        fetchWeather(city);
                  
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
          console.log(queryURL);
  
          // Log the resulting object
        //  console.log(response.coord);

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
  
       console.log(cityData)
    
     }
  

     function fetchUV(coords){

        console.log(coords)
        var lattitude = coords.lat;
        console.log(lattitude);
        var longitude = coords.lon;
        console.log(longitude)



        var queryParams =$.param({
          
           lon: coords.lon,
           lat: coords.lat,
           appid: "7bb104f282f38f6d6a105af6428f8f9f"
        });
 
    

      // Here we are building the URL we need to query the database

      var queryURL = 'https://api.openweathermap.org/data/2.5/uvi?' + queryParams
      console.log(queryURL)

 /*      var queryURLUV = 'http://api.openweathermap.org/data/2.5/uvi?appid='+ appid
      +'&lat='+ lat 
      +'&lon='+ lon
        console.log(queryURL)
 */

    
      // Here we run our AJAX call to the OpenWeatherMap API
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
  
          // Log the queryURL
        
  
          // Log the resulting object
          console.log(response.value);

          displayUVData(response.value)
          

           // fetchUV(response.coord)

        });

    };

    function displayUVData( cityData){
        console.log(cityData)
        $(".uv").html( ' UV Score: ' + cityData);



    }
    
    

    function fetchForecast(city){

    }

    function displayForecast( cityData){

    }

    function addNewCity(city){

        console.log('Add new city')

        if(cities.indexOf(city) === -1 ){
            console.log('AddNewCity');

            cities.push(city);

            console.log(cities);
            console.log(cacheKey)

            localStorage.setItem(cacheKey, JSON.stringify(cities))

        }

    }

    




 // Get my starting data, try to load from local storage

// display the city's <datalist

//if you put :  &units=imperial in the query url the units will be in imperial units and you won't have to run a kelvin to imperial calculation


   /*        // Transfer content to HTML
          $(".city").html("<h1>" + response.name + " Weather Details</h1>");
          $(".wind").text("Wind Speed: " + response.wind.speed);
          $(".humidity").text("Humidity: " + response.main.humidity);
          
          // Convert the temp to fahrenheit
          var tempF = (response.main.temp - 273.15) * 1.80 + 32;
  
          // add temp content to html
          $(".temp").text("Temperature (K) " + response.main.temp);
          $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
  
          // Log the data in the console as well
          console.log("Wind Speed: " + response.wind.speed);
          console.log("Humidity: " + response.main.humidity);
          console.log("Temperature (F): " + tempF); */

        });