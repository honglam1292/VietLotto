import { LottoContext } from "@/context/LottoContext";
import { getDateTimeForChannelToday } from "@/helper/common";
import { useContext, useMemo } from "react";
import DrawTable from "./DrawTable";
import { useTranslation } from "react-i18next";
import { FormControl, MenuItem, Select } from "@mui/material";
import { getLotteryToday } from "../Header/mock";
import BetPanel from "./BetPanel";

const CenterPanel = () => {
  const ctx = useContext(LottoContext);
  const { t } = useTranslation();

  const drawDateStr = useMemo(() => {
    const now = new Date();
    const todayTarget = getDateTimeForChannelToday(ctx?.channel || "", now);
    if (!todayTarget) return "";

    // Nếu đã qua giờ target hôm nay -> ngày hiển thị là ngày mai
    const targetDate = new Date(todayTarget);
    if (now.getTime() > todayTarget.getTime()) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const dd = String(targetDate.getDate()).padStart(2, "0");
    const mm = String(targetDate.getMonth() + 1).padStart(2, "0");
    const yyyy = targetDate.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  }, [ctx?.channel]);

  if (!ctx) return null;

  const list = getLotteryToday();
  const channelToday = list.find((item) => item.text?.includes(ctx.channel))?.text;
  return (
    <div className="text-black w-full">
      <div className="text-center">
        <div className="hidden md:!flex md:!justify-between items-center gap-8 p-4 md:!p-0">
          <div className="text-lg font-semibold">{t("Channel")}:</div>

          <div className="flex-1">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ctx.channel}
              sx={{
                borderRadius: 1,
                width: '100%',
                backgroundColor: 'white',
              }}
            >
              {channelToday?.map((channel: string, index: number) => (
                <MenuItem key={index} value={channel} onClick={() => ctx.setChannel(channel)}>
                  {channel}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-white rounded-none md:!rounded-xl shadow-sm p-4">
        <div className="text-2xl mb-3">{t("Lượt xổ")}: <strong>{drawDateStr}</strong></div>
        <div className="flex md:!hidden flex-col gap-2 mb-4 mt-2">
          <div className="flex justify-around items-center">
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ctx.digit}
                onChange={(e) => ctx.setDigit(Number(e.target.value))}
                sx={{
                  backgroundColor: '#fafafa', // xám nhạt
                  borderRadius: 2,
                }}
              >
                <MenuItem value={2} onClick={() => ctx.setDigit(2)}> {t("Last")} 2 {t("digits")}</MenuItem>
                <MenuItem value={3} onClick={() => ctx.setDigit(3)}> {t("Last")} 3 {t("digits")}</MenuItem>
                <MenuItem value={4} onClick={() => ctx.setDigit(4)}> {t("Last")} 4 {t("digits")}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex-1">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ctx.channel}
              sx={{
                borderRadius: 2,
                width: '100%',
                backgroundColor: 'white',
              }}
            >
              {channelToday?.map((channel: string, index: number) => (
                <MenuItem key={index} value={channel} onClick={() => ctx.setChannel(channel)}>
                  {channel}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <DrawTable />
        <BetPanel />
      </div>
      <div className="px-2 pt-2 md:!pt-4 pb-12 md:!pb-2 bg-white md:!bg-transparent">
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="flex-1 rounded-full bg-[#1F3F73] px-4 md:!px-10 py-3 text-white text-lg font-semibold hover:opacity-90 active:scale-[0.97] transition"
          >
            {t("Confirm Bet")}
          </button>

          <button
            type="button"
            className="flex-1 rounded-full border border-red-500 bg-[#FFEFEF] px-4 md:!px-10 py-3 text-lg font-semibold text-red-600 hover:bg-red-100 active:scale-[0.97] transition"
          >
            {t("Clear All")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CenterPanel;
