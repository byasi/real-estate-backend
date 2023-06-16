const loginButton = document.getElementById("btn");

loginButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const phone = document.getElementById("phone").value;

  const loginDetails = {
    name: username,
    contact: phone,
  };
  const response = await fetch("http://localhost:5000/api/v1/customers/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDetails),
  });
  const data = await response.json();
  if(data.status === 200) {
    const token = data.token;
    localStorage.setItem("customerToken", token);
  
    const tokenFromLocalStorage = localStorage.getItem("customerToken");
    const getUserDetails = await fetch(
      `http://localhost:5000/api/v1/customers/profile/${tokenFromLocalStorage}`,
      {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
      }
    );
  
    const userProfile = await getUserDetails.json();
    localStorage.setItem('customer',JSON.stringify(userProfile?.data));
    window.location.href = '/client/index.html';
  } else {
    console.log(data.Message);
  }

 
});
localStorage.removeItem("customerToken");
localStorage.removeItem("customer");