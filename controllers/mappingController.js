const pool = require("../db");

// Assign doctor to patient
exports.assignDoctor = async (req, res) => {
  const { patient_id, doctor_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO mappings (patient_id, doctor_id) VALUES ($1, $2) RETURNING *",
      [patient_id, doctor_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all mappings
exports.getAllMappings = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT m.id, p.name AS patient_name, d.name AS doctor_name " +
        "FROM mappings m " +
        "JOIN patients p ON m.patient_id = p.id " +
        "JOIN doctors d ON m.doctor_id = d.id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get doctors for a specific patient
exports.getDoctorsForPatient = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const result = await pool.query(
      "SELECT d.* FROM mappings m JOIN doctors d ON m.doctor_id = d.id WHERE m.patient_id=$1",
      [patient_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Remove doctor from patient
exports.removeMapping = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM mappings WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Mapping not found" });
    res.json({ message: "Mapping removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
