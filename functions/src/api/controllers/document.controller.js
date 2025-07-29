const documentService = require("../services/document.service.js");

const handleGetDocuments = async (req, res) => {
    try {
        const documents = await documentService.getDocuments(req.user.uid);
        res.status(200).json({ documents });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to get documents", details: err.message });
    }
};

const handleUploadDocument = async (req, res) => {
    try {
        const newDocument = await documentService.uploadDocument(req.user.uid, req.body, req.file);
        res.status(201).json({ message: "Document uploaded successfully", document: newDocument });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to upload document", details: err.message });
    }
};

const handleUpdateDocument = async (req, res) => {
    try {
        const updatedData = await documentService.updateDocument(req.user.uid, req.params.documentId, req.body, req.file);
        res.status(200).json({ message: "Document updated successfully", updatedFields: updatedData });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to update document", details: err.message });
    }
};


const handleDeleteDocument = async (req, res) => {
    try {
        await documentService.deleteDocument(req.user.uid, req.params.documentId);
        res.status(200).json({ message: "Document deleted successfully" });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Failed to delete document", details: err.message });
    }
};

module.exports = {
    handleGetDocuments,
    handleUploadDocument,
    handleUpdateDocument,
    handleDeleteDocument,
};