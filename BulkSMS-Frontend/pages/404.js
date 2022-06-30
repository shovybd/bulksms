import Image from "next/image";
import Link from "next/link";
import React from "react";
import circle from "../public/images/circle.svg";

const NotFound = () => {
  return (
    <section className="not-found-section ">
      <div className="card-div container">
        <div className="wrapper">
          <form className=" d-flex align-items-center justify-content-center ps-lg-2  mb-3  ">
            <div className=" text-center">
              <h1>404!</h1>
              <p>Sorry, we can’t find the page you are looking for</p>
              <Link href="/masterDashboard" passHref>
                <button>Back To Home</button>
              </Link>
            </div>

            <div className="img-div">
              <Image src={circle} className=" img-fluid" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
