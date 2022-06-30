import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { USERPROFILEDROPDOWNITEMS } from "../../../utils/constants";
import useAuth from "../../Hooks/useAuth";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";
import withAuth from "/pages/HOC/withAuth";
import humbergerImg from "/public/images/admin/humberger.svg";
import profile from "/public/images/admin/profileImg.svg";
import securityImg from "/public/images/admin/security.svg";
import crossImg from "/public/images/admin/Vector.svg";
import logout from "/public/images/logout.svg";
import { NAVIGATION } from "/utils/constants";

const DashboardLayout = ({ children }) => {
  const [active, setActive] = useState(true);
  const { logOut } = useAuth();
  const router = useRouter();
  const { createCampaign } = router.query;

  return (
    <div className="master-dashboard-section">
      <div className={`sidebar  ${active ? "active" : ""}`}>
        <div className="logo-details">
          <div onClick={() => setActive(!active)} className=" ps-3 text-center">
            {active ? (
              <Image
                src={humbergerImg}
                role="button"
                className=" img-fluid"
                alt=""
              />
            ) : (
              <Image
                src={crossImg}
                role="button"
                className=" img-fluid"
                alt=""
              />
            )}
          </div>
        </div>

        <div className="profile-info">
          <div className="d-block d-md-none text-white d-flex align-items-center">
            <Image
              src={profile}
              width="85px"
              height="85px"
              className="rounded-circle border"
            />
            <div className="user-info w-100">
              <h6 className="w-100">Teri Dactyl</h6>
              <p>Super Admin</p>
            </div>
          </div>
        </div>

        <div className="main-menu ">
          {NAVIGATION.map((url, index) => {
            return (
              <div key={index} className={url?.class}>
                <div className={url?.className}>
                  <div className="menu-list">
                    <Link href={url.href} as={url.href} passHref>
                      <a className="menu-links">
                        <div
                          className={
                            router.pathname === `${url.href}`
                              ? "active-link"
                              : ""
                          }
                        >
                          <div className="menu-item  d-flex">
                            <div className="menu-icon">
                              <Image
                                src={url.icons}
                                width={url.width}
                                height={url.height}
                                className="img-fluid"
                                alt=""
                              />
                            </div>
                            {active ? "" : <span>{url.pageName}</span>}
                          </div>
                        </div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sidebar-footer-menu-links ">
          <hr />
          <div className="main-menu">
            <div className="menu-list">
              {USERPROFILEDROPDOWNITEMS.map((url, index) => {
                return (
                  <Link key={index} href={url.href} as={url.href} passHref>
                    <a className="menu-links">
                      <div
                        className={
                          router.pathname === `${url.href}` ? "active-link" : ""
                        }
                      >
                        <div className="menu-item  d-flex">
                          <div className="menu-icon">
                            <Image
                              src={url.icon}
                              width={url.width}
                              height={url.height}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                          {active ? "" : <span>{url.pageName}</span>}
                        </div>
                      </div>
                    </a>
                  </Link>
                );
              })}
              <div onClick={logOut} role="button">
                <a className="menu-links">
                  <div className="menu-item  d-flex">
                    <div className="menu-icon">
                      <Image
                        src={logout}
                        width="16px"
                        height="16px"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    {active ? "" : <span>Logout</span>}
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-footer-div">
          <div className="footer-menu fixed-bottom">
            <div className="side-menu-footer">
              <a className="menu-links d-flex p-3" href="#">
                <div className="menu-icon">
                  <Image src={securityImg} className="img-fluid" alt="" />
                </div>
                {active ? "" : <span>Security</span>}
              </a>
            </div>
          </div>
        </div>
      </div>
      <section className="home-section">
        <div className="overlay">
          <div className="layer"></div>
        </div>
        <Navbar />
        <div className="home-content">{children}</div>
        <Footer />
      </section>
    </div>
  );
};

//export default DashboardLayout;
export default withAuth(DashboardLayout, {
  isProtectedRoute: true,
});
