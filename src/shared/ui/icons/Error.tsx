import * as React from "react";
const SvgError = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="4em"
    height="4em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#F03E3E"
      fillRule="evenodd"
      d="M11.75 2C6.365 2 2 6.365 2 11.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.135 2 11.75 2m-1.72 6.97a.75.75 0 1 0-1.06 1.06l1.72 1.72-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06l-1.72-1.72 1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgError;
