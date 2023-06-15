const tbody = document.getElementById("tbody");

const response = fetch("http://localhost:5000/api/v1/property")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.status === 200) {
      const properties = data.data;
      tbody.innerHTML = properties
        .map(
          (property) =>
            `
            <tr key=${property.id}>
            <td class="table-plus"><a href="/dashboard/singleProperty.html?singleproperty=${property.id}">${property.name}</a></td>
            <td>${property.status}</td>
            <td>${property.type}</td>
            <td>${property.area}</td>
            <td>${new Intl.NumberFormat('en-US',{style: 'currency', currency: 'UGX'}).format(property.price)}</td>
            <td>${property.location}</td>
        </tr>
          `
        )
        .join("");
    } else {
      tbody.innerHTML = ``;
    }
  });
