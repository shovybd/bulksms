import Image from "next/image";
import Link from "next/link";
import React from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import HeaderNav from "../../utils/HeaderNav";
import arrowDown from "/public/images/arrowDown.svg";
import calander from "/public/images/calander1.svg";
import expand from "/public/images/history/expand.svg";
import minimise from "/public/images/history/minimise.svg";
import mask from "/public/images/mask.svg";
import userImg from "/public/images/profile.svg";

const SMSHistory = () => {
  let campaigns = [
    { value: 2, name: "Winter" },
    { value: 3, name: "Summer" },
    { value: 4, name: "Spring" },
  ];
  let entries = [
    { value: 5, name: "5" },
    { value: 10, name: "10" },
    { value: 20, name: "20" },
    { value: 50, name: "50" },
    { value: 100, name: "100" },
  ];

  return (
    <section className="sms-history-section ">
      <HeaderNav
        children2={
          <div className="sms-history-nav-children">
            <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6 gx-3 gy-3 gy-lg-0">
              <div className="col ">
                <label className="input-group sms-history-input-group ">
                  <div className="date-picker-img input-group-text position-absolute">
                    <Image src={calander} width="14px" height="14px" />
                  </div>
                  <span>
                    <Datetime
                      className=" date-picker-div"
                      inputProps={{
                        placeholder: "Select date",
                        style: {
                          textAlign: "left",
                          width: "98%",
                          border: 0,
                          borderRadius: "16px",
                          marginLeft: "1.5px",
                          paddingLeft: "30%",
                        },
                      }}
                      dateFormat="YYYY-MM-DD"
                      timeFormat={false}
                    />
                  </span>
                </label>
              </div>

              <div className="col ">
                <label className="input-group sms-history-input-group">
                  <div className="date-picker-img input-group-text position-absolute">
                    <Image src={calander} width="14px" height="14px" />
                  </div>
                  <span>
                    <Datetime
                      className="date-picker-div"
                      inputProps={{
                        placeholder: "Select date",
                        style: {
                          textAlign: "left",
                          width: "98%",
                          border: 0,
                          borderRadius: "16px",
                          marginLeft: "1.5px",
                          paddingLeft: "30%",
                        },
                      }}
                      dateFormat="YYYY-MM-DD"
                      timeFormat={false}
                    />
                  </span>
                </label>
              </div>

              <div className="col ">
                <div className="input-group user-input sms-history-input-group-2">
                  <div className="input-group-text">
                    <Image src={userImg} width="14px" height="14px" />
                  </div>
                  <input
                    type="text"
                    data-date-inline-picker="true"
                    placeholder="User name"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col ">
                <div className="input-group sms-history-input-group-2 masking-input">
                  <div className="input-group-text">
                    <Image src={mask} width="14px" height="14px" />
                  </div>
                  <input
                    type="text"
                    data-date-inline-picker="true"
                    placeholder="Masking"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col">
                <select
                  required
                  className="form-select campaign-input"
                  name="campaign"
                  id="campaign"
                >
                  <option value="1">Campaign</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.value} value={campaign.value}>
                      {campaign.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col ">
                <select
                  required
                  className="form-select campaign-input"
                  name="campaign"
                  id="campaign"
                >
                  <option value="1">Type</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.value} value={campaign.value}>
                      {campaign.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col ">
                <select
                  required
                  className="form-select campaign-input "
                  name="campaign"
                  id="campaign"
                >
                  <option value="1">Status</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.value} value={campaign.value}>
                      {campaign.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        }
      >
        <div className="nav-item">
          <Link href="#" passHref>
            <button className="btn export-btn d-flex justify-content-center align-items-center">
              <Image src={arrowDown} className="img-fluid" />{" "}
              <span className="ms-2">Export</span>{" "}
            </button>
          </Link>
        </div>
        <div className="nav-item">
          <Link href="#" passHref>
            <button className="btn sms-report-btn ">SMS Report</button>
          </Link>
        </div>
      </HeaderNav>

      <div className="sms-history-main-section">
        <p className="sms-history-text d-none d-md-block">SMS History Table</p>
        <div className="table-responsive">
          <div className="sms-history-table-div ">
            <div className="mt-2 card-div d-flex justify-content-center align-items-center">
              <div className="wrapper ">
                <div className="col-12">
                  <form>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex show-entries mt-3">
                        <p>Show</p>

                        <select
                          required
                          className="form-select-2 filter-handle"
                          name="companyName"
                          id="companyName"
                          // onChange={handleShowData}
                        >
                          {entries.map((entry) => (
                            <option key={entry.value} value={entry.value}>
                              {entry.name}
                            </option>
                          ))}
                        </select>

                        <p>entries</p>
                      </div>
                      <div className="d-flex">
                        <div className="me-3 mt-3">
                          <input
                            type="text"
                            className="input-search nav-item"
                            placeholder="Search by campaign"
                          />
                        </div>

                        <div className="d-flex align-items-center">
                          <div className="me-2 mt-2">
                            <Image src={expand} />
                          </div>
                          <div className="me-3">
                            <Image src={minimise} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* {isLoading && (
                        <div className="text-center">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )} */}

                    {/* {accordions.slice(0, showData).map((accordion) => (
                        <Accordions key={accordion.id} accordion={accordion} />
                      ))} */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

SMSHistory.Layout = DashboardLayout;
export default SMSHistory;
