import React, { useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router-dom";
import image from "../images/batch.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Details = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

 const callDetails = async () => {
  try {
    const token = localStorage.getItem('userToken'); // Get the token from local storage

    const res = await fetch("https://swap-ease-backend.vercel.app/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Add the token to the request headers
      },
    });

    const data = await res.json();
    console.log(data);
    setUserData(data);

    if (!res.status === 200) {
      const error = new Error(res.error);
      throw error;
    }
  } catch (err) {
    console.log(err);
    navigate("/login");
  }
};


  useEffect(() => {
    callDetails();
  }, []);
 const handleDeleteFormDetails = async () => {
  try {
    const token = localStorage.getItem('userToken'); // Get the token from local storage

    const res = await fetch("https://swap-ease-backend.vercel.app/deleteFormDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Add the token to the request headers
      },
      body: JSON.stringify({
        userId: userData._id, // Assuming userData contains the user ID
      }),
    });

    const data = await res.json();
    if (res.status === 200) {
      // Update the user data in the frontend with "N/A" values for the specified fields
      setUserData({
        ...userData,
        course: "N/A",
        branch: "N/A",
        batch: "N/A",
        year: "N/A",
        dsubject: "N/A",
        esubject: "N/A",
      });
      alert(data.message); // Show a success message to the user
    } else {
      // Handle error response from the server
      alert("Failed to delete form details");
    }
  } catch (err) {
    console.log(err);
    navigate("/login");
  }
};

  return (
    <>
      <Navbar2 />
      <div className="container px-4">
        <div className="container wrapper pb-5 px-4 pt-3">
          <div className="row">
            <div className="">
              <div className="h3 profile-img">
                <strong>USER DETAILS</strong>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 px-3 py-2">
              <div className=" h4 p-3">About</div>
              <div className="row py-2">
                <div className="col-3 col-md-4 fw-bold">Name</div>
                <div className="col-1">-</div>
                <div
                  className="col-8 col-md-7 span1 fw-bold"
                  style={{ overflowX: "auto" }}
                >
                  {userData.name}
                </div>
              </div>
              <div className="row py-2">
                <div className="col-3 col-md-4 fw-bold">Email</div>
                <div className="col-1">-</div>
                <div
                  className="col-8 col-md-7 span1 fw-bold"
                  style={{ overflowX: "auto" }}
                >
                  <div>{userData.email}</div>
                </div>
              </div>
              <div className="row py-2">
                <div className="col-3 col-md-4 fw-bold">Enroll</div>
                <div className="col-1">-</div>
                <div
                  className="col-8 col-md-7 span1 fw-bold"
                  style={{ overflowX: "auto" }}
                >
                  {userData.enrollment}
                </div>
              </div>
              <div className="row py-2">
                <div className="col-3  col-md-4 fw-bold">Sector</div>
                <div className="col-1">-</div>
                <div
                  className="col-8 col-md-7 span1 fw-bold"
                  style={{ overflowX: "auto" }}
                >
                  {userData.sector}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row py-2">
                <div className="h4 p-3 ">Form Details</div>
                <div className="col-3 col-md-4 fw-bold">Course</div>
                <div className="col-1">-</div>
                <div
                  className="col-8 col-md-7 span1 fw-bold"
                  style={{ overflowX: "auto" }}
                >
                  {userData.course}
                </div>
              </div>
              <div className="row py-2">
                <div className="col-3 col-md-4 fw-bold">Branch</div>
                <div className="col-1">-</div>
                <div
                  className="col-8 col-md-7 span1 fw-bold"
                  style={{ overflowX: "auto" }}
                >
                  {userData.branch}
                </div>
              </div>
              <div className="row py-2">
                <div className="col-3 col-md-4 fw-bold">Batch</div>
                <div className="col-1">-</div>
                <div
                  className="col-8 col-md-7 span1 fw-bold"
                  style={{ overflowX: "auto" }}
                >
                  {userData.batch}
                </div>
              </div>
              <div className="row py-2">
                <div className="col-3 col-md-4 fw-bold">Year of Admission:</div>
                <div className="col-1">-</div>
                <div
                  className="col-8 col-md-7 span1 fw-bold"
                  style={{ overflowX: "auto" }}
                >
                  {userData.year}
                </div>
              </div>
              <div className="row py-2">
                <div className="col-3 col-md-4 fw-bold">Desired Subject</div>
                <div className="col-1">-</div>
                <div
                  className="col-8 col-md-7 span1 fw-bold"
                  style={{ overflowX: "auto" }}
                >
                  {userData.dsubject}
                </div>
              </div>
              <div className="row py-2">
                <div className="col-3 col-md-4 fw-bold">Existing Subject</div>
                <div className="col-1">-</div>
                <div
                  className="col-8 col-md-7 span1 fw-bold"
                  style={{ overflowX: "auto" }}
                >
                  {userData.esubject}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center pt-2">
        <button
          className="btn bg-primary text-white"
          style={{ textDecoration: "none" }}
          onClick={handleDeleteFormDetails}
        >
          Delete Form Details (If Already Swapped)
        </button>
      </div>
        </div>
      </div>
    </>
  );
};

export default Details;
