import React from "react";
import { Button } from "@mui/material";

const StudentTable = ({ students, handleEdit, handleDelete }) => {
  return (
    <div
      style={{
        overflowX: "auto",
        marginTop: "1rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <table style={{ width: "70%", borderCollapse: "collapse" }}>
        {/* Table Header */}
        <thead>
          <tr style={{ borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: "8px", textAlign: "left" }}>Student No.</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Gender</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Roll Number</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Branch</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "8px" }}>
                No data available
              </td>
            </tr>
          ) : (
            students.map((single) => (
              <tr key={single.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: "8px" }}>{single.id}</td>
                <td style={{ padding: "8px" }}>{single.name}</td>
                <td style={{ padding: "8px" }}>{single.gender}</td>
                <td style={{ padding: "8px" }}>{single.rollnum}</td>
                <td style={{ padding: "8px" }}>{single.branch}</td>
                <td style={{ padding: "8px" }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(single.rollnum)}
                    style={{ marginRight: "0.5rem" }}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" onClick={() => handleDelete(single.rollnum)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
