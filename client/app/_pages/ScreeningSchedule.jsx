// import React from "react";
// import KanbanBoard from "../_components/KanbanBoard";
// import { useLocation } from "react-router-dom";

// const ScreeningSchedule = () => {
//   const state = useLocation();
//   return (
//     <div className="w-full overflow-scroll ">
//       <KanbanBoard state={state} />;
//     </div>
//   );
// };

// export default ScreeningSchedule;

// import React from "react";
// import KanbanBoard from "../_components/KanbanBoard";
// import { useRouter } from "next/navigation";

// const ScreeningSchedule = () => {
//   const router = useRouter();
//   const { query, pathname } = router;

//   // Pass the query parameters or pathname to KanbanBoard if needed
//   const state = { query, pathname }; // Modify this as per your needs

//   return (
//     <div className="w-full overflow-scroll">
//       <KanbanBoard state={state} />
//     </div>
//   );
// };

// export default ScreeningSchedule;


// import React from "react";
// import KanbanBoard from "../_components/KanbanBoard";
// import { useRouter } from "next/navigation";

// const ScreeningSchedule = () => {
//   const router = useRouter();
//   const { query, pathname } = router;

//   // Ensure query and pathname are defined before using them
//   const state = { query: query || {}, pathname: pathname || "" };

//   return (
//     <div className="w-full overflow-auto">
//       <KanbanBoard state={state} />
//     </div>
//   );
// };

// export default ScreeningSchedule;


// ************************************************************************************************************************************************************************************



import React from "react";
import KanbanBoard from "../_components/KanbanBoard";
import { useLocation } from "react-router-dom";

const ScreeningSchedule = () => {
  const state = useLocation();
  return (
    <div className="w-full overflow-scroll ">
      <KanbanBoard state={state} />;
    </div>
  );
};

export default ScreeningSchedule;






