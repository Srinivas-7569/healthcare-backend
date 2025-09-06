const pool = require("../db");

// Add a new doctor
exports.createDoctor = async (req, res) => {
  const { name, specialization, contact, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO doctors (name, specialization, contact, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, specialization, contact, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all doctors
exports.getDoctors = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM doctors");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM doctors WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Doctor not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Update doctor
exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { name, specialization, contact, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE doctors SET name=$1, specialization=$2, contact=$3, email=$4 WHERE id=$5 RETURNING *",
      [name, specialization, contact, email, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Doctor not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM doctors WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
