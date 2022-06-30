import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DatePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { Controller, useForm } from "react-hook-form";
import swal from "sweetalert";
import * as yup from "yup";
import DashboardLayout from "../../src/Components/Layout/dashboardLayout";
import useAuth from "../../src/Hooks/useAuth";
import { FormInput } from "../../utils/FormInput";
import HeaderNav from "../../utils/HeaderNav";
import calander from "/public/images/admin/calander.svg";
import download from "/public/images/admin/download.svg";
const SendSMS = () => {
  if (typeof window !== "undefined") {
    window.$ = window.jQuery = require("jquery");
    require("jquery.bangla");
  }
  const [languageValue, setLanguageValue] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [smsTypeInputBox, setSmsTypeInputBox] = useState(false);
  const [smsValue, setSmsValue] = useState("");
  const [instantSMSInputBox, setInstantSMSInputBox] = useState(false);
  const [bulkSMSInputBox, setBulkSMSInputBox] = useState(false);
  const [bulkMultiSMS, setBulkMultiSMS] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isBangla, setBangla] = useState(false);
  const [smsCharacterCount, setSmsCharacterCount] = useState(0);
  const [smsTotalCount, setSmsTotalCount] = useState(0);
  const [fileName, setFileName] = useState();
  const [file, setFile] = useState("");
  const router = useRouter();

  const {
    logOut,
    isLoading,
    setAuthSuccess,
    setAuthError,
    authError,
    authSuccess,
    authToken,
    setAuthToken,
    authTokenRef,
    updateToken,
    setIsLoading,
  } = useAuth();

  const phoneRegExp = /^(?:\+88|88)?(01[3-9]\d{8})$/;
  let schema = yup
    .object()
    .shape({
      campaignName: yup
        .string()
        .required("Campaign name is required")
        .min(6, "Minimum length must be 6 characters long")
        .max(255, "Max length should be 255 characters long"),
      phoneNumber: yup
        .string()
        .required("Phone number is required")
        .matches(phoneRegExp, "Phone number is not valid."),
      smsType: yup.string().required(),
      instantSMS: yup.string().required("Instant SMS is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isDirty, isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    shouldUnregister: true,
  });

  const falseState = () => {
    setInstantSMSInputBox(false);
    setSmsCharacterCount(false);
    setSmsTotalCount(false);
    setBulkMultiSMS(false);
    setIsChecked(false);
    setBulkSMSInputBox(false);
    setFileName("");
  };

  const handleCampaign = (e) => {
    setCampaignName(e.target.value);
    console.log(e.target.value);
  };

  const handleSelectLanguage = (e) => {
    setLanguageValue(e.target.value);
    const languageValue = e.target.value;
    if (languageValue === "English" || languageValue === "Bengali") {
      setSmsTypeInputBox(true);
    }
    if (languageValue === "English") {
      setBangla(false);
    } else if (languageValue === "Bengali") {
      setBangla(true);
    }
  };

  let smsTypes = [
    { value: 2, name: "Instant SMS" },
    { value: 3, name: "Bulk SMS" },
    { value: 4, name: "Bulk multi SMS" },
  ];
  const [smsTypeValue, setSmsTypeValue] = useState("");

  const handleSelectSMSType = (e) => {
    setSmsTypeValue(e.target.value);
    const value = e.target.value;
    if (value === "1") {
      falseState();
    }
    if (value === "2") {
      falseState();
      setInstantSMSInputBox(true);
      console.log("instant sms selected");
    }
    if (value === "3") {
      falseState();
      setBulkSMSInputBox(true);
      console.log("Bulk sms selected");
    }
    if (value === "4") {
      falseState();
      setBulkMultiSMS(true);
    }
  };

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
  };

  const calculateSmsCharacterCount = (e) => {
    e.preventDefault();

    setSmsCharacterCount(e.target.value.length);
    let smsCharacterTotal = e.target.value.length;

    if (smsCharacterTotal % 120 == 0) {
      let totalSMS = smsCharacterTotal / 120;
      setSmsTotalCount(totalSMS);
    } else {
      let totalSMS = Math.ceil(smsCharacterTotal / 120);
      setSmsTotalCount(totalSMS);
    }
  };

  const handleFileUploadChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target?.files[0]?.name);
    console.log(e.target.files[0]);
  };

  const handleBangla = () => {
    $('input[type="text"]').bangla(); // input box
    $("#text-area").bangla();
    $("#text-area").bangla("enable", true);
  };

  const handleEnglish = () => {
    $('input[type="text"]').bangla(); // input box
    $("#text-area").bangla();
    $("#text-area").bangla("enable", false);
  };

  const onSubmit = async (data) => {
    let formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.set("file", file);
    setIsLoading(true);
    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/campaign/create`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          "auth-token": authTokenRef.current,
        },
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (res.data) {
          swal({
            title: "WOW!",
            text: "Campaign Created Successfully!",
            icon: "success",
            button: "Ok!",
          });
          reset();
          setIsLoading(false);
        }
      })
      .catch(async (error) => {
        if (!error.response) {
          setAuthSuccess("");
          setAuthError("NETWOKR ERROR !!!");
        }
        if (error.response) {
          console.log(error.response);
          setAuthSuccess("");
          setAuthError(error.response?.data?.errorMessage);
          if (error.response.data.invalidAuthTokenMessage) {
            await updateToken().then(async (res) => {
              await onSubmit(data);
            });
          } else if (error.response.data.invalidRefreshTokenMessage) {
            setAuthSuccess("");
            setAuthError(error.response.data.invalidRefreshTokenMessage);
            logOut();
          }
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        setIsLoading(false);
        console.log(error.config);

        // ErrorHandler(
        //   error,
        //   updateToken,
        //   setAuthError,
        //   setAuthSuccess,
        //   logOut,
        //   onSubmit(data)
        // );
      });
  };

  return (
    <div>
      <HeaderNav>
        <div className="nav-item">
          <button className="btn reset-btn">
            <span>Reset</span>
          </button>
        </div>

        <div className="nav-item">
          <button className="btn preview-btn">Preview</button>
        </div>

        <div className="nav-item">
          <button className=" btn  draft-btn  ">Draft</button>
        </div>

        <div className="nav-item">
          <button
            type="submit"
            form="hook-form"
            className=" btn send-btn"
            disabled={!isDirty || !isValid}
          >
            Send
          </button>
        </div>
      </HeaderNav>

      <section className="send-sms-section ">
        <div className="mt-3 pt-1 card-div container pb-5 mb-5">
          <div className="wrapper">
            <div className="px-4 mx-lg-0">
              <form
                id="hook-form"
                className=" mx-2 py-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                {isLoading && (
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
                {authSuccess && (
                  <div className="alert alert-success" role="alert">
                    {authSuccess}
                  </div>
                )}
                {authError && (
                  <div className="alert alert-danger" role="alert">
                    {authError}
                  </div>
                )}

                <div className="pt-1 pb-3">
                  <FormInput
                    id="campaignName"
                    label="Campaign name"
                    placeholder="write your campaign name"
                    type="text"
                    {...register("campaignName")}
                    onChange={handleCampaign}
                  />
                  {errors.campaignName?.message && (
                    <p className="count-text pt-2">
                      {errors.campaignName?.message}
                    </p>
                  )}

                  {campaignName.length >= 6 && (
                    <div>
                      <label htmlFor="languageName" className="form-label">
                        Select language
                      </label>

                      <select
                        value={languageValue}
                        className="form-select  col-12 rounded-pill "
                        name="languageName"
                        id="languageName"
                        {...register("languageName")}
                        onChange={handleSelectLanguage}
                      >
                        <option>Select language</option>
                        <option value="English">English</option>
                        <option value="Bengali">Bengali</option>
                      </select>
                    </div>
                  )}

                  {smsTypeInputBox && (
                    <div>
                      <label htmlFor="smsType" className="form-label">
                        SMS type
                      </label>
                      <select
                        required
                        className="form-select  col-12 rounded-pill "
                        name="smsType"
                        id="smsType"
                        {...register("smsType")}
                        onChange={handleSelectSMSType}
                      >
                        <option value="1">SMS Type</option>
                        {smsTypes.map((smsType) => (
                          <option key={smsType.value} value={smsType.value}>
                            {smsType.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {instantSMSInputBox && (
                    <>
                      <div>
                        <label htmlFor="instantSMS" className="form-label">
                          Instant SMS
                        </label>
                        <textarea
                          id="text-area"
                          type="text"
                          rows={5}
                          className="col-12"
                          placeholder="Type your message"
                          name="instantSMS"
                          {...register("instantSMS")}
                          onChange={calculateSmsCharacterCount}
                          onClick={(isBangla && handleBangla) || handleEnglish}
                        />
                        {errors.instantSMS?.message && (
                          <p className="count-text pt-2">
                            {errors.instantSMS?.message}
                          </p>
                        )}
                        <p className="count-text">
                          {smsCharacterCount % 120}/120{" "}
                        </p>
                      </div>
                      <FormInput
                        id="phoneNumber"
                        label="Input your mobile number"
                        placeholder="Type your mobile number"
                        type="text"
                        {...register("phoneNumber")}
                      />
                      {errors.phoneNumber?.message && (
                        <p className="count-text pt-2">
                          {errors.phoneNumber?.message}
                        </p>
                      )}
                    </>
                  )}

                  {bulkSMSInputBox && (
                    <>
                      <div>
                        <label htmlFor="bulkSMS" className="form-label">
                          Bulk SMS
                        </label>

                        <textarea
                          required
                          id="text-area"
                          type="text"
                          rows={5}
                          className="col-12"
                          placeholder="Type your message"
                          name="bulkSMS"
                          {...register("bulkSMS")}
                          onChange={calculateSmsCharacterCount}
                          onClick={(isBangla && handleBangla) || handleEnglish}
                        />
                        <p className="count-text">
                          {smsCharacterCount % 120}/120
                        </p>
                      </div>

                      <div className="form-upload col-12">
                        <div
                          className="file-upload-wrapper"
                          data-text={fileName}
                        >
                          <FormInput
                            {...register("file")}
                            id="file"
                            name="file"
                            type="file"
                            accept=".csv, .xlx, .xlsx"
                            className="file-upload-field"
                            onChange={handleFileUploadChange}
                          />
                        </div>
                      </div>

                      <a
                        download
                        href="/data.csv"
                        className="mt-2 download-text d-flex justify-content-end pb-3"
                      >
                        <Image src={download} className="img-fluid" alt="" />
                        <span className="ms-2 fw-normal text-secondary border-bottom border-secondary">
                          Download Template
                        </span>
                      </a>

                      <div className="d-flex checkbox-div  mb-2 ">
                        <div>
                          <input
                            type="checkbox"
                            id="option"
                            onChange={handleCheckbox}
                          />
                          <label htmlFor="option" className="d-flex">
                            {" "}
                            <span></span>{" "}
                          </label>
                        </div>
                        <p className="ps-2 ms-1"> Schedule SMS</p>{" "}
                      </div>

                      {isChecked && (
                        <div>
                          <label className="col-12 col-md-7 pt-1">
                            <div className="date-picker-img position-absolute">
                              <Image src={calander} width="17px" />
                            </div>
                            <span>
                              <Controller
                                control={control}
                                name="scheduledTime"
                                render={({ field }) => (
                                  <DatePicker
                                    className="date-picker-div"
                                    inputProps={{
                                      placeholder: "Select date",
                                      style: {
                                        width: 150,
                                        height: 16,
                                        textAlign: "left",
                                        border: 0,
                                        margin: 0,
                                        marginLeft: 7,
                                      },
                                    }}
                                    dateFormat="DD-MM-YYYY"
                                    timeFormat="hh:mm A"
                                    onChange={(time) => field.onChange(time)}
                                    selected={field.value}
                                  />
                                )}
                              />
                            </span>
                          </label>
                        </div>
                      )}
                    </>
                  )}

                  {bulkMultiSMS && (
                    <>
                      <div className="form-upload col-12">
                        <div
                          className="file-upload-wrapper"
                          data-text={fileName}
                        >
                          <FormInput
                            id="file"
                            name="file"
                            type="file"
                            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            className="file-upload-field"
                            {...register("file")}
                            onChange={handleFileUploadChange}
                          />
                        </div>
                      </div>
                      <a
                        download
                        href="/data.csv"
                        className="mt-2 download-text d-flex justify-content-end pb-3"
                      >
                        <Image src={download} className="img-fluid" alt="" />
                        <span className="ms-2 fw-normal text-secondary border-bottom border-secondary">
                          Download Template
                        </span>
                      </a>

                      <div className="d-flex checkbox-div  mb-2 ">
                        <div>
                          <input
                            type="checkbox"
                            id="option"
                            onChange={handleCheckbox}
                          />
                          <label htmlFor="option" className="d-flex">
                            {" "}
                            <span></span>{" "}
                          </label>
                        </div>
                        <p className="ps-2 ms-1"> Schedule SMS</p>{" "}
                      </div>

                      {isChecked && (
                        <div>
                          <label className="col-12 col-md-7 pt-1">
                            <div className="date-picker-img position-absolute">
                              <Image src={calander} width="17px" />
                            </div>
                            <span>
                              <Controller
                                control={control}
                                name="scheduledTime"
                                render={({ field }) => (
                                  <DatePicker
                                    className="date-picker-div"
                                    inputProps={{
                                      placeholder: "Select date",
                                      style: {
                                        width: 150,
                                        height: 16,
                                        textAlign: "left",
                                        border: 0,
                                        margin: 0,
                                        marginLeft: 7,
                                      },
                                    }}
                                    dateFormat="DD-MM-YYYY"
                                    timeFormat="hh:mm A"
                                    onChange={(time) => field.onChange(time)}
                                    selected={field.value}
                                  />
                                )}
                              />
                            </span>
                          </label>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
SendSMS.Layout = DashboardLayout;
export default SendSMS;
