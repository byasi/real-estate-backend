
const submitButton = document.getElementById('btn');

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const status = document.getElementById('status').value;
    const type = document.getElementById('type').value;
    const area = document.getElementById('area').value;
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;

    const property = {
        name: name,
        status: status,
        type: type,
        area: area,
        price: price,
        location: location
    }

    fetch('http://localhost:5000/api/v1/property/addProperty',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(property)
    }).then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.status === 201){
            window.location.href = '/dashboard/properties.html';
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    })
})