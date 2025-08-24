import * as React from "react";
const SvgHeart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#BEB9B4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 8.5C21 6.015 18.901 4 16.313 4 14.377 4 12.715 5.126 12 6.733 11.285 5.126 9.623 4 7.688 4 5.098 4 3 6.015 3 8.5c0 7.22 9 12 9 12s9-4.78 9-12"
    />
  </svg>
);
export default SvgHeart;
