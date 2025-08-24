import * as React from "react";
const SvgClose = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2em"
    height="2em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);
export default SvgClose;
