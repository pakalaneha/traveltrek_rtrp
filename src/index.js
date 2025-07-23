const express=require('express');
const path=require('path');
const bcrypt=require('bcrypt');
const collection =require("./config");
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.use(express.static("css"));
const session = require("express-session");

app.use(session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: true
}));
app.post("/login",async (req,res)=>{
    const data={
        email: req.body.Email,
        password:req.body.Password
        
        }
        try{
           const check=await collection.findOne({email:data.email}) ;
           if(!check){
            return res.send("User Not Found");
           }
        //    const passwordmatch=await collection.findOne({password:data.password});
           const ispassword=await bcrypt.compare(req.body.Password,check.password);
           if(ispassword){
            res.render("index1");
           }else{
            res.send("wrong password");
           }
        }catch{
            res.send("no re");

        }



});
app.get("/login",(req,res)=>{
    res.render("login");

});
app.get("/explore",(req,res)=>{
    res.render("explore");

});
app.get("/",(req,res)=>{
    res.render("index");

});
app.get("/signup",(req,res)=>{
    res.render("signup");

});
app.get("/charminar",(req,res)=>{
    res.render("charminar");

});
app.get("/birlamandir",(req,res)=>{
    res.render("birlamandir");

});
app.get("/chilkur",(req,res)=>{
    res.render("chilkur");

});
app.get("/durgamcheruvu",(req,res)=>{
    res.render("durgamcheruvu");

});
app.get("/golconda",(req,res)=>{
    res.render("golconda");

});
app.get("/ramoji",(req,res)=>{
    res.render("ramoji");

});
app.get("/shilparamam",(req,res)=>{
    res.render("shilparamam");

});
app.get("/zoopark",(req,res)=>{
    res.render("zoopark");

});
app.get("/index", (req, res) => {
    res.render("index");
});

app.post("/signup",async (req,res)=>{
    console.log("hi");
    const data={
email: req.body.Email,
password:req.body.Password

}
const existinguser=await collection.findOne({email:data.email});
if(existinguser){
 res.send("User already exisits.")
}else{
    const saltRounds=10;
    const hashPassword=await bcrypt.hash(data.password,saltRounds);
    data.password=hashPassword;
const userdata=await collection.insertMany(data)
res.render("login");
}
});
const port=5000;
app.listen(port,()=>{
    console.log("Server Started")
})