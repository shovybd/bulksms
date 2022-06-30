import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import useAuth from "../../Hooks/useAuth";
import Tables from "./Tables";
import previous from "/public/images/play-back-sharp1.svg";
import next from "/public/images/play-back-sharp2.svg";

const Accordions = (props) => {
  const { id, companyName, currentBalance, details } = props.accordion;
  const { isLoading, setIsLoading } = useAuth();
  const [showChildTableData, setShowChildTableData] = useState(5);
  const [tableDatas, setTableDatas] = useState([]);
  const [loadChildTableData, setLoadChildTableData] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  let entries = [
    { value: 5, name: "5" },
    { value: 10, name: "10" },
    { value: 20, name: "20" },
    { value: 50, name: "50" },
    { value: 100, name: "100" },
  ];


  const handleShowChildTableData = (e) => {
    setShowChildTableData(parseInt(e.target.value));
  };

  let limit = 20;
  useEffect(async () => {
    if (!loadChildTableData) return;
    setIsLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
    );
    const data = await res.json();
    const total = res.headers.get("x-total-count");
    setPageCount(Math.ceil(total / limit));
    setTableDatas(data);
    setIsLoading(false);
  }, [limit, loadChildTableData]);

  const fetchDatas = async (currentPage) => {
    setIsLoading(true);
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.data;
    setIsLoading(false);
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const datasFromServer = await fetchDatas(currentPage);
    setTableDatas(datasFromServer);
  };

  const handleAccordion = (data) => {
    console.log(data);
    setLoadChildTableData(true);
  };

  return (
    <div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <div className="accordion-header" id="headingOne">
            <div
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collaps_${id}`}
              aria-expanded="false"
              onClick={handleAccordion}
              aria-controls={`collaps_${id}`}
            >
              <table
                id="table1"
                className="table table-borderless border-bottom "
              >
                <tbody>
                  <tr>
                    <td className="col-4">
                      <p>{companyName}</p>
                    </td>
                    <td className="col-4">
                      <p>Current balance</p>
                    </td>
                    <td className="col-4">
                      <p>{currentBalance}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            id={`collaps_${id}`}
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            {isLoading && (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {loadChildTableData && (
              <div className="accordion-body accordion-body-section ">
                <div className="d-flex justify-content-between">
                  <div className="d-flex show-entries">
                    <p>Show</p>
                    <select
                      required
                      className="form-select-2"
                      name={`entries_${id}`}
                      id={`entries_${id}`}
                      onChange={handleShowChildTableData}
                    >
                      {entries.map((entry) => (
                        <option key={entry.value} value={entry.value}>
                          {entry.name}
                        </option>
                      ))}
                    </select>

                    <p>entries</p>
                  </div>

                  <ReactPaginate
                    previousLabel={<Image src={previous} role="button" />}
                    nextLabel={<Image src={next} />}
                    breakLabel={"..."}
                    pageCount={15}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={
                      "page-link border-0 w-100 bg-transparent "
                    }
                    nextClassName={"page-item"}
                    nextLinkClassName={
                      "page-link border-0 w-100 bg-transparent"
                    }
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                </div>

                <div className="">
                  <div className="table-responsive">
                    <table
                      id="child-table-section"
                      className=" table table-hover table-borderless table-card"
                    >
                      <thead>
                        <tr>
                          <th width="219px">Name</th>
                          <th width="358px">Address</th>
                          <th width="156px">Contact number</th>
                          <th width="492px">Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableDatas
                          .slice(0, showChildTableData)
                          .map((tableData) => (
                            <Tables key={tableData.id} tableData={tableData} />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {!loadChildTableData && (
              <div>
                <p>No Data Found!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const res = await axios.get("/data.json");
//   const tableDatas = await res.data.data;
//   if (!tableDatas) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     props: {
//       tableDatas,
//     },
//   };
// }

export default Accordions;
