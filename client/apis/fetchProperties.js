const propertyArea = document.getElementById("propertyArea");

const response = fetch("http://localhost:5000/api/v1/property")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.status === 200) {
      const properties = data.data;
      propertyArea.innerHTML = properties
        .map(
          (property) =>
            `
            <div class="col-xs-12 col-sm-6 col-md-6 col-lg-4">
            <div class="property-item mb-30">
              <a href="property-single.html" class="img">
                <img src=${property.image} alt="Image" class="img-fluid" />
              </a>

              <div class="property-content">
                <div class="price mb-2"><span>UGX ${property.price}</span></div>
                <div>
                  <span class="d-block mb-2 text-black-50"
                    >${property.location}</span
                  >
                  <span class="city d-block mb-3">${property.location}</span>

                  <div class="specs d-flex mb-4">
                    <span class="d-block d-flex align-items-center me-3">
                      <span class="icon-bed me-2"></span>
                      <span class="caption">2 beds</span>
                    </span>
                    <span class="d-block d-flex align-items-center">
                      <span class="icon-bath me-2"></span>
                      <span class="caption">2 baths</span>
                    </span>
                  </div>

                  <a
                    href="property-single.html"
                    class="btn btn-primary py-2 px-3"
                    >See details</a
                  >
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
