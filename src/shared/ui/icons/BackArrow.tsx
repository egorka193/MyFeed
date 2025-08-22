import * as React from "react";
const SvgBackArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#101010"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M6.75 15.5 3 11.75m0 0L6.75 8M3 11.75h18"
    />
  </svg>
);
export default SvgBackArrow;
