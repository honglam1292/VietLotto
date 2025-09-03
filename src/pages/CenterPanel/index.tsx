import { LottoContext } from "@/context/LottoContext";
import { getDateTimeForChannelToday } from "@/helper/common";
import { useContext, useMemo } from "react";
import DrawTable from "./DrawTable";
import { useTranslation } from "react-i18next";

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


  return (
    <div className="text-black">
      <div className="text-center">
        {t("Lượt xổ")}: <strong>{drawDateStr}</strong>
      </div>
      <div className="mt-4 md:!mt-8">
        <DrawTable />
      </div>
    </div>
  );
};

export default CenterPanel;
