const tbody = document.getElementById("tbody");

const response = fetch("http://localhost:5000/api/v1/transaction/")
  .then((response) => response.json())
  .then((data) => {
    if (data.status === 200) {
      const transactions = data.getTransactions;
      tbody.innerHTML = transactions.filter((transaction) => transaction.status === 'Cancelled')
        .map(
          (transaction) =>
            `
          <tr key=${transaction.id}>
          <td class="table-plus">${transaction.Customer?.name}</td>
          <td >${transaction.date}</td>
              <td>${transaction.mode}</td>
              <td>${transaction.Property?.name}</td>
              <td>
              <span class="badge rounded-pill ${
                transaction.status === "Pending"
                  ? "badge-warning"
                  : transactions.status === "Completed"
                  ? "badge-success"
                  : "badge-danger"
              } 
        } "
        >${transaction.status}</span</td>
              <td>${transaction.amountpaid} </td>
              <td>${transaction.Property?.balance} </td>
          </tr>
          
          `
        )
        .join("");
    } else {
      tbody.innerHTML = ``;
    }
  });
