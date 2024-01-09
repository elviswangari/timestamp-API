// index.js
// where your node app starts

var express = require("express");
var app = express();
var cors = require("cors");

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get('/api/:date?', (req, res) => {

  const { date } = req.params;

  let dateObj;

  if (!date) {
    // No date provided, use current date
    dateObj = new Date();

  } else if(!isNaN(date)) {
    // Date is a number, parse it as a timestamp
    dateObj = new Date(parseInt(date));

  } else {
    // Date is a string, parse it 
    dateObj = new Date(date);

    // Check for invalid date
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: 'Invalid Date' });
    }
  }

  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
