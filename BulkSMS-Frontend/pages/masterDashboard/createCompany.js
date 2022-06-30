import React from "react";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import HeaderNav from "../../utils/HeaderNav";

const CreateCompany = () => {
  return (
    <div>
      <HeaderNav>
        <button className="submit-btn">Submit</button>
      </HeaderNav>
      <section className="create-company-section ">
        <div className="mt-3 pt-1 card-div container">
          <div className="wrapper ">
            <div className="mt-3 col-12">
              <div className="ps-lg-3 mx-3 mx-lg-0">
                <form className="px-1 px-md-3 mx-md-1 ps-lg-2  mb-3  ">
                  <div className="ps-1">
                    <label htmlFor="companyName" className="form-label mt-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      name="companyName"
                      // onBlur={handleOnChange}
                      id="companyName"
                      className="col-12 rounded-pill"
                      required
                    />

                    <label htmlFor="comapanyAddress" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      name="comapanyAddress"
                      // onBlur={handleOnChange}
                      placeholder="Address"
                      id="comapanyAddress"
                      className="col-12 rounded-pill"
                      required
                    />
                    <label htmlFor="companyNumber" className="form-label">
                      Contact number
                    </label>
                    <input
                      type="text"
                      name="companyNumber"
                      // onBlur={handleOnChange}
                      placeholder="Contact number"
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
      </section>
    </div>
  );
};

CreateCompany.Layout = DashboardLayout;
export default CreateCompany;
