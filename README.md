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
📁 JobListing/
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
|   ├── frontendtesting.png       # Frontend image
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
git clone https://github.com/Solanki-Raja/JobListing.git
cd JobListing
```

### **2️⃣ Backend Setup (FastAPI)**
#### **Install dependencies**
```sh
python -m venv myenv
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
FastAPI API will be running at:
```
http://127.0.0.1:8000
```

#### **Test API Endpoints** (Optional)
Use Postman or a browser to test:
- `GET http://127.0.0.1:8000/api/jobs` → Fetch all jobs
- `GET http://127.0.0.1:8000/api/job/{job_id}` → Fetch a job by ID







## 🔥 **2. Frontend Setup (React + Material UI)**
### **1️⃣ Frontend Setup (React + Material UI)**
#### **Install dependencies**
Although dependancies would be install through requirements.txt but if you want to install manually below are the commnands.

```sh
cd frontend/joblistingapp
npm install
npm install @mui/material @emotion/react @emotion/styled
```

#### **Run React Development Server**
```sh
npm start
```
frontend app will be running at:
```
http://localhost:3000
```
Frontend Testing Screenshot
![Frontend Testing Screenshot](frontend/frontendtesting.png)



## 🔥 **3. Steps that I will take to make it production ready**
## Steps that I will take to make it production ready 

- 1️⃣ Dockerize Backend & Frontend
- 2️⃣ Deploy MongoDB on MongoDB Atlas
- 3️⃣ Deploy FastAPI Backend on AWS EC2
- 4️⃣ Deploy React Frontend on Vercel
- 5️⃣ Automate CI/CD with Jenkins

---

## Future Enhancements
- ✅ Add Authentication (JWT, OAuth)
- ✅ Implement Role-Based Access Control (RBAC)
- ✅ Enhance UI with better filtering and search options

---

























## Job Listing Component
Below is the **React component** that fetches and displays job listings using **Axios and Material UI**.

```javascript
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/jobs")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs.");
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Job ID", width: 100 },
    {
      field: "req_name",
      headerName: "Job Name",
      width: 200,
      renderCell: (params) => (
        <a
          href={`/job/${params.row.id}`}
          style={{ color: "#6f57bd", textDecoration: "none", fontWeight: "bold" }}
        >
          {params.value}
        </a>
      ),
    },
    { field: "location", headerName: "Location", width: 200 },
    { field: "status", headerName: "Status", width: 120 },
  ];

  // Transform job data for DataGrid
  const rows = jobs.map((job) => ({
    id: job.id,
    req_name: job.req_name,
    location: `${job.location.city}, ${job.location.state}`,
    status: job.status,
  }));

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <CircularProgress />
      </div>
    );

  if (error)
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );

  return (
    <Paper sx={{ height: 400, width: "80%", margin: "auto", padding: 2, background: "#fff4a0" }}>
      <h2 style={{ textAlign: "center", color: "#6f57bd" }}>Job Listings at JobTarget</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          color: "#777672",
          border: 0,
          "& .MuiTablePagination-root": { color: "white" },
        }}
      />
    </Paper>
  );
};

export default JobList;
```

