"use client";
import { useState } from "react";
import Link from "next/link";
import SignIn from "./signIn/page";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = formData;

    if (!name || !email) {
      setError("All fields are required.");
      setSuccessMessage("");
      return;
    }

    setError(null);
    setSuccessMessage("Account created successfully!");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Account</h2>

      {error && <div style={styles.error}>{error}</div>}
      {successMessage && (
        <div style={styles.success}>{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleFormData}
          style={styles.input}
          placeholder="Enter your name"
          required
        />
        <br />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormData}
          style={styles.input}
          placeholder="Enter your email"
          required
        />
        <br />

        <button type="submit" style={styles.button}>
          Create Account
        </button>
      </form>

      <div style={styles.linkText}>
        Already have an account?{" "}
        <Link href="/signIn" style={styles.link}>
          SignIn
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "25rem", // Approximately 400px
    margin: "3rem auto",
    padding: "1.25rem", // 20px
    border: "0.063rem solid #ccc", // 1px
    borderRadius: "0.625rem", // 10px
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem", // 24px
    fontWeight: "bold",
    marginBottom: "1.25rem", // 20px
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.625rem", // 10px
    margin: "0.625rem 0", // 10px
    fontSize: "1rem", // 16px
    borderRadius: "0.313rem", // 5px
    border: "0.063rem solid #ccc", // 1px
    width: "100%",
  },
  button: {
    padding: "0.625rem", // 10px
    fontSize: "1rem", // 16px
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "0.313rem", // 5px
    cursor: "pointer",
    marginTop: "0.625rem", // 10px
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "#ff4d4d",
    marginBottom: "0.625rem", // 10px
    fontSize: "1rem", // 16px
  },
  success: {
    color: "#28a745",
    marginBottom: "0.625rem", // 10px
    fontSize: "1rem", // 16px
  },
  linkText: {
    marginTop: "1.25rem", // 20px
    fontSize: "0.875rem", // 14px
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default SignUp;