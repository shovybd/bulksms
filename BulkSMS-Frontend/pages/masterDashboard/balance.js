import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import ReactSelect, { components } from "react-select";
import makeAnimated from "react-select/animated";
import Accordions from "../../src/Components/BalancePage/Accordions";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import { formatOptionLabel } from "../../src/Components/MultiSelects/MultiSelectOptions";
import HeaderNav from "../../utils/HeaderNav";
import dropdownImg from "/public/images/admin/dropdown.svg";
const Balance = ({ accordions }) => {
  const [showData, setShowData] = useState(5);

  const options = [
    {
      value: "Grameenphone",
      label: "Grameenphone",
      customAbbreviation: "100000000SMS",
    },
    {
      value: "Banglalink",
      label: "Banglalink",
      customAbbreviation: "100000000SMS",
    },
    { value: "Robi", label: "Robi", balance: "100000000SMS" },
    { value: "Teletalk", label: "Teletalk", balance: "100000000SMS" },
    { value: "Airtel", label: "Airtel", balance: "100000000SMS" },
    { value: "Samsung", label: "Samsung", balance: "100000000SMS" },
    { value: "Samsung2", label: "Samsung2", balance: "100000000SMS" },
  ];

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

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <div className="d-flex checkbox-div  mb-2 ">
            <div>
              <input
                type="checkbox"
                id="option"
                checked={props.isSelected}
                onChange={() => null}
                //onChange={handleCheckbox}
              />
              <label htmlFor="option" className="d-flex">
                {" "}
                <span></span>{" "}
              </label>
            </div>
            <p className="ps-2 ms-1"> {props.label}</p>{" "}
          </div>
        </components.Option>
      </div>
    );
  };

  const CaretDownIcon = () => {
    return <Image src={dropdownImg} />;
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // backgroundColor: "white",
      // borderBottom: "1px dotted pink",
      // color: state.isSelected ? "red" : "blue",
      // padding: 10,
    }),
    indicatorsContainer: () => ({
      display: "flex",
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen && "rotate(180deg)",
      padding: "10px 20px",
      cursor: "pointer",
    }),

    control: () => ({
      border: "1px solid #ebebeb",
      borderRadius: "20px",
      width: 598,
      height: 40,
      backgroundImage: "url(/images/admin/search.svg)",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "22px 12px",
      color: "#858585",
      paddingLeft: "50px",
      display: "flex",
      alignItems: "center",
    }),
    container: (base, state) => {
      const { menuIsOpen } = state.selectProps;
      let addons = {
        zIndex: 1000,
        marginTop: 0,
      };
      if (menuIsOpen) {
        addons = Object.assign(addons, {
          // zIndex: "9",
          position: "absolute",
          borderRadius: 20,
          backgroundColor: "white",

          width: "598px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 5px 5px",
          border: "1px solid #ebebeb",
        });
      }
      return Object.assign(base, addons);
    },

    indicatorSeparator: () => ({
      display: "none",
    }),

    multiValue: () => ({
      display: "flex",
      padding: "0px 6px",
      backgroundColor: "#f9f9f9",
      borderRadius: 13,
      fontWeight: 400,
      fontSize: 13,
    }),

    menu: () => ({
      zIndex: "9",
      height: "327px",
      borderRadius: 20,
      // position: "absolute",
      width: "100%",
    }),
    option: () => ({
      // backgroundColor:"black",
      padding: "15px 15px 16px 15px",
      height: "50px",
      borderBottom: "1px solid #ebebeb",
    }),
    singleValue: (provided) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, transition };
    },
  };

  // const [selectedOption, setSelectedOption] = useState(null);
  // const handleChange = (selected) => {
  //   setSelectedOption(selected);
  // };

  const [selected, setSelected] = useState([]);
  const animatedComponents = makeAnimated();
  return (
    <div>
      <HeaderNav>
        <div className="nav-item">
          <button className="telko-btn">Telko</button>
        </div>
        <div className="nav-item">
          <button className="company-btn">Company</button>
        </div>
      </HeaderNav>
      <div className="table-responsive">
        <div className="balance-div">
          <section className="company-list-section ">
            <div className="mt-3 pt-1 card-div d-flex justify-content-center align-items-center">
              <div className="wrapper ">
                <div className="mt-3 col-12">
                  <form>
                    <div className="d-flex">
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

                      <div className=" ms-3">
                        <ReactSelect
                          className="react-select-container nav-item"
                          // isOptionSelected={isOptionSelected}
                          // options={getOptions()}
                          // value={getValue()}
                          options={options}
                          value={selected}
                          onChange={setSelected}
                          classNamePrefix="react-select"
                          isSearchable="true"
                          components={{
                            Option,
                            // MultiValue,
                            animatedComponents,
                            DropdownIndicator,
                          }}
                          placeholder={" Search by telco "}
                          // onChange={onChange}
                          styles={customStyles}
                          hideSelectedOptions={false}
                          closeMenuOnSelect={false}
                          formatOptionLabel={formatOptionLabel}
                          // isOptionDisabled={isOptionDisabled}
                          isMulti
                          // width="598px"
                          menuIsOpen={true}
                        />
                      </div>

                      {/* <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        formatOptionLabel={formatOptionLabel}
                       // isOptionDisabled={() => selected.length >= 4}
                        
                      /> */}
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

Balance.Layout = DashboardLayout;
export default Balance;

/* */
