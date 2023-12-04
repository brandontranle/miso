import React, { useState, useEffect } from "react";
import NoteBook from "../notes/notebook";
import axios from "axios";
import { useUserContext } from "../useUserContext";
import { v4 as uuidv4 } from "uuid";

interface notebook {
  notebookId: string;
  title: string;
  text: string;
  // Add other properties that a notebook might have
}

export const NotesWidget = ({ handleMinimize, isMinimized }) => {
  const [notebooks, setNotebooks] = useState<notebook[]>([]);
  const [currentNotebookId, setCurrentNotebookId] = useState("w0w");
  const [notebookTitle, setNotebookTitle] = useState("Notes");
  const [notebookContent, setNotebookContent] = useState("");
  const { user, isAuthenticated } = useUserContext();
  const [hasFetchedData, setHasFetchedData] = useState(false); // New state variable

  useEffect(() => {
    if (isAuthenticated && !hasFetchedData) {
      setHasFetchedData(true);
      fetchNotebooks();
      console.log("notebooks:" + JSON.stringify(notebooks));
    }
  }, [isAuthenticated, handleMinimize]);

  /*
  const createNotebook = async () => {
    const notebookId = uuidv4();
    const newNotebook = {
      notebookId: notebookId, // Make sure this is being set
      title: "my notebook " + notebookId,
      text: "",
    };

    setCurrentNotebookId(notebookId);
    setNotebookContent(newNotebook.text); // Update
    setNotebookTitle(newNotebook.title); // Update

    console.log("notebook created with id: " + notebookId);

    //local storage implementation
    const updatedNotebooks = [...notebooks, newNotebook];
    console.log("creating new notebook!");
    setNotebooks((prevNotebooks) => [...prevNotebooks, newNotebook]);

    if (!currentNotebookId) {
      setCurrentNotebookId(notebookId);
      setNotebookContent("");
      setNotebookTitle("my notebook " + notebookId);
    }

    localStorage.setItem("notebooks", JSON.stringify(updatedNotebooks));

    if (isAuthenticated) {
      //database implemenetation
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.post(
          "http://localhost:5000/createNotebook",
          {
            userId,
            notebook: newNotebook,
          }
        );
      } catch (error) {
        console.log("failed to create notebook: " + error);
      }
    }
  };*/

  /*
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

        if (response.data.notebooks.length == 0) {
          console.log("its empty!");
          await createNotebook();
          return;
        }

        console.log("fetching notebooks:" + response.data.notebooks);
        setNotebooks(response.data.notebooks);

        localStorage.setItem(
          "notebooks",
          JSON.stringify(response.data.notebooks)
        );
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
  };*/

  useEffect(() => {
    // Whenever notebooks change, update localStorage
    if (!isAuthenticated) {
      localStorage.setItem("notebooks", JSON.stringify(notebooks));
    }
  }, [notebooks]);

  const createNotebook = async () => {
    const notebookId = uuidv4();
    const newNotebook = {
      notebookId: notebookId,
      title: "my notebook " + notebookId,
      text: "",
    };

    // Add the new notebook to the list
    setNotebooks((prevNotebooks) => [...prevNotebooks, newNotebook]);

    // If there is no current notebook selected or you want to edit the new one right away
    if (!currentNotebookId || notebooks.length === 0) {
      console.log("ISSUE IS HERE!");
      setCurrentNotebookId(notebookId);
      setNotebookContent("");
      setNotebookTitle("my notebook " + notebookId);
    }

    // If authenticated, save to the database
    if (isAuthenticated) {
      try {
        const userId = sessionStorage.getItem("userId");
        await axios.post("http://localhost:5000/createNotebook", {
          userId,
          notebook: newNotebook,
        });
      } catch (error) {
        console.log("failed to create notebook: " + error);
      }
    }
  };

  const fetchNotebooks = async () => {
    if (isAuthenticated) {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.post(
          "http://localhost:5000/getNotebooks",
          { userId }
        );

        if (response.data.notebooks.length === 0) {
          await createNotebook(); // This should be an await call
        }

        if (response.data.notebooks.length > 0) {
          console.log("done!");
          setNotebooks(response.data.notebooks);
          /*localStorage.setItem(
            "notebooks",
            JSON.stringify(response.data.notebooks)
          );*/
          response.data.notebooks.forEach((notebook) => {
            console.log(
              `from fetch: ID: ${notebook.id}, Title: ${notebook.title}`
            );
          });
        }

        // Set content and title for the first notebook or the selected notebook
        const firstNotebook = response.data.notebooks[0];
        await setNotebooks(response.data.notebooks);
        console.log("first notebook id:" + firstNotebook.notebookId);
        await setCurrentNotebookId(firstNotebook.notebookId);
        console.log("from fetch: " + firstNotebook.notebookId);
        await setNotebookContent(firstNotebook.text);
        await setNotebookTitle(firstNotebook.title);
      } catch (error) {
        console.error("Error fetching notebooks:", error);
      }
    } else {
      const notebooks = JSON.parse(localStorage.getItem("notebooks") || "[]");
      setNotebooks(notebooks);
    }
  };

  /*
  const handleNotebookChange = (event) => {
    const selectedNotebookId = event.target.value; // This must be the notebook's ID
    setCurrentNotebookId(selectedNotebookId);

    console.log("selected: " + event.target.value);

    const retrieved_notebook = notebooks.find(
      (notebook) => notebook.id === selectedNotebookId
    );
    if (retrieved_notebook) {
      setNotebookContent(retrieved_notebook.text);
      console.log("from the hande change: " + retrieved_notebook.text);
      setNotebookTitle(retrieved_notebook.title);
    }
  };*/
  const handleNotebookChange = async (event) => {
    const selectedNotebookId = event.target.value; // This must be the notebook's ID
    setCurrentNotebookId(selectedNotebookId);

    console.log("selected: " + event.target.value);

    const retrieved_notebook = notebooks.find(
      (notebook) => notebook.notebookId === selectedNotebookId
    );
    if (retrieved_notebook) {
      setNotebookContent(retrieved_notebook.text);
      console.log("from the handle change: " + retrieved_notebook.text);
      setNotebookTitle(retrieved_notebook.title);
    }
  };

  return (
    <div className="notes-widget">
      <div className="widget-header">
        <p className="widget-title"> {notebookTitle}</p>
        <button className="add-button" onClick={createNotebook}>
          +{" "}
        </button>

        <select value={currentNotebookId} onChange={handleNotebookChange}>
          {notebooks.map((notebook) => {
            console.log(
              `ID: ${notebook.notebookId}, Title: ${notebook.title}, Text: ${notebook.text}`
            );
            return (
              <option key={notebook.notebookId} value={notebook.notebookId}>
                {notebook.title}
              </option>
            );
          })}
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
            key={currentNotebookId}
            notebookId={currentNotebookId}
            notebookContent={notebookContent}
          />
        )}
      </div>
    </div>
  );
};

export default NotesWidget;
