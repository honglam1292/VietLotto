import { useState, useEffect } from "react";

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // You can adjust the width for your breakpoint
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}

export default useIsMobile;
