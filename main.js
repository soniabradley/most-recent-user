  alert("Hi");
  // Initialize Firebase by adding Firebase to your web app
  var config = {
    apiKey: "AIzaSyDeXGnJOCK7OSUHOxsSTqRPZxVft6AeLKc",
    authDomain: "mostrecentuser-b0472.firebaseapp.com",
    databaseURL: "https://mostrecentuser-b0472.firebaseio.com",
    projectId: "mostrecentuser-b0472",
    storageBucket: "mostrecentuser-b0472.appspot.com",
    messagingSenderId: "483912092180"
  };
  firebase.initializeApp(config);

  var name = "";
  var email = "";
  var age = 0;
  var comment = "";

  // collect data to form and send to firebse
  $("#addUser").on("click", function () {
    // Don't refresh the sign-up form!
    // event.preventDefault();

    name = $("#nameInput").val().trim();
    email = $("#emailInput").val().trim();
    age = $("#ageInput").val().trim();
    comment = $("#commentInput").val().trim();
    // push data to firebase, (changed) set --> push to add members with TIMESTAMP
    firebase.database().ref().push({
      name: name,
      email: email,
      age: age,
      comment: comment,
      dateAdded:firebase.database.ServerValue.TIMESTAMP
    });
  });
  // New listener is listening to any new data added to the datbase
  firebase.database().ref().on("child_added",function(snapshot){
    $(".well").append(snapshot.val().name+"<p>");
    $(".well").append("<p>"+snapshot.val().email+"<p>");
    $(".well").append("<p>"+snapshot.val().age+"<p>");
    $(".well").append("<p>"+snapshot.val().comment+"<p>");
    $(".well").append("<hr>");
  })
  // Firebase listener + initial loader (changed) .on("value") -->.on("child_added",...)
  firebase.database().ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().email);
    console.log(snapshot.val().age);
    console.log(snapshot.val().comment);
    // Change the HTML to reflect
    $("#nameDisplay").html(snapshot.val().name);
    $("#emailDisplay").html(snapshot.val().email);
    $("#ageDisplay").html(snapshot.val().age);
    $("#commentDisplay").html(snapshot.val().comment);

    // Handle errors, not sure if this makes a difference?
  }, function(errorObject){
    console.log("Errors handled: " + errorObject.code);
  });

//   The RULES require authentication
//  {
//      "rules": {
//        ".read": "auth != null",
//        ".write": "auth != null"
//     }
//  }

