const express=require("express")
const mongoose=require("mongoose")
const passport=require("passport")
const indexRouter=require("./router/index")
const editRouter=require("./router/edit")
const userRouter=require("./router/user")
const User=require("./models/user")

const app=express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/formDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.use(require("express-session")({
    secret: process.env.SESSION_SECRET, // be sure to change this
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use("/", indexRouter)
app.use("/edit", editRouter)
app.use("/user", userRouter)

app.listen(3000,()=>console.log("Server started on port 3000"))