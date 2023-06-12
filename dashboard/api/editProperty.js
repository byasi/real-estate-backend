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

      document.getElementById("name").value = property.name;
      document.getElementById("type").value = property.type;
      document.getElementById("area").value = property.area;
      document.getElementById("price").value = property.price;
      document.getElementById("location").value = property.location;
    });

  const updateBtn = document.getElementById("btn");

  updateBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const area = document.getElementById("area").value;
    const price = document.getElementById("price").value;
    const location = document.getElementById("location").value;

    const updateBody = { name, type, area, price, location };
    console.log(updateBody);
    fetch(`http://localhost:5000/api/v1/property/updateproperty/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateBody),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          window.location.href = `/dashboard/singleProperty.html?singleproperty=${id}`;
        }
      })
      .catch((error) => console.error(error));
  });
}
