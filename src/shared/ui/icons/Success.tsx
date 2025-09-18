import * as React from "react";
const SvgSuccess = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx="12" cy="12" r="10" fill="#20C997" />

    <path
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 12.5l3 3 5-6"
    />
  </svg>
);
export default SvgSuccess;
