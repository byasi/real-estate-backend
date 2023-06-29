var sPageURL = window.location.search.substring(1);
var sURLVariables = sPageURL.split("&");
let id;
for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    id = sParameterName[1];

    function getSingleTransaction(){
        fetch(`http://localhost:5000/api/v1/transaction/${id}`)
        .then((res) => res.json())
        .then((data) => {
            const transaction = data.data;
           document.getElementById('date').innerText = transaction.date;
           document.getElementById('mode').innerText = transaction.mode;
           document.getElementById('status').innerHTML = `
           <span class="badge rounded-pill ${
            transaction.status === "Pending"
                  ? "badge-warning"
                  : transaction.status === "Completed"
                  ? "badge-success"
                  : "badge-danger"
           } ">${transaction.status}</span>
           `
           document.getElementById('amountPaid').innerText = transaction.amountpaid;
           document.getElementById('customer').innerText = transaction.Customer?.name;

           document.getElementById('tbody').innerHTML = `
           <tr>
           <td><img src=${transaction.Property?.image} alt="image" width="100" height="100" /></td>
           <td>${transaction.Property?.name}</td>
           <td>${transaction.Property?.price}</td>
           <td>${transaction.Property?.location}</td>
         </tr>
           `


        }).catch((error) => console.log(error));
    }
    getSingleTransaction();
}

const cancelButton = document.getElementById("cancel");

cancelButton.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/api/v1/transaction/updatetransaction/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({status:"Cancelled"})
    }).then((res)=> res.json())
    .then((data) =>{
        if(data.status === 201){
            getSingleTransaction();
        }

    }).catch((error) => console.log(error));

})