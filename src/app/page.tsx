"use client";

import { useState } from "react";
import LoginScreen from "@/components/LoginScreen";
import DesktopManager from "@/components/DesktopManager";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? <DesktopManager /> : <LoginScreen onLogin={() => setLoggedIn(true)} />;
}
