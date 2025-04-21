"use client";

import React, { useState, useRef, useEffect } from "react";

interface DraggableWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  width?: number | string;
  onClose?: (id: string) => void;
  onMinimize?: (id: string) => void;
}

export default function DraggableWindow({
  id,
  title,
  children,
  defaultPosition = { x: 100, y: 100 },
  width = 400,
  onClose,
  onMinimize,
}: DraggableWindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [dragging, setDragging] = useState(false);
  const [focused, setFocused] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setFocused(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const onMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const onMouseUp = () => setDragging(false);

  // Detecta clique fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        windowRef.current &&
        !windowRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={windowRef}
      className={`window ignore-selection ${focused ? "active" : ""}`}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width,
        zIndex: focused ? 999 : 1,
      }}
      onMouseDown={() => setFocused(true)}
    >
      <div className="title-bar" onMouseDown={onMouseDown} style={{ cursor: "move" }}>
        <div className="title-bar-text">{title}</div>

        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={(e) => {
            e.stopPropagation();
            onMinimize?.(id);
          }} />
          <button aria-label="Maximize" onClick={(e) => {
            e.stopPropagation();
            alert("Maximizar ainda não implementado 😅");
          }} />
          <button aria-label="Close" onClick={(e) => {
            e.stopPropagation();
            onClose?.(id);
          }} />
        </div>
      </div>

      <div className="window-body">{children}</div>
    </div>
  );
}
