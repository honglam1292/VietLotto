import React from "react";
import { useTranslation } from "react-i18next";

export type TabKey = "bet" | "result" | "analysis" | "account";

type BottomTabBarProps = {
  value: TabKey;
  onChange?: (key: TabKey) => void;
  className?: string;
};

const tabs: { key: TabKey; icon: React.FC<{ active: boolean }> }[] = [
  { key: "bet", icon: HomeIcon },
  { key: "result", icon: TrophyIcon },
  { key: "analysis", icon: ReportIcon },
  { key: "account", icon: UserIcon }
];

export default function BottomTabBar({ value, onChange, className = "" }: BottomTabBarProps) {
  const { t } = useTranslation();

  return (
    <nav
      role="tablist"
      aria-label="Main"
      className={[
        "w-screen fixed bottom-0 inset-x-0 z-50 bg-[#072B5C] text-gray-400 border-t border-white/5",
        "pb-[env(safe-area-inset-bottom)]",
        className
      ].join(" ")}
    >
      <div className="mx-auto max-w-md">
        <ul className="grid grid-cols-4">
          {tabs.map(({ key, icon: Icon }) => {
            const active = value === key;
            return (
              <li key={key} className="select-none">
                <button
                  role="tab"
                  aria-selected={active}
                  onClick={() => onChange?.(key)}
                  className={[
                    "w-full px-3 py-2.5 flex flex-col items-center justify-center gap-1",
                    "touch-manipulation active:opacity-80 transition-opacity",
                    active ? "text-[#FFC107]" : "text-white/50"
                  ].join(" ")}
                >
                  <Icon active={active} />
                  <span className="text-sm leading-none font-medium tracking-wide">
                    {t(`bottomtab_${key}`)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

/* === Icons === */
function HomeIcon({ active }: { active: boolean }) {
  const stroke = active ? "#FFC107" : "rgba(255,255,255,0.5)";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrophyIcon({ active }: { active: boolean }) {
  const stroke = active ? "#FFC107" : "rgba(255,255,255,0.5)";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M8 4h8v3a4 4 0 1 1-8 0V4Z" stroke={stroke} strokeWidth="1.6" />
      <path d="M6 7H5a2 2 0 0 1-2-2V4h3M18 7h1a2 2 0 0 0 2-2V4h-3" stroke={stroke} strokeWidth="1.6" />
      <path d="M12 11v4m-5 3h10" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ReportIcon({ active }: { active: boolean }) {
  const stroke = active ? "#FFC107" : "rgba(255,255,255,0.5)";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="6" y="3" width="12" height="18" rx="2" stroke={stroke} strokeWidth="1.6" />
      <path d="M9 9h6M9 13h6M9 17h4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ active }: { active: boolean }) {
  const stroke = active ? "#FFC107" : "rgba(255,255,255,0.5)";
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={stroke} strokeWidth="1.6" />
      <path d="M4 20a8 8 0 0 1 16 0" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
