const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
//  const { merge } = require("openai/internal/qs/utils.mjs");

const app = express(); // Corrected typo here

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
   
  const data = {
    members: [
      {
         email_address: email,
         status: "subscribed",
         merge_fields: {
          FNAME: firstName,
          LNAME: lastName
         }
      }
    ]
  };

 
  const jsonData = JSON.stringify(data);
   
  const url = "https://us22.api.mailchimp.com/3.0/lists/b4b1b16fdb";

  const options = {
    method: "POST",
    auth: "shyam1:122c514be2f036769a2150d37aa75f0f-us22"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    } )

  })

  request.write(jsonData);
  request.end(); 
  
});





app.listen(3000, function() {
  console.log("Server is running on port 3000");
});





//  ApI Key
//   122c514be2f036769a2150d37aa75f0f-us22


// list id
// b4b1b16fdb