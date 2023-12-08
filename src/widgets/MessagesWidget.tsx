import { useState } from "react";
function mapLetterToGPA(letterGrade) {
  const gradeMap = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    "D-": 0.7,
    F: 0.0,
  };

  return gradeMap[letterGrade.toUpperCase()] || 0;
}

export const MessagesWidget = ({ handleMinimize, isMinimized }) => {
  const [gradeResult, setGradeResult] = useState(""); // State to store the calculated grade
  const [grades, setGrades] = useState({ grade1: "", grade2: "", grade3: "" });

  const handleGradeChange = (e) => {
    const { id, value } = e.target;
    setGrades((prevGrades) => ({ ...prevGrades, [id]: value }));
  };
  const calculateGrade = () => {
    const { grade1, grade2, grade3 } = grades;
    const finalGrade =
      (mapLetterToGPA(grade1) +
        mapLetterToGPA(grade2) +
        mapLetterToGPA(grade3)) /
      3;
    setGradeResult(`Your average GPA is: ${finalGrade.toFixed(1)}`);
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
              <label htmlFor="grades">Enter Grade: </label>
              <div>
                <select
                  id="grade1"
                  value={grades.grade1}
                  onChange={handleGradeChange}
                >
                  <option value="">Class 1: Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C+">C</option>
                  <option value="C-">C-</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div>
                <select
                  id="grade2"
                  value={grades.grade2}
                  onChange={handleGradeChange}
                >
                  <option value="">Class 2: Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C+">C</option>
                  <option value="C-">C-</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                  {/* Add more grade options */}
                </select>
              </div>
              <div>
                <select
                  id="grade3"
                  value={grades.grade3}
                  onChange={handleGradeChange}
                >
                  <option value="">Class 3: Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C+">C</option>
                  <option value="C-">C-</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                  {/* Add more grade options */}
                </select>
              </div>
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
