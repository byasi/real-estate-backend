const loginButton = document.getElementById("btn");

loginButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const loginDetails = {
    email: email,
    password: password,
  };
  const response = await fetch("http://localhost:5000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDetails),
  });
  const data = await response.json();
  if(data.status === 200) {
    const token = data.token;
    localStorage.setItem("token", token);
  
    const tokenFromLocalStorage = localStorage.getItem("token");
    const getUserDetails = await fetch(
      `http://localhost:5000/api/v1/users/login/${tokenFromLocalStorage}`,
      {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
      }
    );
  
    const userProfile = await getUserDetails.json();
    localStorage.setItem('user',JSON.stringify(userProfile?.data));
    window.location.href = '/dashboard/index.html';
  } else {
    console.log(data.Message);
  }

 
});
localStorage.removeItem("token");
localStorage.removeItem("user");