import Image from "next/image";
import React, { useState } from "react";
import masterCard from "../../public/images/mastercard.svg";
import paypal from "../../public/images/paypal.svg";
import visa from "../../public/images/visa.svg";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import HeaderNav from "../../utils/HeaderNav";

const Payment = () => {
  let operators = [
    { value: 1, name: "operator" },
    { value: "GrameenPhone", name: "GrameenPhone" },
    { value: "Robi", name: "Robi" },
    { value: "Teletalk", name: "Teletalk" },
  ];
  const [operatorValue, setOperatorValue] = useState("");

  const handleOperatorChange = (e) => {
    setOperatorValue(e.target.value);
    console.log(e.target.value);
  };

  return (
    <section>
      <HeaderNav>
        <div className="nav-item">
          <button className="create-invoice-btn">Create Invoice</button>
        </div>
        <div className="nav-item">
          <button className="all-invoice-btn">All Invoice</button>
        </div>
      </HeaderNav>
      <div className="payment-section ">
        <div className="mt-3 pt-1 card-div container">
          <div className="wrapper ">
            <div className="mt-3 col-12">
              <div className="ps-lg-3 mx-3 mx-lg-0">
                <form className="px-1 px-md-3 mx-md-1 ps-lg-2  mb-3  ">
                  <div className="ps-1">
                    <div>
                      <label htmlFor="companyName" className="form-label">
                        Select operator
                      </label>

                      <select
                        required
                        //value={companyNameValue}
                        className="form-select  col-12 rounded-pill "
                        name="companyName"
                        id="companyName"
                        onChange={handleOperatorChange}
                      >
                        {operators.map((operator) => (
                          <option key={operator.name} value={operator.value}>
                            {operator.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <label htmlFor="comapanyAddress" className="form-label">
                      Total taka
                    </label>
                    <input
                      type="text"
                      name="comapanyAddress"
                      // onBlur={handleOnChange}
                      placeholder="10000"
                      id="comapanyAddress"
                      className="col-12 rounded-pill"
                      required
                    />
                    <p className="text-secondary">Equivalent 50000 SMS</p>

                    <label htmlFor="companyNumber" className="form-label">
                      Select payment method
                    </label>
                    <div className="d-flex">
                      <div className="me-3 pe-1">
                        <Image src={visa} />
                      </div>
                      <div className="me-3 pe-1">
                        <Image src={masterCard} />
                      </div>
                      <div className="me-3 pe-1">
                        <Image src={paypal} />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6">
                        <label htmlFor="comapanyAddress" className="form-label">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="comapanyAddress"
                          // onBlur={handleOnChange}
                          placeholder="Card number"
                          id="comapanyAddress"
                          className="col-12 rounded-pill"
                          required
                        />
                        <p>The number is invalid</p>
                      </div>
                      <div className="col-6">
                        <label htmlFor="comapanyAddress" className="form-label">
                          Name on card
                        </label>
                        <input
                          type="text"
                          name="comapanyAddress"
                          // onBlur={handleOnChange}
                          placeholder="Name on card"
                          id="comapanyAddress"
                          className="col-12 rounded-pill"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <label htmlFor="comapanyAddress" className="form-label">
                          Expiration date
                        </label>
                        <input
                          type="date"
                          name="comapanyAddress"
                          // onBlur={handleOnChange}
                          placeholder="MM/Y"
                          id="comapanyAddress"
                          className="col-12 rounded-pill"
                          required
                        />
                      </div>
                      <div className="col-6">
                        <label htmlFor="comapanyAddress" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="comapanyAddress"
                          // onBlur={handleOnChange}
                          placeholder="CVV"
                          id="comapanyAddress"
                          className="col-12 rounded-pill"
                          required
                        />
                      </div>
                    </div>
                    <div className="d-flex checkbox-div  mb-2 ">
                      <div>
                        <input
                          type="checkbox"
                          id="option"
                          //onChange={handleCheckbox}
                        />
                        <label htmlFor="option" className="d-flex">
                          {" "}
                          <span></span>{" "}
                        </label>
                      </div>
                      <p className="ps-2 ms-1"> Schedule SMS</p>{" "}
                    </div>
                    <p>
                      I acknowledge that my card information is saved in my
                      Dotonline account for subsequent transactions.
                    </p>
                    <button className="login-btn rounded-pill bg-primary text-white border-0 mt-2 px-4">
                      Payment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Payment.Layout = DashboardLayout;
export default Payment;
