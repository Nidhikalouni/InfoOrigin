import PDFDocument from "pdfkit";
import { Doc } from "../Models/Doc.js";

export const downloadPDF = async (req, res) => {
  try {
    const { id, versionNo } = req.params;
    const doc = await Doc.findById(id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Document not found" });
    }
    const version = versionNo
      ? doc.versions.find(v => v.versionNo == versionNo)
      : doc.versions[doc.versions.length - 1];
    if (!version) {
      return res.status(404).json({ success: false, message: "Version not found" });
    }
    // Set headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${doc.title}_v${version.versionNo || 1}.pdf`
    );
    // Create PDF
    const pdf = new PDFDocument();
    pdf.pipe(res);

    pdf.fontSize(18).text(doc.title || version.title || "Document", { underline: true });
    pdf.moveDown();
    pdf.fontSize(12).text(`Requirement: ${version.requirement || doc.requirement || ""}`);
    pdf.text(`Intro: ${version.intro || doc.intro || ""}`);
    pdf.text(`Use Case: ${version.useCase || doc.useCase || ""}`);
    pdf.text(`Process: ${version.process || doc.process || ""}`);

    pdf.moveDown();
    (version.fields || []).forEach(field => {
      pdf.text(`${field.label}: ${field.value}`);
    });

    pdf.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to generate PDF" });
  }
};
