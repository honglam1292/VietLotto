import React from "react";


type Props = { filled?: boolean; size?: number };
export default function Circle({ filled = false, size = 24 }: Props) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full border ${filled ? "bg-green-600 border-green-700" : "bg-gray-200 border-gray-300"}`}
    />
  );
}