import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${import.meta.env.VITE_APP_API_PATH}/profileDetails`,
          { headers: { Authorization: "Bearer " + cookies.token } }
        );
        setProfile(response.Result);
        console.log(response.Result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cookies.token]);

  return (
    <div className="p-2 g-col-6   mt-3">
      {profile && profile.role === "admin" && (
        <div className="px-3 pt-2 pb-3 border border-warning-subtle shadow-lg ">
          <div className="d-flex justify-content-center text-center pb-1">
            <h3 className="text-warning">Manager</h3>
          </div>
          <div className="mt-3 d-flex justify-content-between">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{profile.username}</td>
                  <td>{profile.emaill}</td>
                  <td>{profile.role}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {profile && profile.role === "devloper" && (
        <div className="px-3 pt-2 pb-3 border border-warning-subtle shadow-lg ">
          <div className="d-flex justify-content-center text-center pb-1">
            <h3 className="text-warning">Developer</h3>
          </div>
          <div className="mt-3 m-5  d-flex justify-content-between">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{profile.name}</td>

                  <td>
                    <img
                      src={`${import.meta.env.VITE_APP_API_PATH}/${
                        profile.image
                      }`}
                      alt={profile.name}
                      className="Devloper_image"
                    />
                  </td>

                  <td>{profile.email}</td>
                  <td>{profile.address}</td>
                  <td>{profile.salary}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
