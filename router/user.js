const app=require("express").Router()
const passport=require("passport")
const User=require("../models/user")

app.get("/user/login",(req,res)=>{
    // render the login page
    res.sendStatus(200)
})

app.get("/user/signup",(req,res)=>{
    // render the signup page
    res.sendStatus(200)
})

app.post("/user/login",
    passport.authenticate("local",{successRedirect: "/", failureRedirect: "/login"})
)

app.post("/user/signup",(req,res)=>{
    User.register({
        username: req.body.username
    },req.body.password,(err)=>{
        if(err) return console.log(err)
        passport.authenticate("local")(req,res,()=>res.redirect("/"))
    })
})