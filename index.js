const express = require('express');
const app = express();
const path = require('path');
const Text = require('./react');
const cors = require("cors");

var corsOptions = {
    origin: "*"
};
  
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

app.post('/get', Text.Text);

app.post("/demo", (req,res) => {
  response = {  
    first_name:"yaseer",  
    last_name:"123456"  
  };
  res.send(response);
})

const db = require("./app/models");
db.mongoose
.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to the database!");
})
.catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});

require("./app/routes/template.routes")(app);

app.listen(process.env.PORT || 4000, () =>{
    console.log("app running in port "+ (process.env.PORT || 4000));
});

module.exports = app;