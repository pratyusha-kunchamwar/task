"use client";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Simulated stored user email
  const storedUser = {
    email: "user@example.com", // Replace with actual storage retrieval or database logic
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      setSuccessMessage("");
      return;
    }

    if (email === storedUser.email) {
      setError(null);
      setSuccessMessage("Login successful!");
    } else {
      setError("Invalid email address.");
      setSuccessMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign In</h2>

      {error && <div style={styles.error}>{error}</div>}
      {successMessage && (
        <div style={styles.success}>{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your email"
          required
        />
        <br />
        <br />

        <button type="submit" style={styles.button}>
          Sign In
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "#ff4d4d",
    marginBottom: "10px",
  },
  success: {
    color: "#28a745",
    marginBottom: "10px",
  },
};


export default SignIn;
