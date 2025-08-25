import { useContext, useEffect, useMemo, useState } from "react";
import { LottoContext } from "@/context/LottoContext";
import { Button, Menu, MenuItem } from "@mui/material";

type Results = {
  "G.8": string[];  // 2 số
  "G.7": string[];  // 3 số
  "G.6": string[];  // 4 số (nhiều dòng)
  "G.5": string[];  // 4 số (1 dòng)
  "G.4": string[];  // 5 số (nhiều dòng)
  "G.3": string[];  // 5 số (2 dòng)
  "G.2": string[];  // 5 số
  "G.1": string[];  // 5 số
  "G.ĐB": string[]; // 6 số (1 dòng)
};

export default function ResultPanel() {
  const ctx = useContext(LottoContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [weekday, setWeekday] = useState("");
  const [displayDate, setDisplayDate] = useState<Date>()
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const getWeekDay = (date: Date = new Date()): string => {
    const days = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    return days[date.getDay()];
  };
  const isMB = ctx?.selectCountry === "Miền Bắc";
  const ORDER: (keyof Results)[] = isMB ? [
    "G.7", "G.6", "G.5", "G.4", "G.3", "G.2", "G.1", "G.ĐB"
  ] : [
    "G.8", "G.7", "G.6", "G.5", "G.4", "G.3", "G.2", "G.1", "G.ĐB"
  ];

  useEffect(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setWeekday(getWeekDay(yesterday));
    setDisplayDate(yesterday);
  }, []);

  const prevWeekdays = useMemo(() => {
    const make = (offset: number) => {
      const d = new Date();
      d.setDate(d.getDate() - offset);
      return getWeekDay(d);
    };
    return [make(1), make(2), make(3)]; // hôm qua, hôm kia, hôm kìa
  }, []);

  const randomNumber = (digits: number): string => {
    if (digits <= 0) return "";
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num.toString().padStart(digits, "0");
  }
  const mockRs = useMemo(() => {
    return isMB ? {
      // "G.8": [randomNumber(2)],
      "G.7": [randomNumber(3), randomNumber(3), randomNumber(3), randomNumber(3)],
      "G.6": [randomNumber(4), randomNumber(4), randomNumber(4),],
      "G.5": [randomNumber(4), randomNumber(4), randomNumber(4), randomNumber(4), randomNumber(4), randomNumber(4)],
      "G.4": [randomNumber(5), randomNumber(5), randomNumber(5), randomNumber(5),],
      "G.3": [randomNumber(5), randomNumber(5), randomNumber(5), randomNumber(5), randomNumber(5), randomNumber(5)],
      "G.2": [randomNumber(5), randomNumber(5)],
      "G.1": [randomNumber(5)],
      "G.ĐB": [randomNumber(5)]
    } : {
      "G.8": [randomNumber(2)],
      "G.7": [randomNumber(3)],
      "G.6": [randomNumber(4), randomNumber(4), randomNumber(4), randomNumber(4)],
      "G.5": [randomNumber(4)],
      "G.4": [randomNumber(5), randomNumber(5), randomNumber(5), randomNumber(5), randomNumber(5)],
      "G.3": [randomNumber(5), randomNumber(5)],
      "G.2": [randomNumber(5)],
      "G.1": [randomNumber(5)],
      "G.ĐB": [randomNumber(6)]
    }
  }, [isMB]);

  if (!ctx) return null;

  const getYesterday = (): string => {
    const d = displayDate || new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };


  const countryTitle = ctx.selectCountry.split(' ').map(t => t[0])
  const channelTitle = ctx.channel.split(' ').map(t => t[0])
  return (
    <div>
      <div className="flex gap-1 mb-4 md:!mb-8 justify-center text-base">
        XS{countryTitle}
        <div>›</div>
        <div className="text-black">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            type="button"
            disableElevation
            sx={{
              height: "18px",
              fontSize: "16px",
              marginTop: "-1px",
            }}
          >
            XS{countryTitle} {weekday}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{ list: { "aria-labelledby": "basic-button" } }}
          >
            {prevWeekdays.map((label, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  setWeekday(label);
                  const today = new Date();
                  today.setDate(today.getDate() - i - 1);
                  setDisplayDate(today);
                  handleClose();
                }}
              >
                {label}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div>›</div>
        XS{channelTitle} {getYesterday()}
      </div>
      <div className="inline-block border border-gray-300 rounded-sm overflow-hidden text-black">
        <table className="table-fixed">
          <colgroup>
            <col className="w-[70px]" />
            <col className="w-[160px]" />
          </colgroup>

          <thead>
            <tr>
              <th className="bg-gray-100 text-left px-3 py-2 border-b border-r border-gray-300">Giải</th>
              <th className="bg-gray-100 text-blue-600 underline px-3 py-2 border-b border-gray-300 text-center">
                {ctx.channel}
              </th>
            </tr>
          </thead>

          <tbody>
            {ORDER.map((key, idx) => {
              const arr = mockRs[key] ?? [];
              const isRed = key === (isMB ? "G.7" : "G.8") || key === "G.ĐB";
              const cell = (
                <div className="space-y-0">
                  {arr.map((v, i) => (
                    <div
                      key={i}
                      className={`mb-[0.25px] text-[22px] leading-10 tracking-wide font-extrabold ${isRed ? "text-red-600" : "text-black"}`}
                      style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}
                    >
                      {v.padStart(v.length, "0")}
                    </div>
                  ))}
                  {arr.length === 0 && <div className="h-[22px]" />}
                </div>
              );

              // hàng ngăn giữa các block như ảnh
              const needSeparator = key === "G.4" || key === "G.3";
              return (
                <tr key={key} className={idx % 2 ? "bg-white" : "bg-[#f9fbff]"}>
                  <td className="align-middle px-3 leading-10 py-0 border-t border-r border-gray-200">
                    <span className="text-gray-700 font-semibold">{key}</span>
                  </td>
                  <td className="px-3 py-0 border-t leading-10 border-gray-200">{cell}</td>
                  {needSeparator && (
                    // hàng phân cách (tạo row riêng ngay sau)
                    <></>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
