
import { Doc } from '../Models/Doc.js'

export const AddDocument = async (req, res) => {
  try {
    const { title, requirement, intro, useCase, process, fields } = req.body;

    const staticCount = 3; // number of static docs

    // Find the highest dynamic ID in DB
    const lastDoc = await Doc.findOne({ id: { $gte: staticCount } }).sort({ id: -1 });
    const newId = lastDoc ? lastDoc.id + 1 : staticCount + 1; // start after static IDs

    const newDoc = new Doc({
      id: newId,
      title,
      requirement,
      intro,
      useCase,
      process,
      fields: fields || [], // save dynamic fields, default to empty array if none
      ownerId: req.userId,
      versions: [{ versionNo: 1, status: "draft", fields: req.body.fields || [] }]
    });
    await newDoc.save();
    res.json({ success: true, message: "Document added successfully!", id: newId });
  } catch (error) {
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


export const updateDocument = async (req, res) => {
  const { id } = req.params;
  const { title, requirement, intro, useCase, process, fields } = req.body;

  try {
    const doc = await Doc.findById(id);
    if (!doc) return res.status(404).json({ success: false, message: "Document not found" });

     if (doc.ownerId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: "You are not allowed to edit this document" 
      });
    }

    const currentVersion = doc.versions[doc.currentVersion - 1];
    if (currentVersion.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "Approved documents cannot be edited!"
      });
    }

    // Update fields for draft/rejected
    currentVersion.fields = fields;
    currentVersion.status = "draft"; 
    doc.title = title;
    doc.requirement = requirement;
    doc.intro = intro;
    doc.useCase = useCase;
    doc.process = process;

    await doc.save();
    res.json({ success: true, data: doc, message: "Document updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDoc = await Doc.findByIdAndDelete(id);
    if (!deletedDoc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    res.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitForReview = async (req, res) => {
  try {
    const { id, fields } = req.body;
    const doc = await Doc.findById(id);
    if (!doc)
      return res.status(404).json({ success: false, message: "Document not found" });
    // Get the current version 
    const currentVersion = doc.versions[doc.currentVersion - 1];
    // Only allow draft or rejected versions to be submitted
    if (currentVersion.status !== "draft" && currentVersion.status !== "rejected") {
      return res.status(400).json({
        success: false,
        message: "You can only resubmit rejected or draft documents."
      });
    }
  // Update version fields and set status to pending
    currentVersion.fields = fields;
    currentVersion.status = "pending";
    //  Update overall document status
    doc.status = "Under Review";
    await doc.save();
    return res.status(200).json({
      success: true,
      message: "Document submitted for review successfully!",
      doc,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Review a document
export const reviewDocument = async (req, res) => {
  const { docId } = req.params;
  const { action, comment } = req.body; // "approve" or "reject"
  const reviewerId = req.userId;
  try {
    const doc = await Doc.findById(docId);
    if (!doc)
      return res.status(404).json({ success: false, message: "Document not found" });
    const currentVersion = doc.versions[doc.currentVersion - 1];
    // Assign reviewer info
    currentVersion.reviewerId = reviewerId;
    currentVersion.reviewerComments = comment || "";

    if (action === "approve") {
      currentVersion.status = "approved";
      doc.status = "Approved";
      // No new version created on approval
    } else if (action === "reject") {
      currentVersion.status = "rejected";
      doc.status = "Rejected";
      // Create a new editable draft version
      const nextVersion = {
        versionNo: doc.versions.length + 1, // next version number
        fields: JSON.parse(JSON.stringify(currentVersion.fields)), // clone previous fields
        status: "draft",
        reviewerComments: "",
      };
      doc.versions.push(nextVersion);
      doc.currentVersion = doc.versions.length; 
    }
    await doc.save();
    return res.json({
      success: true,
      message: `Document ${action}ed successfully`,
      doc,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


