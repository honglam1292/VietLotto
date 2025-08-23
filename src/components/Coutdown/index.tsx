import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { LottoContext } from "@/context/LottoContext";
import { getDateTimeForChannelToday } from "@/helper/common";

function getNextTarget(channel: string): Date | undefined {
  const now = new Date();
  const todayTarget = getDateTimeForChannelToday(channel, now);
  if (!todayTarget) return undefined;

  if (todayTarget.getTime() <= now.getTime()) {
    const next = new Date(todayTarget);
    next.setDate(next.getDate() + 1);
    return next;
  }
  return todayTarget;
}

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDiff(ms: number) {
  if (ms < 0) ms = 0;
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function Countdown() {
  const ctx = useContext(LottoContext);
  const channel = ctx?.channel ?? "";
  const [target, setTarget] = useState<Date | undefined>(() =>
    getNextTarget(channel)
  );
  const [now, setNow] = useState(() => new Date());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setTarget(getNextTarget(channel));
  }, [channel, ctx?.digit]);

  useEffect(() => {
    timerRef.current = window.setInterval(() => setNow(new Date()), 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!target) return;
    if (now.getTime() >= target.getTime()) {
      setTarget(getNextTarget(channel));
    }
  }, [now, target, channel]);

  const diff = useMemo(() => {
    if (!target) return 0;
    return target.getTime() - now.getTime();
  }, [target, now]);

  const display = useMemo(() => formatDiff(diff), [diff]);

  return (
    <div className="text-center">
      <div className="text-base md:!text-2xl font-semibold mb-2">Countdown</div>

      <div
        className="inline-block rounded-xl p-[2px]"
        style={{ border: "2px solid #FFBD00" }}
      >
        <div className="rounded-lg bg-gray-200 px-6 py-3">
          <span className="font-extrabold text-xl md:!text-3xl" style={{ color: "#1a2b49" }}>
            {target ? display : "--:--:--"}
          </span>
        </div>
      </div>
    </div>
  );
}
