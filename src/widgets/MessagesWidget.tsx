import { useState } from "react";
import "./Calculator.css";


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


        <div className = "container-items">


          <div className = "calculator-title">Grade Calculator</div>
        <div className = "calculator-description">start adding classes below!</div>
        
        {grades.map((grade, index) => (
          <div key={index}>
            <label className = "class-text">{`Class ${index + 1}: `}</label>
            <select className = "select" value={grade} onChange={(e) => handleGradeChange(e, index)}>
              <option value="">Select Grade</option>
              {classList.map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
            <button className = "delete-icon" onClick={() => removeGrade(index)}>
            <svg width="14" height="14" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1.5H4.29289C4.87825 1.5 5.43964 1.26747 5.85355 0.853553C6.07993 0.627177 6.38696 0.5 6.70711 0.5H9.29289C9.61304 0.5 9.92007 0.627177 10.1464 0.853553C10.5604 1.26747 11.1217 1.5 11.7071 1.5H15C15.2761 1.5 15.5 1.72386 15.5 2C15.5 2.27614 15.2761 2.5 15 2.5H1C0.723858 2.5 0.5 2.27614 0.5 2C0.5 1.72386 0.723858 1.5 1 1.5ZM1.5 17V7C1.5 5.61929 2.61929 4.5 4 4.5H12C13.3807 4.5 14.5 5.61929 14.5 7V17C14.5 17.8239 13.8239 18.5 13 18.5H3C2.17614 18.5 1.5 17.8239 1.5 17ZM6.5 16V7C6.5 6.17157 5.82843 5.5 5 5.5C4.17157 5.5 3.5 6.17157 3.5 7V16C3.5 16.8284 4.17157 17.5 5 17.5C5.82843 17.5 6.5 16.8284 6.5 16ZM12.5 16V7C12.5 6.17157 11.8284 5.5 11 5.5C10.1716 5.5 9.5 6.17157 9.5 7V16C9.5 16.8284 10.1716 17.5 11 17.5C11.8284 17.5 12.5 16.8284 12.5 16Z" fill="#4E4E4E" stroke="#4E4E4E"/>
            </svg>

            </button>
          </div>
        ))}
        <div>
        <button className = "add-class-button" onClick={addGrade}>Add Class</button>
        
        <button className = "calculate-button" onClick={calculateGrade}>Calculate</button>
        </div>

        <div className = "grade-result">
          <button className = "grade-result-button">{gradeResult}</button>
        
        </div>

        </div>
      </div>
    </div>
  );
};

export default MessagesWidget;