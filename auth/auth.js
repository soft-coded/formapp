const Form=require("../models/form")

auth={}

auth.isAuthed=(req,res,next)=>{
    if(req.isAuthenticated()) next()
    else res.sendStatus(401) // unauthorised
}

auth.sameUser=(req,res,next)=>{
    if(req.isAuthenticated()){
        Form.findById(req.params.formId,(err,result)=>{
            if(err) return console.log(err)
            if(!result) return res.sendStatus(404)
            if(result.creator!==req.user.username) 
                return res.sendStatus(403)
            next()
        })
    }
    else res.sendStatus(401)
}

module.exports=auth