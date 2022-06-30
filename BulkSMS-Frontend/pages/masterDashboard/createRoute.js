import React from "react";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import HeaderNav from "../../utils/HeaderNav";

const CreateRoute = () => {
  return (
    <div>
      <HeaderNav>
      <div className="nav-item">
          <button className="btn submit-btn">Submit</button>
        </div>
      </HeaderNav>

    <section className="create-route-section">
      <div className="mt-3 pt-1 card-div container">
        <div className="wrapper">
          <div className="mt-3 col-12">
            <div className="ps-lg-3 mx-3 mx-lg-0">
              <form className="px-1 px-md-3 mx-md-1 ps-lg-2  mb-3  ">
                <div className="ps-1">
                  <h5>Company : Apex</h5>
                  <label htmlFor="branchName" className="form-label mt-1">
                    Masking
                  </label>
                  <input
                    type="text"
                    placeholder="Apex"
                    name="branchName"
                    // onBlur={handleOnChange}
                    id="branchName"
                    className="col-12 rounded-pill"
                    required
                  />

                  <div>
                    <label htmlFor="companyName" className="form-label">
                      Dispatch mood
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
                      <option value="Fallback">Fallback</option>
                      <option value="Fallback">Fallback</option>
                      <option value="Fallback">Fallback</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="companyName" className="form-label">
                      Telco api
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
                      <option value="Teletalk">Teletalk</option>
                      <option value="Teletalk">Teletalk</option>
                      <option value="Teletalk">Teletalkk</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

CreateRoute.Layout = DashboardLayout;
export default CreateRoute;
