"use client";

import React, { useState } from "react";
import Taskbar from "./Taskbar";
import AboutWindow from "@/components/windows/AboutWindow";
import DesktopShortcut from "./Shortcut";
import CmdWindow from "./windows/CmdWindow";

interface WindowData {
  id: string;
  title: string;
  icon: string;
  visible: boolean;
  component: React.ReactNode;
}

export default function DesktopManager() {
  const [windows, setWindows] = useState<WindowData[]>([]);

  const showWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, visible: true } : w
      )
    );
  };

  const toggleVisibility = (id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, visible: !w.visible } : w
      )
    );
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, visible: false } : w))
    );
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const openWindow = (
    id: string,
    title: string,
    icon: string,
    component: React.ReactNode
  ) => {
    const existing = windows.find((w) => w.id === id);
    if (existing) {
      showWindow(id);
    } else {
      setWindows((prev) => [
        ...prev,
        { id, title, icon, visible: true, component },
      ]);
    }
  };
  

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Ícones do desktop */}
      <div className="absolute inset-0 z-0 p-2 flex flex-col gap-2">
        <DesktopShortcut
          icon="/images/icons/user.ico"
          label="Sobre Mim"
          onClick={() => openWindow("about", "Sobre Mim", "/images/icons/user.ico", <AboutWindow id="about" onClose={closeWindow} onMinimize={minimizeWindow} />)}
        />
        <DesktopShortcut
            icon="/images/icons/cmd.png"
            label="Prompt de Comando"
            onClick={() => openWindow("cmd", "Prompt de Comando", "/images/icons/cmd.png", <CmdWindow id="cmd" onClose={closeWindow} onMinimize={minimizeWindow} />)}
        />
      </div>


        {windows
        .filter((w) => w.visible)
        .map((w) => (
            <React.Fragment key={w.id}>
            {w.component}
            </React.Fragment>
        ))}


      {/* Taskbar */}
      <Taskbar windows={windows} onToggleWindow={toggleVisibility} />
    </div>
  );
}
