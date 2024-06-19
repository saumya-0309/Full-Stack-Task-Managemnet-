import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const Task = () => {
  const [Task, setTask] = useState([]);
  const [user , setUser] = useState({});

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const fetchdata = async () => {
    try {
      const { data: response } = await axios.get(
        `${import.meta.env.VITE_APP_API_PATH}/get_task`
      );
      setTask(response.Result);
    } catch (error) {}
  }
  

  const fetchUser = async () => {
    try {
      const { data: response } = await axios.get(
       `${import.meta.env.VITE_APP_API_PATH}/getuser`,
       { headers: { Authorization: "Bearer " + cookies.token } }
      );
    setUser(response.user);
  } catch (error) {
    console.log(error);
  }
  };

  useEffect(() => {
    fetchUser();
    fetchdata();
  }, []);

  // delete the Task list
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
      await axios
          .delete(`${import.meta.env.VITE_APP_API_PATH}/delete_task/${id}`)
          .then(async (result) => {
            console.log(result);
            if (result.data.success) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              await fetchdata();
            } else {
              console.log(result.data.Error);
            }
      });
      }
    });
  };
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Task List</h3>
      </div>
      {user.role === "admin" && <Link to="/dashboard/add_task" className="btn btn-success">
        Add Task
      </Link>}
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Devloper</th>
              <th>Category</th>
              <th>Status</th>
              {user.role === "admin" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {Task.map((e, index) => (
              <tr key={index}>
                <td>{e.task_name}</td>
                <td>{e.description}</td>
                <td>{e.duration}</td>
                <td>{e.devloper_name}</td>
                <td>{e.category}</td>
                <td>{e.status}</td>
                {user.role === "admin" && <td>
                  <Link
                    to={`/dashboard/edit_task/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
