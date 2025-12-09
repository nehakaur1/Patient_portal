import { API_URL } from "../api";
import { useState } from "react";

function UploadForm({ loadFiles, setMessage }) {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("File uploaded successfully!");
        loadFiles();
        setFile(null);
      } else {
        setMessage(data.message || "Upload failed");
      }
    } catch (error) {
      setMessage("Error uploading file");
    }
  };

  return (
    <form className="upload-form" onSubmit={handleUpload}>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button type="submit">Upload PDF</button>
    </form>
  );
}

export default UploadForm;
