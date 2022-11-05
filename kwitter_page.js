//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyBR5iycN-1TxHQzAHDGpuHK0jE35_rU0sU",
      authDomain: "kwitter-846dd.firebaseapp.com",
      databaseURL: "https://kwitter-846dd-default-rtdb.firebaseio.com",
      projectId: "kwitter-846dd",
      storageBucket: "kwitter-846dd.appspot.com",
      messagingSenderId: "417021724250",
      appId: "1:417021724250:web:487fb531b8c1b3f7483a63",
      measurementId: "G-KRZVKHD945"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        var name = message_data["name"];
                        message = message_data["message"];
                        like = message_data["like"];
                        //row = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>" + message + "</h4><button class='btn btn-warning' id='" + firebase_message_id + "' value='" + like + "' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>"+message+"</h4><button class='btn btn-warning' id='"+ firebase_message_id + "' value='"+ like + "'onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: "+ like + "</span></button><hr>";
                        document.getElementById("output").innerHTML+=row
                        //End code
                  }
            });
      });
}
getData();

function send() {
      msg = document.getElementById("msg").value
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      })
      document.getElementById("msg").value = ""

}

function updateLike(message_id){
button_id = message_id;
var likes = document.getElementById(button_id).value;
var likesinnumber = Number(likes) + 1;
firebase.database().ref(room_name).child(message_id).update({
like:likesinnumber
})

}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}