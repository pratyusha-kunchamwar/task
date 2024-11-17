"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import StudentDelete from "../components/StudentDelete";

const Homepage = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    rollnum: "",
    branch: "",
  });
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // api calling
  const getStudents = async () => {
    try {
      let response = await axios.get("http://localhost:8086/api/students");
      setStudents(response.data);
    } catch (error) {
      setError(error);
    }
  };
  //add students
  const addStudents = async () => {
    const mappedData = {
      name: formData.name,
      gender: formData.gender,
      roll_no: formData.rollnum, 
      branch: formData.branch,
    };
    try {
      await axios.post("http://localhost:8086/api/students", mappedData);
    } catch (error) {
      setError(error);
    }
  };
  //edit students
  const editTheStudents = async () => {
    try {
      await axios.put("http://localhost:8086/api/students", formData);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    getStudents();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      gender: "",
      rollnum: "",
      branch: "",
    });
    setIsEditMode(false);
  };

  //for student data
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.gender ||
      !formData.rollnum ||
      !formData.branch
    ) {
      alert("Enter all fields");
      return;
    } else {
      if (isEditMode) {
        setStudents((prev) =>
          prev.map((student) =>
            student.rollnum === formData.rollnum ? formData : student
          )
        );
      } else {
        addStudents();
      }
      setFormData({
        name: "",
        gender: "",
        rollnum: "",
        branch: "",
      });
      handleClose();
    }
  };

  // to edit
  const handleEdit = (rollnum) => {
    const studentToEdit = students.find(
      (student) => student.rollnum === rollnum
    );
    if (studentToEdit) {
      setFormData(studentToEdit);
      setIsEditMode(true);
      handleClickOpen();
    } else {
      return;
    }
  };
  // to delete

  const handleDelete = (rollnum) => {
    const student = students.find((student) => student.rollnum === rollnum);
    setStudentToDelete(student);
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = () => {
    if (studentToDelete) {
      setStudents(
        students.filter(
          (student) => student.rollnum !== studentToDelete.rollnum
        )
      );
    }
    setOpenDeleteDialog(false);
    setStudentToDelete(null);
  };
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setStudentToDelete(null);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Students</h1>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="primary"
        style={{ marginLeft: "1rem" }}
      >
        Add Student
      </Button>
      <StudentForm
        open={open}
        handleClose={handleClose}
        formData={formData}
        handleFormData={handleFormData}
        handleSubmit={handleSubmit}
      />
      <StudentTable
        students={students}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <StudentDelete
        open={openDeleteDialog}
        student={studentToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default Homepage;
