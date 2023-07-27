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

  // Function to manually get the token from cookies
  const getTokenFromCookie = () => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwtToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
    return token;
  };

  const userContact = async () => {
    try {
      const token = getTokenFromCookie(); // Get the token from cookies
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send the token in the request headers
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
            {/* ... */}

            <div className="text-center">
              <button type="submit" onClick={contactForm} className="signinbutton">
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
