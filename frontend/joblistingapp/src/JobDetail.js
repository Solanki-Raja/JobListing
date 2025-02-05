import React, { useEffect, useState } from "react";
import axios from "axios";

const JobDetail = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract jobId from URL manually
  const jobId = window.location.pathname.split("/").pop();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/job/${jobId}`)
      .then((response) => {
        setJob(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setError("Failed to load job details.");
        setLoading(false);
      });
  }, [jobId]);

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>{error}</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div>
      <h1>{job.req_name}</h1>
      <p><strong>Location:</strong> {`${job.location.city}, ${job.location.state}, ${job.location.country}`}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Status:</strong> {job.status}</p>
      <h3>Postings</h3>
      <ul>
        {job.postings.map((post) => (
          <li key={post.id}>{post.sitename} - {post.duration} days</li>
        ))}
      </ul>
      <a href="/">Back to Job Listings</a>
    </div>
  );
};

export default JobDetail;
