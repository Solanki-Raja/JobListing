// import React from "react";
// import JobList from "./JobList";
// import JobDetail from "./JobDetail";


// function App() {
//   const pathname = window.location.pathname;
//   const isJobDetail = pathname.startsWith("/job/");

//   return (
//     <div>
//       {isJobDetail ? <JobDetail /> : <JobList />}
//     </div>
//   );
// }

// export default App;

import React from "react";
import JobList from "./JobList";
import JobDetail from "./JobDetail";

function App() {
  const pathname = window.location.pathname;
  const isJobDetail = pathname.startsWith("/job/");

  return (
    <div
      style={{
        backgroundColor: "#83cbe8", // ✅ Set background color
        minHeight: "100vh", // ✅ Ensures full-page coverage
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isJobDetail ? <JobDetail /> : <JobList />}
    </div>
  );
}

export default App;
