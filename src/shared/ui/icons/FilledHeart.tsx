import * as React from "react";
const SvgFilledHeart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#F03E3E"
      d="m11.395 20.91-.007-.003-.022-.012-.082-.045q-.108-.06-.301-.173a25.176 25.176 0 0 1-4.244-3.17C4.438 15.36 2 12.174 2 8.25 2 5.322 4.464 3 7.438 3a5.5 5.5 0 0 1 4.312 2.052A5.5 5.5 0 0 1 16.063 3C19.036 3 21.5 5.322 21.5 8.25c0 3.925-2.438 7.111-4.739 9.256a25 25 0 0 1-4.244 3.17 15 15 0 0 1-.383.219l-.022.012-.007.004-.003.001a.75.75 0 0 1-.704 0z"
    />
  </svg>
);
export default SvgFilledHeart;
