import Image from "next/image";
import React, { useRef } from "react";
import ReactSelect, { components } from "react-select";
import makeAnimated from "react-select/animated";
import crossImg from "/public/images/admin/balance.svg";
import dropdownImg from "/public/images/admin/dropdown.svg";
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

const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <span>{props.data.value}</span>
  </components.MultiValue>
);

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "red" : "blue",
    padding: 10,
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

export const formatOptionLabel = ({ value, label, customAbbreviation }) => (
  // <tr className="rows">
  //   <td className="col-7">
  //     <p>{companyName}</p>
  //   </td>
  //   <td className="col-2">
  //     <p>Current balance</p>
  //   </td>
  //   <td className="col-2">
  //     <p>{currentBalance}</p>
  //   </td>
  // </tr>

  <div style={{ display: "flex" }}>
    <div>{label}</div>
    <div style={{ marginLeft: "10px", color: "#ccc" }}>
      {customAbbreviation}
    </div>
  </div>

);
// export const MultiSelect = (props) => {
//   const animatedComponents = makeAnimated();
//   const valueRef = useRef(props.value);
//   valueRef.current = props.value;

//   const selectAllOption = {
//     value: "Select All",
//     label: "Select All",
//   };

//   const isSelectAllSelected = () =>
//     valueRef.current.length === props.options.length;

//   const isOptionSelected = (option) =>
//     valueRef.current.some(({ value }) => value === option.label) ||
//     isSelectAllSelected();

//   const getOptions = () => [selectAllOption, ...props.options];

//   const getValue = () =>
//     isSelectAllSelected() ? [selectAllOption] : props.value;

//   const onChange = (newValue, actionMeta) => {
//     const { action, option, removedValue } = actionMeta;

//     if (action === "select-option" && option.value === selectAllOption.value) {
//       props.onChange(props.options, actionMeta);
//     } else if (
//       (action === "deselect-option" &&
//         option.value === selectAllOption.value) ||
//       (action === "remove-value" &&
//         removedValue.value === selectAllOption.value)
//     ) {
//       props.onChange([], actionMeta);
//     } else if (
//       actionMeta.action === "deselect-option" &&
//       isSelectAllSelected()
//     ) {
//       props.onChange(
//         props.options.filter(({ value }) => value !== option.value),
//         actionMeta
//       );
//     } else {
//       props.onChange(newValue || [], actionMeta);
//     }
//   };

 

//   return (
//     <div className=" ms-3">
//       <ReactSelect
//         className="react-select-container nav-item"
//         isOptionSelected={isOptionSelected}
//         options={getOptions()}
//         value={getValue()}
//         classNamePrefix="react-select"
//         isSearchable="true"
//         components={{
//           Option,
//           MultiValue,
//           animatedComponents,
//           DropdownIndicator,
//         }}
//         placeholder={" Search by telco "}
//         onChange={onChange}
//         styles={customStyles}
//         hideSelectedOptions={false}
//         closeMenuOnSelect={false}
//         formatOptionLabel={formatOptionLabel}
//         // isOptionDisabled={isOptionDisabled}
//         isMulti
//         // width="598px"
//         menuIsOpen={true}
//       />
//     </div>
//   );
// };
