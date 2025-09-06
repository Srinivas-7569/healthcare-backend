const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  assignDoctor,
  getAllMappings,
  getDoctorsForPatient,
  removeMapping,
} = require("../controllers/mappingController");

router.post("/", auth, assignDoctor);
router.get("/", auth, getAllMappings);
router.get("/:patient_id", auth, getDoctorsForPatient);
router.delete("/:id", auth, removeMapping);

module.exports = router;
