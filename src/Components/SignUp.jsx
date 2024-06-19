import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    emaill: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_APP_API_PATH}/adminSignUp`, values)
      .then((result) => {
        console.log(result.data);
        if (result.data.Status) {
          navigate("/dashboard");
        } else {
          setError(result.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center  vh-100  signupPage">
      <div className="p-3 rounded w-25 border signupForm">
        <div className="text-danger"></div>
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Enter your Name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              className="form-control rounded-0"
            />
          </div>

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
          <button className="btn btn-success w-100 rounded-0">
            <strong>Sign Up</strong>
          </button>
          <div className="mb-1"></div>
        </form>

        <p className="text-center mt-3 text-secondary">
          If you have account,Please <Link to="/">Login Now</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
