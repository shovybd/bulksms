import Image from "next/image";
import React, { useState } from "react";
import { default as eye, default as eyeOff } from "../../public/images/eye.svg";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import HeaderNav from "../../utils/HeaderNav";
const CreateUser = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <>
      <HeaderNav>
        {/* <div className="nav-item">
          <Link href="#" passHref>
            <span>Active Status</span>
          </Link>
        </div>

        <div className="nav-item">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div> */}

        <div className="nav-item">
          <button className="btn reset-btn">
            <span>Reset</span>
          </button>
        </div>

        <div className="nav-item">
          <button className="btn register-user-btn">Register</button>
        </div>
      </HeaderNav>
      <section className="create-company-section ">
        <div className="mt-3 pt-1 card-div container">
          <div className="wrapper ">
            <div className="mt-3 col-12">
              <div className="ps-lg-3 mx-3 mx-lg-0">
                <form className="px-1 px-md-3 mx-md-1 ps-lg-2  mb-3  ">
                  <div className="ps-1">
                    <label htmlFor="fullName" className="form-label mt-1">
                      Full name
                    </label>
                    <input
                      type="text"
                      placeholder="Full name"
                      name="fullName"
                      // onBlur={handleOnChange}
                      id="fullName"
                      className="col-12 rounded-pill"
                      required
                    />

                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      // onBlur={handleOnChange}
                      placeholder="Email"
                      id="email"
                      className="col-12 rounded-pill"
                      required
                    />
                    <label htmlFor="userName" className="form-label">
                      User name
                    </label>
                    <input
                      type="text"
                      name="userName"
                      // onBlur={handleOnChange}
                      placeholder="User name"
                      id="userName"
                      className="col-12 rounded-pill"
                      required
                    />

                    <div>
                      <label htmlFor="companyName" className="form-label">
                        Company
                      </label>

                      <select
                        required
                        //value={companyNameValue}
                        className="form-select  col-12 rounded-pill "
                        name="companyName"
                        id="companyName"
                        // onChange={handleSelectLanguage}
                      >
                        <option>Select Company</option>
                        <option value="Appex">Appex</option>
                        <option value="Grameenphone">Grameenphone</option>
                        <option value="Robi">Robi</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="userRole" className="form-label">
                        Role
                      </label>

                      <select
                        required
                        //value={companyNameValue}
                        className="form-select  col-12 rounded-pill "
                        name="userRole"
                        id="userRole"
                        // onChange={handleSelectLanguage}
                      >
                        <option>Select Role</option>
                        <option value="Appex">Appex</option>
                        <option value="Grameenphone">Grameenphone</option>
                        <option value="Robi">Robi</option>
                      </select>
                    </div>

                    <label htmlFor="contactNumber" className="form-label">
                      Contact number
                    </label>
                    <input
                      type="text"
                      name="contactNumber"
                      // onBlur={handleOnChange}
                      placeholder="Contact number"
                      id="contactNumber"
                      className="col-12 rounded-pill"
                      required
                    />
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="pass-wrapper input-group">
                      <input
                        type={passwordShown ? "text" : "password"}
                        name="password"
                        // onBlur={handleOnChange}
                        placeholder="Password"
                        id="password"
                        className=" form-control col-12 rounded-pill"
                        required
                      />
                      <span className="input-group-text border-0 ">
                        <Image onClick={togglePasswordVisiblity} src={eye} />
                      </span>
                    </div>

                    <span id="error-text">
                      Password mus be 8 character long & contain atleast one
                      letter, one number and one special character
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

CreateUser.Layout = DashboardLayout;
export default CreateUser;
