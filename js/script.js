
var script = '<script src="https://maps.googleapis.com/maps/api/js?key='+ key +'&callback=initMap&libraries=places&v=weekly" async defer></script>';
$(document).ready(function(){
  $('body').append(script);
});

var vehicles = [

      {
        id : 101 ,
        name : 'Nissan Leaf',
        type : 'Large car',
        year : '2016',
        minPeople : 1,
        maxpeople : 5,
        minDay : 3,
        maxDay : 10,
        cost : 144,
        fuel : 9.7,
        photo : 'car1.png'
      },

      {
        id : 102 ,
        name : 'Toyota Yarris',
        type : 'Large car',
        year : '2016',
        minPeople : 1,
        maxpeople : 5,
        minDay : 3,
        maxDay : 10,
        cost : 144,
        fuel : 9.7,
        photo : 'car2.png'
      },

    {
      id : 103 ,
      name : 'Toyota Corolla',
      type : 'Small car',
      year : '2016',
      minPeople : 1,
      maxpeople : 2,
      minDay : 1,
      maxDay : 10,
      cost : 129,
      fuel : 8.5,
      photo : 'car3.png'
    },

    {
      id : 104 ,
      name : 'Toyota Hiace',
      type : 'Motorhome',
      year : '2010',
      minPeople : 2,
      maxpeople : 6,
      minDay : 2,
      maxDay : 15,
      cost : 200,
      fuel : 17,
      photo : 'van1.png'
    },

    {
      id : 105 ,
      name : 'Toyota Estima',
      type : 'Motorhome',
      year : '2018',
      minPeople : 2,
      maxpeople : 6,
      minDay : 2,
      maxDay : 15,
      cost : 200,
      fuel : 17,
      photo : 'van2.png'
    },

    {
      id : 106 ,
      name : 'Mazda Bongo',
      type : 'Motorhome',
      year : '2001',
      minPeople : 2,
      maxpeople : 6,
      minDay : 2,
      maxDay : 15,
      cost : 200,
      fuel : 17,
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
      fuel : 3.7,
      photo : 'bike1.png'
    },

    {
      id : 108 ,
      name : 'Scomadi TL50',
      type : 'Scooter',
      year : '2017',
      minPeople : 1,
      maxpeople : 1,
      minDay : 1,
      maxDay : 5,
      cost : 109,
      fuel : 3.7,
      photo : 'bike2.png'
    },

    {
      id : 109 ,
      name : 'Scomadi Turismo Leggera',
      type : 'Scooter',
      year : '2017',
      minPeople : 1,
      maxpeople : 1,
      minDay : 1,
      maxDay : 5,
      cost : 109,
      fuel : 3.7,
      photo : 'bike2.2.png'
    },

];


// var days, totalCost;


