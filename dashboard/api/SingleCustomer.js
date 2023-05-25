var sPageURL = window.location.search.substring(1);
var sURLVariables = sPageURL.split("&");
let id;
for (var i = 0; i < sURLVariables.length; i++) {
  var sParameterName = sURLVariables[i].split("=");
  id = sParameterName[1];

  fetch(`http://localhost:5000/api/v1/customers/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const customer = data?.Data;
      const name = document.getElementById("name");
      const customerInfo = document.getElementById("information");

      name.innerText = `${customer.name}`;
      customerInfo.innerHTML = `
        <li>
                      <span>Email Address:</span>
                      ${customer.email}
                    </li>
                    <li>
                      <span>Phone Number:</span>
                     ${customer.contact}
                    </li>
                    <li>
                      <span>Address:</span>
                      ${customer.location}
                    </li>
                    <li>
                      <span>Occupation:</span>
                      ${customer.occupation}
                    </li>
                    <li>
                      <span>Date of Birth:</span>
                      ${customer.dateofbirth}
                    </li>
        `;
    });
}

const tbody = document.getElementById("tbody");

fetch(`http://localhost:5000/api/v1/transaction/customertransactions/${id}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const transactions = data.data;
    tbody.innerHTML = transactions.map(
      (transaction) => `
    <tr key=${transaction.id}>
    <th scope="row">${transaction.date}</th>
    <td>${transaction.mode}</td>
    <td>${transaction.amountpaid}</td>
    <td>${transaction.Property.balance}</td>
    <td>${transaction.Property.name}</td>
    <td>
      <span
        class="badge rounded-pill ${
          transaction.status === "Pending"
            ? "badge-warning"
            : transactions.status === "Completed"
            ? "badge-success"
            : "badge-primary"
        } 
        } "
        >${transaction.status}</span
      >
    </td>
  </tr>
    `
    );
  })
  .catch((error) => console.error(error));
