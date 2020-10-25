const app=require("express").Router()
const Form=require("../models/form")
const auth=require("../auth/auth")

app.get("/",(req,res)=>{
    // should be handled at the frontend
    res.sendStatus(200)
})

app.get("/thankyou",(req,res)=>{
    // a thank you page to be displayed after submitting a response
    res.sendStatus(200)
})

app.get("/newform",(req,res)=>{
    res.sendStatus(200)
})

app.get("/form/:formId",(req,res)=>{
    Form.findById(req.params.formId,(err,result)=>{
        if(err) return console.log(err)
        if(!result) return res.sendStatus(404)
        res.json(result)
    })
})

app.get("/form/:formId/responses",auth.sameUser,(req,res)=>{
    Form.findById(req.params.formId,(err,result)=>{
        if(err) return console.log(err)
        if(!result) return res.sendStatus(404)
        res.send(result.responses) // responses array
    })
})

app.post("/newform",auth.isAuthed,(req,res)=>{
    const form=new Form({
        questions: req.body.questions,
        creator: req.user.username,
        responses: [],
        active: req.body.active
    })
    form.save((err,newform)=>{
        if(err) console.log(err)
        else res.redirect("/form/"+newform._id)
    })
})

// this will be the route for submitting a response
app.post("/form/:formId",auth.isAuthed,(req,res)=>{
    Form.findById(req.params.formId,(err,result)=>{
        if(err) return console.log(err)
        if(!result) return res.sendStatus(404)
        if(!responses.active) return res.sendStatus(403) // forbidden
        result.responses.push(req.body.response)
        result.save((err)=>{
            if(err) console.log(err)
            else res.redirect("/thankyou")
        })
    })
})

module.exports=app