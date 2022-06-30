import React from "react";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import HeaderNav from "../../utils/HeaderNav";

const CreateBranch = () => {
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
          <button className="btn submit-btn">Submit</button>
        </div>
      </HeaderNav>
      <section className="create-company-section ">
        <div className="mt-3 pt-1 card-div container">
          <div className="wrapper ">
            <div className="mt-3 col-12">
              <div className="ps-lg-3 mx-3 mx-lg-0">
                <form className="px-1 px-md-3 mx-md-1 ps-lg-2  mb-3  ">
                  <div className="ps-1">
                    <label htmlFor="branchName" className="form-label mt-1">
                      Branch name
                    </label>
                    <input
                      type="text"
                      placeholder="Branch name"
                      name="branchName"
                      // onBlur={handleOnChange}
                      id="branchName"
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

CreateBranch.Layout = DashboardLayout;
export default CreateBranch;
