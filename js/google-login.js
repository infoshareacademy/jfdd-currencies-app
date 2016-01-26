function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId());
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
}
//aktualnaData...
var date = new Date();
var actualYear = date.getFullYear();
document.getElementById("currentYear").innerHTML = actualYear;