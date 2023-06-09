const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const consults = require("./routes/api/consults");
const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);



// app.use('/',(req,res)=>{
//   res.json({
//     message:"Data recieved"
//   })
// })

// if (process.env.PORT === "production") {
//   console.log('we are on production!')
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//     console.log('redirecting to react app build')
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   });
//   // Express serve up index.html file if it doesn't recognize route
//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }





app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/consults", consults);


const port = 8000
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
