const button = document.getElementById('btn');

button.addEventListener('click', async (event) => {
    event.preventDefault();

    const customerName = document.getElementById('name').value;
    const customerEmail = document.getElementById('email').value;
    const customerContact = document.getElementById('contact').value;
    const customerOccupation = document.getElementById('occupation').value;
    const customerLocation = document.getElementById('location').value;
    const dob = document.getElementById('dob').value;

    const data = {
        name: customerName,
        email: customerEmail,
        contact: customerContact,
        dob: dob,
        occupation: customerOccupation,
        location: customerLocation
    }
    console.log('data', data);
})