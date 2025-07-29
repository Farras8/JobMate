const companyService = require("../services/company.service.js");

const handleAddCompanies = async (req, res) => {
  try {
    await companyService.addCompanies(req.body);
    res.status(201).json({ message: "Companies added successfully" });
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to add companies", details: err.message });
  }
};

const handleGetCompanies = async (req, res) => {
  try {
    const companies = await companyService.getCompanies(req.query);
    res.status(200).json({ companies });
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to get companies", details: err.message });
  }
};

const handleGetCompanyById = async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    res.status(200).json(company);
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to get company detail", details: err.message });
  }
};

const handleUpdateCompany = async (req, res) => {
  try {
    await companyService.updateCompany(req.params.id, req.body);
    res.status(200).json({ message: "Company updated successfully" });
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to update company", details: err.message });
  }
};

const handleDeleteCompany = async (req, res) => {
  try {
    await companyService.deleteCompany(req.params.id);
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to delete company", details: err.message });
  }
};

const handleUpdateActiveJobCount = async (req, res) => {
  try {
    const count = await companyService.updateActiveJobCount();
    res.status(200).json({ message: `Updated activeJobCount for ${count} companies.` });
  } catch (err) {
    res.status(err.status || 500).json({ error: "Failed to update activeJobCount", details: err.message });
  }
};

module.exports = {
  handleAddCompanies,
  handleGetCompanies,
  handleGetCompanyById,
  handleUpdateCompany,
  handleDeleteCompany,
  handleUpdateActiveJobCount,
};