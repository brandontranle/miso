import React, { useState, useEffect } from "react";
import NoteBook from "../notes/notebook";
import axios from "axios";
import { useUserContext } from "../useUserContext";
import { v4 as uuidv4 } from "uuid";

interface notebook {
  id: number;
  title: string;
  content: string;
  // Add other properties that a notebook might have
}

export const NotesWidget = ({ handleMinimize, isMinimized }) => {
  const [notebooks, setNotebooks] = useState<notebook[]>([]);
  const [currentNotebookId, setCurrentNotebookId] = useState(100);
  const [notebookTitle, setNotebookTitle] = useState("Notes");
  const [notebookContent, setNotebookContent] = useState("");
  const { user, isAuthenticated } = useUserContext();
  const [hasFetchedData, setHasFetchedData] = useState(false); // New state variable

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotebooks();
    }

    if (!hasFetchedData) {
      fetchNotebooks();
      setHasFetchedData(true); // Set the flag to true to prevent further fetching
    }
  }, [isMinimized, hasFetchedData, isAuthenticated]);

  const createNotebook = async () => {
    const notebookId = uuidv4();
    const newNotebook = {
      content: "",
      id: notebookId,
      title: "my notebook " + notebookId,
    };

    setCurrentNotebookId(notebookId);

    if (isAuthenticated) {
      //database implemenetation
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.post(
          "http://localhost:5000/createNotebook",
          {
            userId,
            notebookId,
          }
        );
      } catch (error) {
        console.log("failed to create notebook: " + error);
      }
    }
    //local storage implementation
    const updatedNotebooks = [...notebooks, newNotebook];
    setNotebooks(updatedNotebooks);
    localStorage.setItem("notebooks", JSON.stringify(updatedNotebooks));
  };

  const fetchNotebooks = async () => {
    if (isAuthenticated) {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.post(
          "http://localhost:5000/getNotebooks",
          {
            userId,
          }
        );
        console.log("fetching notebooks:" + response.data.notebooks);
        setNotebooks(response.data.notebooks);

        localStorage.setItem(
          "notebooks",
          JSON.stringify(response.data.notebooks)
        );

        console.log(response.data.notebooks[0].id);
      } catch (error) {
        console.error("Error fetching notebooks:", error);
      }
    }

    const notebooks = JSON.parse(localStorage.getItem("notebooks") || "[]");
    setNotebooks(notebooks);

    setCurrentNotebookId(notebooks[0].id);
    console.log("i just fetched!");
    setNotebookContent(notebooks[0].text);
    console.log(notebookContent);
    setNotebookTitle(notebooks[0].title);

    console.log("notebooks id: " + currentNotebookId);
    console.log("notebooks content:" + notebookContent);
    console.log("notebooks title:" + notebookTitle);
  };

  const handleNotebookChange = (event) => {
    const selectedNotebookId = event.target.value;
    setCurrentNotebookId(selectedNotebookId);

    console.log("selected: " + selectedNotebookId);

    const retrieved_notebook = notebooks.find(
      (notebook) => notebook.id === selectedNotebookId
    );

    if (retrieved_notebook) {
      console.log("notebook retrieved: " + retrieved_notebook.id);

      setNotebookTitle(retrieved_notebook.title);
      setNotebookContent(retrieved_notebook.content);
    } else {
      setNotebookTitle("Notes");
      setNotebookContent("");
    }
  };

  return (
    <div className="notes-widget">
      <div className="widget-header">
        <p className="widget-title"> {notebookTitle}</p>
        <button className="add-button" onClick={createNotebook}>
          +{" "}
        </button>

        <select
          value={currentNotebookId}
          onChange={handleNotebookChange}
          placeholder=""
        >
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
        {currentNotebookId && (
          <NoteBook
            notebookId={currentNotebookId}
            notebookContent={notebookContent}
          />
        )}
      </div>
    </div>
  );
};

export default NotesWidget;
