import { LottoContext } from "@/context/LottoContext";
import React, { useState, useMemo, useContext } from "react";
import { useTranslation } from "react-i18next";

const formatNumber = (n: number) =>
  n.toLocaleString("en-US", { maximumFractionDigits: 0 });

const parseAmount = (s: string) => {
  const onlyDigits = s.replace(/[^\d]/g, "");
  return onlyDigits ? Math.min(Number(onlyDigits), 10_000_000_000) : 0;
};

const Chip: React.FC<{ label: string; onClick: () => void, color: string }> = ({ label, onClick, color }) => (
  <button
    type="button"
    onClick={onClick}
    className={`cursor-pointer w-10 h-10 rounded-full bg-[${color}] text-white flex items-center justify-center mx-1 shadow
               border-4 border-dotted border-white/70 hover:brightness-110 active:scale-95`}
    title={label}
  >
    <span className="text-xs font-bold">{label}</span>
  </button>
);

export default function Footer() {
  const [odds] = useState(650);
  const [amount, setAmount] = useState(5000);
  const chipValues = [5000, 10000, 20000, 50000, 100000];
  const ctx = useContext(LottoContext);
  const { t } = useTranslation();
  const selectedCount = ctx?.numOfSelectBet || 0;
  const total = useMemo(() => amount * (selectedCount || 0), [amount, selectedCount]);
  const colors = ['#FFBD00', '#A32020', '#4bea4c', '#FE6464', '#B27D49']
  return (
    <div
      className="w-full h-full px-4 py-3 flex flex-col md:!flex-row items-center gap-2 md:!gap-4 rounded-md"
      style={{
        background:
          "repeating-linear-gradient(0deg, #e9e1d3, #e9e1d3 10px, #e6dece 10px, #e6dece 20px)",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
      }}
    >
      {/* Odds + Amount */}
      <div className="flex items-center gap-2 md:!gap-6 flex-wrap">
        <div>
          <div className="text-lg font-semibold flex justify-start gap-2 mb-1 md:!mb-2 md:!mb-0">
            <span className="font-bold">{t("Betting Odds")}: </span>
            <span>1:{odds}</span>
          </div>

          <div className="flex items-center gap-2 text-lg font-semibold">
            <span>{t("Bet amount")}:</span>
            <input
              type="text"
              value={formatNumber(amount)}
              onChange={(e) => setAmount(parseAmount(e.target.value))}
              className="w-24 md:!w-28 px-2 py-1 text-right rounded border border-black/40 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span>vnd</span>
          </div>
        </div>
        {/* Chips */}
        <div className="w-full md:!w-[300px] flex justify-around items-center">
          {chipValues.map((v, i) => (
            <Chip key={v} label={`${v / 1000}`} onClick={() => setAmount(v)} color={colors[i]} />
          ))}
        </div>

        {/* Selected count */}
        <div className="text-lg font-semibold w-full md:!w-auto">
          {t("Selected")}{" "}
          <span className="text-red-600">{selectedCount}</span> {t("number sets")}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Total bet */}
      <div
        className="w-[280px] md:!w-auto px-5 py-3 rounded-xl text-white text-xl font-extrabold shadow border"
        style={{ backgroundColor: "#4472C4", borderColor: "#2b4a7b" }}
      >
        {t("Total bet")}: {formatNumber(total)} vnd
      </div>

      {/* Confirm */}
      <button
        type="button"
        onClick={() => alert(`Confirm bet: amount=${amount}, total=${total}`)}
        className="w-[280px] md:!w-auto cursor-pointer ml-0 md:!ml-3 px-5 py-3 rounded-xl text-xl font-semibold shadow border border-black/60
                   bg-gradient-to-b from-gray-300 to-gray-500 hover:brightness-105 active:scale-95"
      >
        {t("Confirm")}
      </button>
    </div>
  );
}
