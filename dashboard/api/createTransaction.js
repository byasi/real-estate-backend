const selectCustomer = document.getElementById("selectCustomer");
const selectProperty = document.getElementById("selectProperty");
const submitButton = document.getElementById("btn");
let CustomerID;
let PropertyId;
fetch("http://localhost:5000/api/v1/customers/")
  .then((response) => response.json())
  .then((data) => {
    if (data.status === 200) {
      const customers = data.data;
      selectCustomer.innerHTML = customers.map(
        (customer) => `
        <option value=${customer.id}>${customer.name}</option>
      `
      );
    }
  });

selectCustomer.addEventListener(
  "change",
  () => (CustomerID = selectCustomer.value)
);
fetch("http://localhost:5000/api/v1/property/")
  .then((response) => response.json())
  .then((data) => {
    if (data.status === 200) {
      const properties = data.data;
      console.log(properties);
      selectProperty.innerHTML = properties
        .filter((prop) => prop.status === "OnSale")
        .map(
          (property) => `
          <option defaultvalue="selectProperty">Select Property</option>
          <option value=${property.id}>${property.name}</option>
      `
        );
    }
  });

selectProperty.addEventListener(
  "change",
  () => (PropertyId = selectProperty.value)
);

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const mode = document.getElementById("mode").value;
  const amountPaid = document.getElementById("amountPaid").value;
  const date = document.getElementById("date").value;

  const transaction = {
    CustomerId: parseInt(CustomerID),
    PropertyId: parseInt(PropertyId),
    mode: mode,
    amountpaid: parseInt(amountPaid),
    date: date,
    status: "Pending",
  };
  console.log("transaction", transaction);
  fetch("http://localhost:5000/api/v1/transaction/addTransaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 201) {
        window.location.href = "/dashboard/transactions.html";
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    })
    .catch((error) => console.error(error));
});
