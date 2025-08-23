import React, { useState } from "react";

type ChipItem = {
  id: string;
  title: string;
  subtitle?: string;
  payout?: string;
};

type Row = {
  id: string;
  label: string;
  chips: ChipItem[];
};

const baseChip =
  "px-2 md:!px-4 py-2 md:!py-3 rounded-xl bg-[#9ec1ef] hover:brightness-105 active:scale-95 shadow " +
  "border border-[#5b7fb3] min-w-[100px] md:!min-w-[120px] text-center";

const labelPill =
  "text-center min-w-[170px] p-2 md:!p-4 rounded-lg text-white font-bold text-lg shadow border " +
  "bg-gradient-to-b from-[#5fa8ff] to-[#2e6cc9] border-[#1d3e74]";

const Title: React.FC = () => (
  <h1 className="text-2xl md:!text-4xl font-extrabold text-center mb-6">Folk Game</h1>
);

const Chip: React.FC<
  ChipItem & { active: boolean; onToggle: () => void }
> = ({ title, subtitle, payout, active, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`${baseChip} ${active ? "ring-2 ring-blue-600" : ""}`}
    >
      <div className="font-semibold">{title}</div>
      {subtitle && <div className="text-[12px] leading-tight">{subtitle}</div>}
      {payout && (
        <div className="mt-1 text-[13px]">
          <span className="opacity-70 mr-1">{payout.includes(":") ? "" : ""}</span>
          <b>{payout}</b>
        </div>
      )}
    </button>
  );
};

const rows: Row[] = [
  {
    id: "top-basic",
    label: "Top",
    chips: [
      { id: "top-big", title: "Big", subtitle: "(50–99)", payout: "1.96" },
      { id: "top-small", title: "Small", subtitle: "(00–49)", payout: "1.96" },
      { id: "top-odd", title: "Odd", payout: "1.96" },
      { id: "top-even", title: "Even", payout: "1.96" },
      { id: "top-pair", title: "Pair", payout: "1:9" },
      { id: "top-dragon", title: "Dragon", payout: "1:96" },
      { id: "top-big-odd", title: "Big Odd", payout: "3.7" },
      { id: "top-big-even", title: "Big Even", payout: "3.7" },
      { id: "top-small-odd", title: "Small Odd", payout: "3.7" },
      { id: "top-small-even", title: "Small Even", payout: "3.7" },
    ],
  },
  {
    id: "bottom-basic",
    label: "Bottom",
    chips: [
      { id: "bot-big", title: "Big", subtitle: "(50–99)", payout: "1.96" },
      { id: "bot-small", title: "Small", subtitle: "(00–49)", payout: "1.96" },
      { id: "bot-odd", title: "Odd", payout: "1.96" },
      { id: "bot-even", title: "Even", payout: "1.96" },
      { id: "bot-pair", title: "Pair", payout: "1:9" },
      { id: "bot-dragon", title: "Dragon", payout: "1:96" },
      { id: "bot-big-odd", title: "Small Odd", payout: "3.7" },  // theo hình
      { id: "bot-big-even", title: "Small Even", payout: "3.7" },
    ],
  },
  {
    id: "top-bottom",
    label: "Top & Bottom",
    chips: [
      { id: "tb-big", title: "Big", subtitle: "(50–99)", payout: "3.7" },
      { id: "tb-small", title: "Small", subtitle: "(00–49)", payout: "3.7" },
      { id: "tb-odd", title: "Odd", payout: "3.7" },
      { id: "tb-even", title: "Even", payout: "3.7" },
    ],
  },
  {
    id: "top-ews",
    label: "Top\n(E-W-S-N)",
    chips: [
      { id: "top-east", title: "East", subtitle: "(1–24)", payout: "3.7" },
      { id: "top-south", title: "South", subtitle: "(25–49)", payout: "3.7" },
      { id: "top-west", title: "West", subtitle: "(50–74)", payout: "3.7" },
      { id: "top-north", title: "North", subtitle: "(75–99)", payout: "3.7" },
    ],
  },
  {
    id: "bottom-ews",
    label: "Bottom\n(E-W-S-N)",
    chips: [
      { id: "bot-east", title: "East", subtitle: "(1–24)", payout: "3.7" },
      { id: "bot-south", title: "South", subtitle: "(25–49)", payout: "3.7" },
      { id: "bot-west", title: "West", subtitle: "(50–74)", payout: "3.7" },
      { id: "bot-north", title: "North", subtitle: "(75–99)", payout: "3.7" },
    ],
  },
  {
    id: "top-elements",
    label: "Top\nFive Elements",
    chips: [
      { id: "top-gold", title: "Gold", subtitle: "(1–19)", payout: "4.60" },
      { id: "top-wood", title: "Wood", subtitle: "(20–39)", payout: "4.60" },
      { id: "top-water", title: "Water", subtitle: "(40–59)", payout: "4.60" },
      { id: "top-fire", title: "Fire", subtitle: "(60–79)", payout: "4.60" },
      { id: "top-earth", title: "Earth", subtitle: "(80–99)", payout: "4.60" },
    ],
  },
  {
    id: "bottom-elements",
    label: "Bottom\nFive Elements",
    chips: [
      { id: "bot-gold", title: "Gold", subtitle: "(1–19)", payout: "4.60" },
      { id: "bot-wood", title: "Wood", subtitle: "(20–39)", payout: "4.60" },
      { id: "bot-water", title: "Water", subtitle: "(40–59)", payout: "4.60" },
      { id: "bot-fire", title: "Fire", subtitle: "(60–79)", payout: "4.60" },
      { id: "bot-earth", title: "Earth", subtitle: "(80–99)", payout: "4.60" },
    ],
  },
];

const SectionRow: React.FC<{
  row: Row;
  selected: Set<string>;
  onToggle: (id: string) => void;
}> = ({ row, selected, onToggle }) => {
  return (
    <div className="flex flex-col md:!flex-row items-center gap-4 mb-8">
      <div className={labelPill} style={{ whiteSpace: "pre-line" }}>
        {row.label}
      </div>
      <div className="flex flex-wrap gap-3 justify-center items-center">
        {row.chips.map((c) => (
          <Chip
            key={c.id}
            {...c}
            active={selected.has(c.id)}
            onToggle={() => onToggle(c.id)}
          />
        ))}
      </div>
    </div>
  );
};

const FolkGame: React.FC = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((prev) => {
      const s = new Set(prev);
      if (s.has(id)) {
        s.delete(id);
      } else {
        s.add(id);
      }
      return s;
    });


  return (
    <div className="p-2 md:!p-6 w-full bg-gradient-to-b from-[#eaf2ff] to-white rounded-xl">
      <Title />
      {rows.map((r) => (
        <SectionRow key={r.id} row={r} selected={selected} onToggle={toggle} />
      ))}
    </div>
  );
};

export default FolkGame;
