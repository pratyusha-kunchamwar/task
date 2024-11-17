const sql = require("./db.js");

// to map student data
const Student = function (student) {
  this.roll_no = student.roll_no;
  this.name = student.name;
  this.branch = student.branch;
  this.gender = student.gender;
};

// get all students
Student.getAll = (result) => {
  sql.query("SELECT * FROM students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } else {
      console.log("students: ", res);
      result(null, res);
    }
  });
};


// add new student
Student.add = (newStudent, result) => {
  sql.query("INSERT INTO students (roll_no, name, gender, branch) VALUES (?, ?, ?, ?)", 
    [newStudent.roll_no, newStudent.name, newStudent.gender, newStudent.branch], 
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } else {
        console.log("added student: ", newStudent);
        result(null, newStudent);  
      }
    });
};


// update student data
Student.update = (roll_no, student, result) => {
  sql.query(
    "UPDATE students SET name = ?, branch = ?, gender = ? WHERE roll_no = ?",
    [student.name, student.branch, student.gender, roll_no],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "notfound" }, null);
        return;
      }

      console.log("updated student: ", { roll_no: roll_no, ...student });
      result(null, { roll_no: roll_no, ...student });
    }
  );
};

// delete the student
Student.delete = (roll_no, result) => {
  sql.query("DELETE FROM students WHERE roll_no = ?", roll_no, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "notfound" }, null);
      return;
    }
    console.log("deleted student with roll_no: ", roll_no);
    result(null, res);
  });
};

module.exports = Student;

