import React, { useState, useEffect } from "react";
import logo from "../images/apply.jpg";
import logo1 from "../images/course.jpg";
import logo2 from "../images/branch.png";
import logo3 from "../images/batch.png";
import logo4 from "../images/year.png";
import logo5 from "../images/subject.png";
import Navbar2 from "./Navbar2";

const ApplyForm = () => {
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState({
    course: "",
    branch: "",
    batch: "",
    year: "",
    esubject: "",
    dsubject: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const callApply = async () => {
    try {
      const res = await fetch("https://swap-ease-backend.vercel.app/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setUserData(data);
      console.log(data);
      if (!res.ok) {
        throw new Error("Unauthorized");
      }
    } catch (err) {
      console.log(err);
      // Redirect to login page or handle unauthorized user
    }
  };

  useEffect(() => {
    callApply();
  }, []);

  const PostData = async (e) => {
    e.preventDefault();
    const email = userData.email;
    const { course, branch, batch, year, esubject, dsubject } = user;
    try {
      const res = await fetch("https://swap-ease-backend.vercel.app/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email,
          course,
          branch,
          batch,
          year,
          esubject,
          dsubject,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        window.alert("Applied Successfully");
        console.log("Successfully Applied");
        // Redirect to details page or handle success
      } else {
        console.log("Invalid Registration");
        // Show error message or handle error
      }
    } catch (err) {
      console.error(err);
      // Show error message or handle error
    }
  };

  return (
    <>
    <Navbar2 />
      <div className="container px-4">
        <div className="container wrapper pb-5 px-4 pt-3">
        <div className="row">
          <div className="col-md-7 text-center">
          <h3 className="h3 text-center">Apply to Swap</h3>
          <div id='demo' className="demo2"></div>
          <form method="POST" id='register-form'>
          <div className="d-flex justify-content-center py-2 fs-5">
              <img src={logo1} alt="logo1" className="img1 me-2 mt-2"></img>
              <input type="text" name="course" value={user.course} onChange={handleInputs} placeholder="Course (eg. Btech/MBA/etc)" className="px-3" />
          </div>
          <div className="d-flex justify-content-center py-2 fs-5">
              <img src={logo2} alt="logo" className="img1 me-2 mt-2"></img>
              <input type="text" name="branch" value={user.branch} onChange={handleInputs} placeholder="Branch (eg. CSE/IT/etc)" className="px-3" />
          </div>
          <div className="d-flex justify-content-center py-2 fs-5">
            <img src={logo3} alt="logo3" className="img1 me-2 mt-2"></img>
            <input type="text" name="batch" value={user.batch} onChange={handleInputs} placeholder="Batch (eg. B15)" className="px-3" />
          </div>
          <div className="d-flex justify-content-center py-2 fs-5">
            <img src={logo4} alt="logo4" className="img1 me-2 mt-2"></img>
            <input type="text" name="year" value={user.year} onChange={handleInputs} placeholder="Year (eg. 1st/2nd/3rd/etc)" className="px-3" />
          </div>
          <div className="d-flex justify-content-center py-2 fs-5"> 
            <img src={logo5} alt="logo5" className="img1 me-2 mt-2"></img>
            <input type="text" name="esubject" value={user.esubject} onChange={handleInputs} placeholder="Existing Subject" className="px-3" />
          </div>
          <div className="d-flex justify-content-center py-2 fs-5">
          <img src={logo5} alt="logo5" className="img1 me-2 mt-2"></img>
            <input type="text" name="dsubject" value={user.dsubject} onChange={handleInputs} placeholder="Desired Subject" className="px-3" />
          </div>
            <button
              input='true'
              type="submit"
              name="apply"
              onClick={PostData}
              className="button-signup"
            >
             Click to Apply
            </button>
          </form>
        </div>
        <div className="col-md-4 d-none d-md-block">
        <img src={logo} alt="logo" className="left2"></img>
        </div>
        </div>
      </div>
      </div>
    </>
  );
};
export default ApplyForm;
