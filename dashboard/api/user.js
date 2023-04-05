const userNav = document.getElementById("userNav");
console.log(userNav);

const userDetails = localStorage.getItem("user");
const user = JSON.parse(userDetails);
console.log(user);

userNav.innerHTML = `
    <span class="user-icon">
	    <img src="vendors/images/photo1.jpg" alt="">
	</span>
	<span class="user-name">${user.name}</span>
`;
