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
  const [gradeResult, setGradeResult] = useState("");
  const [grades, setGrades] = useState<string[]>([]);
  const [updatedGrades, setUpdatedGrades] = useState<string[]>([]);
  const [classList, setClassList] = useState([
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "F",
  ]);

  const handleGradeChange = (e, index) => {
    const { value } = e.target;
    const updatedGrades = [...grades];
    updatedGrades[index] = value;
    setGrades(updatedGrades);
  };

  const addGrade = () => {
    setGrades([...grades, ""]);
  };

  const removeGrade = (index) => {
    const updatedGrades = [...grades];
    updatedGrades.splice(index, 1);
    setGrades(updatedGrades);
  };

  const calculateGrade = () => {
    const totalCredits = grades.length;
    const totalGPA = grades.reduce(
      (accumulator, currentGrade) => accumulator + mapLetterToGPA(currentGrade),
      0
    );
    const finalGrade = totalGPA / totalCredits || 0;

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
      <div className="widget-line"></div>
      <div className="widget-content">
        <h1>Grade Calculator</h1>
        {grades.map((grade, index) => (
          <div key={index}>
            <label>{`Class ${index + 1}: `}</label>
            <select value={grade} onChange={(e) => handleGradeChange(e, index)}>
              <option value="">Select Grade</option>
              {classList.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
            <button onClick={() => removeGrade(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addGrade}>Add Class</button>
        <button onClick={calculateGrade}>Calculate</button>
        <p>{gradeResult}</p>
      </div>
    </div>
  );
};

export default MessagesWidget;
