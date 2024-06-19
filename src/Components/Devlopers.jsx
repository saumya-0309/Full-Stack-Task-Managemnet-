import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Devloper = () => {
  const [Devloper, setDevloper] = useState([]);

  const fetchData = async () => {
    setDevloper([]);
    try {
    const { data: response}  = await axios
    .get(`${import.meta.env.VITE_APP_API_PATH}/getdeveloper`);   
        setDevloper(response.Result);
      }  catch(error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  // delete the devloper list
  const handleDelete = (id) => {
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
          .delete(`${import.meta.env.VITE_APP_API_PATH}/delete_devloper/${id}`)
          .then(async (result) => {
            console.log(result);
            if (result.data.Status) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              await fetchData();
            } else {
              Swal.fire({
                title: "You Cannot Delete a Developer Who Has Assigned Task!",
                text: "Error",
                icon: "error"
              });
            }
      });
    }
  });
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Devloper List</h3>
      </div>
      <Link to="/dashboard/add_devlopers" className="btn btn-success">
        Add Devloper
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Category</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Devloper.map((e, index) => (
              <tr key={index}>
                <td>{e.name}</td>
                <td>
                  <img
                    src={
                      `${import.meta.env.VITE_APP_API_PATH}/` + e.image
                    }
                    className="Devloper_image"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.category_id}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_devloper/` + e.id}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Devloper;
