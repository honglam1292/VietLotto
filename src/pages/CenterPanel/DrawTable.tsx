import { useContext, useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { LottoContext } from "@/context/LottoContext";

const GrayDot = ({
  dark,
  value,
  showValue,
  title
}: {
  dark?: boolean;
  value: string | number;
  showValue: boolean;
  title: string;
}) => (
  <div
    title={title}
    className={`size-6 rounded-full border border-[#1a2b49] flex items-center justify-center ${dark ? "bg-gray-400" : "bg-gray-200"
      }`}
  >
    {dark ? "" : showValue ? value : ""}
  </div>
);

type RowDef = {
  label: string;
  gray: number;
  green: number;
};


export default function DrawTable() {
  const ctx = useContext(LottoContext);

  // state lưu row nào được check
  const [checkedRows, setCheckedRows] = useState<Record<string, boolean>>({});

  const betValue = ctx?.betValue || [];
  const digit = ctx?.digit || 2;
  const drawValue = ctx?.drawValue || 0;

  const toggleRow = (label: string) => {
    setCheckedRows((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isDarkRow = (grayCount: number) => grayCount < digit;

  const getValue = (index: number, grayCount: number): string => {
    if (!betValue || betValue.length === 0) return "";
    const offsetFromRight = grayCount - 1 - index;
    const idxInBet = betValue.length - 1 - offsetFromRight;
    if (idxInBet < 0 || idxInBet >= betValue.length) return "";
    const v = betValue[idxInBet];
    return v === undefined ? "" : String(v);
  };

  useEffect(() => {
    const checkedCount = Object.keys(checkedRows).filter(
      (key) => checkedRows[key]
    ).length;
    ctx?.setNumOfSelectBet(checkedCount);
  }, [checkedRows]);

  const isMB = ctx?.selectCountry === "Miền Bắc";

  const ROWS: RowDef[] = isMB ? [
    { label: "G.7.1", gray: 2, green: 0 },
    { label: "G.7.2", gray: 2, green: 0 },
    { label: "G.7.3", gray: 2, green: 0 },
    { label: "G.7.4", gray: 2, green: 0 },
    { label: "G.6.1", gray: 3, green: 0 },
    { label: "G.6.2", gray: 3, green: 0 },
    { label: "G.6.3", gray: 3, green: 0 },
    { label: "G.5.1", gray: 4, green: 0 },
    { label: "G.5.2", gray: 4, green: 0 },
    { label: "G.5.3", gray: 4, green: 0 },
    { label: "G.5.4", gray: 4, green: 0 },
    { label: "G.5.5", gray: 4, green: 0 },
    { label: "G.5.6", gray: 4, green: 0 },
    { label: "G.4.1", gray: 4, green: 0 },
    { label: "G.4.2", gray: 4, green: 0 },
    { label: "G.4.3", gray: 4, green: 0 },
    { label: "G.4.4", gray: 4, green: 0 },
    { label: "G.3.1", gray: 5, green: 0 },
    { label: "G.3.2", gray: 5, green: 0 },
    { label: "G.3.3", gray: 5, green: 0 },
    { label: "G.3.4", gray: 5, green: 0 },
    { label: "G.3.5", gray: 5, green: 0 },
    { label: "G.3.6", gray: 5, green: 0 },
    { label: "G.2.1", gray: 5, green: 0 },
    { label: "G.2.2", gray: 5, green: 0 },
    { label: "G.1", gray: 5, green: 0 },
    { label: "G.ĐB", gray: 5, green: 0 },
  ] : [
    { label: "G.8", gray: 2, green: 0 },
    { label: "G.7", gray: 3, green: 0 },
    { label: "G.6.1", gray: 4, green: 0 },
    { label: "G.6.2", gray: 4, green: 0 },
    { label: "G.6.3", gray: 4, green: 0 },
    { label: "G.6.4", gray: 4, green: 0 },
    { label: "G.5", gray: 5, green: 0 },
    { label: "G.4.1", gray: 5, green: 0 },
    { label: "G.4.2", gray: 5, green: 0 },
    { label: "G.4.3", gray: 5, green: 0 },
    { label: "G.4.4", gray: 5, green: 0 },
    { label: "G.4.5", gray: 5, green: 0 },
    { label: "G.3.1", gray: 5, green: 0 },
    { label: "G.3.2", gray: 5, green: 0 },
    { label: "G.2", gray: 5, green: 0 },
    { label: "G.1", gray: 5, green: 0 },
    { label: "G.ĐB", gray: 6, green: 0 },
  ];

  useEffect(() => {
    if (drawValue === 0) {
      setCheckedRows(isMB ? {
        "G.7.1": ctx?.digit && ctx?.digit > 2 ? false : true,
        "G.7.2": ctx?.digit && ctx?.digit > 2 ? false : true,
        "G.7.3": ctx?.digit && ctx?.digit > 2 ? false : true,
        "G.7.4": ctx?.digit && ctx?.digit > 2 ? false : true,
        "G.6.1": true,
        "G.6.2": true,
        "G.6.3": true,
        "G.5.1": true,
        "G.5.2": true,
        "G.5.3": true,
        "G.5.4": true,
        "G.5.5": true,
        "G.5.6": true,
        "G.4.1": true,
        "G.4.2": true,
        "G.4.3": true,
        "G.4.4": true,
        "G.3.1": true,
        "G.3.2": true,
        "G.3.3": true,
        "G.3.4": true,
        "G.3.5": true,
        "G.3.6": true,
        "G.2.1": true,
        "G.2.2": true,
        "G.1": true,
        "G.ĐB": true,
      } : {
        "G.8": ctx?.digit && ctx?.digit > 2 ? false : true,
        "G.7": ctx?.digit && ctx?.digit > 3 ? false : true,
        "G.6.1": true,
        "G.6.2": true,
        "G.6.3": true,
        "G.6.4": true,
        "G.5": true,
        "G.4.1": true,
        "G.4.2": true,
        "G.4.3": true,
        "G.4.4": true,
        "G.4.5": true,
        "G.3.1": true,
        "G.3.2": true,
        "G.2": true,
        "G.1": true,
        "G.ĐB": true,
      });
    }
    if (drawValue === 1) {
      setCheckedRows(isMB ? {
        "G.7.1": ctx?.digit && ctx?.digit > 2 ? false : true,
        "G.7.2": ctx?.digit && ctx?.digit > 2 ? false : true,
        "G.7.3": ctx?.digit && ctx?.digit > 2 ? false : true,
        "G.7.4": ctx?.digit && ctx?.digit > 2 ? false : true,
        "G.6.1": true,
        "G.6.2": true,
        "G.6.3": ctx?.digit && ctx?.digit > 2 ? true : false,
        "G.5.1": ctx?.digit && ctx?.digit > 2 ? true : false,
        "G.5.2": ctx?.digit && ctx?.digit > 2 ? true : false,
        "G.5.3": ctx?.digit && ctx?.digit > 2 ? true : false,
        "G.5.4": ctx?.digit && ctx?.digit > 3 ? true : false,
        "G.5.5": ctx?.digit && ctx?.digit > 3 ? true : false,
        "G.5.6": ctx?.digit && ctx?.digit > 3 ? true : false,
        "G.4.1": false,
        "G.4.2": false,
        "G.4.3": false,
        "G.4.4": false,
        "G.3.1": false,
        "G.3.2": false,
        "G.3.3": false,
        "G.3.4": false,
        "G.3.5": false,
        "G.3.6": false,
        "G.2.1": false,
        "G.2.2": false,
        "G.1": false,
        "G.ĐB": true,
      } : {
        "G.8": ctx?.digit && ctx?.digit === 2 ? true : false,
        "G.7": ctx?.digit && ctx?.digit === 2 ? true : false,
        "G.6.1": true,
        "G.6.2": true,
        "G.6.3": true,
        "G.6.4": true,
        "G.5": ctx?.digit && ctx?.digit === 2 ? false : true,
        "G.4.1": ctx?.digit && ctx?.digit === 2 ? false : true,
        "G.4.2": false,
        "G.4.3": false,
        "G.4.4": false,
        "G.4.5": false,
        "G.3.1": false,
        "G.3.2": false,
        "G.2": false,
        "G.1": false,
        "G.ĐB": true,
      });
    }
    if (drawValue === 2) {
      setCheckedRows(isMB ? {
        "G.7.1": ctx?.digit && ctx?.digit > 2 ? false : true,
        "G.7.2": false,
        "G.7.3": false,
        "G.7.4": false,
        "G.6.1": ctx?.digit && ctx?.digit > 2 ? true : false,
        "G.6.2": false,
        "G.6.3": false,
        "G.5.1": ctx?.digit && ctx?.digit > 3 ? true : false,
        "G.5.2": false,
        "G.5.3": false,
        "G.5.4": false,
        "G.5.5": false,
        "G.5.6": false,
        "G.4.1": false,
        "G.4.2": false,
        "G.4.3": false,
        "G.4.4": false,
        "G.3.1": false,
        "G.3.2": false,
        "G.3.3": false,
        "G.3.4": false,
        "G.3.5": false,
        "G.3.6": false,
        "G.2.1": false,
        "G.2.2": false,
        "G.1": false,
        "G.ĐB": true,
      } : {
        "G.8": ctx?.digit && ctx?.digit > 2 ? false : true,
        "G.7": ctx?.digit && ctx?.digit === 3 ? true : false,
        "G.6.1": ctx?.digit && ctx?.digit === 4 ? true : false,
        "G.6.2": false,
        "G.6.3": false,
        "G.6.4": false,
        "G.5": false,
        "G.4.1": false,
        "G.4.2": false,
        "G.4.3": false,
        "G.4.4": false,
        "G.4.5": false,
        "G.3.1": false,
        "G.3.2": false,
        "G.2": false,
        "G.1": false,
        "G.ĐB": true,
      });
    }
  }, [drawValue, ctx?.digit, isMB]);

  if (!ctx) return null;

  // ====== GROUPING for rowSpan ======
  // "G.6.1" -> "G.6", "G.4.7" -> "G.4", "G.8" -> "G.8", "G.ĐB" -> "G.ĐB"
  const getBase = (label: string) => {
    const parts = label.split(".");
    return parts.length >= 2 ? `G.${parts[1]}` : label;
  };

  // Đếm số hàng mỗi group để set rowSpan
  const groupCounts = ROWS.reduce<Map<string, number>>((m, r) => {
    const base = getBase(r.label);
    m.set(base, (m.get(base) ?? 0) + 1);
    return m;
  }, new Map());

  const handleCheckAll = () => {
    const isChecked = !!Object.keys(checkedRows).filter(key => checkedRows[key]).length;
    const isAllChecked = Object.keys(checkedRows).length === Object.keys(checkedRows).filter(key => checkedRows[key]).length;
    if (!isAllChecked || !isChecked) {
      setCheckedRows(prev =>
        Object.fromEntries(Object.keys(prev).map(key => [key, true]))
      );
    } else {
      setCheckedRows(prev => {
        const updated: Record<string, boolean> = {};
        Object.keys(prev).forEach(key => {
          updated[key] = false;
        });
        return updated;
      });
    }

  }

  // Đánh dấu nhóm đã render ô label
  const renderedBase = new Set<string>();
  const bgWhite = ['G.2', 'G.4', 'G.6', 'G.8', 'G.ĐB'];
  return (
    <div className="w-full flex justify-center overflow-x-auto">
      <div className="w-full md:!w-[600px]">
        <table className="w-full border-collapse text-black">
          <thead>
            <tr className="bg-gradient-to-b from-gray-100 to-gray-200">
              <th className="w-[90px] text-center font-bold px-4 py-2 border border-gray-300">
                Giải
              </th>
              <th className="text-left font-bold px-4 py-2 border border-gray-300"></th>
              <th className="w-[72px] text-center font-bold px-1 md:!px-4 py-0 border border-gray-300">
                <Checkbox
                  checked={!!Object.keys(checkedRows).filter(key => checkedRows[key]).length}
                  onChange={handleCheckAll}
                  size="small"
                  sx={{
                    color: "#1a2b49",
                    padding: 1,
                    marginLeft: 0.25,
                    "&.Mui-checked": { color: "#1a2b49" },
                  }}
                />
              </th>
            </tr>
          </thead>

          <tbody>
            {ROWS.map((r) => {
              const dark = isDarkRow(r.gray);
              const isRowChecked = checkedRows[r.label] && !dark ? true : false;

              const base = getBase(r.label);
              const shouldRenderLabelCell = !renderedBase.has(base);
              if (shouldRenderLabelCell) renderedBase.add(base);
              const rowSpan = groupCounts.get(base) ?? 1;

              return (
                <tr
                  key={r.label}
                  className={bgWhite.filter(bg => r.label.includes(bg)).length > 0 ? "bg-white" : "bg-[#f7f9fc]"}
                >
                  {/* Ô "Giải" gộp theo rowSpan */}
                  {shouldRenderLabelCell && (
                    <td
                      rowSpan={rowSpan}
                      className="align-middle px-4 py-0 border border-gray-300"
                    >
                      <span className="font-semibold">{base}</span>
                    </td>
                  )}

                  {/* Cột dots */}
                  <td className="px-4 py-0 border border-gray-300">
                    <div className="flex justify-end gap-3">
                      {Array.from({ length: r.gray }).map((_, i) => (
                        <GrayDot
                          key={`g-${r.label}-${i}`}
                          dark={dark}
                          showValue={isRowChecked}
                          value={getValue(i, r.gray)}
                          title={ctx.channel}
                        />
                      ))}
                    </div>
                  </td>

                  {/* Cột checkbox */}
                  <td className="px-1 md:!px-4 py-0 border border-gray-300">
                    <Checkbox
                      checked={isRowChecked}
                      onChange={() => {
                        if (dark) return;
                        if (!isRowChecked && Object.keys(checkedRows).filter(key => checkedRows[key]).length >= 7 && drawValue === 1) return;
                        toggleRow(r.label);
                      }}
                      size="small"
                      sx={{
                        color: "#1a2b49",
                        padding: 1,
                        "&.Mui-checked": { color: "#1a2b49" },
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
