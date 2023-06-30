let doneLoading = false;
let ninthActivities = [];
let tenthActivities = [];
let eleventhActivities = [];
let twelfthActivities = [];
let tBody = document.getElementById("tBody");
let add = document.getElementById("add");
const config = {
    apiKey: "AIzaSyB15xUdx3sBATGIxY_h-SnCoxkIy5wLT6U",
    authDomain: "college-sight.firebaseapp.com",
    databaseURL: "https://college-sight-default-rtdb.firebaseio.com",
    projectId: "college-sight",
    storageBucket: "college-sight.appspot.com",
    messagingSenderId: "242183854343",
    appId: "1:242183854343:web:75b132b93c907deedc4da2",
    measurementId: "G-G7HRLM0245"
};
const app = firebase.initializeApp(config);
var database = firebase.database();
var currUser;
firebase.auth().onAuthStateChanged(user => {
    currUser = user;
    if (user) {
        console.log("signed in")
        console.log(user)
    } else {
        location.href = "../index.html"
    }
    var user = firebase.database().ref('users/' + user.uid);
    user.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data.ninthActivities) {
            ninthActivities = data.ninthActivities;
            tBody.innerHTML = "";
            Object.values(ninthActivities).forEach((activity,i) => {
                var dateStart = new Date(activity.dateStart);
                var dateEnd = new Date(activity.dateEnd);
                tBody.innerHTML += `<tr onclick=delete("${Object.keys(ninthActivities)[i]}") id="${Object.keys(ninthActivities)[i]}">
                    <td>${activity.activityName}</td>
                    <td>${dateStart.toLocaleDateString()}</td>
                    <td>${dateEnd.toLocaleDateString()}</td>
                </tr>` 
            });
            
        }
        if (data.tenthActivities) {
            tenthActivities = data.tenthActivities;
        }
        if (data.eleventhActivities) {
            eleventhActivities = data.eleventhActivities;
        }
        if (data.twelfthActivities) {
            twelfthActivities = data.twelfthActivities;
        }
        doneLoading = true;
    });

})

selected = 0;
function removeItem(id){
    switch (selected) {
        case 0:
            updates['/users/' + currUser.uid + '/ninthActivities/' + id] = null;
            return firebase.database().ref().update(updates);
}
}
var ninth = document.getElementById("0");
var tenth = document.getElementById("1");
var eleventh = document.getElementById("2");
var twelfth = document.getElementById("3");
add.addEventListener("click", () => {
    var activityName;
    var dateStart = null;

    start();
    function start() {
        activityName = prompt("Activity Name:");
   

    if (activityName.length <= 25) {
        var check = false;
        function checkDateStart() {
            var activityDateStart = prompt("Date Started (MM/DD/YYYY):");
             dateStart = new Date(activityDateStart);
            check = confirm("Was this your date? " + dateStart.toLocaleDateString());
            if (!check) {
                checkDateStart();
            } 
            else {
                return;
            }
        }
        checkDateStart();
    }
    else {
       alert("Please make sure the activity name is 25 characters or less.")
        start();
        }
    }

    var dateEnd = null;

    if (activityName && dateStart) {
        var check = false;
        function checkDateEnd() {
            var activityDateCompleted = prompt("Date of Completion (MM/DD/YYYY):");
            dateEnd = new Date(activityDateCompleted);
            check = confirm("Was this your date? " + dateEnd.toLocaleDateString());
            if (!check) {
                checkDateEnd();
            }
            else {
                return;
            }
        }
        checkDateEnd();
       
    }
    if (activityName && dateStart && dateEnd) {
        finalCheck = confirm("New Activity\n" + `Activity Name: ${activityName}\nDate Started: ${dateStart.toLocaleDateString()}\nDate of Completion: ${dateEnd.toLocaleDateString()}`);
        if (finalCheck) {
            console.log(currUser)
            var updates = {};
            var newPostKey;
            switch (selected) {
                case 0:
                    newPostKey = firebase.database().ref().child('users/' + currUser.uid + '/ninthActivities/').push().key;
                    updates['/users/' + currUser.uid + '/ninthActivities/' + newPostKey] = { activityName, dateStart, dateEnd };
                    break;
                case 1:
                    updates['/users/' + currUser.uid + '/tenthActivities'] = { activityName, dateStart, dateEnd };
                    break;

                case 2:
                    updates['/users/' + currUser.uid + '/eleventhActivities'] = { activityName, dateStart, dateEnd };
                    break;

                case 3:
                    updates['/users/' + currUser.uid + '/twelfthActivities'] = { activityName, dateStart, dateEnd };
                    break;


            }
            return firebase.database().ref().update(updates);

        }
    }
})
ninth.addEventListener("click", () => {
    if (!doneLoading) return;
    ninth.className = "navItem selected";
    tenth.className = "navItem"
    eleventh.className = "navItem";
    twelfth.className = "navItem";
    selected = 0;
});
tenth.addEventListener("click", () => {
    if (!doneLoading) return;

    tenth.className = "navItem selected";
    ninth.className = "navItem";
    eleventh.className = "navItem";
    twelfth.className = "navItem";
    selected = 1;

})
eleventh.addEventListener("click", () => {
    if (!doneLoading) return;

    tenth.className = "navItem";
    ninth.className = "navItem";
    eleventh.className = "navItem selected";
    twelfth.className = "navItem";
    selected = 2;

});
twelfth.addEventListener("click", () => {
    if (!doneLoading) return;

    tenth.className = "navItem";
    ninth.className = "navItem";
    eleventh.className = "navItem";
    twelfth.className = "navItem selected";
    selected = 3;

})