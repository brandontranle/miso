import React, { useState, useEffect } from "react";

const NoteBook = ({ notebookId }: { notebookId: number }) => {
  const [noteBookContent, setNoteBookContent] = useState("");

  useEffect(() => {
    // Load the notebook content for the given notebookId
    // Replace this with your actual loading logic
    const content = localStorage.getItem(`notebook-${notebookId}`);
    setNoteBookContent(content || "");
  }, [notebookId]);

  const handleSave = () => {
    // Save the notebook content for the given notebookId
    // Replace this with your actual saving logic
    localStorage.setItem(`notebook-${notebookId}`, noteBookContent);
  };

  return (
    <div>
      <textarea
        className="notebook-content"
        value={noteBookContent}
        onChange={(e) => setNoteBookContent(e.target.value)}
        placeholder="Type your notes here..."
      />
      {/*<button onClick={handleSave}>Save</button>*/}
    </div>
  );
};

export default NoteBook;
