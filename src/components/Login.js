import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import logo from "../images/login.jpg";
import logo1 from "../images/email.jpg";
import logo2 from "../images/password.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("https://swap-ease-backend.vercel.app/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      document.getElementById("demo").innerHTML = "Invalid Credentials....";
    } else {
      if (email === "swapeasenow@gmail.com") {
        navigate("/messages");
      } else navigate("/Details");
    }
  };
  return (
    <>
      <Navbar />
      <div className="container py-3 px-4 mt-lg-4">
      <div className="container wrapper p-5">
        <div className="row">
          <div className="col-md-5 d-md-flex align-items-center justify-content-center d-none">
            <div>
              <img src={logo} alt="logo"  className="wrapper2" />
            </div>
          </div>
          <div className="col-md-7 text-center">
            <h2>
            Login!
            </h2>
            <div id="demo" className="demo"></div>
            <form method="POST">
              <div className="d-flex justify-content-center py-3 fs-5">
                <img src={logo1} alt="logo" className="img1 me-2"/>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="px-3 "
                />
              </div>
              <div className="d-flex justify-content-center py-2 fs-5">
                <img src={logo2} alt="logo" className="img1 me-2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="px-3"
                />
              </div>
            </form>
            <button
              input="true"
              type="submit"
              name="signin"
              id="signin"
              className="signinbutton"
              onClick={loginUser}
            >
              Sign in
            </button>
            <div className="not-member">
              Not a member? <a href="/signup">Register Now</a>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
