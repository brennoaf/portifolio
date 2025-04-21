"use client";

import DraggableWindow from "@/components/windows/@global/DraggableWindow";
import { useEffect, useRef, useState } from "react";

interface CmdWindowProps {
  id: string;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
}

export default function CmdWindow({ id, onClose, onMinimize }: CmdWindowProps) {
  const [history, setHistory] = useState<string[]>([
    "Microsoft Windows [Versão 6.1.7601]",
    "(c) 2009 Microsoft Corporation. Todos os direitos reservados.",
    "⠀",
  ]);
  const [currentInput, setCurrentInput] = useState("");

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompt = "C:\\Users\\brenno>";

  const handleCommand = (cmd: string) => {
    const output: string[] = [];

    switch (cmd.trim()) {
      case "help":
        output.push("Comandos disponíveis: help, clear, echo, date, whoami");
        break;
      case "clear":
        setHistory([]);
        return;
      case "date":
        output.push(new Date().toString());
        break;
      case "whoami":
        output.push("brenno (usuário local)");
        break;
      default:
        if (cmd.startsWith("echo ")) {
          output.push(cmd.slice(5));
        } else if (cmd.trim() === "") {
          output.push("");
        } else {
          output.push(`'${cmd}' não é reconhecido como um comando interno ou externo.`);
        }
    }

    setHistory((prev) => [...prev, `${prompt} ${cmd}`, ...output, ""]);
    setCurrentInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentInput);
    }
  };

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight });
  }, [history]);

  return (
    <DraggableWindow
      id={id}
      title="Prompt de Comando"
      width={600}
      onClose={onClose}
      onMinimize={onMinimize}
    >
      <div
        ref={terminalRef}
        onClick={() => inputRef.current?.focus()}
        className="w-full h-72 overflow-auto text-sm p-2 font-vt323"
        style={{
          backgroundColor: "black",
          color: "white",
          border: "1px solid #333",
          cursor: "text",
        }}
      >
        {history.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}

        <div className="flex">
          <span>{prompt}</span>
          <input
            ref={inputRef}
            autoFocus
            className="bg-black text-white outline-none font-vt323 flex-1"
            style={{ caretColor: "white", border: "none", marginLeft: 4 }}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </DraggableWindow>
  );
}
