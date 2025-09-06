const pool = require("../db");

// Add a new patient
exports.createPatient = async (req, res) => {
  const { name, age, gender, contact, address } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO patients (name, age, gender, contact, address, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, age, gender, contact, address, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all patients created by this user
exports.getPatients = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM patients WHERE created_by = $1",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
