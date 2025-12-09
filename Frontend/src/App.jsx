import { useState, useEffect } from "react";
import UploadForm from "./components/UploadForm";
import FileList from "./components/FileList";
import "./App.css";
import { API_URL } from "./api";

function App() {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch all files
  const loadFiles = async () => {
    try {
      const res = await fetch(`${API_URL}/files`);
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      setMessage("Failed to load files");
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <div className="container">
      <h1>Patient Portal – Document Manager</h1>

      {message && <div className="msg">{message}</div>}

      <UploadForm loadFiles={loadFiles} setMessage={setMessage} />

      <FileList files={files} loadFiles={loadFiles} setMessage={setMessage} />
    </div>
  );
}

export default App;
