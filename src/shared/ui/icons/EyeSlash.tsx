import * as React from "react";

interface SvgEyeSlashProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  error?: boolean; 
}

const SvgEyeSlash = ({ error = false, ...props }: SvgEyeSlashProps) => {
  const color = error ? "var(--Error)" : "var(--IconSecondary)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M4.046 8.223A10.5 10.5 0 0 0 2 12C3.291 16.339 7.309 19.5 12.065 19.5c.992 0 1.953-.138 2.863-.395M6.293 6.228A10.45 10.45 0 0 1 12.066 4.5c4.756 0 8.773 3.162 10.064 7.499a10.52 10.52 0 0 1-4.292 5.773M6.293 6.228 3.066 3m3.227 3.228 3.651 3.65m7.894 7.894L21.066 21m-3.228-3.228-3.651-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.242L9.944 9.88"
      />
    </svg>
  );
};

export default SvgEyeSlash;
