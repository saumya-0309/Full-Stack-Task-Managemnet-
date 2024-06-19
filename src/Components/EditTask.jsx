import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditTask = () => {
  const { id } = useParams();
  const [Task, setTask] = useState({
    id : "",
    name: "",
    description: "",
    duration: "",
    devloper_id: "",
    category_id: "",
    status:"",
  });
  const [category, setCategory] = useState([]);
  const [Devloper, setDevloper] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
    const fetchData = async () => {
    await   axios
      .get(`${import.meta.env.VITE_APP_API_PATH}/category`)
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
    };
     fetchData();

     const addData = async () =>{
      await axios
      .get(`${import.meta.env.VITE_APP_API_PATH}/getdeveloper`)
      .then((result) => {
        if (result.data.Status) {
          setDevloper(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
     };
     addData();
      
    axios
      .get(`${import.meta.env.VITE_APP_API_PATH}/get_task/${id}`)
      .then((result) => {
        setTask({
          ...Task,
          id: result.data.Result[0].id,
          name: result.data.Result[0].task_name,
          description: result.data.Result[0].description,
          duration: result.data.Result[0].duration,
          devloper_id: result.data.Result[0].d_id,
          category_id: result.data.Result[0].c_id,
          status:result.data.Result[0].status,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_APP_API_PATH}/edit_task/${id}`, Task)
      .then((result) => {
        if (result.data.Status) {
          toast("Task Edit successfully");
          setTimeout(() => {
            navigate('/dashboard/');
          }, 1500);
        } else {
          console.log(result.data.Error);
          
        }
      })
      .catch((err) => {
        alert(err.response.data.Error)
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Task</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          {/* Task Name */}
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={Task.name}
              onChange={(e) => setTask({ ...Task, name: e.target.value })}
            />
          </div>
          {/* Task Desc */}
          <div className="col-12">
            <label for="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="description"
              placeholder="Enter Description"
              autoComplete="off"
              value={Task.description}
              onChange={(e) => setTask({ ...Task, description: e.target.value })}
            />
          </div>
          {/* Task Duration */}
          <div className="col-12">
            <label for="inputDuration" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputDuration"
              placeholder="Months"
              autoComplete="off"
              value={Task.duration}
              onChange={(e) => setTask({ ...Task, duration: e.target.value })}
            />
          </div>
          {/* TAsk Devloper Id */}
          <div className="col-12">
            <label for="devloper" className="form-label">
              Devloper
            </label>
            <select
              name="devloper"
              id="devloper"
              className="form-select"
              onChange={(e) =>
                setTask({ ...Task, devloper_id: e.target.value })
              }
            >
              {Devloper.map((c) => {
                return <option selected={c.id == Task.devloper_id} value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>

          {/* Task Category Id */}
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
              {category.map((c) => {
                return <option selected={c.id == Task.category_id} value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>
          {/* TASK Status */}
          <div className="col-12">
            <label for="inputName" className="form-label">
              Task Status
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Task Status"
              value={Task.status}
              onChange={(e) => setTask({ ...Task, status: e.target.value })}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;




// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const EditTask = () => {
//   const { id } = useParams();
//   const [task, setTask] = useState({
//     name: "",
//     description: "",
//     duration: "",
//     developer_id: "",
//     category_id: "",
//   });
//   const [categories, setCategories] = useState([]);
//   const [developers, setDevelopers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTaskData = async () => {
//       try {
//         const taskResponse = await axios.get(`${import.meta.env.VITE_APP_API_PATH}/dashboard/${id}`);
//         setTask({
//           name: taskResponse.data.Result[0].name,
//           description: taskResponse.data.Result[0].description,
//           duration: taskResponse.data.Result[0].duration,
//           developer_id: taskResponse.data.Result[0].developer_id,
//           category_id: taskResponse.data.Result[0].category_id,
//         });
//       } catch (error) {
//         console.error("Error fetching task data:", error);
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const categoryResponse = await axios.get(`${import.meta.env.VITE_APP_API_PATH}/category/${id}`);
//         setCategories(categoryResponse.data.Result);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     const fetchDevelopers = async () => {
//       try {
//         const developerResponse = await axios.get(`${import.meta.env.VITE_APP_API_PATH}/dashboard/developers/${id}`);
//         setDevelopers(developerResponse.data.Result);
//       } catch (error) {
//         console.error("Error fetching developers:", error);
//       }
//     };

//     fetchTaskData();
//     fetchCategories();
//     fetchDevelopers();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTask({ ...task, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put(`${import.meta.env.VITE_APP_API_PATH}/edit_task/${id}`, task)
//       .then((result) => {
//         if (result.data.result) {
//           navigate("/dashboard");
//         } else {
//           alert(result.data.Error);
//         }
//       })
//       .catch((err) => console.error("Error updating task:", err));
//   };

//   return (
//     <div>
//       <h1>Edit Task</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={task.name}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Description</label>
//           <input
//             type="text"
//             name="description"
//             value={task.description}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Duration</label>
//           <input
//             type="text"
//             name="duration"
//             value={task.duration}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Developer</label>
//           <select
//             name="developer_id"
//             value={task.developer_id}
//             onChange={handleInputChange}
//           >
//             {developers.map((developer) => (
//               <option key={developer.id} value={developer.id}>
//                 {developer.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Category</label>
//           <select
//             name="category_id"
//             value={task.category_id}
//             onChange={handleInputChange}
//           >
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button type="submit">Update Task</button>
//       </form>
//     </div>
//   );
// };

// export default EditTask;
