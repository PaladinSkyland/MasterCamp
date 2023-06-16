import React, { useState } from 'react';

const FileUploadForm = () => {
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = [...e.dataTransfer.files];
    setFiles(droppedFiles);
  };

  const handleSubmit = (e) => {
    console.log(files)
  }

  return (
    <div>
      <label>Add file here :</label>
      <br/>
      <input
        type="file"
        //multiple
        onChange={(e) => setFiles([...e.target.files])}
        onDrop={handleDrop}
      />
      <br/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FileUploadForm;
