const tbody = document.getElementById("tbody");

  const response = fetch("http://localhost:5000/api/v1/customers/")
  .then((response) =>response.json())
  .then((data) => {
    if(data.status === 200){
        const customers = data.data;
        tbody.innerHTML =  customers.map(
          (customer) =>
            `
          <tr key=${customer.id}>
              <td class="table-plus">${customer.name}</td>
              <td>${customer.dateofbirth}</td>
              <td>${customer.contact}</td>
              <td>${customer.location} </td>
              <td>${customer.email}</td>
              <td>${customer.occupation}</td>
              <td>
              <div class="dropdown">
                  <a class="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                      <i class="dw dw-more"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                      <a class="dropdown-item" href="#"><i class="dw dw-eye"></i> View</a>
                      <a class="dropdown-item" href="#"><i class="dw dw-edit2"></i> Edit</a>
                      <a class="dropdown-item" href="#"><i class="dw dw-delete-3"></i> Delete</a>
                  </div>
              </div>
              </td>
          </tr>
          
          `
        ).join("")

    } else {
        tbody.innerHTML = ``;
    }
  

  })
  

