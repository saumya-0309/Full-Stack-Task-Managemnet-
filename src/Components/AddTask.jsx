import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTask = () => {
  const [Task, setTask] = useState({
    name: "",
    description: "",
    duration: "",
    devloper_id: "",
    category_id: "",
    status:"Pending",
  });
  const [category, setCategory] = useState([]);
  const [devloper, setDevloper] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_PATH}/category`)
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
         
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  //   for Devloper

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_PATH}/getdeveloper`)
      .then((result) => {
        
        if (result.data.Status) {
          console.log(result)
          setDevloper(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
   await axios
      .post(`${import.meta.env.VITE_APP_API_PATH}/add_tasks`, {"name":Task.name , "description":Task.description , "duration":Task.duration , "devloper_id":Task.devloper_id , "category_id":Task.category_id , status:Task.status})
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          toast("task assigned successfully");
          setTimeout(() => {
            navigate('/dashboard/');
          }, 1500);
        } else {
          // console.log(result.data.Error);
          console.log(result.data)
         
        }
      })
      .catch((err) =>  alert(err.response.data.Error));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="p-3 rounded w-50 border ">
        <h3 className="text-center">Add Task</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Task Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Task Name"
              onChange={(e) => setTask({ ...Task, name: e.target.value })}
            />
          </div>

          {/* descriptionription */}
          <div className="col-12">
            <label for="inputDesc" className="form-label">
              Task Description
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputDesc"
              placeholder="Enter Description"
              autoComplete="off"
              onChange={(e) => setTask({ ...Task, description: e.target.value })}
            />
          </div>
          {/* Duration */}
          <div className="col-12">
            <label for="inputDuration" className="form-label">
              Duration
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputDuration"
              placeholder=" Months"
              autoComplete="off"
              onChange={(e) => setTask({ ...Task, duration: e.target.value })}
            />
          </div>
          {/* Devloper Id */}
          <div className="col-12">
            <label for="devloper" className="form-label">
              Devlopers
            </label>
            <select
              name="devloper"
              id="devloper"
              className="form-select"
              onChange={(e) =>
                setTask({ ...Task, devloper_id: e.target.value })
              }
            >
              {devloper.map((c, index) => {
                return <option value={c.id}>{c.name}</option>
                key = { index };
              })}
            </select>
          </div>

          {/* category Id */}
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setTask({ ...Task, category_id: e.target.value })
              }
            >
              {category.map((c, index) => {
                return <option key={index} value={c.id}>{c.name}</option>
              })}
            </select>
          </div>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Task Status
            </label>
            <select
              name="status"
              id="status"
              className="form-select"
              onChange={(e) =>
                setTask({ ...Task, status: e.target.value })
              }
            >
              {["Pending" , "Working" , "Testing" , "Completed"].map((c, index) => {
                return <option key={index} selected={c === "Pending"} value={c}>{c}</option>
              })}
            </select>
          </div>

          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary w-100">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
