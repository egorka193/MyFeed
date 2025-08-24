import * as React from "react";
const SvgOpenDropDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#101010"
      fillRule="evenodd"
      d="M16.77 14.79a.75.75 0 0 1-1.06-.02L12 10.832 8.29 14.77a.75.75 0 1 1-1.08-1.04l4.25-4.5a.75.75 0 0 1 1.08 0l4.25 4.5a.75.75 0 0 1-.02 1.06"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgOpenDropDown;
