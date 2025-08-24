import * as React from "react";
const SvgArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="M9.21 16.77a.75.75 0 0 1 .02-1.06L13.168 12 9.23 8.29a.75.75 0 0 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgArrowRight;
