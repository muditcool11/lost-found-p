import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { adminexists, newAdmin } from "../../services/ItemService";
import Footer from "../User/Footer";
import NavbarAdmin from "./NavbarAdmin";
import "react-toastify/dist/ReactToastify.css";

export default function SignupAdmin() {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {
    let id = localStorage.getItem("adminid");
    if (!id) {
      navigator("/adminlogin");
    }
  }, [navigator]);

  //Saving new admin
  async function saveAdmin(e) {
    e.preventDefault();

    const Admin = {
      "username": username,
      "password": password
    };

    console.log(Admin);

    const adminData = await adminexists(Admin.username);
    console.log(adminData.data);
    if (adminData.data) {
      toast.info("Admin Already exist.");
    } else {
      const newadminData = await newAdmin(Admin);
      toast.success("Admin created successfully");
      console.log(newadminData.data);
    }
  }
  return (
    <div>
      <ToastContainer />
      <NavbarAdmin />
      <section className="py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="text-center mb-3">
                    <h3>Lost and Found Portal</h3>
                    <hr />
                    <h4>Admin SignUp</h4>
                  </div>
                  <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                    Enter details to register
                  </h2>
                  <form onSubmit={saveAdmin}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            name="userName"
                            id="userName"
                            value={username}
                            onChange={handleUsername}
                            placeholder="User Name"
                            required={true}
                          />
                          <label htmlFor="userName" className="form-label">
                            User Name
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={password}
                            onChange={handlePassword}
                            placeholder="Password"
                            required={true}
                          />
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Create Admin
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
