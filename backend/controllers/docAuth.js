
import  {Doc } from '../Models/Doc.js'
export const AddDocument = async (req, res) => {
  try {
    const newDoc = new Doc({
      title: req.body.title,
      requirement: req.body.requirement,
      intro: req.body.intro,
      useCase: req.body.useCase,
      process: req.body.process,
    });

    await newDoc.save();
    res.json({ success: true, data: newDoc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getDocuments = async (req, res) => {
  try {
    const docs = await Doc.find();
    res.json({
      success: true,
      data: docs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// export const updateDocument = async(req,res)=>{
//   const {id} = req.params;
//   const{title,requirement,intro,useCase,process} = req.body;
//   try {
//     const updateDoc = await Doc.findOneAndUpdate(
//       {id},// find document by id
//       {title,requirement,intro,useCase,process},
//       {new:true} //return updated document
//     )
//     if(!updateDoc){
//       return res.json.status(404).json({success:false,message:'Document not found'})
//     }
//      res.json({ success: true, data: updatedDoc, message: 'Document updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

export const updateDocument = async (req, res) => {
  try {
    const updatedDoc = await Doc.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    res.json({ success: true, data: updatedDoc, message: 'Document updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// export const deleteDocument = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedDoc = await Doc.findOneAndDelete({ id });

//     if (!deletedDoc) {
//       return res.status(404).json({ success: false, message: 'Document not found' });
//     }

//     res.json({ success: true, message: 'Document deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
export const deleteDocument = async (req, res) => {
  try {
    const deletedDoc = await Doc.findByIdAndDelete(req.params.id);

    if (!deletedDoc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    res.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

