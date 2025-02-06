import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, CircularProgress, Alert, Box, Link } from "@mui/material";

const JobDetail = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract jobId from URL manually
  const jobId = window.location.pathname.split("/").pop();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/job/${jobId}`)
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

  if (loading)
    return (
      <Box display="flex" justifyContent="center" marginTop={5}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" marginTop={5}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  if (!job) return <p>Job not found.</p>;

  return (
    <Box sx={{ padding: 4, backgroundColor: "#fff4a0", borderRadius: "10px", width: "60%", margin: "auto" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ color: "#6f57bd", textAlign: "center", marginBottom: 2 }}>
        {job.req_name}
      </Typography>

      {/* Location Section */}
      <Typography variant="h6">
        <strong style={{ color: "#274575" }}>Location: </strong> 
        <span style={{ color: "#777672" }}>{job.location.city}, {job.location.state}, {job.location.country}</span>
      </Typography>

      {/* Description */}
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        <strong style={{ color: "#274575" }}>Description: </strong>
        <span style={{ color: "#777672" }}>{job.description}</span>
      </Typography>

      {/* Status */}
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        <strong style={{ color: "#274575" }}>Status: </strong>
        <span style={{ color: "#42e077" }}>{job.status}</span>
      </Typography>

      {/* Postings Section */}
      <Typography variant="h5" sx={{ color: "#274575", marginTop: 3 }}>
        Postings
      </Typography>
      <ul>
        {job.postings.map((post) => (
          <Typography key={post.id} variant="body1" component="li">
            <strong style={{ color: "#777672" }}>{post.sitename} - {post.duration} days</strong>
          </Typography>
        ))}
      </ul>

      {/* Back to Job Listings */}
      <Box textAlign="center" marginTop={3}>
        <Link href="/" sx={{ color: "#274575", fontSize: "18px", textDecoration: "none", fontWeight: "bold" }}>
          Back to Job Listings
        </Link>
      </Box>
    </Box>
  );
};

export default JobDetail;

