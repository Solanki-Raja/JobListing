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







