import Image from "next/image";
import React from "react";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import HeaderNav from "../../utils/HeaderNav";
import camera from "/public/images/camera.svg";
import close from "/public/images/close.svg";
const UserProfile = () => {
  return (
    <section>
      <HeaderNav>
        <div className="nav-item">
          <button className="btn update-btn">Update</button>
        </div>
      </HeaderNav>
      <div className="user-profile-section ">
        <div className="mt-3 pt-1 card-div container">
          <div className="wrapper ">
            <div className="mt-4 pt-3 col-12">
              <div className="ps-lg-3 mx-3 mx-lg-0">
                <form className="px-1 px-md-3 mx-md-1 ps-lg-2 ">
                  <div className="ps-1">
                    <div
                      className="text-center"
                      role="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <div className="avatar-upload">
                        <div className="avatar-edit">
                          <Image src={camera} />
                        </div>
                        <div className="avatar-preview">
                          <div
                            id="imagePreview"
                            style={{
                              backgroundImage:
                                "url('/images/admin/profileImg.svg')",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal fade"
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header d-inline-block d-flex justify-content-center align-items center ju">
                            <p
                              className="modal-title text-center "
                              id="staticBackdropLabel"
                            >
                              Update profile picture
                            </p>
                            <div className="btn-close-div text-end float-right">
                              <Image
                                width="35px"
                                height="35px"
                                role="button"
                                src={close}
                                data-bs-dismiss="modal"
                                className="btn-close"
                                aria-label="Close"
                              />
                            </div>

                            {/* <button
                            type="button"
                            className="btn-close text-end float-right"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button> */}
                          </div>
                          <div className="modal-body text-center">
                            <p>
                              Take or upload a photo. Then crop, filter and
                              adjust it to perfection.
                            </p>
                            <div className="modal-buttons d-flex justify-content-center align-items-center">
                              <button className="btn upload-btn ">
                                Upload Photo
                              </button>

                              <button className="btn use-camera-btn">
                                Use Camera
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <label htmlFor="companyName" className="form-label mt-1">
                      Your name
                    </label>
                    <input
                      type="text"
                      placeholder="Jon smith"
                      name="companyName"
                      // onBlur={handleOnChange}
                      id="companyName"
                      className="col-12 rounded-pill"
                      required
                    />

                    <label htmlFor="comapanyAddress" className="form-label">
                      Contact number
                    </label>
                    <input
                      type="text"
                      name="comapanyAddress"
                      // onBlur={handleOnChange}
                      placeholder="0183445678899"
                      id="comapanyAddress"
                      className="col-12 rounded-pill"
                      required
                    />
                    <label htmlFor="companyNumber" className="form-label">
                      Your position
                    </label>
                    <input
                      type="text"
                      name="companyNumber"
                      // onBlur={handleOnChange}
                      placeholder="Head of operation"
                      id="companyNumber"
                      className="col-12 rounded-pill"
                      required
                    />
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

UserProfile.Layout = DashboardLayout;
export default UserProfile;
