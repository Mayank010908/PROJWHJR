//ADD YOUR FIREBASE LINKS HERE
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

var user_name=localStorage.getItem("user_name")
document.getElementById("user_name").innerHTML="Welcome "+ user_name + "!";

function addRoom(){
      room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
         Grade:9,
         App:"Kwitter"

      })
      
      localStorage.setItem("room_name", room_name );

      window.location="kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                                  //End code
            });
      });
}
getData();

function redirectToRoomName(name){
      localStorage.setItem("room_name", name );
      window.location="kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}

