const tbody = document.getElementById("tbody");

const response = fetch("http://localhost:5000/api/v1/customers/")
  .then((response) => response.json())
  .then((data) => {
    if (data.status === 200) {
      const customers = data.data;
      tbody.innerHTML = customers
        .map(
          (customer) =>
            `
          <tr key=${customer.id}>
              <td class="table-plus"><a href=${`/dashboard/singleCustomer.html?singleclient=${customer.id}`}>${
              customer.name
            }</a></td>
              <td>${customer.dateofbirth}</td>
              <td>${customer.contact}</td>
              <td>${customer.location} </td>
              <td>${customer.email}</td>
              <td>${customer.occupation}</td>
          </tr>
          
          `
        )
        .join("");
    } else {
      tbody.innerHTML = ``;
    }
  });
