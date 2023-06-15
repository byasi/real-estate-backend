var sPageURL = window.location.search.substring(1);
var sURLVariables = sPageURL.split("&");
let id;
for (var i = 0; i < sURLVariables.length; i++) {
  var sParameterName = sURLVariables[i].split("=");
  id = sParameterName[1];
  console.log(id);
  fetch(`http://localhost:5000/api/v1/customers/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const customer = data.Data;
      document.getElementById("name").value = customer.name;
      document.getElementById("email").value = customer.email;
      document.getElementById("contact").value = customer.contact;
      document.getElementById("occupation").value = customer.occupation;
      document.getElementById("location").value = customer.location;
      document.getElementById("dob").value = customer.dateofbirth;
    })
    .catch((error) => console.error(error));

  const updateBtn = document.getElementById("btn");
  updateBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const customerName = document.getElementById("name").value;
    const customerEmail = document.getElementById("email").value;
    const customerContact = document.getElementById("contact").value;
    const customerOccupation = document.getElementById("occupation").value;
    const customerLocation = document.getElementById("location").value;
    const dob = document.getElementById("dob").value;

    const updateBody = {
      name: customerName,
      email: customerEmail,
      contact: customerContact,
      dateofbirth: dob,
      occupation: customerOccupation,
      location: customerLocation,
    };
    fetch(`http://localhost:5000/api/v1/customers/updatecustomer/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          window.location.href = `/dashboard/singleCustomer.html?singleclient=${id}`;
        }
      })
      .catch((error) => console.error(error));
  });
}
