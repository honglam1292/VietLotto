import React from "react";


type Props = { label: string; className?: string };
export default function WoodButton({ label, className = "" }: Props) {
  return (
    <button
      className={`w-full rounded-xl bg-amber-200/60 border-2 border-amber-700 text-amber-900 font-semibold py-3 shadow-inner hover:brightness-105 ${className}`}
    >
      {label}
    </button>
  );
}