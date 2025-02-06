from models import collection
from bson import ObjectId
import json
import os

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
    if existing_jobs == 0:
        jobs = load_jobs_from_file()
        if jobs:
            for job in jobs:
                job["_id"] = int(job["id"])
            await collection.insert_many(jobs)
            print("Jobs loaded from JSON file into MongoDB.")

# Convert MongoDB document to dict
def job_serializer(job):
    return {
        "id": int(job["_id"]),
        "req_name": job["req_name"],
        "location": job["location"],
        "description": job["description"],
        "status": job["status"],
        "postings": job["postings"],
    }

# Fetch all jobs
async def get_all_jobs():
    jobs = await collection.find().to_list(100)
    return [job_serializer(job) for job in jobs]

# Fetch a job by ID
async def get_job_by_id(job_id: int):
    job = await collection.find_one({"_id": job_id})
    return job_serializer(job) if job else None

# Add a new job
async def add_new_job(job: dict):
    job["_id"] = int(job["id"])
    await collection.insert_one(job)
    return {"message": "Job added successfully", "id": job["id"]}

# Delete a job
async def delete_job_by_id(job_id: int):
    result = await collection.delete_one({"_id": job_id})
    return result.deleted_count > 0
