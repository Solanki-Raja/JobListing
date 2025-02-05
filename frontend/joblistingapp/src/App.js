import React from "react";
import JobList from "./JobList";
import JobDetail from "./JobDetail";

function App() {
  const pathname = window.location.pathname;
  const isJobDetail = pathname.startsWith("/job/");

  return (
    <div>
      {isJobDetail ? <JobDetail /> : <JobList />}
    </div>
  );
}

export default App;
