1. Tech Stack Choices
Q1. What frontend framework did you use and why?

I used React.js (with Vite) for the frontend because:

It provides a fast development environment.

Component-based architecture makes UI easier to manage.

Works well with REST APIs.

Vite gives very fast dev server and optimized builds.

Q2. What backend framework did you choose and why?

I used Node.js with Express.js because:

It is lightweight and perfect for building REST APIs.

It handles file uploads easily using Multer.

Integrates smoothly with MongoDB through Mongoose.

Easy to scale and widely used in full-stack projects.

Q3. What database did you choose and why?

I used MongoDB because:

It stores flexible JSON-like documents.

Perfect for metadata like filename, size, upload date.

Very easy to integrate with the Node.js ecosystem.

Great for scalability and high-read operations.

Q4. If you were to support 1,000+ users, what changes would you consider?

To scale the system, I would:

Use MongoDB Atlas instead of local MongoDB.

Store files on AWS S3 instead of local /uploads folder.

Deploy backend on cloud platforms (Render, Railway, AWS).

Add load balancer & horizontal scaling for backend.

Use caching (Redis) for faster file metadata retrieval.

Implement authentication (JWT) when multiple users exist.

2. Architecture Overview
System Flow
React Frontend  →  Express Backend API  →  MongoDB (Metadata)
                                ↓
                           Local Uploads/

Explanation

The frontend sends file uploads or fetch requests.

The backend:

Stores file on the server using Multer.

Saves metadata in MongoDB.

The frontend displays uploaded documents.

For download/delete:

Backend reads/deletes file from /uploads.

Updates MongoDB records.

3. API Specification
1. Upload PDF
Method	URL
POST	/documents/upload

Description: Upload a PDF document.

Sample Request (Multipart FormData):

POST /documents/upload
pdf: <file.pdf>


Sample Success Response:

{
  "message": "File uploaded successfully",
  "file": {
    "id": "67945c1ab238e",
    "filename": "report.pdf",
    "size": "245 KB"
  }
}

2. List All Documents
Method	URL
GET	/documents

Description: Returns all uploaded file metadata.

Sample Response:

[
  {
    "id": "67945c1ab238e",
    "filename": "report.pdf",
    "size": 250000,
    "createdAt": "2025-01-10"
  }
]

3. Download a File
Method	URL
GET	/documents/:id

Description: Downloads the file associated with the given ID.

Response:
Returns the actual PDF file as a stream.

4. Delete a File
Method	URL
DELETE	/documents/:id

Description: Deletes file from storage + removes metadata from DB.

Sample Response:

{
  "message": "File deleted successfully"
}

4. Data Flow Description
Q5. What happens when a file is uploaded?

User selects a PDF in the React frontend.

React sends FormData → POST /documents/upload.

Express receives the file using Multer.

Multer stores the file in /uploads folder.

Backend saves metadata to MongoDB:

filename

size

upload date

Backend responds with success.

Frontend refreshes file list and displays message.

What happens when a file is downloaded?

User clicks the “Download” button in frontend.

Frontend calls GET /documents/:id.

Backend finds the file path from MongoDB.

Server streams the file to the browser.

Browser downloads the PDF.

5. Assumptions
Q6. What assumptions were made?

Only PDF files are allowed.

Maximum file size is assumed below 5–10 MB.

No authentication is needed (single-user system).

Local /uploads folder is used instead of cloud storage.

Concurrency is low, so no queue system or CDN needed.

Backend and frontend run locally (localhost) during development.