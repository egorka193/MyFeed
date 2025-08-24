import * as React from "react";
const SvgEdit = (props: React.SVGProps<SVGSVGElement>) => (
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
      strokeWidth={1.2}
      d="m16.862 5.237 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.82a4.5 4.5 0 0 1-1.897 1.13L6 18.75l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.875M18 14.75v4.75a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 19.5V9a2.25 2.25 0 0 1 2.25-2.25H10"
    />
  </svg>
);
export default SvgEdit;
