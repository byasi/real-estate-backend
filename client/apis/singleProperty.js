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
      document.getElementById('imageArea').innerHTML = ` <img src=${property.image} alt="Image" class="img-fluid" />`
      document.getElementById('title').innerText = property.name;
      document.getElementById('bannerTitle').innerText = property.name;
      document.getElementById('breadcrumbTitle').innerText = property.name;
      document.getElementById('location').innerText = property.location;
      document.getElementById('price').innerText = new Intl.NumberFormat('en-US',{style: 'currency', currency: 'UGX'}).format(property.price);

    });
}

