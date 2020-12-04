
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


var days, totalCost;
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
      var days = dateDiff();
      var cardImages = [];
      for (i = 0; i < vehicles.length; i++) {
        if (((days <= vehicles[i].maxDay) && (days >= vehicles[i].minDay)) && ((people >= vehicles[i].minPeople) && (people <= vehicles[i].maxpeople ))) {
          cardImages.push(vehicles[i].photo);

          displayCards(i);
          cardModal(i);
          calculateAndDisplayRoute(directionsService, directionsRenderer, days, i );


        }
      }


    });

    function displayCards(j){
      $('#result').append( '<div class="col-xs-12 col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mx-auto">' +
                              '<div class="card p-1 hover-rise mr-2 mx-auto border-0 text-secondary" style="width: 18rem;">' +
                                 '<img src="images/' + vehicles[j].photo + '" class="card-img-top" alt="' + vehicles[j].type + '">' +
                                 '<div class="card-body bg-transparent m-3>' +
                                  '<h3 class="card-title">'+ vehicles[j].year + '</h3>' +
                                  '<p class="card-text text-button "> ' + ' ' + '<span class="text-button mt-2">' + vehicles[j].name+ '</span> <br></p>' +
                                  '<p class="card-text text-button "> ' + ' ' + '<span class="text-button mt-2">' + vehicles[j].fuel+ '</span> <br></p>' +
                                  '<p class="card-text text-button> : ' + ' ' + '<span class="text-button">' +"$"+ vehicles[j].cost + " per day" +  '</span> <br></p>' +

                                  '<button id="' + vehicles[j].id + '" type="button" class="btn text-success moreDetails" data-toggle="modal" data-target="#exampleModal">select  </button>' +
                                '</div>' +
                              '</div>' +
                          '</div>'
                      ); //append ends here

    }


     // Modal
    function cardModal(j){
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



    '              <h2 class="text-light">Almost there!</h2>' +
    '               <div id="modalBody" class="modal-body  ml-2">' + 'your rental details are as follows: '+ vehicles[j].name +
    '              <p>First, please enter your license details</p>' +
    '               <input type="text" name="username" placeholder="License number" required class="form-control mb-1 ">' +
    '               <input type="text" name="username" placeholder="License expiry" required class="form-control "> </div>' +



    '                   <p class="pl-2">Second, please enter your payment details</p>' +
    '                    <ul role="tablist" class="nav bg-white nav-pills  text-dark rounded nav-fill mb-3">' +
    '                       <li class="nav-item"> <a data-toggle="pill" href="#credit-card" class="nav-link active bg-light "> <i class="fas fa-credit-card mr-2"></i> Credit Card </a> </li>' +
    '                       <li class="nav-item"> <a data-toggle="pill" href="#paypal" class="nav-link text-secondary "> <i class="fab fa-paypal mr-2"></i> Paypal </a> </li>' +
    '                       <li class="nav-item"> <a data-toggle="pill" href="#net-banking" class="nav-link text-secondary "> <i class="fas fa-mobile-alt mr-2"></i> Net Banking </a> </li>' +
    '                   </ul>' +
    '               </div> '+

    '                       <div class="tab-content border-0 p-2 bg-white">' +

    '                           <div id="credit-card" class="tab-pane fade show active  ">' +
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
    '                                               <h6>CVV <i class="fa fa-question-circle d-inline"></i></h6>'+
    '                                             </label> <input type="text" required class="form-control">'+
    '                                           </div>'+
    '                                       </div>'+
    '                                   </div>'+
    '                                 <div class="card-footer"> <button type="button" class=" btn btn-success text-white btn-block"> Confirm Payment </button>'+
    '                               </form>'+
    '                               </div>'+
    '                         </div> '+

    '                       <div id="paypal" class="tab-pane fade pt-3">'+
    '                           <h6 class="pb-2">Select your paypal account type</h6>'+
    '                             <div class="form-group "> <label class="radio-inline"> <input type="radio" name="optradio" checked> Domestic </label> <label class="radio-inline"> <input type="radio" name="optradio" class="ml-5">International </label>'+
    '                             </div>'+
    '                             <p> <button type="button" class="btn btn-secondary"><i class="fab fa-paypal mr-2"></i> Log into my Paypal</button> </p>'+
    '                             <p class="text-muted"> Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order. </p>'+
    '                       </div> '+
    '                       <div id="net-banking" class="tab-pane fade pt-3">'+
    '                           <div class="form-group"> <label for="Select Your Bank">'+
    '                                   <h6>Select your Bank</h6>'+
    '                               </label> <select class="form-control" id="ccmonth">'+
    '                                   <option value="" selected disabled>--Please select your Bank--</option>'+
    '                                   <option>BNZ</option>'+
    '                                   <option>Westpac</option>'+
    '                                   <option>Kiwibank</option>'+
    '                                   <option>ANZ</option>'+
    '                                   <option>TSB</option>'+
    '                                   <option>SBS</option>'+
    '                               </select> </div>'+
    '                           <div class="form-group border-0">'+
    '                               <p> <button type="button" class="btn btn-success "><i class="fas fa-mobile-alt mr-2"></i> Proceed Pyment</button> </p>'+
    '                           </div>'+
    '                           <p class="text-secondary">Note: After clicking on the button, you will be directed to a secure gateway for payment. After completing the payment process, you will be redirected back to the website to view details of your order. </p>'+
    '                       </div> '+
    '            </div>' );



      }); // end of moreDetails click event
    } //cardModal


  }//initMap


  function calculateAndDisplayRoute(directionsService, directionsRenderer, d, j) {


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
          var rentalCost = d * vehicles[j].cost;
           var grandTotal = 0;
          // For each route, display summary information.
          for (let i = 0; i < route.legs.length; i++) {
            const routeSegment = i + 1;
            summaryPanel.innerHTML +=
              "<b>Route Segment: " + routeSegment + "</b><br>";
            summaryPanel.innerHTML += route.legs[i].start_address + " to ";
            summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
            summaryPanel.innerHTML +=
              route.legs[i].distance.text + " and it takes " + route.legs[i].duration.text + " to reach."+ "<br><br>";
            var total = parseInt(route.legs[i].distance.text) / 100 * 2 * vehicles[j].fuel ;




          }

           totalCost = total + rentalCost;
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }

    );

  }








// receive input


var people;
$('#people').change(function(){

  people = parseInt($(this).val());
  console.log(people);
});

var cardImages;
$('#cardImages');



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
