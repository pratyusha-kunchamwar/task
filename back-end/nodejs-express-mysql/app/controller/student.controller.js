const Student = require("../models/student.model");

// Get all students
exports.getAllStudents = (req, res) => {
  Student.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    } else {
      res.send(data);
    }
  });
};

// Add a new student
exports.addStudent = (req, res) => {
  if (
    !req.body.roll_no ||
    !req.body.name ||
    !req.body.branch ||
    !req.body.gender
  ) {
    return res.status(400).send({
      message:
        "Content cannot be empty! 'roll_no', 'name', 'branch', and 'gender' are required.",
    });
  }

  const newStudent = new Student({
    roll_no: req.body.rollno,
    name: req.body.name,
    branch: req.body.branch,
    gender: req.body.gender,
  });

  Student.add(newStudent, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the student.",
      });
    } else {
      res.send(data);
    }
  });
};

// Update a student's name, branch, or gender
// Update student data
exports.updateStudent = (req, res) => {
  const roll_no = req.params.roll_no;

  if (!req.body.name && !req.body.branch && !req.body.gender) {
    return res.status(400).send({
      message:
        "At least one of 'name', 'branch', or 'gender' must be provided.",
    });
  }

  const updatedStudent = {};
  if (req.body.name) updatedStudent.name = req.body.name;
  if (req.body.branch) updatedStudent.branch = req.body.branch;
  if (req.body.gender) updatedStudent.gender = req.body.gender;

  Student.update(roll_no, updatedStudent, (err, data) => {
    if (err) {
      if (err.kind === "notfound") {
        res.status(404).send({
          message: `Student with roll_no ${roll_no} not found.`,
        });
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating the student.",
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete a student by roll number
exports.deleteStudent = (req, res) => {
  const roll_no = req.params.roll_no;

  Student.delete(roll_no, (err, data) => {
    if (err) {
      if (err.kind === "notfound") {
        res.status(404).send({
          message: `Student with roll_no ${roll_no} not found.`,
        });
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while deleting the student.",
        });
      }
    } else {
      res.send({
        message: `Student with roll_no ${roll_no} was deleted successfully!`,
      });
    }
  });
};
