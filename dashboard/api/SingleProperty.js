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
      const propertyInfo = document.getElementById("information");

      const imageSection = document.getElementById("imageSection");
      imageSection.innerHTML = `
      <img src=${property.image} alt="">
      `;
      const propertyName = document.getElementById("proprtyName");
      propertyName.innerText = property.name;
      propertyInfo.innerHTML = `
      <li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      Price
      <span class="">${property.price}</span>
    </li>
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      Area
      <span class="">${property.area}</span>
    </li>
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      Location
      <span class="">${property.location}</span>
    </li>
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      Type
      <span class="">${property.type}</span>
    </li>
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      Status
      <span class="">${property.status}</span>
    </li>
    <div class="actions mt-3">
      <button class="btn btn-danger" id="delete">Delete Property</button>
      <a href="editproperty.html?update=${property.id}" class="btn btn-info">Update Property</a>
    </div>
      `;
    });
}
const displayOtherProperties = document.getElementById("otherProperties");

fetch(`http://localhost:5000/api/v1/property`)
  .then((response) => response.json())
  .then((data) => {
    const properties = data.data;

    displayOtherProperties.innerHTML = properties
      .filter((property) => property.id !== parseInt(id))
      .map(
        (property) => `
      <a href="/dashboard/singleProperty.html?singleproperty=${property.id}">
                    <li class="col-lg-3 col-md-3 col-sm-3" key=${property.id}>
                        <div class="product-box">
                            <div class="producct-img"><img src="${property.image}" alt=""></div>
                            <div class="product-caption">
                                <h4><a href="#">${property.name}</a></h4>
                                <div class="price">
                                   <ins>UGX ${property.price}</ins>
                                </div>
                                <h4><a href="#">${property.status}</a></h4>
                            </div>
                        </div>
                    </li>
                    </a>
    `
      );
  });

  // delete property
  const deleteBtn = document.getElementById('delete');
  deleteBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(('clicked'));
  })


