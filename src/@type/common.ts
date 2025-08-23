export type PrizeRow = {
  code: string; // e.g. "G.8", "G.DB"
  slots: number; // how many result slots in that row
};


export const PRIZE_ROWS: PrizeRow[] = [
  { code: "G.8", slots: 1 },
  { code: "G.7", slots: 1 },
  { code: "G.6", slots: 3 },
  { code: "G.5", slots: 1 },
  { code: "G.4", slots: 7 },
  { code: "G.3", slots: 2 },
  { code: "G.2", slots: 1 },
  { code: "G.1", slots: 1 },
  { code: "G.DB", slots: 1 },
];

export const RIGHT_RESULTS = {
  province: "Bến Tre",
  rows: [
    { code: "G.8", values: ["34"] },
    { code: "G.7", values: ["651"] },
    { code: "G.6", values: ["0529", "5484", "6929"] },
    { code: "G.5", values: ["5057"] },
    { code: "G.4", values: ["65288", "56217", "49093", "39574", "34664", "17924", "84311"] },
    { code: "G.3", values: ["67435", "98511"] },
    { code: "G.2", values: ["55651"] },
    { code: "G.1", values: ["89593"] },
    { code: "G.DB", values: ["534944"] },
  ],
};