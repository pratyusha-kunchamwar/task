import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const StudentForm = ({
  open,
  handleClose,
  formData,
  handleFormData,
  handleSubmit,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "30rem",
          }}
        >
          <TextField
            sx={{ marginTop: "0.5rem" }}
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormData}
            fullWidth
            required
          />

          {/* Gender */}
          <FormControl fullWidth required>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleFormData}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* Roll Number */}
          <TextField
            required
            label="Roll Number"
            name="rollnum"
            value={formData.rollnum}
            onChange={handleFormData}
            fullWidth
          />

          {/* Branch */}
          <FormControl fullWidth required>
            <InputLabel>Branch</InputLabel>
            <Select
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleFormData}
            >
              <MenuItem value="Computer Science">Computer Science</MenuItem>
              <MenuItem value="Mechanical">Mechanical</MenuItem>
              <MenuItem value="Electrical">Electrical</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "5.5rem" }}
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentForm;
