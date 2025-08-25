import BetModeSelector from "@/components/BetModeSelector";
import Countdown from "@/components/Coutdown";
import FolkGame from "@/components/FolkGame";
import { LottoContext } from "@/context/LottoContext";
import { Box, Button, Checkbox, Menu, MenuItem, Modal } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";

type DigitValue = number | undefined;

const woodStyle =
  "cursor-pointer w-40 md:!w-52 gap-8 rounded-xl px-3 md:!px-5 py-3 text-base md:!text-2xl font-extrabold text-black shadow " +
  "bg-[linear-gradient(180deg,#b9814a_0%,#ba8a56_45%,#a86d38_100%)] " +
  "border border-[#7a4f2a] text-center";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: window.innerWidth > 768 ? 4 : 2,
};

const LeftPanel = () => {
  const ctx = useContext(LottoContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const isMB = ctx?.selectCountry === "Miền Bắc";

  useEffect(() => {
    handleClose();
  }, [ctx?.digit]);

  const [digits, setDigits] = useState<DigitValue[]>(
    () => Array(ctx?.digit ?? 0).fill(undefined)
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!ctx) return;
    setDigits(Array(ctx.digit).fill(undefined));
    setAnchorEl(null);
  }, [ctx?.digit]);

  useEffect(() => {
    ctx?.setBetValue(digits);
  }, [digits]);

  const onChangeDigit = (idx: number, v: string) => {
    const onlyOne = v.replace(/\D/g, "").slice(0, 1);
    const num: DigitValue = onlyOne === "" ? undefined : Number(onlyOne);

    setDigits(prev => {
      const next = [...prev];
      next[idx] = num;
      return next;
    });

    if (onlyOne && inputRefs.current[idx + 1]) {
      inputRefs.current[idx + 1]?.focus();
      inputRefs.current[idx + 1]?.select();
    }
  };

  const onKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (key === "Backspace") {
      e.preventDefault();
      setDigits(prev => {
        const next = [...prev];
        if (next[idx] !== undefined) {
          next[idx] = undefined;
        } else if (idx > 0) {
          inputRefs.current[idx - 1]?.focus();
          next[idx - 1] = undefined;
        }
        return next;
      });
      return;
    }

    if (key === "ArrowLeft" && inputRefs.current[idx - 1]) {
      e.preventDefault();
      inputRefs.current[idx - 1]?.focus();
      return;
    }
    if (key === "ArrowRight" && inputRefs.current[idx + 1]) {
      e.preventDefault();
      inputRefs.current[idx + 1]?.focus();
      return;
    }
  };

  const [openFolkGame, setOpenFolkGame] = useState(false);
  const handleOpenFolkGame = () => setOpenFolkGame(true);
  const handleCloseFolkGame = () => setOpenFolkGame(false);

  const onClickOpenFolkGame = () => {
    handleOpenFolkGame()
  }

  if (!ctx) return null;

  return (
    <div>
      <div className="p-2 md:!p-4 rounded-lg bg-slate-200">
        <div className="flex justify-around items-center">
          <div className="text-center px-4 py-2 rounded-md text-black bg-[#FFBD00] 
            shadow-[0_3px_6px_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.3)]">
            {ctx.channel}
          </div>
          <div className="text-black">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              type="button"
              variant="contained"
              // disableElevation
              sx={{
                backgroundColor: "#4472C4",
                color: "white",
                border: "1px solid #000",
                textTransform: "none",
                "&:hover": { backgroundColor: "#3a61a5", borderColor: "#000" },
                height: "41px",
              }}
            >
              Last {ctx.digit} digits
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{ list: { "aria-labelledby": "basic-button" } }}
            >
              {isMB ? null : <MenuItem onClick={() => ctx.setDigit(2)}>Last 2 digits</MenuItem>}
              <MenuItem onClick={() => ctx.setDigit(3)}>Last 3 digits</MenuItem>
              <MenuItem onClick={() => ctx.setDigit(4)}>Last 4 digits</MenuItem>
            </Menu>
          </div>
        </div>

        <div className="flex justify-between mt-4 md:mt-6">
          <div className="font-bold flex-1 flex justify-center items-center">
            Key {ctx.digit} digit{ctx.digit > 1 ? "s" : ""} :
          </div>

          <div className="flex-1 flex justify-around">
            {Array.from({ length: ctx.digit }).map((_, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digits[i] !== undefined ? String(digits[i]) : ""}
                onChange={(e) => onChangeDigit(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                className="size-8 md:!size-10 text-center font-bold text-lg rounded-full 
                 border border-[#1a2b49] bg-gray-300 focus:outline-none"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="p-2 md:!p-4 rounded-lg bg-slate-200 mt-6 md:mt-12">
        <div className="">
          <Countdown />
        </div>
      </div>

      <div className="p-2 md:!p-6 rounded-lg bg-slate-200 mt-6 md:mt-12">
        <div className="">
          <BetModeSelector />
          <div
            className="flex gap-8 justify-center items-center w-full mt-4"
          >
            <span className={woodStyle} onClick={onClickOpenFolkGame}>Folk Game</span>
            <Modal
              open={openFolkGame}
              onClose={handleCloseFolkGame}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="p-0 md:!p-6 max-h-[80vh] overflow-auto w-[80vw]">
                  <FolkGame />
                </div>
              </Box>
            </Modal>
            <Checkbox
              sx={{
                transform: window.innerWidth > 768 ? "scale(1.3)" : "scale(1.1)",
                color: "#1a2b49",
                "&.Mui-checked": {
                  color: "#1a2b49",
                },
                visibility: "hidden",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
