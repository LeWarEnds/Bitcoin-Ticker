//jshint esversion:6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req,res){ // request and respond is the sequence...
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  var cryptoBase = req.body.crypto;
  var fiatBase = req.body.fiat;
  var textBase = req.body.amount;

  var option = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: cryptoBase,
      to: fiatBase,
      amount: textBase
    }
  };

  request(option, function(error,response,body){
    var data = JSON.parse(body);
    var price = data.price;
    var dateAndTime = data.time;

    res.write("<p> The Current Date and Time: " + dateAndTime + "</p>");
    res.write("<h1>" + textBase + cryptoBase + " costs " + price + fiatBase + "</h1>");
    res.send();
   });
});

app.listen(3000, function(){
  console.log("Server running at Port: 3000");
});
