const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");


app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);


const port = process.env.PORT || 3001;
// console.log(process.env.MONGO_URL)
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => {console.log(`Node server started at port ${port}`);});
