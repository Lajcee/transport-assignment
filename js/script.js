console.log(key);
// var script='<script src="https://maps.googleapis.com/maps/api/js?key='+ key +'&callback=initMap&libraries=places&v=weekly" async defer></script>';
var script = '<script src="https://maps.googleapis.com/maps/api/js?key='+ key +'&callback=initMap&libraries=places&v=weekly" async defer></script>';
console.log(script);

$(document).ready(function(){
  $('body').append(script);
});


var days;
function initMap() {
  // date calculation
  $('#startDate').datepicker({
    dateFormat : 'yy-mm-dd',
    changeMonth : true,
    minDate :new Date(),
    maxDate : '+1y',
    onSelect : function(date){
      var selectDate = new Date(date);
      var msecInADay  = 86400000;
      var stDate = new Date(selectDate.getTime() + msecInADay);

      $('#endDate').datepicker('option', 'minDate', stDate);
      var enDate = new Date(selectDate.getTime() + 10 * msecInADay);

      $('#endDate').datepicker('option', 'maxDate', enDate);

    }

  });

  $('#endDate').datepicker({
    dateFormat : 'yy-mm-dd',
    changeMonth : true
  });

  $('#calculateDays').click(function(){
    dateDiff();
  });

  function dateDiff(){
  var start = $(startDate).datepicker('getDate');
  var end = $(endDate).datepicker('getDate');

    days = (end-start)/1000/60/60/24; //to get human readable days
  $('#days').val(days);

  }







  //////////////////////////////////////////////////////////////////////////
      //from autocomplete
      var start = new google.maps.places.Autocomplete(
           document.getElementById("start"),
           {
             types: ["(cities)"]

           }
         );//autocomplete start_address

      var end = new google.maps.places.Autocomplete(
           document.getElementById("end"),
           {
             types: ["(cities)"]

           }
         );//autocomplete end_address
  //////////////////////////////////////////////////////////////////////////

  //directions distance and duration
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();


  //callilng map from directions
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: { lat: 41.85, lng: -87.65 },
    mapTypeId : 'satellite'

  });//map

     directionsRenderer.setMap(map);


  document.getElementById("submit").addEventListener("click", () => {
    // calculateAndDisplayRoute(directionsService, directionsRenderer);
    console.log(days);
    filterVehicles(days);
  });
  }


  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const waypts = [];
  const checkboxArray = document.getElementById("waypoints");

  for (let i = 0; i < checkboxArray.length; i++) {
    if (checkboxArray.options[i].selected) {
      waypts.push({
        location: checkboxArray[i].value,
        stopover: true,
      });
    }
  }

  directionsService.route(
    {
      origin: document.getElementById("start").value,
      destination: document.getElementById("end").value,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        console.log(response);
        directionsRenderer.setDirections(response);
        const route = response.routes[0];
        const summaryPanel = document.getElementById("directions-panel");

        summaryPanel.innerHTML = "";

        // For each route, display summary information.
        for (let i = 0; i < route.legs.length; i++) {
          const routeSegment = i + 1;
          summaryPanel.innerHTML +=
            "<b>Route Segment: " + routeSegment + "</b><br>";
          summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
          summaryPanel.innerHTML +=
            route.legs[i].distance.text + " and it takes " + route.legs[i].duration.text + " to reach."+ "<br><br>";
        }

      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}//initMap

//
// $(document).ready(function(){
//   $('body').append(script);

// ==========================================================
// Declaration of an array of objects
// ==========================================================
//
// function vehicleFuc(obj){
//     var travelDistance = parseInt($('.mapbox-directions-route-summary')["0"].childNodes[1].outerText);
//     var numbers = $('.totalDays')["0"].innerHTML;
//     var day = parseInt(numbers.match(/\d+/g).map(Number)["0"]);
//     var rentalCost = day * obj.price;
//     var distanceCost = travelDistance * (obj.fuel / 100);
//     var total = rentalCost + distanceCost;
//     var totalTo = total.toFixed(2);
//         $('.vehicle').text(obj.name);
//         $('photo').attr('src', obj.image);
//         $('.cost').text('Rental Cost A Day: ' + '$ ' + obj.price);
//         $('.km').text('Travel Distance: ' + travelDistance +' fuel');
//         $('.fuelCost').text('Fuel Cost: ' + '$ ' + obj.fuel + ' / 100 km' );
//         $('.totalCost').text('Total: '+ '$ '+ totalTo + ' NZD' );
//         $('.reference').text('#';
// }


var vehicles = [

      {
        id : 101 ,
        name : 'Nissan Leaf',
        type : 'Large car',
        trans: 'Automatic',
        year : '2016',
        doors : 5,
        seats : 5,
        minPeople : 1,
        maxpeople : 5,
        minDay : 3,
        maxDay : 10,
        cost : 144,
        fuel : '100km',
        photo : 'car1.png'
      },

      {
        id : 102 ,
        name : 'Toyota Yarris',
        type : 'Large car',
        trans: 'Automatic',
        year : '2016',
        doors : 5,
        seats : 5,
        minPeople : 1,
        maxpeople : 5,
        minDay : 3,
        maxDay : 10,
        cost : 144,
        fuel : '9.7l/100km',
        photo : 'car2.png'
      },

    {
      id : 103 ,
      name : 'Toyota Corolla',
      type : 'Small car',
      trans: 'Automatic',
      year : '2016',
      doors : 4,
      seats : 5,
      minPeople : 1,
      maxpeople : 2,
      minDay : 1,
      maxDay : 10,
      cost : 129,
      fuel : '8.5l/100km',
      photo : 'car3.png'
    },

    {
      id : 104 ,
      name : 'Toyota Hiace',
      type : 'Motorhome',
      trans: 'Automatic',
      year : '2010',
      doors : 5,
      seats : 10,
      minPeople : 2,
      maxpeople : 6,
      minDay : 2,
      maxDay : 15,
      cost : 200,
      fuel : '17l/100k',
      photo : 'van1.png'
    },

    {
      id : 105 ,
      name : 'Toyota Estima',
      type : 'Motorhome',
      trans: 'Automatic',
      year : '2018',
      doors : 4,
      seats : 2,
      minPeople : 2,
      maxpeople : 6,
      minDay : 2,
      maxDay : 15,
      cost : 200,
      fuel : '17l/100k',
      photo : 'van2.png'
    },

    {
      id : 106 ,
      name : 'Mazda Bongo',
      type : 'Motorhome',
      trans: 'Manual',
      year : '2001',
      doors : 4,
      seats : 2,
      minPeople : 2,
      maxpeople : 6,
      minDay : 2,
      maxDay : 15,
      cost : 200,
      fuel : '17l/100k',
      photo : 'van3.png'
    },

    {
      id : 107 ,
      name : 'BMW S 1000 XR',
      type : 'Motorbike',
      year : '2014',
      minPeople : 1,
      maxpeople : 1,
      minDay : 1,
      maxDay : 5,
      cost : 109,
      fuel : '3.7l/100km',
      photo : 'bike1.png'
    },

    {
      id : 108 ,
      name : 'Scomadi TL50 ',
      type : 'Scooter',
      year : '2017',
      minPeople : 1,
      maxpeople : 1,
      minDay : 1,
      maxDay : 5,
      cost : 109,
      fuel : '3.7l/100km',
      photo : 'bike2.png'
    },

    {
      id : 109 ,
      name : 'Scomadi Turismo Leggera ',
      type : 'Scooter',
      year : '2017',
      minPeople : 1,
      maxpeople : 1,
      minDay : 1,
      maxDay : 5,
      cost : 109,
      fuel : '3.7l/100km',
      photo : 'bike3.png'
    },

];

// receive input


var people;
$('#people').change(function(){

  people = parseInt($(this).val());
  console.log(people);
});

//filter
function filterVehicles(dayys){
  console.log(dayys, people);

  for (i = 0; i < vehicles.length; i++) {

    if ((dayys<--) && (dayys>)) && ((dayys <--) && (dayys>))
  }
}




carCarousel(name);
//Carousel

function carCarousel(name){
  var nameArray = [];
  $('#imageCar').text('');
  for (i = 0; i < vehicles.length; i++) {

    if (vehicles[i].name === vehicles) {
      breedArray.push(vehicles[i].photo);
      // console.log(cats[i].description);
      $('#imageVehicles').append('<p class="text-danger lead">' + vehicles[i].name+ vehicles[i].type+
      vehicles[i].year+ vehicles[i].minPeople+ vehicles[i].maxPeople+vehicles[i].minDay+
      vehicles[i].maxDay+ vehicles[i].cost+vehicles[i].fuel+'<p>' );
    } //end of if
  } //end of for




  $('#imageVehicles').append(
    '  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">' +
    '  <ol class="carousel-indicators">' +
    '    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>' +
    '    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>' +
    '    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>' +
    '  </ol>' +
    '  <div class="carousel-inner">' +
    '    <div class="carousel-item active">' +
    '      <img class="d-block w-100" src="images/' + '" alt="First slide">' +
    '    </div>' +
    '    <div class="carousel-item">' +
    '      <img class="d-block w-100" src="images/' +  '"alt="Second slide">' +
    '    </div>' +
    '    <div class="carousel-item">' +
    '      <img class="d-block w-100" src="images/' + '" alt="Third slide">' +
    '    </div>' +
    '  </div>' +
    '  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">' +
    '    <span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
    '    <span class="sr-only">Previous</span>' +
    '  </a>' +
    '  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">' +
    '    <span class="carousel-control-next-icon" aria-hidden="true"></span>' +
    '    <span class="sr-only">Next</span>' +
    '  </a>' +
    '</div>'); //end of imageCar html

} //end of Carousel

// });
