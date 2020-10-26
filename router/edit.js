const app=require("express").Router()
const Form=require("../models/form")
const auth=require("../auth/auth")

app.get("/edit/:formId",auth.sameUser,(req,res)=>{
    Form.findById(req.params.formId,(err,result)=>{
        if(err) return console.log(err)
        if(!result) return res.sendStatus(404)
        return res.json(result)
    })
})

// simple route to deactivate a form
app.get("/edit/:formId/deactivate",auth.sameUser,(req,res)=>{
    Form.findById(req.params.formId,(err,result)=>{
        if(err) return console.log(err)
        if(!result) return res.sendStatus(404)
        result.active=false
        result.save((err,form)=>{
            if(err) console.log(err)
            else res.redirect("/form/"+form._id)
        })
    })
})

app.get("/edit/:formId/delete",auth.sameUser,(req,res)=>{
    Form.findByIdAndDelete(req.params.formId,(err)=>{
        if(err) return console.log(err)
        res.sendStatus(200)
    })
})

// save edits to the form, if any
app.post("/edit/:formId",auth.sameUser,(req,res)=>{
    Form.findById(req.params.formId,(err,result)=>{
        if(err) return console.log(err)
        if(!result) return res.sendStatus(404)
        result.questions=req.body.questions
        result.active=req.body.active
        result.save((err,form)=>{
            if(err) console.log(err)
            else res.redirect("/form/"+form._id)
        })
    })
})

module.exports=app