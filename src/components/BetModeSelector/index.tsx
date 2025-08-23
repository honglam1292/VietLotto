import { useContext } from "react";
import { Checkbox } from "@mui/material";
import { LottoContext } from "@/context/LottoContext";

const woodStyle =
  "w-40 md:!w-52 gap-8 rounded-xl px-3 md:!px-5 py-3 text-base md:!text-2xl font-extrabold text-black shadow " +
  "bg-[linear-gradient(180deg,#b9814a_0%,#ba8a56_45%,#a86d38_100%)] " +
  "border border-[#7a4f2a] text-center";

export default function BetModeSelector() {
  const ctx = useContext(LottoContext);
  if (!ctx) return null;

  const options = [
    { value: 0, label: "Bet all draw" },
    { value: 1, label: "Bet 7 draw" },
    { value: 2, label: "Top & Bottom" },
  ];

  const toggle = (val: number) => {
    if (ctx.drawValue === val) return;
    ctx.setDrawValue(val);
  };

  return (
    <div className="space-y-4">
      {options.map((opt) => (
        <div
          key={opt.value}
          className="flex gap-8 justify-center items-center w-full"
        >
          <span className={woodStyle}>{opt.label}</span>
          <Checkbox
            checked={ctx.drawValue === opt.value}
            onChange={() => toggle(opt.value)}
            sx={{
              transform: window.innerWidth > 768 ? "scale(1.3)" : "scale(1.1)",
              color: "#1a2b49",
              "&.Mui-checked": {
                color: "#1a2b49",
              },
            }}
          />
        </div>
      ))}
    </div>
  );
}
