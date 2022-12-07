// bc63a645a89d9fc722395ab2218f1cc3-us21
// c66399092e

const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")

const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email

  //console.log(firstName, lastName, email);

  const data = {
    members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName}
      }]
  }

  const jsonData = JSON.stringify(data)
  
  const url = "https://us21.api.mailchimp.com/3.0/lists/c66399092e"
  
  const options = {
    method: "POST",
    auth:'rishabh1:bc63a645a89d9fc722395ab2218f1cc3-us21' 
    //Enter the API key
  }
  
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function (data){
      console.log(JSON.parse(data))
        })
      })

      //comment the request to test the de failure page
      request.write(jsonData)
      request.end()

    })

// app.post("/failure", function (req, res) {
//   res.redirect("/")
// })

app.listen(3000, () => console.log("Server is running on port 3000"))