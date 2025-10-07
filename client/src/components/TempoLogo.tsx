import React from "react";

interface TempoLogoProps {
  size?: number;
  className?: string;
}

const TempoLogo: React.FC<TempoLogoProps> = ({ size = 32, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="tickGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="30%" stopColor="#111827" />
          <stop offset="70%" stopColor="#000000" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
        <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient
          id="highlightGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 30 55 L 45 70 L 75 40"
        stroke="url(#shadowGradient)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2, 2)"
      />
      <path
        d="M 30 55 L 45 70 L 75 40"
        stroke="url(#tickGradient)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 30 55 L 45 70 L 75 40"
        stroke="url(#highlightGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(-1, -1)"
      />
      <path
        d="M 32 57 L 43 68 L 73 42"
        stroke="#ffffff"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
    </svg>
  );
};

export default TempoLogo;
