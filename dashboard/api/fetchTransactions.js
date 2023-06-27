const tbody = document.getElementById("tbody");
const selectStatus = document.getElementById("status");
const statuses = [
  {
    name: "All",
    value: ""
  },
  {
    name: "Pending",
    value: "Pending"
  },
  
  {
    name: "Completed",
    value: "Completed"
  },
];
selectStatus.innerHTML = statuses
  .map(
    (status, index) =>
      `<option key=${index} value=${status.value}>${status.name}</option>`
  )
  .join("");

let statusValue = ""; // Initialize with default value

selectStatus.addEventListener("change", () => {
  statusValue = selectStatus.value; // Update the statusValue variable
  fetchTransactions(); // Fetch data and filter based on the selected value
});

function fetchTransactions() {
  const response = fetch("http://localhost:5000/api/v1/transaction/")
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        const transactions = data.getTransactions;
        tbody.innerHTML = transactions
          .filter((transaction) => {
            if (statusValue === "") {
              return true; // Return all transactions when no filter is selected
            }
            return transaction.status === statusValue;
          })
          .map(
            (transaction) =>
              `
          <tr key=${transaction.id}>
            <td class="table-plus">${transaction.Customer?.name}</td>
            <td>${transaction.date}</td>
            <td>${transaction.mode}</td>
            <td>${transaction.Property?.name}</td>
            <td>
              <span class="badge rounded-pill ${
                transaction.status === "Pending"
                  ? "badge-warning"
                  : transaction.status === "Completed"
                  ? "badge-success"
                  : "badge-primary"
              }">${transaction.status}</span>
            </td>
            <td>${transaction.amountpaid}</td>
            <td>${transaction.Property?.balance}</td>
          </tr>
          `
          )
          .join("");
      } else {
        tbody.innerHTML = "";
      }
    });
}

// Initial fetch without filtering
fetchTransactions();
