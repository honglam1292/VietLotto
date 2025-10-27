import { useContext } from "react";
import { Checkbox } from "@mui/material";
import { LottoContext } from "@/context/LottoContext";
import { useTranslation } from "react-i18next";

export default function BetModeSelector({ woodStyle }: { woodStyle: string }) {
  const ctx = useContext(LottoContext);
  const { t } = useTranslation();

  if (!ctx) return null;

  const options = [
    { value: 0, label: t("Bet all draw") },
    { value: 1, label: t("Bet 7 draw") },
    { value: 2, label: t("Top & Bottom") },
  ];

  const toggle = (val: number) => {
    if (ctx.drawValue === val) return;
    ctx.setDrawValue(val);
  };

  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <div
          key={opt.value}
          className="flex gap-8 justify-center items-center w-full"
        >
          <span className={woodStyle}>{opt.label}</span>
          {/* <Checkbox
            checked={ctx.drawValue === opt.value}
            onChange={() => toggle(opt.value)}
            sx={{
              transform: window.innerWidth > 768 ? "scale(1.3)" : "scale(1.1)",
              color: "#1a2b49",
              "&.Mui-checked": {
                color: "#1a2b49",
              },
            }}
          /> */}
        </div>
      ))}
    </div>
  );
}
