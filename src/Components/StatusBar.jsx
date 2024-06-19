import axios from "axios";
import React, { useEffect, useState } from "react";
useState;

const StatusBar = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [DevloperTotal, setDevloperTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    adminCount();
    DevloperCount();
    salaryCount();
  }, []);

 
    useEffect(() =>{
      const fetchData = async () => {
        setAdmins([]);
        try{
          const {data :response} = await
          axios
          .get(`${import.meta.env.VITE_APP_API_PATH}/admin_records`);
          console.log(response);
          setAdmins(response.Result);
        } catch (error){}
      };
      fetchData();
    }, []);
          
   
  
  const adminCount = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API_PATH}/admin_count`)
      .then((result) => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin);
        }
      });
  };
  const DevloperCount = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API_PATH}/devloper_count`)
      .then((result) => {
        if (result.data.Status) {
          setDevloperTotal(result.data.Result[0].devloper);
        }
      });
  };
  const salaryCount = () => {
    axios
      .get(`${import.meta.env.VITE_APP_API_PATH}/salary_count`)
      .then((result) => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp);
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5> {adminTotal} </h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Devloper</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{DevloperTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>INR {salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              
            </tr>
          </thead>
          <tbody>
            {admins.map((a,index) => (
              <tr key="id" >
                <td>{a.emaill}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatusBar;