function initMap() {

  // receive input
  var people;
  $('#people').change(function(){

    people = parseInt($(this).val());
    console.log('people', people);
  });


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



  function dateDiff(){
  var start = $(startDate).datepicker('getDate');
  var end = $(endDate).datepicker('getDate');

  days = (end-start)/1000/60/60/24; //to get human readable days
    return (days);

  }


    //directions distance and duration
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();


    //callilng map from directions
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: { lat: 41, lng: 300 },
      mapTypeId : 'roadmap'

    });//map

       directionsRenderer.setMap(map);


    document.getElementById("submit").addEventListener("click", () => {


      // var cardImages;
      // $('#cardImages');
      var days = dateDiff();
      console.log('days', days);
      var cardImages = [];
      for (i = 0; i < vehicles.length; i++) {
        if (((days <= vehicles[i].maxDay) && (days >= vehicles[i].minDay)) && ((people >= vehicles[i].minPeople) && (people <= vehicles[i].maxpeople ))) {
          cardImages.push(vehicles[i].photo);


          calculateAndDisplayRoute(directionsService, directionsRenderer, days, i );


        }
      }


    });



  }//initMap







  function calculateAndDisplayRoute(directionsService, directionsRenderer, d, k) {

    var totalCost =[];
    directionsService.route(
      {
        origin: document.getElementById("start").value,
        destination: document.getElementById("end").value,
        // waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          const route = response.routes[0];
          const summaryPanel = document.getElementById("directions-panel");

          summaryPanel.innerHTML = "";
          var total;
           var grandTotal = 0;
           var grandTotal = 0;
           var rentalCost = d * vehicles[k].cost;

          // For each route, display summary information.
          for (let i = 0; i < route.legs.length; i++) {
            const routeSegment = i + 1;
            summaryPanel.innerHTML +=
              "<b>Route Segment: " + routeSegment + "</b><br>";
            summaryPanel.innerHTML += route.legs[i].start_address + " to ";
            summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
            summaryPanel.innerHTML +=
              route.legs[i].distance.text + " and it takes " + route.legs[i].duration.text + " to reach."+ "<br><br>";
              console.log(parseInt(route.legs[i].distance.text));
              total[i] = parseInt(route.legs[i].distance.text) / 100 * 2 * vehicles[k].fuel ;
             console.log('rentalCost', rentalCost);

             var cost = total + rentalCost;
             console.log('total', total);
             console.log('cost', cost);
             totalCost.push(cost);
             console.log('totalCost', totalCost);




           displayCards(k);
           cardModal(k,cost);

           function displayCards(j){
             $('#result').append( '<div class="col-xs-12 col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mx-auto">' +
                                     '<div class="card p-1 hover-rise mr-2 mx-auto border-0 text-secondary" style="width: 18rem;">' +
                                        '<img src="images/' + vehicles[j].photo + '" class="card-img-top" alt="' + vehicles[j].type + '">' +
                                        '<div class="card-body bg-transparent m-3>' +
                                         '<h3 class="card-title">'+ vehicles[j].year + '</h3>' +
                                         '<p class="card-text text-button "> ' + ' ' + '<span class="text-button mt-2">' + vehicles[j].name+ '</span> <br></p>' +
                                         '<p class="card-text text-button> : ' + ' ' + '<span class="text-button">' +"$"+ vehicles[j].cost + " per day" +  '</span> <br></p>' +

                                         '<button id="' + vehicles[j].id + '" type="button" class="btn text-success moreDetails" data-toggle="modal" data-target="#exampleModal">select  </button>' +
                                       '</div>' +
                                     '</div>' +
                                 '</div>'
                             ); //append ends here

           }


            // Modal
           function cardModal(j, amount){
             console.log('j',j);
             console.log('amount', amount);
             $('.moreDetails').click(function() {

               $('#exampleModal').text(' '); //clearing the content
                 $('#exampleModal').html(

           '      <div class="modal-dialog  border-0 ">'+
           '        <div class="modal-content border-0 ">'+

           '          <div class="modal-header border-0">' +
           '            <h5 class="modal-title text-dark " id="exampleModalLabel"></h5>' +
           '            <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
           '              <span aria-hidden="true">&times;</span>' +
           '            </button>' +
           '          </div>'+


           '              <h2 class="text-info">5. Almost there!</h2>' +
           '           <div id="modalBody" class="modal-body  m-2">' + '<p>' + 'your rental details are as follows: '+'</p>'+
                      '<h4 class= "text-secondary">' + 'vehicle name: ' + vehicles[j].name + '<br>' + 'Total cost amount: ' + ' NZ $ ' + amount + '</h4>' +
           '           <p>First, please enter your license details</p>' +
           '               <input type="text" name="username" placeholder="License number" required class="form-control mb-1 ">' +
           '               <input type="text" name="username" placeholder="License expiry" required class="form-control "> </div>' +



           '                   <p class="ml-2">Second, please enter your payment details</p>' +
           '               </div>'+

           '                       <div class="tab-content border-0 p-2 bg-white">' +
           '                               <form class="">' +
           '                                   <div class="form-group"> <label for="username">' +
           '                                         <p>Card owner</p>' +
           '                                       </label> <input type="text" name="username" placeholder="Card Owner Name" required class="form-control "> </div>' +
           '                                   <div class="form-group"> <label for="cardNumber">' +
           '                                         <p>Card number</p>' +
           '                                       </label>' +
           '                                       <div class="input-group"> <input type="text" name="cardNumber" placeholder="Valid card number" class="form-control " required>' +
           '                                         <div class="input-group-append"> <span class="input-group-text text-muted"> <i class="fab fa-cc-visa mx-1"></i> <i class="fab fa-cc-mastercard mx-1"></i> <i class="fab fa-cc-amex mx-1"></i> </span> </div>' +
           '                                       </div>' +
           '                                   </div>' +
           '                                   <div class="row">' +
           '                                       <div class="col-sm-8">' +
           '                                           <div class="form-group"> <label><span class="hidden-xs">' +
           '                                                     <p>Expiration date</p>' +
           '                                                   </span></label>' +
           '                                               <div class="input-group"> <input type="number" placeholder="MM" class="form-control" required> <input type="number" placeholder="YY" name="" class="form-control" required>' +
           '                                               </div>' +
           '                                           </div>' +
           '                                       </div>'  +
           '                                       <div class="col-sm-4">' +
           '                                           <div class="form-group mb-4"> <label data-toggle="tooltip" title="Three digit CV code on the back of your card">'+
           '                                               <h6 class="text-secondary">CVV <i class="fa fa-question-circle d-inline"></i></h6>'+
           '                                             </label> <input type="text" required class="form-control">'+
           '                                           </div>'+
           '                                       </div>'+
           '                                   </div>'+
           '                                 <div class="card-footer"> <button type="button" class=" btn btn-success text-white btn-block"> Confirm Payment </button>'+
           '                               </form>'+
           '                               </div>'+
           '            </div>' );



             }); // end of moreDetails click event
           } //cardModal

         }

        } else {
          window.alert("Directions request failed due to " + status);
        }
      }

    );

  }




//filter
function filterVehicles(dayys){
  console.log(dayys, people);
  var cardImages = [];
  for (i = 0; i < vehicles.length; i++) {
      console.log(vehicles[i].maxDay, vehicles[i].minDay, vehicles[i].minPeople, vehicles[i].maxpeople);
    if (((dayys <= vehicles[i].maxDay) && (dayys >= vehicles[i].minDay)) && ((people >= vehicles[i].minPeople) && (people <= vehicles[i].maxpeople ))) {
      console.log(vehicles[i].name);
      cardImages.push(vehicles[i].photo);
      console.log(cardImages);

      displayCards(i);
      cardModal(i);

    }
  }

}
// ==========================================================
// Display cards
// ==========================================================
