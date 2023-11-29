import React, { useState, useEffect } from "react";
import NoteBook from "../notes/notebook";
import axios from "axios";
import { useUserContext } from "../useUserContext";

interface notebook {
  id: number;
  title: string;
  // Add other properties that a notebook might have
}

export const NotesWidget = ({ handleMinimize, isMinimized }) => {
  const [notebooks, setNotebooks] = useState<notebook[]>([]);
  const [currentNotebookId, setCurrentNotebookId] = useState(100);
  const { user, isAuthenticated } = useUserContext();
  const [size, setSize] = useState({
    width: 200,
    height: 100,
  });

  useEffect(() => {
    // Fetch notebooks list
    if (isAuthenticated) {
      fetchNotebooks();
    }
  }, []);

  const fetchNotebooks = async () => {
    try {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.post("http://localhost:5000/getNotebooks", {
        userId,
      });
      setNotebooks(response.data.notebooks);
    } catch (error) {
      console.error("Error fetching notebooks:", error);
    }
  };

  const handleNotebookChange = (event) => {
    setCurrentNotebookId(event.target.value);
  };

  return (
    <div className="notes-widget">
      <div className="widget-header">
        <p className="widget-title">Notes</p>
        <select onChange={handleNotebookChange} value={currentNotebookId}>
          {notebooks.map((notebook) => (
            <option key={notebook.id} value={notebook.id}>
              {notebook.title}
            </option>
          ))}
        </select>
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
          </svg>{" "}
        </button>
      </div>
      <div className="widget-content">
        {currentNotebookId && <NoteBook notebookId={currentNotebookId} />}
      </div>
    </div>
  );
};

export default NotesWidget;
