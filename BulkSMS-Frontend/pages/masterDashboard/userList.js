import Image from "next/image";
import React from "react";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import { USERLISTTABLEDATA } from "../../utils/constants";
import HeaderNav from "../../utils/HeaderNav";
import deleteImg from "/public/images/delete.svg";
import editImg from "/public/images/edit.svg";

const UserList = () => {
  return (
    <section>
      <HeaderNav>
        <button className="company-create-btn">Create</button>
      </HeaderNav>
      <div className="table-responsive">
        <section className="user-list-section ">
          <div className="card-div d-flex justify-content-center align-items-center">
            <div className="wrapper ">
              <div className="col-12">
                <form>
                  <div className="table-responsive">
                    <table
                      id="child-table-section"
                      className=" table table-hover table-borderless table-card"
                    >
                      <thead>
                        <tr className="table-data">
                          {USERLISTTABLEDATA.map((tabledata, index) => {
                            return (
                              <th
                                key={index}
                                width={tabledata.width}
                                className={tabledata.className}
                              >
                                {tabledata.header}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-data">
                          <td className="table-data_1">
                            Md Maziur Rahman Shimul
                          </td>
                          <td className="table-data_2">Md Maziur Rahman</td>
                          <td className="table-data_3">
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
                              <p className="ps-2 ms-1">Admin</p>{" "}
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
                              <p className="ps-2 ms-1">Super Admin</p>{" "}
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
                              <p className="ps-2 ms-1">Standard</p>{" "}
                            </div>
                          </td>
                          <td className="table-data_4">+8801754110088</td>
                          <td className="table-data_5">
                            maziurrahmanshimul12354@gmail.com
                          </td>
                          <td className="table-data_6">17-02-2022</td>
                          <td className="table-data_7">No status</td>

                          <td className="options-data d-flex">
                            <div className="edit-option d-flex">
                              <div>
                                <Image src={editImg} />
                              </div>
                              <p>Edit</p>
                            </div>
                            <div className="delete-option d-flex">
                              <div>
                                <Image src={deleteImg} />
                              </div>
                              <p>Delete</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
UserList.Layout = DashboardLayout;
export default UserList;
