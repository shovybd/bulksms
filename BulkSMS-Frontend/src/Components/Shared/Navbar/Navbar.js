import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  DROPDOWNITEMS,
  USERPROFILEDROPDOWNITEMS,
} from "../../../../utils/constants";
import useAuth from "../../../Hooks/useAuth";
import notification from "/public/images/admin/notification.svg";
import profile from "/public/images/admin/profile-image.jpg";
import logo from "/public/images/logo.svg";
import logo1 from "/public/images/logo1.svg";
import logo2 from "/public/images/logo2.svg";
import logout from "/public/images/logout.svg";
import line from "/public/images/slash.svg";

const Navbar = () => {
  const { user, logOut, isLoading, setIsLoading } = useAuth();
  const router = useRouter();
  const [progressBarValue, setProgressBarValue] = useState(35);
  const [hasMounted, setHasMounted] = useState(false);
  const { handleSubmit } = useForm();

  useEffect(() => {
    setHasMounted(true);
    axios.get("/fakedata.json").then((res) => {
      const mountData = res.data;
      const intervalId = setInterval(() => {
        const minimumBalance = mountData.minBalance;
        const usedBalance = mountData.use;
        const totalBalance = mountData.Total;
        setProgressBarValue((previousBalance) => {
          if (previousBalance >= mountData.maxBalance) {
            clearInterval(intervalId);
            return 100;
          } else {
            const totalUsedPerchantage = (usedBalance * 100) / totalBalance;
            return totalUsedPerchantage;
          }
        });
      }, 1000);
      return clearInterval(intervalId);
    });
  }, []);
  if (!hasMounted) {
    return null;
  }
  return (
    <div className="nav-section fixed-top" id="navbar">
      <nav className="navbar navbar-expand-lg  menu border-bottom">
        <div className="container-fluid">
          {user.userEmail ? (
            <>
              <a
                className="d-none d-md-block navbar-brand master-page-brand text-uppercase ps-2"
                href="#"
              >
                <Image src={logo} className="img-fluid" alt="" />
              </a>
              <a
                className="d-block d-md-none d-lg-none navbar-brand master-page-brand text-uppercase ps-2"
                href="#"
              >
                <Image src={logo1} className="img-fluid" alt="" />
              </a>
            </>
          ) : (
            <a className=" navbar-brand text-uppercase ps-2" href="#">
              <Image src={logo2} className=" img-fluid" alt="" />
            </a>
          )}

          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          {user.userEmail ? (
            <>
              <div className="d-none d-lg-block pt-1 nav-item ">
                <div className="show-balance-input position-relative rounded-pill">
                  <div className="d-flex justify-content-center pt-1 pb-1">
                    <p>3500000</p>
                    <Image src={line} className=" mb-2 img-fluid" alt="" />
                    <p>10000000</p>
                  </div>
                  <div className=" position-absolute top-0 start-50 translate-middle badge balance-text  rounded-pill text-uppercase">
                    <span className="position-absolute top-50 translate-middle ">
                      {" "}
                      balance
                    </span>
                  </div>
                  <div className=" progressBar  position-absolute top-100 start-50 translate-middle badge w-75">
                    <ProgressBar
                      className="rounded-pill"
                      now={progressBarValue}
                    />
                  </div>
                </div>

                <div className=" percent-text d-flex justify-content-evenly">
                  <span className="ms-4">{`${progressBarValue}%`}</span>{" "}
                  <span className="">100% </span>
                </div>
              </div>

              <div className="d-none d-md-block d-lg-none  nav-item">
                <span className="balance-text-1">3500000 </span> /{" "}
                <span className="balance-text-2"> 1000000</span>{" "}
              </div>

              <div className="">
                <input
                  type="text"
                  className="input-search nav-item"
                  placeholder="Search by campaign"
                />
              </div>

              <div className="btn-group  dropdown">
                <div
                  data-bs-toggle="dropdown"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-expanded="false"
                  className="dropdown-toggle nav-item"
                ></div>

                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton"
                >
                  {DROPDOWNITEMS.map((url, index) => {
                    return (
                      <Link key={index} href={url.href} as={url.href} passHref>
                        <a
                          className={
                            router.pathname === `${url.href}`
                              ? "dropdown-item active-link"
                              : "dropdown-item"
                          }
                        >
                          <div className="d-flex">
                            <Image
                              src={url.icon}
                              width={url.width}
                              height={url.height}
                            />
                            <div>
                              <span>{url.pageName}</span>
                            </div>
                          </div>
                        </a>
                      </Link>
                    );
                  })}
                </ul>
              </div>

              <div className="notification">
                <div className="nav-item  me-1 me-md-0">
                  <Image src={notification} className="img-fluid" />
                </div>
              </div>

              <div className="d-none d-md-block profile-div">
                <div className="btn-group dropdown">
                  <div
                    data-bs-toggle="dropdown"
                    type="button"
                    id="dropdownMenuButton2"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    className="nav-item"
                  >
                    <Image
                      src={profile}
                      width="44px"
                      height="44px"
                      className="rounded-circle border img-fluid "
                    />
                  </div>

                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuButton2"
                    id="dropdown-div"
                  >
                    <li>
                      <a className="dropdown-item user-info">
                        <div>
                          <h6> Teri Dactyl</h6>
                          <p>Super Admin</p>
                        </div>
                      </a>
                    </li>
                    {USERPROFILEDROPDOWNITEMS.map((url, index) => {
                      return (
                        <Link
                          key={index}
                          href={url.href}
                          as={url.href}
                          passHref
                        >
                          <a
                            className={
                              router.pathname === `${url.href}`
                                ? "dropdown-item active-link"
                                : "dropdown-item"
                            }
                          >
                            <div className="d-flex">
                              <Image
                                src={url.icon}
                                width={url.width}
                                height={url.height}
                              />
                              <div>
                                <span>{url.pageName}</span>
                              </div>
                            </div>
                          </a>
                        </Link>
                      );
                    })}
                    <li onClick={logOut}>
                      <a className="dropdown-item">
                        <div className="d-flex">
                          <Image src={logout} width="16px" height="16px" />
                          <div>
                            <span>Logout</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="d-flex">
              <div className={router.asPath === "/login" ? "d-none" : ""}>
                <Link href="/login" as="/login" passHref>
                  <button className=" btn login-button bg-primary border-0 fw-normal rounded-pill  text-white px-4 mx-1 py-2">
                    Login
                  </button>
                </Link>
              </div>

              <div className={router.asPath === "/register" ? "d-none" : ""}>
                <Link href="/register" as="/register" passHref>
                  <button className=" btn border-0 fw-normal rounded-pill bg-primary  text-white px-4 mx-1 py-2">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
