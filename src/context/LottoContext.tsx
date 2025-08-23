// LottoContext.tsx
import { createContext, useState, ReactNode } from "react";

type LottoContextType = {
  channel: string;
  setChannel: (ch: string) => void;
  digit: number;
  setDigit: (d: number) => void;
  drawValue: number;
  setDrawValue: (dv: number) => void;
  betValue: (number | undefined)[];
  setBetValue: (bv: (number | undefined)[]) => void;
  selectCountry: string;
  setSelectCountry: (ht: string) => void;
  numOfSelectBet: number;
  setNumOfSelectBet: (n: number) => void;
};

export const LottoContext = createContext<LottoContextType | undefined>(undefined);

export const LottoProvider = ({ children }: { children: ReactNode }) => {
  const [channel, setChannel] = useState("Miền Bắc");
  const [digit, setDigit] = useState(2);
  const [drawValue, setDrawValue] = useState(0);
  const [betValue, setBetValue] = useState<(number | undefined)[]>([]);
  const [selectCountry, setSelectCountry] = useState<string>("Miền Bắc");
  const [numOfSelectBet, setNumOfSelectBet] = useState(0);


  return (
    <LottoContext.Provider value={{
      channel,
      setChannel,
      digit,
      setDigit,
      drawValue,
      setDrawValue,
      betValue,
      setBetValue,
      selectCountry,
      setSelectCountry,
      numOfSelectBet,
      setNumOfSelectBet
    }}>
      {children}
    </LottoContext.Provider>
  );
};
