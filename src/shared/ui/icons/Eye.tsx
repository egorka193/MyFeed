import * as React from "react";
const SvgEye = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M2.052 12.822a1 1 0 0 1 0-.639C3.44 8.01 7.377 5 12.017 5c4.638 0 8.574 3.007 9.964 7.178.069.207.069.431 0 .639C20.592 16.99 16.655 20 12.015 20c-4.637 0-8.573-3.007-9.963-7.178"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M15.016 12.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    />
  </svg>
);
export default SvgEye;
