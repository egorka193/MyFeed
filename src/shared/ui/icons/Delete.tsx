import * as React from "react";
const SvgDelete = (props: React.SVGProps<SVGSVGElement>) => (
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
      d="m14.99 8.75-.346 9m-4.788 0-.346-9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.41 19.423a2.25 2.25 0 0 1-2.244 2.077H8.334a2.25 2.25 0 0 1-2.244-2.077L5.022 5.54m14.456 0A48 48 0 0 0 16 5.144M4 5.706q.51-.088 1.022-.165m0 0A48 48 0 0 1 8.5 5.144m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0C9.41 2.064 8.5 3.049 8.5 4.228v.916m7.5 0a49 49 0 0 0-7.5 0"
    />
  </svg>
);
export default SvgDelete;
