import React from "react";
import dashboardLayout from "../../src/Components/Layout/dashboardLayout";
import HeaderNav from "../../utils/HeaderNav";

const CreateCampaign = () => {
  return (
    <div>
      <HeaderNav>
        <button className="submit-btn">Submit</button>
      </HeaderNav>
      <section className="create-campaign-section ">
        <div className="mt-3 pt-1 card-div container">
          <div className="wrapper ">
            <div className="mt-3 col-12">
              <div className="ps-lg-3 mx-3 mx-lg-0">
                <form className="px-1 px-md-3 mx-md-1 ps-lg-2   ">
                  <div className="ps-1">
                    <label htmlFor="companyName" className="form-label mt-1">
                      Campaign name
                    </label>
                    <input
                      type="text"
                      placeholder="Campaign name"
                      name="campaignName"
                      // onBlur={handleOnChange}
                      id="campaignName"
                      className="col-12 rounded-pill"
                      required
                    />
                  </div>
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
                      <option>Select One</option>
                      <option value="Appex">Appex</option>
                      <option value="Grameenphone">Grameenphone</option>
                      <option value="Robi">Robi</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="companyName" className="form-label">
                      Branch
                    </label>

                    <select
                      required
                      //value={companyNameValue}
                      className="form-select  col-12 rounded-pill "
                      name="companyName"
                      id="companyName"
                      // onChange={handleSelectLanguage}
                    >
                      <option>Select One</option>
                      <option value="Appex">Appex</option>
                      <option value="Grameenphone">Grameenphone</option>
                      <option value="Robi">Robi</option>
                    </select>
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

CreateCampaign.Layout = dashboardLayout;
export default CreateCampaign;
