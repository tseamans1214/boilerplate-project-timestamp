// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  var testDate = new Date(req.params.date);
  if (testDate.getTime() !== testDate.getTime()) {
    res.json({ error : "Invalid Date" });
  }
  if(req.params.date.includes("-")) {
    var date = new Date(req.params.date);
    const timestampInMs = date.getTime();

    const unixTimestamp = Math.floor(date.getTime());
    res.json({"unix": unixTimestamp, "utc": date.toUTCString()});
  } else {
    let unix_timestamp = req.params.date;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    res.json({"unix": unix_timestamp, "utc": date.toUTCString()});
  }
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
