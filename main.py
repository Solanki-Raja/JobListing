from fastapi import FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId
import json
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (use specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# MongoDB connection
MONGO_URI = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URI)
db = client["job_database"]
collection = db["jobs"]

# Load jobs from JSON file
JOBS_FILE = "jobs.json"

def load_jobs_from_file():
    if os.path.exists(JOBS_FILE):
        with open(JOBS_FILE, "r") as file:
            return json.load(file)
    return []

# Insert jobs into MongoDB if not already populated
async def initialize_jobs():
    existing_jobs = await collection.count_documents({})
    if existing_jobs == 0:  # Only insert if database is empty
        jobs = load_jobs_from_file()
        if jobs:
            for job in jobs:
                job["_id"] = int(job["id"])  # Ensure `_id` remains an integer
            await collection.insert_many(jobs)
            print("Jobs loaded from JSON file into MongoDB.")

# Helper function to convert MongoDB document to dict
def job_serializer(job) -> dict:
    return {
        "id": int(job["_id"]) if isinstance(job["_id"], (int, float)) else int(str(job["_id"])),  # Convert ObjectId to int
        "req_name": job["req_name"],
        "location": job["location"],
        "description": job["description"],
        "status": job["status"],
        "postings": job["postings"],
    }
# API Endpoint to get all jobs
@app.get("/api/jobs")
async def get_jobs():
    jobs = await collection.find().to_list(100)
    return [job_serializer(job) for job in jobs]

# API Endpoint to get a job by ID
@app.get("/api/job/{job_id}")
async def get_job(job_id: int):
    job = await collection.find_one({"_id": job_id})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job_serializer(job)

# API Endpoint to add a new job
@app.post("/api/jobs")
async def add_job(job: dict):
    job["_id"] = int(job["id"])  # Ensure `_id` is stored as an integer
    new_job = await collection.insert_one(job)
    return {"message": "Job added successfully", "id": job["id"]}

# API Endpoint to delete a job
@app.delete("/api/job/{job_id}")
async def delete_job(job_id: int):
    result = await collection.delete_one({"_id": job_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"message": "Job deleted successfully"}

# Initialize jobs on startup
@app.on_event("startup")
async def startup_event():
    await initialize_jobs()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

