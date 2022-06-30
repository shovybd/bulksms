import Image from "next/image";
import React from "react";
import dashboardLayout from "../../src/Components/Layout/dashboardLayout";
import { BRANCHLISTTABLEDATA } from "../../utils/constants";
import HeaderNav from "../../utils/HeaderNav";
import deleteImg from "/public/images/delete.svg";
import editImg from "/public/images/edit.svg";

const BranchList = () => {
  return (
    <section>
      <HeaderNav>
        <button className="company-create-btn">Create</button>
      </HeaderNav>
      <div className="table-responsive">
        <div className="branch-list-section ">
          <div className="card-div container">
            <div className="wrapper">
              <div className="col-12">
                <form>
                  <div className="table-responsive">
                    <table
                      id="child-table-section"
                      className=" table table-hover table-borderless table-card"
                    >
                      <thead>
                        <tr className="table-data">
                          {BRANCHLISTTABLEDATA.map((tabledata, index) => {
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
                          <td className="table-data_1">12345</td>
                          <td className="table-data_2">Gulshan</td>
                          <td className="table-data_4">17-02-2022</td>
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
        </div>
      </div>
    </section>
  );
};
BranchList.Layout = dashboardLayout;

export default BranchList;
