var container = document.querySelector('.container');
var seats = document.querySelectorAll('.row .seat:not(.occupied)');
var count = document.getElementById('count');
var total = document.getElementById('total');
var movieSelect = document.getElementById('movie');

var ticketPrice = +movieSelect.value

populateUI();

// saves selected movie index value
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}
//update total and count
function updateSelectedCount(){
    var selectedSeats = document.querySelectorAll('.row .seat.selected')
    
    var seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat)
    })
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    var selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = (selectedSeatsCount * ticketPrice)+'$';
}
// get data from localstorage and populate UI
function populateUI(){
    var selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length>0){
        seats.forEach(function(el, index){
            if(selectedSeats.indexOf(index)>-1){
                el.classList.add('selected')
            }
        })
    }
    
    var selectedMovieIndex = localStorage.getItem("selectedMovieIndex")
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
    
}   


// movie select event
movieSelect.addEventListener('change', function(e){
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})

// seat click event 
container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
    e.target.classList.toggle('selected');
    updateSelectedCount();
})

//initial
updateSelectedCount();





