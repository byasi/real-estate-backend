const registerButton = document.getElementById('btn');

registerButton.addEventListener('click', async(event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const occupation = document.getElementById('occupation').value;
    const location = document.getElementById('location').value;

    const reqBody = {
        name: username,
        email: email,
        location: location,
        contact: phone,
        dateofbirth: dob,
        occupation: occupation
    }

    const response = await fetch('http://localhost:5000/api/v1/customers/addCustomer',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
    });
    const data = await response.json();
    if(data.status === 201){
        window.location.pathname = '/client/login.html'
    }
    console.log(data);
})