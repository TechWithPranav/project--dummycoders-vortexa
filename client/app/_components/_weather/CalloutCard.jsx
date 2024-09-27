// "use client";

// import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
// import { Callout } from "@tremor/react";

// function CalloutCard({ message, warning }) {
//   return (
//     <Callout
//       className="mt-4"
//       title={message}
//       icon={warning ? ExclamationIcon : CheckCircleIcon}
//       color={warning ? "rose" : "teal"}
//     />
//   );
// }

// export default CalloutCard;


"use client";

import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Callout } from "@tremor/react";

function CalloutCard({ message = "No message available", warning = false }) {
  return (
    <Callout
      className="mt-4"
      title={message}
      icon={warning ? ExclamationIcon : CheckCircleIcon}
      color={warning ? "rose" : "teal"}
    />
  );
}

export default CalloutCard;
