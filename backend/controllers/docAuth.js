
import  {Doc } from '../Models/Doc.js'
 export const AddDocument = async(req,res)=>{
    const newdoc = new Doc({
        id:req.body.id,
        title: req.body.title,
        requirement:req.body.requirement,
        intro:req.body.intro,
        useCase:req.body.useCase,
        process:req.body.process
        
    })
    console.log(newdoc);
    await newdoc.save();
     console.log("Saved");
    res.json({
        success:true,
        name :req.body.title,

    })

 }

  