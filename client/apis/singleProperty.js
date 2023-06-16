let loggedCustomer;
customer !== undefined ? loggedCustomer === customer : 'null' 
//  = JSON.parse(customer);
const errorDiv = document.getElementById('errors');
var sPageURL = window.location.search.substring(1);
var sURLVariables = sPageURL.split("&");
let id;
for (var i = 0; i < sURLVariables.length; i++) {
  var sParameterName = sURLVariables[i].split("=");
  id = sParameterName[1];

  fetch(`http://localhost:5000/api/v1/property/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const property = data.data;
      document.getElementById(
        "imageArea"
      ).innerHTML = ` <img src=${property.image} alt="Image" class="img-fluid" />`;
      document.getElementById("title").innerText = property.name;
      document.getElementById("bannerTitle").innerText = property.name;
      document.getElementById("breadcrumbTitle").innerText = property.name;
      document.getElementById("location").innerText = property.location;
      document.getElementById("price").innerText = new Intl.NumberFormat(
        "en-US",
        { style: "currency", currency: "UGX" }
      ).format(property.price);

      const bookBtn = document.getElementById("bookBtn");
      const bookingDetails = {
        CustomerId: loggedCustomer?.id,
        PropertyName: property.name
      };
      bookBtn.addEventListener("click", async (event) => {
        try {
          event.preventDefault();
         const response =  await fetch("http://localhost:5000/api/v1/bookings/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingDetails),
          });

          const data = await response.json();
          if(data.status === 201) {
            errorDiv.innerHTML = `
            <div class="alert alert-success" role="alert">
            Booking successful
          </div>
            `
          } else {
            errorDiv.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Ooops!! Something went wrong, Failed to Book
              </div>
            `
          }
          console.log(data);
        } catch (error) {
          errorDiv.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Ooops!! Something went wrong, Failed to Book
              </div>`
          console.error(error);
        }
      });
    });
}
