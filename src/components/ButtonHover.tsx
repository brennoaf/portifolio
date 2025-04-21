"use client";

import Image from "next/image";
import { useState } from "react";

interface ButtonHoverProps {
  defaultSrc: string;
  hoverSrc: string;
  alt?: string;
  width: number;
  height: number;
  onClick?: () => void;
  className?: string;
}

export default function ButtonHover({
  defaultSrc,
  hoverSrc,
  alt = "",
  width,
  height,
  onClick,
  className = "",
}: ButtonHoverProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`cursor-pointer ${className}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={hovered ? hoverSrc : defaultSrc}
        width={width}
        height={height}
        alt={alt}
        unoptimized
        className="pointer-events-none select-none"
      />
    </div>
  );
}
