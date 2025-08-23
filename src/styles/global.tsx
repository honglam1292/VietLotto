import { Global } from "@emotion/react";
import { cssReset } from "./reset";
import { cssCustom } from "./custom";
const GlobalStyles = () => {
  return (
    <>
      <Global styles={[cssReset, cssCustom]} />
    </>
  );
};
export default GlobalStyles;
