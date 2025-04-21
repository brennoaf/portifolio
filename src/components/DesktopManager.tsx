"use client";

import React, { useState, useRef } from "react";
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
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionRect, setSelectionRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const origin = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest(".ignore-selection")) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    origin.current = { x: startX, y: startY };
    setIsSelecting(true);
    setSelectionRect({ x: startX, y: startY, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelecting) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const width = Math.abs(currentX - origin.current.x);
    const height = Math.abs(currentY - origin.current.y);
    const x = Math.min(currentX, origin.current.x);
    const y = Math.min(currentY, origin.current.y);

    setSelectionRect({ x, y, width, height });
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    setSelectionRect(null);
  };

  const showWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, visible: true } : w))
    );
  };

  const toggleVisibility = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w))
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
    <div
      className="w-screen h-screen overflow-hidden relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="absolute inset-0 z-[1] p-2 flex flex-col gap-2">
        <DesktopShortcut
          icon="/images/icons/user.ico"
          label="Sobre Mim"
          onClick={() =>
            openWindow(
              "about",
              "Sobre Mim",
              "/images/icons/user.ico",
              <AboutWindow
                id="about"
                onClose={closeWindow}
                onMinimize={minimizeWindow}
              />
            )
          }
        />
        <DesktopShortcut
          icon="/images/icons/cmd.png"
          label="Prompt de Comando"
          onClick={() =>
            openWindow(
              "cmd",
              "Prompt de Comando",
              "/images/icons/cmd.png",
              <CmdWindow
                id="cmd"
                onClose={closeWindow}
                onMinimize={minimizeWindow}
              />
            )
          }
        />
      </div>

      {isSelecting && selectionRect && (
        <div
          className="absolute z-[10] border border-blue-400 bg-blue-400/20 pointer-events-none"
          style={{
            left: selectionRect.x,
            top: selectionRect.y,
            width: selectionRect.width,
            height: selectionRect.height,
          }}
        />
      )}

      {windows
        .filter((w) => w.visible)
        .map((w) => (
          <React.Fragment key={w.id}>{w.component}</React.Fragment>
        ))}

      {/* 🧱 Taskbar */}
      <Taskbar windows={windows} onToggleWindow={toggleVisibility} />
    </div>
  );
}
