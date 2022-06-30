import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import HeaderNav from "../../utils/HeaderNav";
import accountcodeIcon from "/public/images/dashboard/account-code.svg";
import accounttypeIcon from "/public/images/dashboard/account-type.svg";
import buildingIcon from "/public/images/dashboard/building-icon.svg";
import dollarIcon from "/public/images/dashboard/dollar.svg";
import shapeIcon from "/public/images/dashboard/shape.svg";
import smsIcon from "/public/images/dashboard/sms-icon.svg";

const MasterDashboard = () => {
  const router = useRouter();

  return (
    <div>
      <HeaderNav />
      <section className="dashboard-section">
        <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 gx-4 gy-3">
          <div className="col-12 col-md-12 col-lg-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="d-flex justify-content-center align-items-center">
                    <div>
                      <Image
                        src={buildingIcon}
                        className="img-fluid"
                        alt="..."
                      />
                    </div>
                    <div className="card-headings">
                      <h5>ProGyan Limited.’s Status</h5>
                      <p>Febuary 10,2022</p>
                    </div>
                  </div>
                  <div className="d-none d-md-block">
                    <Image src={shapeIcon} className="img-fluid" alt="..." />
                  </div>
                </div>

                <div className="card-section-2  row row-col-2 row-col-md-3 g-2">
                  <div className="col-6 col-md-3 col-lg-3">
                    <div className="border-end">
                      <h6>SMS Credit</h6>
                      <div className="d-flex align-items-center">
                        <div>
                          <Image
                            src={dollarIcon}
                            width="35px"
                            height="18px"
                            className="img-fluid"
                            alt="..."
                          />
                        </div>
                        <h5>0</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-5 col-lg-5 ">
                    <div className="account-code border-end">
                      <h6>Account type </h6>
                      <div className="d-flex align-items-center">
                        <div>
                          <Image
                            src={accounttypeIcon}
                            width="35px"
                            height="22px"
                            className="img-fluid"
                            alt="..."
                          />
                        </div>
                        <h5>Master Account</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-4">
                    <div className="ms-md-2">
                      <h6>Account code </h6>
                      <div className="d-flex align-items-center">
                        <div>
                          <Image
                            src={accountcodeIcon}
                            width="35px"
                            height="23px"
                            className="img-fluid"
                            alt="..."
                          />
                        </div>
                        <h5>1005124</h5>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-0 col-lg-0">
                    <div className="d-block d-md-none text-center  mt-2">
                      <div className="account-code">
                        <Image
                          src={shapeIcon}
                          className="img-fluid"
                          alt="..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6">
            <div className="card second-card mt-1 mt-lg-0">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="d-flex justify-content-center align-items-center">
                    <div>
                      <Image src={smsIcon} className="img-fluid" alt="..." />
                    </div>
                    <div className="card-headings">
                      <h5>SMS Success Faield Amount</h5>
                      <p className="dashed-border"></p>
                    </div>
                  </div>
                  <div className="d-none d-md-block">
                    <Image src={shapeIcon} className="img-fluid" alt="..." />
                  </div>
                </div>

                <div className="card-section-2 row row-col-2 row-col-md-3 g-2">
                  <div className="col-6 col-md-4  col-lg-4">
                    <div className="account-code border-end">
                      <h6>Single SMS 110</h6>
                      <div className="d-flex align-items-center">
                        <h5 className="success-sms">11</h5>
                        <h5 className="faild-sms">21</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-4">
                    <div className="account-code border-end">
                      <h6>Bulk SMS 244</h6>
                      <div className="d-flex align-items-center">
                        <h5 className="success-sms">11</h5>
                        <h5 className="faild-sms">21</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-4 col-lg-4">
                    <div className="account-code">
                      <h6>Total SMS 324</h6>
                      <div className="d-flex align-items-center">
                        <h5 className="success-sms">11</h5>
                        <h5 className="faild-sms">21</h5>
                      </div>
                    </div>
                  </div>

                  <div className="col-5 col-md-0 col-lg-0">
                    <div className="d-block d-md-none text-center  mt-3">
                      <div className="account-code">
                        <Image
                          src={shapeIcon}
                          className="img-fluid"
                          alt="..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

MasterDashboard.Layout = DashboardLayout;
export default MasterDashboard;
