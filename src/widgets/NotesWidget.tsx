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
  // State to track if the user is editing the title
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  // Function to handle title edit
  const handleEditTitle = () => {
    setIsEditingTitle(true);
    setEditedTitle(notebookTitle);
  };

  //first time fetch
  useEffect(() => {
    if (isAuthenticated && !hasFetchedData) {
      setHasFetchedData(true);
      fetchNotebooks();
      console.log("notebooks:" + JSON.stringify(notebooks));
    }
  }, [isAuthenticated]);

  /*
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotebooks();
      /*
      //set the current notebok id to the last index
      setCurrentNotebookId(notebooks[notebooks.length - 1].notebookId);
      setNotebookContent(notebooks[notebooks.length - 1].text);
      setNotebookTitle(notebooks[notebooks.length - 1].title);
      */
  /*
      console.log("notebooks:" + JSON.stringify(notebooks));
    }
  }, [notebooks]);*/

  const fetchNotebook = async () => {
    if (isAuthenticated) {
      try {
        const userId = sessionStorage.getItem("userId");
        const response = await axios.post(
          "http://localhost:5000/fetchNotebook",
          {
            userId,
            currentNotebookId,
          }
        );

        const notebook = response.data.notebook;

        setCurrentNotebookId(notebook.notebookId);
        setNotebookContent(notebook.text);
        setNotebookTitle(notebook.title);
      } catch (error) {
        console.log("failed to fetch notebook: " + error);
      }
    }
  };

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

    setNotebookContent(newNotebook.text);
    setNotebookTitle(newNotebook.title);
    setCurrentNotebookId(newNotebook.notebookId);

    // If there is no current notebook selected or you want to edit the new one right away
    if (!currentNotebookId || notebooks.length === 0) {
      //console.log("ISSUE IS HERE!");
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
        console.error("Error 'fetching notebooks:", error);
      }
    } else {
      console.log("hey!!");
      const notebooks = JSON.parse(localStorage.getItem("notebooks") || "[]");
      setNotebooks(notebooks);
    }
  };

  const handleSaveTitle = async () => {
    setIsEditingTitle(false);
    setNotebookTitle(editedTitle);

    // Update the title in the notebooks array
    setNotebooks((prevNotebooks) =>
      prevNotebooks.map((notebook) =>
        notebook.notebookId === currentNotebookId
          ? { ...notebook, title: editedTitle }
          : notebook
      )
    );

    // If authenticated, update the title in the database
    if (isAuthenticated) {
      try {
        const userId = sessionStorage.getItem("userId");
        await axios.post("http://localhost:5000/updateNotebookTitle", {
          userId,
          notebookId: currentNotebookId,
          title: editedTitle,
        });
      } catch (error) {
        console.log("failed to update notebook title: " + error);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditingTitle(false);
    setEditedTitle(notebookTitle);
  };

  const fetch = async () => {
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

          response.data.notebooks.forEach((notebook) => {
            console.log(
              `from fetch: ID: ${notebook.id}, Title: ${notebook.title}`
            );
          });
        }
      } catch (error) {
        console.error("Error fetching notebooks:", error);
      }
    } else {
      console.log("hey!!");
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

      console.log("from the hande change: " + retrieved_notebook.notebookId);
      console.log("from the hande change: " + retrieved_notebook.title);
      console.log("from the handle change: " + retrieved_notebook.text);

      setNotebookTitle(retrieved_notebook.title);
      await fetch();
    }
  };

  const deleteNotebook = async () => {
    try {
      const userId = sessionStorage.getItem("userId");

      console.log("deleting notebook: " + currentNotebookId);

      const response = await axios.post(
        "http://localhost:5000/deleteNotebook",
        {
          userId,
          notebookId: currentNotebookId,
        }
      );

      console.log("from delete request: " + response.data.notebooks);
      setNotebooks(response.data.notebooks);
      console.log("deleted call!");

      setCurrentNotebookId(response.data.notebooks[0].notebookId);
      setNotebookContent(response.data.notebooks[0].text);
      setNotebookTitle(response.data.notebooks[0].title);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="notes-widget">
      <div className="widget-header">
        <p className="widget-title"> Notes </p>

        {isAuthenticated && (
          <button className="svg-button" onClick={createNotebook}>
            <svg
              fill="#464455"
              viewBox="-3 0 19 19"
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              width="20px"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M12.711 9.182a1.03 1.03 0 0 1-1.03 1.03H7.53v4.152a1.03 1.03 0 0 1-2.058 0v-4.152H1.318a1.03 1.03 0 1 1 0-2.059h4.153V4.001a1.03 1.03 0 0 1 2.058 0v4.152h4.153a1.03 1.03 0 0 1 1.029 1.03z"></path>
              </g>
            </svg>
          </button>
        )}
        {isAuthenticated && (
          <div>
            {isEditingTitle ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <button className="svg-button" onClick={handleSaveTitle}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    width="20px"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <rect width="24" height="24" fill="white"></rect>{" "}
                      <path
                        d="M5 13.3636L8.03559 16.3204C8.42388 16.6986 9.04279 16.6986 9.43108 16.3204L19 7"
                        stroke="#464455"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
                <button className="svg-button" onClick={handleCancelEdit}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    width="20px"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="#464455"
                      ></circle>{" "}
                      <path d="M18 18L6 6" stroke="#464455"></path>{" "}
                    </g>
                  </svg>
                </button>
              </>
            ) : (
              <div>
                <select
                  value={currentNotebookId}
                  onChange={handleNotebookChange}
                >
                  {/* Default option */}
                  {notebooks.map((notebook) => {
                    console.log(
                      `ID: ${notebook.notebookId}, Title: ${notebook.title}, Text: ${notebook.text}`
                    );
                    return (
                      <option
                        key={notebook.notebookId}
                        value={notebook.notebookId}
                      >
                        {notebook.title.slice(0, 20)}
                      </option>
                    );
                  })}
                </select>
                <button className="svg-button" onClick={handleEditTitle}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    height="25px"
                    width="25px"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M12 5H9C7.11438 5 6.17157 5 5.58579 5.58579C5 6.17157 5 7.11438 5 9V15C5 16.8856 5 17.8284 5.58579 18.4142C6.17157 19 7.11438 19 9 19H15C16.8856 19 17.8284 19 18.4142 18.4142C19 17.8284 19 16.8856 19 15V12M9.31899 12.6911L15.2486 6.82803C15.7216 6.36041 16.4744 6.33462 16.9782 6.76876C17.5331 7.24688 17.5723 8.09299 17.064 8.62034L11.2329 14.6702L9 15L9.31899 12.6911Z"
                        stroke="#464455"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
        {notebooks.length > 1 && (
          <button className="svg-button" onClick={deleteNotebook}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              width="20px"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M4 6H20L18.4199 20.2209C18.3074 21.2337 17.4512 22 16.4321 22H7.56786C6.54876 22 5.69264 21.2337 5.5801 20.2209L4 6Z"
                  stroke="#464455"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M7.34491 3.14716C7.67506 2.44685 8.37973 2 9.15396 2H14.846C15.6203 2 16.3249 2.44685 16.6551 3.14716L18 6H6L7.34491 3.14716Z"
                  stroke="#464455"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M2 6H22"
                  stroke="#464455"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M10 11V16"
                  stroke="#464455"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
                <path
                  d="M14 11V16"
                  stroke="#464455"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </button>
        )}

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
            fetchNotebook={fetchNotebook} // Passing the function as a prop
          />
        )}
      </div>
    </div>
  );
};

export default NotesWidget;
