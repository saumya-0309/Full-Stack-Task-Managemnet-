import React from "react";
import "./style.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    emaill: "",
    password: "",
  });
  const [error, setError] = useState(null);
  axios.defaults.withCredentials = true;
  
  const handleSubmit = (event) => {
    console.log(values);
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_API_PATH}/adminlogin`, values)
      .then((result) => {
        if (result.data.Status) {
          window.location = "/dashboard";
        } else {
          alert("No Record");
        }
      })
      .catch((err) => console.error(err));


  };
  return (
    <div className="d-flex justify-content-center align-items-center  vh-100  loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <div className="text-danger">{error && error}</div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          {/* Email  */}
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your email address"
              onChange={(e) => setValues({ ...values, emaill: e.target.value })}
              className="form-control rounded-0"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            <strong>Log in</strong>
          </button>
          <div className="mb-1"></div>
        </form>
        <p className="text-center mt-3 text-secondary">
          If you don't have account,Please{" "}
          <Link to="/adminSignUp">SignUp Now </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
