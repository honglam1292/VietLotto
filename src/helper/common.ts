import { RegionResult, schedule } from "@/pages/Header/mock";

// Hàm tìm RegionResult ứng với channel hôm nay
export function getRegionByChannelToday(channel: string, d = new Date()): RegionResult | undefined {
  const today = d.getDay(); // CN=0, Thứ 2=1, ... Thứ 7=6
  const todays = schedule[today];

  const stripPrefix = (s: string) => s.replace(/^Xổ Số\s*/i, "").trim();
  const normalizeVN = (s: string) =>
    stripPrefix(s)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s]/g, "")
      .trim();

  const target = normalizeVN(channel);

  for (const region of todays) {
    for (const n of region.name) {
      if (normalizeVN(n) === target) return region;
    }
  }
  return undefined;
}

export function getDateTimeForChannelToday(channel: string, d = new Date()): Date | undefined {
  const region = getRegionByChannelToday(channel, d);
  if (!region) return undefined;

  const [hh, mm] = region.time.split(":").map(Number);

  const result = new Date(d);
  result.setHours(hh, mm, 0, 0);
  return result;
}
