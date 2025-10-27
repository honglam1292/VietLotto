import React from "react";
import { useTranslation } from "react-i18next";

type StatProps = {
  title: string;
  numbers: number[];
  color: "green" | "red";
};

const StatSection = ({ title, numbers, color }: StatProps) => {
  const bgColor = color === "green" ? "bg-green-500" : "bg-red-600";

  return (
    <div className="rounded-xl bg-gray-100 p-3 text-center">
      <div className="text-lg font-semibold text-gray-800 mb-2">{title}</div>
      <div className="flex justify-center gap-3">
        {numbers.map((n, idx) => (
          <div
            key={idx}
            className={`${bgColor} flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white`}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function NumberStats() {
  const { t } = useTranslation();

  return (
    <div className="w-full p-4 md:!p-0">
      <h2 className="mb-3 text-center text-2xl font-bold text-[#1F3F73]">
        {t("number_stats")}
      </h2>

      <div className="space-y-3">
        <StatSection title={t("top_numbers")} numbers={[28, 28, 28]} color="green" />
        <StatSection title={t("rare_numbers")} numbers={[28, 28, 28]} color="red" />
      </div>
    </div>
  );
}
