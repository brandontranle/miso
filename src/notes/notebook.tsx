import React, { useState, useEffect } from "react";

const NoteBook = ({
  notebookId,
  notebookContent: initialContent,
}: {
  notebookId: number;
  notebookContent: string;
}) => {
  const [noteBookContent, setNoteBookContent] = useState(initialContent);

  const saveNotebookContent = (event) => {
    setNoteBookContent(event);
    console.log(event);

    const notebooksData = JSON.parse(localStorage.getItem("notebooks") || "[]");
    const updatedNotebooks = notebooksData.map((notebook) => {
      if (notebook.id === notebookId) {
        return { ...notebook, content: event };
      }
      return notebook;
    });
    localStorage.setItem("notebooks", JSON.stringify(updatedNotebooks));
  };

  // Effect for handling initial notebook content
  useEffect(() => {
    const notebooksData = JSON.parse(localStorage.getItem("notebooks") || "[]");
    if (notebooksData) {
      const notebook_from_storage = notebooksData.find(
        (notebook) => notebook.id === notebookId
      );
      if (notebook_from_storage) {
        setNoteBookContent(notebook_from_storage.content);
      }
    }
  }, [notebookId, initialContent]);

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
