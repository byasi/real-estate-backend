var sPageURL = window.location.search.substring(1);
var sURLVariables = sPageURL.split("&");
console.log(sURLVariables);
for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    const id = sParameterName[1];
    console.log('id', id);

    fetch(`http://localhost:5000/api/v1/customers/${id}`).then((response) => response.json())
    .then((data) => {
        const customer = data?.Data;
        console.log('Customer', customer);
        const name = document.getElementById('name');
        const customerInfo = document.getElementById("information");

        name.innerText = `${customer.name}`
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
        `
    })
}
