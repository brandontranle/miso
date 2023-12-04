import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../useUserContext";

interface NotebookProps {
  notebookId: string;
  notebookContent: string;
}

const NoteBook: React.FC<NotebookProps> = ({ notebookId, notebookContent }) => {
  const [noteBookContent, setNoteBookContent] = useState(notebookContent);
  const { user, isAuthenticated } = useUserContext();

  console.log("from the notebook component" + notebookId);

  const saveNotebookContent = async (event) => {
    console.log("saving notebook content: " + event);
    setNoteBookContent(event);
    console.log(event);

    if (isAuthenticated) {
      //database implemenetation

      try {
        const userId = sessionStorage.getItem("userId");
        await axios.post("http://localhost:5000/updateNotebook", {
          userId,
          notebookId: notebookId,
          content: event,
        });

        console.log("notebook updated!");
      } catch (error) {
        console.log("failed to update notebook: " + error);
      }
    }

    const notebooksData = JSON.parse(localStorage.getItem("notebooks") || "[]");
    const updatedNotebooks = notebooksData.map((notebook) => {
      if (notebook.notebookId === notebookId) {
        return { ...notebook, text: event };
      }
      return notebook;
    });

    localStorage.setItem("notebooks", JSON.stringify(updatedNotebooks));
  };

  // Effect for handling initial notebook content
  useEffect(() => {
    if (!isAuthenticated) {
      const notebooksData = JSON.parse(
        localStorage.getItem("notebooks") || "[]"
      );
      if (notebooksData) {
        console.log("notebooks retrieved from local storage from notebook.tsx");
        const notebook_from_storage = notebooksData.find(
          (notebook) => notebook.notebookId === notebookId
        );

        if (notebook_from_storage) {
          setNoteBookContent(notebook_from_storage.text);
        }
      }
    }
  }, [notebookId]);

  return (
    <div className="notebook">
      <textarea
        className="notebook-content"
        value={noteBookContent}
        onChange={(e) => saveNotebookContent(e.target.value)}
        placeholder="Type your notes here..."
      />
    </div>
  );
};

export default NoteBook;
