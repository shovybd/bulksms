import { useRouter } from "next/router";
import React from "react";
import { URLS } from "./constants";

const SMSHistoryNav = ({ children2 }) => {
  const router = useRouter();
  return (
    <div
      className={router.asPath === `${URLS.SMSHISTORY}` ? "d-block " : "d-none"}
    >
      <nav
        class="navbar navbar-expand-md  "
        id="smsHistoryNavbar01"
        width="100%"
      >
        <div className="w-100">
          <div className="d-flex navbar-toggler-div">
            <div>
              <button
                class="navbar-toggler collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#smsHistoryNavbar02"
                aria-controls="smsHistoryNavbar02"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="navbar-toggler-text">
              <p className="text-nowrap ms-md-3">SMS History Filter</p>
            </div>
          </div>

          <div
            class="collapse navbar-collapse  border-top border-bottom navbar-nav-scroll "
            id="smsHistoryNavbar02"
          >
            {children2}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SMSHistoryNav;
