const express= require("express");
const path= require("path");
const cookieParser= require("cookie-parser");
const {connectToMongo}= require('./connect');
const {restrictToLoggedinUserOnly,checkAuth}=require("./middleware/auth");

const urlRoute= require('./routes/url');
const staticRoute=require('./routes/staticRouters');
const userRoute=require('./routes/user');

const app= express();
const PORT=8001;

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

connectToMongo("mongodb://localhost:27017/short-url")
.then(()=> console.log("MongoDB connected"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/",checkAuth,staticRoute);
app.use("/user",userRoute);

app.listen(PORT,()=> console.log(`Server started at ${PORT}`))