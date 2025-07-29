function cleanDescription(description) {
  if (typeof description !== 'string') return '';
  return description.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
}

module.exports = {
  cleanDescription,
};