# Patient Portal Design Document

## 1. Tech Stack Choices

**Q1. Frontend Framework**  
- **React.js**: Chosen for its component-based architecture, reusability, and fast rendering using the virtual DOM. React also has a large community and many libraries for handling forms, routing, and state management.

**Q2. Backend Framework**  
- **Node.js with Express**: Chosen for simplicity and scalability. Express makes it easy to build REST APIs and integrate middleware like Multer for file uploads. Using JavaScript on both frontend and backend allows seamless data handling.

**Q3. Database**  
- **MongoDB**: Chosen for flexibility. Document metadata can vary per user (filename, path, upload date, etc.), so a schema-less database works better than relational databases. MongoDB scales easily for larger datasets.

**Q4. Scaling for 1,000 users**  
- Use **database indexing** for faster queries.  
- Move file storage to **cloud storage** (AWS S3 or Google Cloud Storage) to handle more data.  
- Implement **caching** (Redis) for frequently accessed documents.  
- Use **load balancing** for backend servers to handle more concurrent requests.  
- Optimize backend and database queries.

---

## 2. Architecture Overview

**Flow Description:**

1. **Frontend (React)**:  
   - Users interact via web interface to upload, view, download, and delete documents.  
   - Sends API requests to the backend.

2. **Backend (Express)**:  
   - Handles API requests.  
   - Uses **Multer** to handle file uploads.  
   - Saves metadata to MongoDB and files to storage.  
   - Streams files back on download requests.

3. **Database (MongoDB)**:  
   - Stores metadata such as file ID, filename, user ID, upload date, file path.

4. **File Storage**:  
   - Stores actual PDF files (local storage for now, cloud storage recommended for production).

**Text Diagram:**

  +----------------+
  |   React Frontend  |
  +--------+-------+
           |
           v
  +--------+--------+
  |   Express Backend |
  +--------+--------+
           |


---

## 3. API Specification

### 1. Upload a PDF


### 2. List all documents


### 3. Download a file


### 4. Delete a file


---

## 4. Data Flow Description

**File Upload:**

1. User selects a PDF file and clicks "Upload".  
2. Frontend sends a **POST** request to `/documents/upload` with the file.  
3. Backend receives the file using **Multer** middleware.  
4. Backend stores the file in **local storage** (or cloud storage for production).  
5. Backend saves metadata in **MongoDB**.  
6. Backend responds with success message and file ID.  
7. Frontend updates the document list.

**File Download:**

1. User clicks "Download" on a document.  
2. Frontend sends a **GET** request to `/documents/:id`.  
3. Backend retrieves metadata from MongoDB.  
4. Backend streams the PDF file from storage.  
5. Frontend receives the file and initiates download.

---

## 5. Assumptions

- Maximum PDF file size: **10 MB**.  
- Only **PDF files** are allowed.  
- User authentication exists and each user sees only their own files.  
- Simple single-user operations assumed (concurrency not fully handled).  
- Files stored locally for now, cloud storage recommended for scaling.  
- API responses are in **JSON** format for frontend consumption.
