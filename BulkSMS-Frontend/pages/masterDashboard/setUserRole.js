import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import { SETROLETABLEDATA } from "../../utils/constants";
import HeaderNav from "../../utils/HeaderNav";
import deleteImg from "/public/images/delete.svg";
import editImg from "/public/images/edit.svg";

const setUserRole = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios.get("/userdata.json").then((res) => {
      setdata(res.data.data);
    });
  }, []);

  return (
    <div>
      <HeaderNav></HeaderNav>
    <div className="table-responsive">
      <section className="setuserRole-list-section  d-lg-flex justify-content-center align-items-center ">
        <div className="card-div">
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
                        {SETROLETABLEDATA.map((tabledata, index) => {
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
                      {data.map((data) => {
                        return (
                          <tr key={data.id} className="table-data">
                            <td className="table-data_1">{data.name}</td>
                            <td className="table-data_2">
                              {data.email}
                            </td>
                            <td className="table-data_4">{data.position}</td>
                            <td className="table-data_5">{data.role}</td>

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
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

setUserRole.Layout = DashboardLayout;
export default setUserRole;
