"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface TaskbarProps {
  windows: {
    id: string;
    icon: string;
    title: string;
    visible: boolean;
  }[];
  onToggleWindow: (id: string) => void;
}

export default function Taskbar({ windows, onToggleWindow }: TaskbarProps) {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);

      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();
      setDate(`${day}/${month}/${year}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-0 w-full z-[9999]">
      <div className="h-[1px] bg-[#153535]" />
      
      <div className="h-[1px] bg-[#ffffff86]" />

      <div className="h-10 flex items-center pl-[5px] backdrop-blur-sm bg-[#1717173f]">
        <div className="relative h-[96%] mr-3 aspect-square drop-shadow-[0_0_1px_white]">
          <Image
            src="/images/icons/taskbar.png"
            fill
            alt="Windows 7 Taskbar Icon"
            style={{ pointerEvents: "none", userSelect: "none" }}
          />
        </div>

        <div className="flex gap-1 h-[100%]">
            {windows.map((win) => (
                <div
                    key={win.id}
                    className={` ${win.visible ? "button-primary" : ""} taskbar-shortcut-background px-3 py-1 rounded-[3px] border-gray-500 border-[1px]`}
                    onClick={() => onToggleWindow(win.id)}
                    
                >
                    <div className="relative h-full aspect-square pointer-events-none select-none">
                    <Image
                        src={win.icon}
                        alt={win.title}
                        fill
                        style={{ objectFit: "contain" }}
                    />
                    </div>
                </div>
            ))}
        </div>

        <div style={{ flex: 1 }} />

        <div
          className="field-row"
          style={{
            padding: "0 6px",
            fontSize: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            lineHeight: "1.1",
            color: "white",
            fontWeight: 400,
          }}
        >
          <span>{time}</span>
          <span>{date}</span>
        </div>
        <div className="h-full w-4 ml-2 taskbar-show-desktop-background">
            
        </div>
      </div>
    </div>
  );
}
