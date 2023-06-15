const propertyArea = document.getElementById('properties');

const response = fetch("http://localhost:5000/api/v1/property")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.status === 200) {
      const properties = data.data;
      console.log(properties)
      propertyArea.innerHTML = properties
        .map(
          (property) =>
            `
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
            <div class="property-item">
            <a href="property-single.html" class="img">
              <img src=${property.image} alt="Image" class="img-fluid" />
            </a>

            <div class="property-content">
              <div class="price mb-2"><span>${new Intl.NumberFormat('en-US',{style: 'currency', currency: 'UGX'}).format(property.price)}</span></div>
              <div>
                <span class="d-block mb-2 text-black-50"
                  >Located at ${property.location}. Area of ${property.area} acres</span
                >

                <span class="city d-block mb-3">${property.name}</span>

                <a
                  href="property-single.html?singleproperty=${property.id}"
                  class="btn btn-primary py-2 px-3"
                  >See details</a>
              </div>
            </div>
          </div>
          </div>

          `
        )
        .join("");
    } else {
      propertyArea.innerHTML = ``;
    }
  });
