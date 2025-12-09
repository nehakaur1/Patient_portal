import { API_URL } from "../api";

function FileList({ files, loadFiles, setMessage }) {
  const handleDelete = async (filename) => {
    try {
      const res = await fetch(`${API_URL}/delete/${filename}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("File deleted successfully");
        loadFiles();
      } else {
        setMessage(data.message || "Delete failed");
      }
    } catch (error) {
      setMessage("Error deleting file");
    }
  };

  return (
    <div className="file-list">
      <h2>Your Uploaded Documents</h2>

      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul>
          {files.map((file, i) => (
            <li key={i}>
              <span>{file}</span>

              <a href={`${API_URL}/download/${file}`} download>
                <button className="btn-download">Download</button>
              </a>

              <button
                className="btn-delete"
                onClick={() => handleDelete(file)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FileList;
