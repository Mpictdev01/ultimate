"use client";

import React from "react";

interface WAButtonProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function WAButton({ className, children, style }: WAButtonProps) {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-wa-modal"))}
      className={className}
      style={{ ...style, cursor: "pointer", border: "none" }}
    >
      {children}
    </button>
  );
}
