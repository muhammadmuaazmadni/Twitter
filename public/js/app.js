function signup() {

    axios({
        method: 'post',
        url: 'http://localhost:5000/signup',
        data: {
            name: document.getElementById("txt_name").value,
            email: document.getElementById("txt_email").value,
            password: document.getElementById("txt_password").value,
            phone: document.getElementById("txt_number").value,
            gender: document.getElementById("gender").value
        }, withCredentials: true
    }).then((response) => {
        if (response.data.status === 200) {
            alert(response.data.message)
            location.href = "./../login.html"
        } else {
            alert(response.data.message);
        }
    }).catch((error) => {
        console.log(error);
    });

    return false;
}

function login() {
    axios({
        method: 'post',
        url: "http://localhost:5000/login",
        data: {
            email: document.getElementById("txt_email").value,
            password: document.getElementById("txt_password").value,
        },
        withCredentials: true
    }).then((response) => {
        if (response.data.status === 200) {
            console.log(response.data.message);
            alert(response.data.message);
            window.location.href = "./../tweet.html"
            return
        } else {
            alert(response.data.message)
        }
    }, (error) => {
        console.log(error);
    });

    return false;
}

function forget() {
    axios({
        method: 'post',
        url: "http://localhost:5000/forget-password",
        data: {
            email: document.getElementById("txt_email").value,
        },
        withCredentials: true
    }).then((response) => {
        if (response.data.status === 200) {
            console.log(response.data.message);
            alert(response.data.message);
            window.location.href = "./../forget-two.html"
            return
        } else {
            alert(response.data.message)
        }
    }, (error) => {
        console.log(error);
    });

    return false;

}
function ChangePassowd() {
    axios({
        method: 'post',
        url: "http://localhost:5000/forget-password-step2",
        data: {
            email: document.getElementById("txt_email").value,
            otp: document.getElementById("txt_otp").value,
            newPassword: document.getElementById("txt_password").value,
        },
        withCredentials: true
    }).then((response) => {
        if (response.data.status === 200) {
            console.log(response.data.message);
            alert(response.data.message);
            window.location.href = "./../login.html"
            return
        } else {
            alert(response.data.message)
        }
    }, (error) => {
        console.log(error);
    });
    return false;

}

function getProfile() {
    axios({
        method: 'get',
        url: 'http://localhost:5000/profile',
        credentials: 'include',
    }).then((response) => {
        console.log(response);
        document.getElementById('name').innerHTML = response.data.profile.name
        document.getElementById('email').innerHTML = response.data.profile.email
    }, (error) => {
        console.log(error.message);
    });
    return false
}

function logout() {
    axios({
        method: 'post',
        url: 'http://localhost:5000/logout',
        credentials: 'include',
    }).then((response) => {
        console.log(response);
        window.location.href = "./../login.html"
    }, (error) => {
        console.log(error.message);
    });
    return false
}





socket.on("NEW_POST", (newPost) => {
    let jsonRes = JSON.parse(newPost);

    var eachtweet = document.createElement("li");
    eachtweet.innerHTML = `<h4 class="userName">
    ${jsonRes.userName}
    </h4>
     <p class="userPost">
        ${jsonRes.tweetText}
    </p>`;

    document.getElementById("posts").appendChild(eachtweet);

})
