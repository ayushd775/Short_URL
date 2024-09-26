const express= require("express");
const path= require("path");
const urlRoute= require('./routes/url');
const {connectToMongo}= require('./connect');

const app= express();
const PORT=8001;

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

connectToMongo("mongodb://localhost:27017/short-url")
.then(()=> console.log("MongoDB connected"))

app.use(express.json());

app.use("/url",urlRoute);

app.listen(PORT,()=> console.log(`Server started at ${PORT}`))