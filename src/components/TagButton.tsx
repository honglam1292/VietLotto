import React from "react";


type Props = { label: string; active?: boolean; className?: string };
export default function TagButton({ label, active = false, className = "" }: Props) {
  return (
    <button
      className={
        `px-3 py-2 rounded-xl text-sm font-semibold shadow whitespace-nowrap ` +
        (active
          ? "bg-yellow-400/90 text-gray-900"
          : "bg-white hover:bg-gray-50 border border-gray-200") +
        (className ? ` ${className}` : "")
      }
    >
      {label}
    </button>
  );
}