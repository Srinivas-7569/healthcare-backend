const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

router.post("/", auth, createDoctor);
router.get("/", auth, getDoctors);
router.get("/:id", auth, getDoctorById);
router.put("/:id", auth, updateDoctor);
router.delete("/:id", auth, deleteDoctor);

module.exports = router;
