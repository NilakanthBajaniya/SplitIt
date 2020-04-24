$(document).ready(function(){

    //click event of login button
    $('#loginBtn').click(Login);

    ///assigning the background-image property to login image container
    $('.bg-login-image').css('background-image', 'url(img/img_avatar.png)');
});

//function validate user credential and navigate to the dashboard.html
function Login(event) {

    event.preventDefault();
    var userName = $('#username').val();
    var password = $('#password').val();
    var isValid = true;

    //regular expressions to validate the email and password entered by user.
    if (!userName.match(/^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/)) {
        isValid = false;
    } else if (!password.match(/^(?=.*?[#?!@$%^&*-])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[\d]).{8,15}$/)) {
        isValid = false;
    }

    if (isValid) {

        //looking for email in the local-storage. 
        var user = Utility.search("users", 'Email', userName);

        if ((user != undefined || user != null) && user[0].Password == password) {

            Utility.removeKey('login');
            Utility.add('login', user[0]);
            location.href = "dashboard.html";
        }
        else alert("Enter valid Username and Password!!");
    }
}