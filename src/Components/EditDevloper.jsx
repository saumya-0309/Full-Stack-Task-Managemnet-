import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditDevloper = () => {
  const { id } = useParams();
  const [Devloper, setDevloper] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setCategory([]);
      try {
        const { data: response } = await axios.get(
          `${import.meta.env.VITE_APP_API_PATH}/category`
        );
        setCategory(response.Result);
      } catch (error) {}
    };
    fetchData();

    axios
      .get(`${import.meta.env.VITE_APP_API_PATH}/devlopers` + id)
      .then((result) => {
        setDevloper({
          ...Devloper,
          id:result.data.Result[0].id,
          name:result.data.Result[0].name,
          email: result.data.Result[0].email,
          address: result.data.Result[0].address,
          salary: result.data.Result[0].salary,
          category_id: result.data.Result[0].category_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .put(`${import.meta.env.VITE_APP_API_PATH}/edit_devloper/${id}`, Devloper)
      .then((result) => {
        if (result.data.result) {
          toast("Devloper Edit successfully");
          setTimeout(() => {
            navigate("/dashboard/devlopers");
          }, 1500);
        } else {
          console.log(result.data.Error);
        }
      })
      .catch((err) =>{ 
        alert(err.response.data.Error)
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Devloper</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          {/* Name of Devloper */}
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={Devloper.name}
              onChange={(e) =>
                setDevloper({ ...Devloper, name: e.target.value })
              }
            />
          </div>

          {/* Email of Devloper */}
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={Devloper.email}
              onChange={(e) =>
                setDevloper({ ...Devloper, email: e.target.value })
              }
            />
          </div>

          {/* Salary of Devloper */}
          <div className="col-12">
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={Devloper.salary}
              onChange={(e) =>
                setDevloper({ ...Devloper, salary: e.target.value })
              }
            />
          </div>

          {/* Address of Devloper */}
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              value={Devloper.address}
              onChange={(e) =>
                setDevloper({ ...Devloper, address: e.target.value })
              }
            />
          </div>

          {/* Get the Category Id from the Category */}
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setDevloper({ ...Devloper, category_id: e.target.value })
              }
            >
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>

          {/* button  */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Devloper
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDevloper;
