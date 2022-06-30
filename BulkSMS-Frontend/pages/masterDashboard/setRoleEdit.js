import Image from "next/image";
import React from "react";
import dashboardLayout from "../../src/Components/Layout/dashboardLayout";
import HeaderNav from "../../utils/HeaderNav";
import profile from "/public/images/admin/profileImg.svg";

const SetUserRole = () => {
  return (
    <section>
      <HeaderNav>
        <div className="nav-item">
          <button className="update-btn">Update</button>
        </div>
      </HeaderNav>
      <div className="set-user-role-section ">
        <div className="mt-3 pt-1 card-div container">
          <div className="wrapper ">
            <div className="mt-4 pt-3 col-12">
              <div className="ps-lg-3 mx-3 mx-lg-0">
                <form className="px-1 px-md-3 mx-md-1 ps-lg-2">
                  <div className="user-info text-center">
                    <Image
                      height="100px"
                      width="100px"
                      src={profile}
                      className="border img-fluid rounded-circle"
                    />
                    <h6>Md Maziur Rahman</h6>
                    <p>Founder & CEO</p>
                  </div>
                  <div className="d-flex checkbox-div  mb-2 ">
                    <div>
                      <input
                        type="checkbox"
                        id="option1"
                        // onChange={handleCheckbox}
                      />
                      <label htmlFor="option1" className="d-flex">
                        <span></span>
                      </label>
                    </div>
                    <p className="ps-2 ms-1">Can add user</p>{" "}
                  </div>
                  <div className="d-flex checkbox-div  mb-2 ">
                    <div>
                      <input
                        type="checkbox"
                        id="option2"
                        // onChange={handleCheckbox}
                      />
                      <label htmlFor="option2" className="d-flex">
                        <span></span>
                      </label>
                    </div>
                    <p className="ps-2 ms-1">Can buy bulk SMS</p>{" "}
                  </div>
                  <div className="d-flex checkbox-div  mb-2 ">
                    <div>
                      <input
                        type="checkbox"
                        id="option3"
                        // onChange={handleCheckbox}
                      />
                      <label htmlFor="option3" className="d-flex">
                        <span></span>
                      </label>
                    </div>
                    <p className="ps-2 ms-1">Can create campaign</p>{" "}
                  </div>
                  <div className="d-flex checkbox-div  mb-2 ">
                    <div>
                      <input
                        type="checkbox"
                        id="option4"
                        // onChange={handleCheckbox}
                      />
                      <label htmlFor="option4" className="d-flex">
                        <span></span>
                      </label>
                    </div>
                    <p className="ps-2 ms-1">Can delete user</p>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

SetUserRole.Layout = dashboardLayout;
export default SetUserRole;
