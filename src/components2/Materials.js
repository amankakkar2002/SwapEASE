import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./Navbar2";
import logo from "../images/question.png";
import Select from "react-select";

const Materials = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState({
    subject: "",
    year: "",
    exam: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const callMaterials = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle the case when there is no token in local storage (unauthorized user)
        navigate("/login");
        return;
      }

      const res = await fetch("https://swap-ease-backend.vercel.app/details", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          // Handle unauthorized (invalid/expired token) response
          // Redirect the user to the login page
          localStorage.removeItem("token"); // Remove the invalid token from local storage
          navigate("/login");
          return;
        }

        const error = new Error(res.error);
        throw error;
      }

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.log(err);
      // Handle error (e.g., show error message)
    }
  };

  useEffect(() => {
    callMaterials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to execute only once when the component mounts

  const PostData = async (e) => {
    e.preventDefault();
    const { subject, year, exam } = user;
    const res = await fetch("https://swap-ease-backend.vercel.app/materials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        year,
        exam,
      }),
    });
    const fileName = `${subject}${year}${exam}.pdf`;
    console.log(fileName);
    if (res.status === 422 || !fileName) {
      document.getElementById("demo").innerHTML = "Invalid Entries";
      console.log("Invalid Registration");
    } else {
      // Get the file data
      const fileBlob = await res.blob();
      // Create a URL object for the file
      const fileUrl = URL.createObjectURL(fileBlob);
      // Open the file in a new window or tab
      window.open(fileUrl);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="container px-4">
      <div className="container wrapper pb-5 px-4 pt-3">
      <div className="row">
          <div className="col-md-7 text-center">
          <h3 className="text-center">Get Prev. Year Papers (<span className="text-danger"> In Progress !! </span> )</h3>
          <div id="demo" className="demo2"></div>
          <form method="POST" id="register-form">
          <div className="d-flex justify-content-center">
              {/* <img src={logo4} alt="logo4" className="img3"></img> */}
              <select
                type="text"
                name="subject"
                placeholder="Subject"
                className="form-control text-center my-2"
                value={user.subject}
                style={{width:"80%"}}
                onChange={handleInputs}
              >
                <option value="" disabled selected>
                Select Subject
                </option>
                {/* <option value="SOY">Sociology of Youth</option> */}
                <option value="DMWA">Data Mining and Web Algorithms(DMWA)</option>
                {/* <option value="LSDS">Introduction to Large Scale Database Systems(LSDS)</option>
                <option value="OR">Operation Research(OR)</option> */}
              </select>
            </div>

            <div className="d-flex justify-content-center">
              {/* <img src={logo4} alt="logo4" className="img3"></img> */}
              <select
                type="text"
                name="year"
                placeholder="Year"
                className="form-control text-center my-2"
                style={{width:"80%"}}
                value={user.year}
                onChange={handleInputs}
              >
                <option value="" disabled selected>
                  Year
                </option>
                <option value="2023">2023</option>
                {/* <option value="2022">2022</option> */}
              </select>
            </div>
            <div className="d-flex justify-content-center">
              {/* <img src={logo4} alt="logo4" className="img3"></img> */}
              <select
                type="text"
                name="exam"
                placeholder="Exam"
                className="form-control text-center my-2"
                style={{width:"80%"}}
                value={user.exam}
                onChange={handleInputs}
              >
                <option value="" disabled selected>
                  Exam
                </option>
                <option value="T1">T1</option>
                {/* <option value="T2">T2</option>
                <option value="T3">T3</option> */}
              </select>
            </div>
            <button
              input="true"
              type="submit"
              name="apply"
              onClick={PostData}
              className="button-signup mt-3"
            >
              Click to Download
            </button>
          </form>
        </div>
        <div className="col-md-5 d-none d-md-block">
        <img src={logo} alt="logo" className="left3"></img>
        </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Materials;
