const { user, token} = localStorage;

if(user === undefined && token === undefined ){
	window.location.href = '/dashboard/login.html';
} else {

const userNav = document.getElementById("userNav");

const loggedUser = JSON.parse(user);

userNav.innerHTML = `
    <span class="user-icon">
	    <img src="src/images/avatar.webp" alt="">
	</span>
	<span class="user-name">${loggedUser.name}</span>
`;

}
