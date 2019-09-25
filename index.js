const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const db = require("./config/database");
const {Port} = require("./config/variableenv")
const userRouter = require("./routes/user")
const addressRouter = require('./routes/address')

const PORT = Port || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


db.then(() => {
  console.log(`connected to database`);
})
.catch(error => {
  console.log("error happened when to reach mongodb connection", error);
});

app.use("/user",userRouter);
app.use("/address",addressRouter)


app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});
