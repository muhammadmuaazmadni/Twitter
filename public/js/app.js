
var url = "https://twitterappui.herokuapp.com";
// var url = "http://localhost:5000";
var socket = io(url);

socket.on('connect', function () {
    console.log("connected")
});

function signup() {

    axios({
        method: 'post',
        url: url + '/signup',
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
        url: url + "/login",
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
        url: url + "/forget-password",
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
        url: url + "/forget-password-step2",
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


function tweetpost() {
    axios({
        method: 'post',
        url: url + "/tweet",
        data: {
            tweet: document.getElementById("tweet").value,
        },
        withCredentials: true
    }).then((response) => {
        if (response.data.status === 200) {
            alert(response.data.message)
            return
        } else {
            alert(response.data.message)
        }
    }, (error) => {
        console.log(error);
    });
}


function gettweet() {
    getProfile();
    axios({
        method: 'get',
        url: url + '/tweet-get',
        credentials: 'include',
    }).then((response) => {
        let tweets = response.data.gettweet;
        for (i = 0; i < tweets.length; i++) {
            var eachtweet = document.createElement("li");
            eachtweet.innerHTML = `<h4>
                ${tweets[i].username}
                </h4>
                 <p>
                    ${tweets[i].tweet}
                </p>`;
            document.getElementById("getalltweet").appendChild(eachtweet);
        }
    }, (error) => {
        console.log(error.message);
    });


    return false
}

function mytweet() {
    axios({
        method: 'get',
        url: url + '/myTweets',
        credentials: 'include',
    }).then((response) => {
        let tweets = response.data.tweet;
        for (i = 0; i < tweets.length; i++) {
            var eachtweet = document.createElement("li");
            eachtweet.innerHTML = `<h4>
                ${tweets[i].username}
                </h4>
                 <p>
                    ${tweets[i].tweet}
                </p>`;
            document.getElementById("mytweet").appendChild(eachtweet);
        }
    }, (error) => {
        console.log(error.message);
    });
}

socket.on("NEW_POST", (newPost) => {


    console.log(newPost);

    let jsonRes = newPost;
    var eachtweet = document.createElement("li");
    eachtweet.innerHTML = `<h4>
    ${jsonRes.username}
    </h4>
     <p>
        ${jsonRes.tweet}
    </p>`;

    document.getElementById("getalltweet").appendChild(eachtweet);
    document.getElementById("mytweet").appendChild(eachtweet);

})



function getProfile() {
    axios({
        method: 'get',
        url: url + '/profile',
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
        url: url + '/logout',
        credentials: 'include',
    }).then((response) => {
        console.log(response);
        window.location.href = "./../login.html"
    }, (error) => {
        console.log(error.message);
    });
    return false
}





