import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Devlopers from "./Components/Devlopers";
import Profile from "./Components/Profile";
import Task from "./Components/Task";
import Category from "./Components/Category";
import AddCategory from "./Components/AddCategory";
import AddDevloper from "./Components/AddDevloper";
import SignUp from "./Components/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute";
import EditDevloper from "./Components/EditDevloper";
import EditTask from "./Components/EditTask";
import AddTask from "./Components/AddTask";
import StatusBar from "./Components/StatusBar";
import Start from "./Components/Start";
import DevloperLogin from "./Components/DevloperLogin";

function App() {
  console.log(import.meta.env);
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />}>
          {" "}
        </Route>
        <Route path="/devloper_login" element={<DevloperLogin />}></Route>
        <Route path="/adminSignUp" element={<SignUp />}>
          {" "}
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<Home />}></Route>
            <Route path="/dashboard/devlopers" element={<Devlopers />}></Route>
            <Route path="/dashboard/tasks" element={<Task />}></Route>
            <Route path="/dashboard/category" element={<Category />}></Route>
            <Route path="/dashboard/status_bar" element={<StatusBar/>}></Route>
            <Route path="/dashboard/profile" element={<Profile />}></Route>
            <Route
              path="/dashboard/add_category"
              element={<AddCategory />}
            ></Route>
            <Route
              path="/dashboard/add_devlopers"
              element={<AddDevloper />}
            ></Route>
            <Route
              path="/dashboard/edit_devloper/:id"
              element={<EditDevloper />}
            ></Route>
            <Route
              path="/dashboard/edit_task/:id"
              element={<EditTask />}
            ></Route>
            <Route path="/dashboard/add_task" element={<AddTask />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
