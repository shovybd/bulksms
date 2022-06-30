import axios from "axios";
import React, { useState } from "react";
import Accordions from "../../src/Components/CompanyLists/Accordions";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import HeaderNav from "../../utils/HeaderNav";

const CompanyList = ({ accordions }) => {
  const [showData, setShowData] = useState(5);
  const handleShowData = (e) => {
    setShowData(parseInt(e.target.value));
  };

  const [isLoading, setIsLoading] = useState(false);

  let entries = [
    { value: 5, name: "5" },
    { value: 10, name: "10" },
    { value: 20, name: "20" },
    { value: 50, name: "50" },
    { value: 100, name: "100" },
  ];

  return (
    <div>
      <HeaderNav>
        <button className="company-create-btn">Create</button>
      </HeaderNav>
      <div className="table-responsive">
        <section className="company-list-section ">
          <div className="mt-3 pt-1 card-div d-flex justify-content-center align-items-center">
            <div className="wrapper ">
              <div className="mt-3 col-12">
                <form>
                  <div className="d-flex show-entries">
                    <p>Show</p>
                    <select
                      required
                      className="form-select-2 filter-handle"
                      name="companyName"
                      id="companyName"
                      onChange={handleShowData}
                    >
                      {entries.map((entry) => (
                        <option key={entry.value} value={entry.value}>
                          {entry.name}
                        </option>
                      ))}
                    </select>
                    <p>entries</p>
                  </div>

                  {isLoading && (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}

                  {accordions.slice(0, showData).map((accordion) => (
                    <Accordions key={accordion.id} accordion={accordion} />
                  ))}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/campaign/data`
  );

  const accordions = await res.data.data;
  if (!accordions) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      accordions,
    },
  };
}

CompanyList.Layout = DashboardLayout;
export default CompanyList;

/* */
