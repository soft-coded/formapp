const mongoose=require("mongoose")

const formSchema=new mongoose.Schema({
    /* id: use the automatically generated mongoDB id 
    for this purpose */
    creator: String, 
    questions: [Object],
    /* a single question object will have its description, question
    type (mcq, paragraph etc) and choices, if any */
    responses: [Object],
    /* a single response object will have a response by a unique user to all
    questions of the form that the user answered */
    active: Boolean // whether to take responses or not
})

module.exports=mongoose.model("Form", formSchema)