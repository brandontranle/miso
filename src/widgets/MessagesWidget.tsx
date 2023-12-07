import { useState } from "react";
export const MessagesWidget = ({ handleMinimize, isMinimized }) => {
  const [gradeResult, setGradeResult] = useState(""); // State to store the calculated grade
  const [grades, setGrades] = useState({ grade1: "", grade2: "", grade3: "" });
  
  const handleGradeChange = (e) => {
    const { id, value } = e.target;
    setGrades((prevGrades) => ({ ...prevGrades, [id]: value }));
  };
  const calculateGrade = () => {
    const { grade1, grade2, grade3 } = grades;
    const parsedGrade1 = parseFloat(grade1);
    const parsedGrade2 = parseFloat(grade2);
    const parsedGrade3 = parseFloat(grade3);
    const final_grade = (parsedGrade1 + parsedGrade2 + parsedGrade3) / 3;
    setGradeResult(`Your average GPA is: ${final_grade.toFixed(2)}`);
  };
  return (
    <div className="catgpt-widget">
      <div className="widget-header">
        <p className="widget-title">GPA Calculator</p>
        <button className="minimize-symbol" onClick={() => handleMinimize()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="2"
            viewBox="0 0 15 2"
            fill="none"
          >
            <path
              d="M1.83081 1L14 1"
              stroke="#4E4E4E"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <>
        <div className="widget-line"></div>
        <div className="widget-content">
          <p>
            <h1>Grade Calculator</h1>
            <form id="gradeForm">
              <label htmlFor="grades">Enter GPA: </label>
              <input type="number" id="grade1" value = {grades.grade1} onChange={handleGradeChange} placeholder="Class 1"></input>
              <input type="number" id="grade2" value = {grades.grade2} onChange={handleGradeChange} placeholder="Class 2"></input>
              <input type="number" id="grade3" value = {grades.grade3} onChange={handleGradeChange} placeholder="Class 3"></input>
              <button type="button" onClick={calculateGrade}>
                Calculate
              </button>
            </form>
            <p id="result">{gradeResult}</p>
          </p>
        </div>
      </>
    </div>
  );
};

export default MessagesWidget;
