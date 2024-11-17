// const sql = require("./db.js");

// // to map student data
// const Student = function (student) {
//   this.roll_no = student.roll_no;
//   this.name = student.name;
//   this.branch = student.branch;
//   this.gender = student.gender;
// };

// // get all students
// Student.getAll = (result) => {
//   sql.query("SELECT * FROM students", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     } else {
//       console.log("students: ", res);
//       result(null, res);
//     }
//   });
// };

// // add new student
// Student.add = (newStudent, result) => {
//   sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     } else {
//       console.log("added student: ", { roll_no: res.insertId, ...newStudent });
//       result(null, { roll_no: res.insertId, ...newStudent });
//     }
//   });
// };

// // update student data
// Student.update = (roll_no, student, result) => {
//   sql.query(
//     "UPDATE students SET name = ?, branch = ?, gender = ? WHERE roll_no = ?",
//     [student.name, student.branch, student.gender, roll_no],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         result({ kind: "notfound" }, null);
//         return;
//       }

//       console.log("updated student: ", { roll_no: roll_no, ...student });
//       result(null, { roll_no: roll_no, ...student });
//     }
//   );
// };

// // delete the student
// Student.delete = (roll_no, result) => {
//   sql.query("DELETE FROM students WHERE roll_no = ?", roll_no, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     if (res.affectedRows == 0) {
//       result({ kind: "notfound" }, null);
//       return;
//     }
//     console.log("deleted student with roll_no: ", roll_no);
//     result(null, res);
//   });
// };

// module.exports = Student;

const sql = require("./db.js");

// Map student data
const Student = function (student) {
  this.name = student.name;
  this.gender = student.gender;
  this.rollnum = student.rollnum;
  this.branch = student.branch;
};

// Get all students
Student.getAll = (result) => {
  sql.query("SELECT * FROM students", (err, res) => {
    if (err) {
      console.error("Error fetching students: ", err);
      result(null, err);
      return;
    }
    console.log("Students: ", res);
    result(null, res);
  });
};

// Add a new student
Student.add = (newStudent, result) => {
  sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
    if (err) {
      console.error("Error adding student: ", err);
      result(err, null);
      return;
    }
    console.log("Added student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

// Update student data
Student.update = (id, student, result) => {
  sql.query(
    "UPDATE students SET name = ?, gender = ?, rollnum = ?, branch = ? WHERE id = ?",
    [student.name, student.gender, student.rollnum, student.branch, id],
    (err, res) => {
      if (err) {
        console.error("Error updating student: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated student: ", { id: id, ...student });
      result(null, { id: id, ...student });
    }
  );
};

// Delete a student
Student.delete = (id, result) => {
  sql.query("DELETE FROM students WHERE id = ?", id, (err, res) => {
    if (err) {
      console.error("Error deleting student: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted student with id: ", id);
    result(null, res);
  });
};

module.exports = Student;

