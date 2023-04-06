const button = document.getElementById('btn');

button.addEventListener('click', async (event) => {
    event.preventDefault();

    const customerName = document.getElementById('name').value;
    const customerEmail = document.getElementById('email').value;
    const customerContact = document.getElementById('contact').value;
    const customerOccupation = document.getElementById('occupation').value;
    const customerLocation = document.getElementById('location').value;
    const dob = document.getElementById('dob').value;

    const customer = {
        name: customerName,
        email: customerEmail,
        contact: customerContact,
        dateofbirth: dob,
        occupation: customerOccupation,
        location: customerLocation
    }
    // console.log('data', data);
    const response = await fetch('http://localhost:5000/api/v1/customers/addCustomer', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(customer)
    });
    const data = await response.json();
    console.log(data);
    if(data.status === 201){
        window.location.href = '/dashboard/customers.html';
    } else {
        console.error(data.message);
    }
})