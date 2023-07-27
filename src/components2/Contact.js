import React, { useEffect, useState } from "react";
import Navbar2 from "./Navbar2";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    enrollment: "",
    message: "",
  });
const userContact = async () => {
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage (assuming you save the token in localStorage after login)
    if (!token) {
      // Handle the case when the token is not available
      throw new Error('No token found');
    }

    const res = await fetch("https://swap-ease-backend.vercel.app/getdata", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
      const data = await res.json();
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        enrollment: data.enrollment,
      });
      console.log(data);
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
    userContact();
  }, []);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, enrollment, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        enrollment,
        message,
      }),
    });
    const data = await res.json();

    if (!data) {
      console.log("Message not found");
    } else {
      alert("Message sent successfully....");
      setUserData({ ...userData, message: "" });
    }
  };
  return (
    <>
      <Navbar2 />
      <div className="container">
        <div className="container wrapper pb-5 px-4 pt-3">
          <h3 className="text-center pb-3"> Contact Us!!</h3>
          <form method="POST" id="contact_form">
            <div className="row">
              <div className="col-md-4 pb-4 text-center">
                <input
                  type="text"
                  name="name"
                  className="px-2 text-center border rounded"
                  value={userData.name}
                  onChange={handleInputs}
                  placeholder="Your Name"
                  required
                  readOnly
                ></input>
              </div>
              <div className="col-md-4 pb-4 text-center">
                <input
                  type="text"
                  name="email"
                  className="px-2 text-center border rounded"
                  value={userData.email}
                  onChange={handleInputs}
                  placeholder="Your Email"
                  required
                  readOnly
                ></input>
              </div>
              <div className="col-md-4 pb-4 text-center">
                <input
                  type="text"
                  name="enrollment"
                  className="px-2 text-center border rounded"
                  value={userData.enrollment}
                  onChange={handleInputs}
                  placeholder="Your Enrollment"
                  required
                  readOnly
                ></input>
              </div>
            </div>
            <div className="mx-4 text-center p-3" style={{ maxWidth: "100%" }}>
              <textarea 
                name="message"
                placeholder="Your Message...."
                value={userData.message}
                onChange={handleInputs}
                className="p-3"
                style={{ width: "100%", height: "auto" , border:"1px soild black", borderRadius:"10px"}}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                onClick={contactForm}
                className="signinbutton"
              >
                Send Message{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
