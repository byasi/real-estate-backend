const userName = document.getElementById("userName");
userName.innerText = JSON.parse(user).name;
const tbody = document.getElementById("tbody");
const toalProperies = document.getElementById("properties");
let properties;

const response = fetch("http://localhost:5000/api/v1/property")
  .then((response) => response.json())
  .then((data) => {
    if (data.status === 200) {
      properties = data.data;
      toalProperies.innerText = properties.length || 0;
      tbody.innerHTML = properties
        .filter((prop) => prop.status === "OnSale")
        .map(
          (property) =>
            `
            <tr key=${property.id}>
            <td class="table-plus">
              <img
                src=${property.image}
                width="70"
                height="70"
                alt=""
              />
            </td>
            <td>
              <h5 class="font-16">${property.name}</h5>
            </td>
            <td>${property.status}</td>
            <td>${property.price}</td>
            <td>${property.location}</td>
            <td>
              <div class="dropdown">
                <a
                  class="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                >
                  <i class="dw dw-more"></i>
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list"
                >
                  <a class="dropdown-item" href="/dashboard/singleProperty.html?singleproperty=${property.id}"
                    ><i class="dw dw-eye"></i> View</a
                  >
                </div>
              </div>
            </td>
          </tr>
          `
        )
        .join("");
    } else {
      tbody.innerHTML = ``;
    }
  });

const responseTransactions = fetch("http://localhost:5000/api/v1/transaction/")
  .then((response) => response.json())
  .then((data) => {
    if (data.status === 200) {
      const transactions = data.getTransactions;
      const totalTransactions = document.getElementById("transactions");
      totalTransactions.innerText = transactions.length;
      const completedTransactions = document.getElementById(
        "completedTransactions"
      );
      completedTransactions.innerText = transactions.filter(
        (trans) => trans.status === "Completed"
      ).length;
    }
  });

const totalSales = document.getElementById("totalSales");
totalSales.innerText = 0;
