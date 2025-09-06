const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  createPatient,
  getPatients,
} = require("../controllers/patientController");

router.post("/", auth, createPatient);
router.get("/", auth, getPatients);

module.exports = router;
