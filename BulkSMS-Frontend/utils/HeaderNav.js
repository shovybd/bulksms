import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useAuth from "../src/Hooks/useAuth";
import { BREADCRUMB, NAVBARBRAND, URLS } from "./constants";
import SMSHistoryNav from "./smsHistoryNav";
import home from "/public/images/home.svg";
const HeaderNav = ({ children, children2 }) => {
  const { user, logOut, isLoading, setIsLoading } = useAuth();
  const router = useRouter();
  return (
    <section id="headerNav">
      {BREADCRUMB.map((url, index) => {
        return (
          <div
            key={index}
            className={router.asPath === `${url.href}` ? "d-block " : "d-none"}
          >
            <nav
              className="navbar navbar-expand-lg border-bottom bg-white navbar-third"
              id="navbar3"
            >
              <div className="container-fluid">
                <div className="navbar-brand text-primary" href="#">
                  <div className="d-flex">
                    <div>
                      <Image src={home} />{" "}
                    </div>
                    <div className="d-flex brand-text-span">
                      <Link
                        href={URLS.MASTERDASHBOARD}
                        as={URLS.MASTERDASHBOARD}
                        passHref
                      >
                        <a>Home</a>
                      </Link>
                      <span className="ms-1 me-1"> / </span>
                      <span
                        className={
                          router.asPath === `${url.href}` ? "d-block" : "d-none"
                        }
                      >
                        <Link href={url.href} as={url.href} passHref>
                          <a> {url.text}</a>
                        </Link>
                      </span>
                    </div>
                  </div>
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              </div>
            </nav>
          </div>
        );
      })}

      <nav className="navbar navbar-expand-lg border-bottom " id="navbar2">
        <div className="container-fluid">
          <a className="navbar-brand text-primary" href="#">
            {NAVBARBRAND.map((url, index) => {
              return (
                <span
                  key={index}
                  className={
                    router.asPath === `${url.href}` ? "d-block" : "d-none"
                  }
                >
                  {url.pageName}
                </span>
              );
            })}
          </a>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

          <div className="d-block d-flex justify-content-center align-items-center">
            {children}
          </div>
        </div>
      </nav>

      <SMSHistoryNav children2={children2} />
    </section>
  );
};

export default HeaderNav;
