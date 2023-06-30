var database = firebase.database();
function registerUser(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl,
    });
    window.location.href = '../dashboard/dashboard.html';
}