var sPageURL = window.location.search.substring(1);
var sURLVariables = sPageURL.split("&");
for (var i = 0; i < sURLVariables.length; i++) {
  var sParameterName = sURLVariables[i].split("=");
  const id = sParameterName[1];

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
      
      `;
    });
}

const displayOtherProperties = document.getElementById("otherProperties");

fetch(`http://localhost:5000/api/v1/property`)
  .then((response) => response.json())
  .then((data) => {
    const properties = data.data;
    displayOtherProperties.innerHTML = properties.map(
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
//
