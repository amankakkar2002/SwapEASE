import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import logo from "../images/signup.png";
import logo1 from "../images/user.png";
import logo2 from "../images/email.jpg";
import logo3 from "../images/enrollment.jpg";
import logo4 from "../images/sector.png";
import logo5 from "../images/password.png";
// import bcrypt from 'bcryptjs';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    enrollment: "",
    sector: "",
    password: "",
    cpassword: "",
    course: "N/A",
    branch: "N/A",
    batch: "N/A",
    year: "N/A",
    esubject: "N/A",
    dsubject: "N/A",
    // salt:""
  });
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const validateEmail = () => {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailPattern.test(user.email);

    if (!isValidEmail) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };
  // let extra =JSON.parse('{"course":"","branch":"", "batch":"","year":"","esubject":"","dsubject":""}');
  const PostData = async (e) => {
    e.preventDefault();
    validateEmail();
  
    if (emailError) {
      document.getElementById("demo").innerHTML = "Invalid email address";
      return;
    }
  
    const {
      name,
      email,
      enrollment,
      sector,
      password,
      cpassword,
      course,
      branch,
      batch,
      year,
      esubject,
      dsubject,
    } = user;
  
    const res = await fetch("https://swap-ease-backend.vercel.app/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        enrollment,
        sector,
        password,
        cpassword,
        course,
        branch,
        batch,
        year,
        esubject,
        dsubject,
        otp,
      }),
    });
  
    const data = await res.json();
  
    if (res.status === 422 || !data) {
      document.getElementById("demo").innerHTML = "Invalid Registration";
      console.log("Invalid Registration");
    } else {
      window.alert("Registered Successfully");
      console.log("Successful Registration");
      navigate("/login");
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="container px-4">
        <div className="container wrapper pb-5 px-4 pt-3">
          <div className="row">
            <div className="col-md-7 text-center">
              <h2>
              SIGN UP
              </h2>
              <div id="demo" className="demo"></div>
              <form method="POST" id="register-form">
                <div className="d-flex justify-content-center py-2 fs-5">
                  <img src={logo1} alt="logo1" className="img1 me-2 mt-2"></img>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Username"
                    className="px-3"
                  />
                </div>
                <div className="d-flex justify-content-center py-2 fs-5">
                <img src={logo2} alt="logo1" className="img1 me-2 mt-2"></img>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputs}
                  onBlur={validateEmail}
                  placeholder="Email"
                  className={`px-3 `}
                  required
                />
                {emailError && (
                  <div className="invalid-feedback">{emailError}</div>
                )}
              </div>
                <div className="d-flex justify-content-center py-2 fs-5">
                  <img src={logo3} alt="logo3" className="img1 me-2 mt-2"></img>
                  <input
                    type="number"
                    name="enrollment"
                    value={user.enrollment}
                    onChange={handleInputs}
                    placeholder="Enrollment Number"
                    className="px-3"
                  />
                </div>
                <div className="d-flex justify-content-center py-2 fs-5">
                  <img src={logo4} alt="logo4" className="img1 me-1" />
                  {/* <select name="sector" value={user.sector} onChange={handleInputs} className="select px-3">
                    <option value="" disabled se>
                      Select Sector
                    </option>
                    <option value="62">62</option>
                    <option value="128">128</option>
                  </select> */}
                  <input
                    type="number"
                    name="sector"
                    value={user.sector}
                    onChange={handleInputs}
                    placeholder="Sector (62 or 128)"
                    className="px-3"
                  />
                </div>

                <div className="d-flex justify-content-center py-2 fs-5">
                  <img src={logo5} alt="logo5" className="img1 me-2 mt-2"></img>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Password"
                    className="px-3"
                  />
                </div>
                <div className="d-flex justify-content-center py-2 fs-5">
                  <img src={logo5} alt="logo5" className="img1 me-2 mt-2"></img>
                  <input
                    type="password"
                    name="cpassword"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm Password"
                    className="px-3"
                  />
                </div>
                <input
                  type="hidden"
                  name="course"
                  value={user.course}
                  onChange={handleInputs}
                />
                <input
                  type="hidden"
                  name="branch"
                  value={user.branch}
                  onChange={handleInputs}
                />
                <input
                  type="hidden"
                  name="batch"
                  value={user.batch}
                  onChange={handleInputs}
                />
                <input
                  type="hidden"
                  name="year"
                  value={user.year}
                  onChange={handleInputs}
                />
                <input
                  type="hidden"
                  name="esubject"
                  value={user.esubject}
                  onChange={handleInputs}
                />
                <input
                  type="hidden"
                  name="dsubject"
                  value={user.dsubject}
                  onChange={handleInputs}
                />
                     <input
      type="text"
      name="otp"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      placeholder="Enter OTP"
      className="px-3"
   />
                <button
                  input="true"
                  type="submit"
                  name="signup"
                  onClick={PostData}
                  className="button-signup"
                >
                  Sign Up
                </button>
              </form>
            </div>
            <div className="col-md-5 d-md-flex align-items-center justify-content-center d-none">
              <img src={logo} alt="logo" className="wrapper2"></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
