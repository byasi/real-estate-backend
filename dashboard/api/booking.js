const tbody = document.getElementById("tbody");

const approve = (id) => {
    fetch(`http://localhost:5000/api/v1/bookings/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status: 'Approved'})
    }).then(res => res.json()).then((data) => {
        console.log(data)
        window.location.reload();
    }).catch((error) => console.log(error))
}
const reject = (id) => {
    fetch(`http://localhost:5000/api/v1/bookings/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status: 'Rejected'})
    }).then(res => res.json()).then((data) => {
        console.log(data)
        window.location.reload();
    }).catch((error) => console.log(error))
}
const reset = (id) => {
    fetch(`http://localhost:5000/api/v1/bookings/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status: 'Pending'})
    }).then(res => res.json()).then((data) => {
        console.log(data)
        window.location.reload();
    }).catch((error) => console.log(error))
}

const response = fetch("http://localhost:5000/api/v1/bookings")
  .then((response) => response.json())
  .then((data) => {
    if (data.status === 200) {
      const bookings = data.data;
      tbody.innerHTML = bookings.map((booking) =>{
        
       return (
            `
            <tr>
                <td class="table-plus">${booking.Customer?.name}</td>
                <td>${booking.PropertyName}</td>
                <td class="table-plus">${booking.Customer?.contact}</td>
                <td><span class="badge badge-pill ${booking.status === 'Pending' ? 'badge-warning' : booking.status === 'Rejected'? 'badge-danger': 'badge-success'} ">${booking.status}</span></td>
                <td>2023-10-06</td>
                <td>
                    <div class="dropdown">
                        <a class="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" href="#" role="button" data-toggle="dropdown">
                            <i class="dw dw-more"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                            <button class="dropdown-item" id="approve" onclick="approve(${booking.id})">Approve</button>
                            <button class="dropdown-item" onclick="reject(${booking.id})" >Reject</button>
                            <button class="dropdown-item" onclick="reset(${booking.id})">Reset</button>
                        </div>
                    </div>
                 </td>
            </tr>
          `
        )
        
      }
           
        )
        .join("");
    } else {
      tbody.innerHTML = ``;
    }
  });
