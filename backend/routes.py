from fastapi import APIRouter, HTTPException
from controller import (
    get_all_jobs,
    get_job_by_id,
    add_new_job,
    delete_job_by_id,
    initialize_jobs,
)

job_router = APIRouter()

# Initialize jobs on startup
@job_router.on_event("startup")
async def startup_event():
    await initialize_jobs()

# API Endpoint to get all jobs
@job_router.get("/api/jobs")
async def get_jobs():
    return await get_all_jobs()

# API Endpoint to get a job by ID
@job_router.get("/api/job/{job_id}")
async def get_job(job_id: int):
    job = await get_job_by_id(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

# API Endpoint to add a new job
@job_router.post("/api/jobs")
async def add_job(job: dict):
    return await add_new_job(job)

# API Endpoint to delete a job
@job_router.delete("/api/job/{job_id}")
async def delete_job(job_id: int):
    if not await delete_job_by_id(job_id):
        raise HTTPException(status_code=404, detail="Job not found")
    return {"message": "Job deleted successfully"}
