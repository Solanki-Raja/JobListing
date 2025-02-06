# 🏢 Job Board Application

## Overview
 This is a **full-stack Job Board application** using: **FastAPI** for the backend and **React with Material UI** for the frontend. The backend is connected to **MongoDB**, and the frontend communicates with it via **Axios**.

## Tech Stack
### Backend (FastAPI)
- **FastAPI** for API development
- **MongoDB** for database
- **Motor** for asynchronous MongoDB operations
- **CORS Middleware** for API security
- **Uvicorn** for running the FastAPI server

### Frontend (React + Material UI)
- **React.js** for the UI
- **Material UI** for styling
- **Axios** for API calls
- **React Router** for navigation

---

## 🚀 Features
- Users can view **job listings**, Stored in **MongoDB**.
- Responsive **React frontend** using **Material UI**.
- **Axios** for API communication.

---

### **📌 Project Structure**

```
📁 job-board-app/
│── backend/            # FastAPI Backend (Python)
│   ├── __pycache__/    # Python cache files
│   ├── controller.py   # Business Logic Layer
│   ├── instructions.txt # Additional setup instructions
│   ├── jobs.json       # Sample Job Data
│   ├── main.py         # FastAPI API Routes
│   ├── models.py       # MongoDB Models (ODM)
│   ├── routes.py       # API Routes Definition
│── frontend/           # React Frontend (Material UI)
│   ├── joblistingapp/
│   │   ├── public/     # Static assets
│   │   ├── src/
│   │   │   ├── App.css        # Global Styles
│   │   │   ├── App.js         # Main React Component
│   │   │   ├── App.test.js    # Testing setup
│   │   │   ├── JobDetail.js   # Job Details Component
│   │   │   ├── JobList.js     # Job Listings Component
│   │   │   ├── index.css      # Stylesheet for index
│   │   │   ├── index.js       # React Entry File
│   │   │   ├── logo.svg       # Logo Image
│   │   │   ├── reportWebVitals.js # Performance Reporting
│   │   │   ├── setupTests.js  # Test Setup
│   ├── .gitignore       # Git ignore file
│   ├── package-lock.json # Lock file for dependencies
│   ├── package.json     # React Dependencies
│   ├── node_modules/    # Installed dependencies
│── myenv/              # Python Virtual Environment
│── README.md           # Documentation
│── requirements.txt    # Python Dependencies
```

---

## Setup Instructions

## 🔥 **1. Backend Setup (FastAPI + MongoDB)**
### **📌 Prerequisites**
- Install **Python 3.9+**
- Install **MongoDB** (Ensure MongoDB is running)

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/JobListing.git
cd JobListing
```

### **2️⃣ Backend Setup (FastAPI)**
#### **Install dependencies**
```sh
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
pip install -r requirements.txt
cd backend
```

#### **Start MongoDB Locally**
Make sure MongoDB is running locally or use **MongoDB Atlas**.

#### **Run FastAPI Server**
```sh
uvicorn main:app --reload
```
Your FastAPI API will be running at:
```
http://127.0.0.1:8000
```

#### **Test API Endpoints** (Optional)
Use Postman or a browser to test:
- `GET http://127.0.0.1:8000/api/jobs` → Fetch all jobs
- `GET http://127.0.0.1:8000/api/job/{job_id}` → Fetch a job by ID


