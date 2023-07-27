import React, { useState } from "react";
import Navbar2 from "./Navbar2";

const AttendancePredictor = () => {
  const [lectureClasses, setLectureClasses] = useState("");
  const [tutClasses, setTutClasses] = useState("");
  const [lectureAbsent, setLectureAbsent] = useState("");
  const [tutAbsent, setTutAbsent] = useState("");
  const [credits, setCredits] = useState("");
  const [percentageNeeded, setPercentageNeeded] = useState("");
  const [message, setMessage] = useState("");

  function calculateClassesNeeded() {
    var totalClasses = parseInt(credits)*14;
    var classesNeeded = Math.ceil(
      (parseInt(percentageNeeded) * totalClasses-tutAbsent-lectureAbsent) / 100 -
        parseInt(lectureClasses) -
        parseInt(tutClasses)
    );
    var wrong=totalClasses-lectureAbsent-lectureClasses-tutAbsent-tutClasses;
    if(wrong>0){
    if (classesNeeded > 0) {
      console.log(
        `You need to attend ${classesNeeded} more classes to achieve ${percentageNeeded}% attendance.`
      );
      setMessage(
        `You need to attend ${classesNeeded} more classes to achieve ${percentageNeeded}% attendance.`
      );
    } else {
      console.log(
        `Woohoo🎉🎊!! You have already achieved ${percentageNeeded}% attendance criteria.`
      );
      setMessage(`Woohoo🎉🎊!! You have already achieved ${percentageNeeded}% attendance criteria.`)
    }
  }
    else
    {
      setMessage(`Wrong inputs!!`);
    }
    // return classesNeeded > 0 ? classesNeeded : 0;
  }
  return (
    <>
      <Navbar2 />
      <div className="wrapper7">
        <h4>Attendance Predictor !</h4>
        <div id="demo" className="demo2">{message}</div>
        <form method="POST">
          <div>
            <input className="form1"
              type="number"
              placeholder="Number of lectures you attended...."
              id="lectureAttended"
              value={lectureClasses}
              onChange={e => setLectureClasses(e.target.value)}
            />
          </div>
          <div>
            <input className="form1"
              type="number"
              placeholder="Number of tutorials you attended...."
              id="tutAttended"
              value={tutClasses}
              onChange={e => setTutClasses(e.target.value)}
            />
          </div>
          <div>
            <input className="form1"
              type="number"
              placeholder="Number of lectures you were absent...."
              id="lectureAbsent"
              value={lectureAbsent}
              onChange={e => setLectureAbsent(e.target.value)}
            />
          </div>
          <div>
            <input className="form1"
              type="number"
              placeholder="Number of tutorials you were absent...."
              id="tutAbsent"
              value={tutAbsent}
              onChange={e => setTutAbsent(e.target.value)}
            />
          </div>
          <div>
            <input className="form1"
              type="number"
              placeholder="Credits of the subject?"
              id="credits"
              value={credits}
              onChange={e => setCredits(e.target.value)}
            />
          </div>
          <div>
            <input className="form1"
              type="number"
              placeholder="Percentage of attendance you want to achieve"
              id="percentage"
              value={percentageNeeded}
              onChange={e=>setPercentageNeeded(e.target.value)}
            />
          </div>
        </form>
        <button
          input="true"
          type="submit"
          name="predict"
          id="predict"
          className="signinbutton form1"
          onClick={calculateClassesNeeded}
        >
          Predict
        </button>
      </div>
    </>
  );
};

export default AttendancePredictor;
