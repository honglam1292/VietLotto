import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import Chip5 from "./images/5.svg";
import Chip10 from "./images/10.svg";
import Chip20 from "./images/20.svg";
import Chip50 from "./images/50.svg";
import Chip100 from "./images/100.svg";
import Chip500 from "./images/500.svg";

type Props = {
  odds?: number;
  initialAmount?: number;
  initialPickedCount?: number;
  chipUnit?: number;
  calcProjectedWin?: (amount: number, picked: number, odds: number) => number;
};

const vnd = (n: number) =>
  new Intl.NumberFormat("vi-VN").format(Math.max(0, Math.floor(n)));

const parseVndInput = (s: string) =>
  Number(String(s).replaceAll(".", "").replaceAll(",", ""));

export default function BetPanel({
  odds = 1.65,
  initialAmount = 5000,
  initialPickedCount = 18,
  chipUnit = 1_000,
  calcProjectedWin,
}: Props) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number>(initialAmount);
  const [picked, setPicked] = useState<number>(initialPickedCount);

  const chips: { label: string; value: number; src: string }[] = [
    { label: "5", value: 5 * chipUnit, src: Chip5 },
    { label: "10", value: 10 * chipUnit, src: Chip10 },
    { label: "20", value: 20 * chipUnit, src: Chip20 },
    { label: "50", value: 50 * chipUnit, src: Chip50 },
    { label: "100", value: 100 * chipUnit, src: Chip100 },
    { label: "500", value: 500 * chipUnit, src: Chip500 },
  ];

  const totalStake = useMemo(() => amount * picked, [amount, picked]);
  const projectedWin = useMemo(() => {
    if (calcProjectedWin) return calcProjectedWin(amount, picked, odds);
    return Math.round(amount * odds * 60);
  }, [amount, picked, odds, calcProjectedWin]);

  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseVndInput(e.target.value);
    setAmount(Number.isFinite(raw) ? raw : 0);
  };

  const handlePickedInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(e.target.value || "0", 10);
    setPicked(Number.isFinite(n) ? Math.max(0, n) : 0);
  };

  return (
    <div className="w-full md:!w-full md:!max-w-[720px] rounded-2xl bg-white p-0 md:!p-5 mt-4 md:!mt-0">
      <div className="flex gap-3 flex-col md:!flex-row md:items-center md:justify-between">
        <div className="text-[15px] text-gray-500 text-left">
          <span className="text-lg font-medium text-gray-700">{t("bet_rate")}:</span>{" "}
          <span className="text-lg font-semibold text-gray-900">{odds.toFixed(3)}</span>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-0">
          {chips.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => setAmount(c.value)}
              className="group inline-flex h-9 items-center gap-2 rounded-full border-none border-gray-200 px-0 md:!px-3 hover:bg-gray-50 active:scale-[0.98] transition"
              title={`${t("bet_amount")} ${vnd(c.value)} ${t("currency_vnd")}`}
            >
              <img src={c.src} alt={`chip ${c.label}`} className="h-10 w-10" />
            </button>
          ))}
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="flex justify-between gap-3 md:!gap-8">
        <div className="flex flex-col flex-1">
          <label className="mb-2 font-semibold text-base md:!text-lg text-gray-700 text-left">
            {t("bet_amount")}:
          </label>
          <div className="flex items-center">
            <input
              inputMode="numeric"
              value={vnd(amount)}
              onChange={handleAmountInput}
              placeholder="0"
              className="w-full flex-1 text-lg rounded-l-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400"
            />
            <div className="rounded-r-lg text-lg  border border-l-0 border-gray-300 px-3 py-2  text-gray-600">
              {t("currency_vnd")}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <label className="mb-2 font-semibold text-gray-700 text-left text-base md:!text-lg">
            {t("numbers_selected")}:
          </label>
          <input
            type="number"
            min={0}
            value={picked}
            onChange={handlePickedInput}
            className="w-full rounded-lg border text-lg border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-[15px] text-gray-600">
          <span className="font-medium text-lg ">{t("total_stake")}:</span>
          <span className="text-xl font-bold text-gray-900">
            {vnd(totalStake)} {t("currency_vnd")}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between text-[15px] text-gray-600">
          <span className="text-lg text- font-medium">{t("expected_win")}:</span>
          <span className="text-base font-semibold text-[#DDA400]">
            {vnd(projectedWin)} {t("currency_vnd")}
          </span>
        </div>
      </div>
    </div>
  );
}
