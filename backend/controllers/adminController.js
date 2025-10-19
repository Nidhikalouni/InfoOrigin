import { User } from "../Models/User.js";
import { Doc } from "../Models/Doc.js";

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDocs = await Doc.countDocuments();
    const pendingDocs = await Doc.countDocuments({ "versions.status": "pending" });
    const rejectedDocs = await Doc.countDocuments({ "versions.status": "rejected" });
    const approvedDocs = await Doc.countDocuments({"versions.status":"approved"})

    return res.status(200).json({
      users: totalUsers,
      docs: totalDocs,
      pending: pendingDocs,
      rejected: rejectedDocs,
      approved:approvedDocs
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllDocuments = async (req, res) => {
  try {
    const docs = await Doc.find()
      .populate("ownerId", "name email") // so we get user details
      .sort({ createdAt: -1 });

    res.json({ docs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents", error: error.message });
  }
};


export const getSingleDocument = async (req, res) => {
  try {
    const { docId } = req.params;
    const doc = await Doc.findById(docId).populate("ownerId", "name email");
    if (!doc) return res.status(404).json({ message: "Document not found" });

    res.json({ success: true, doc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};






