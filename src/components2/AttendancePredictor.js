import React, { useState } from "react";
import Navbar2 from "./Navbar2";
import logo from "../images/attendance.jpg";
import logo1 from "../images/lecture.png";
import logo2 from "../images/tutorial.jpg";
import logo3 from "../images/credits.jpg";
import logo4 from "../images/percentage.jpg";

const AttendancePredictor = () => {
  const [currentPercentage, setCurrentPercentage] = useState("");
  const [totalClasses, setTotalClasses] = useState("");
  const [credits, setCredits] = useState("");
  const [percentageNeeded, setPercentageNeeded] = useState("");
  const [message, setMessage] = useState("");

  function calculateClassesNeeded() {
    var current = parseInt(currentPercentage);
    var total = parseInt(totalClasses);
    var percentage = parseInt(percentageNeeded);
    var credit = parseInt(credits);
    credit = credit * 14;
    var present = (current * total) / 100;
    console.log("present : " + present);
    var absent = total - present;
    console.log(absent);
    var classesNeeded = (percentage * credit) / 100 - present;
    var wrong = credit - present - absent;
    console.log(classesNeeded);
    if (wrong >= 0) {
      if (classesNeeded > 0) {
        if (wrong > classesNeeded) {
          classesNeeded = Math.ceil(classesNeeded);
          setMessage(
            `You need to attend ${classesNeeded} more classes (tut + lecture) to achieve ${percentageNeeded}% attendance.`
          );
        } else {
          setMessage(
            `So sorry😢, but you can't achieve ${percentageNeeded}% attendance.`
          );
        }
      } else {
        console.log(
          `Woohoo🎉🎊!! You need not attend any classes for ${percentageNeeded}% attendance criteria.`
        );
        setMessage(
          `Woohoo🎉🎊!! You need not attend any classes for ${percentageNeeded}% attendance criteria.`
        );
      }
    } else {
      setMessage(`Wrong inputs!!`);
    }
    // return classesNeeded > 0 ? classesNeeded : 0;
  }
  return (
    <>
      <Navbar2 />
      <div className="container px-4">
        <div className="container wrapper pb-5 px-4 pt-3">
          <div className="row">
          <div className="col-lg-5 d-none d-md-block">
              {/* <img src={logo} alt="logo"></img> */}
              <h3 className="text-center py-2"> For your Information!!</h3>
              <p style={{textAlign:"justify"}}>The attendance predictor displays the number of classes which a
              student has to attend to meet the attendance criteria designed by
              the institute where the number of classes (lectures + tutorials)
              in each week is equivalent to the credits of that subject. In
              general, each credit accounts for 14 classes.</p>
              <div className="text-center">
                <img src={logo} alt="logo" className="img5"></img>
              </div>
            </div>
            <div className="col-lg-7 text-center">
              <h3 className="text-center py-2">Predict Here!</h3>

              <div id="demo" className="demo2">
                {message}
              </div>
              <form method="POST">
                <div className="d-flex justify-content-center py-1 fs-5">
                  <img src={logo1} alt="logo1" className="img1 me-2 mt-3"></img>
                  <input
                    className="px-3"
                    type="number"
                    placeholder="Current Percentage?"
                    id="currentPercentage"
                    value={currentPercentage}
                    onChange={(e) => setCurrentPercentage(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center py-1 fs-5">
                  <img src={logo2} alt="logo1" className="img1 me-2 mt-3"></img>
                  <input
                    className="px-3"
                    type="number"
                    placeholder="Total classes till now?"
                    id="totalClasses"
                    value={totalClasses}
                    onChange={(e) => setTotalClasses(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center py-1 fs-5">
                  <img src={logo3} alt="logo1" className="img1 me-2 mt-3"></img>
                  <input
                    className="px-3"
                    type="number"
                    placeholder="Credits of the subject?"
                    id="credits"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center py-1 fs-5">
                  <img src={logo4} alt="logo1" className="img1 me-2 mt-3"></img>
                  <input
                    className="px-3"
                    type="number"
                    placeholder="Attendance % you want to achieve?"
                    id="percentage"
                    value={percentageNeeded}
                    onChange={(e) => setPercentageNeeded(e.target.value)}
                  />
                </div>
              </form>
              <button
                input="true"
                type="submit"
                name="predict"
                id="predict"
                className="signinbutton"
                onClick={calculateClassesNeeded}
              >
                Predict
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendancePredictor;
