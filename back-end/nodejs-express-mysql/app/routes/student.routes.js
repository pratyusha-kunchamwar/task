const express = require("express");
const router = express.Router();
const studentController = require("../controller/student.controller.js");

router.get("/students", studentController.getAllStudents);

router.post("/students", studentController.addStudent);

router.put("/students/:id", studentController.updateStudent);

router.delete("/students/:id", studentController.deleteStudent);

module.exports = router;
