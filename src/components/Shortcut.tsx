"use client";

import Image from "next/image";

interface ShortcutProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export default function Shortcut({ icon, label, onClick }: ShortcutProps) {
  return (
    <div
      className="flex flex-col items-center text-white cursor-pointer"
      onClick={onClick}
      style={{
        width: 72,
        margin: 8,
        userSelect: "none",
      }}
    >
      <div className="relative w-12 aspect-square">
        <Image
          src={icon}
          fill
          alt={`${label} icon`}
          style={{ objectFit: "contain" }}
        />
      </div>
      <span className="text-xs text-center mt-1 drop-shadow-sm">{label}</span>
    </div>
  );
}
