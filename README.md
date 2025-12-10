# Patient Portal – README

## 1. Project Overview
This is a simple MERN-based Patient Portal where users can upload, view, download, and delete PDF documents such as prescriptions and reports.  
The app uses **React (frontend)**, **Express + Node (backend)**, **MongoDB (database)**, and **Multer** for handling file uploads.

---

## 2. How to Run the Project Locally

### Backend
cd backend
npm install
mkdir uploads
npm start

Runs at: http://localhost:5000

### Frontend
cd frontend
npm install
npm start

Runs at: http://localhost:3000

---

## 3. Example API Calls


### 1. Upload PDF
POST /documents/upload  
Body: file (PDF file)

### 2. Get All Documents
GET /documents

### 3. Download Document
GET /documents/:id

### 4. Delete Document
DELETE /documents/:id

