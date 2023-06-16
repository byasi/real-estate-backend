const { customer, customerToken } = localStorage;
const bookingDiv = document.getElementById("booking");
if (customer === undefined && customerToken === undefined) {
  
  bookingDiv.innerHTML = `<a href="login.html" class="btn btn-primary py-2 px-3">Login to Book</a>`;
} else {

  bookingDiv.innerHTML = `<button class="btn btn-primary py-2 px-3" id="bookBtn">Book Property</button>`;
  
}
