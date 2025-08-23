import { css } from "@emotion/react";
import { media } from "./breakpoint";
import theme from "./theme";
export const cssReset = css`
  * {
    font-family: "Arial", sans-serif;
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: ${theme.color.primary};
      cursor: pointer;
      transition: all .2s;
    }
    &::-webkit-scrollbar-track {
      background: #00000073;
      border-radius: 50px;
    }
  }
  *:not(.non-reset *) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    touch-action: manipulation;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  *::before,
  *::after {
    box-sizing: inherit;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }
  a {
    text-decoration: none;
  }
  a img {
    max-width: 100%;
    height: auto;
  }
  body {
    margin: 0;
    padding: 0;
  }
  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
    /* scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, .4) transparent; */
    ${media.xxl} {
      font-size: 0.9vw;
    }
    ${media.sm} {
      font-size: 13px;
    }
  }

  body {
    width: 100%;
    height: 100%;
    overflow: overlay;
    overflow-x: hidden;
    color: #fff;
    line-height: 20px;
  }

  table {
    border-collapse: collapse;
  }

  button{
    cursor: pointer;
  }

  @supports (-webkit-overflow-scrolling: touch) {
    input {
      font-size: 16px;

      ${media.md}{
        font-size: 16px !important;
      }
    }
  }

  input[type=number]::-webkit-outer-spin-button,
  input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
  -moz-appearance: textfield;
}

  .btn-secondary,
  .btn-primary,
  .btn-3nd{
    display: inline-block;
    overflow: hidden;
    border: none;
    outline: none;
    cursor: pointer;
    transition: box-shadow .5s ease-out .1s, background-position .3s ease-in, text-shadow .3s ease-in .1s;
  }

  .btn-primary{
    display: inline-block;
    overflow: hidden;
    background: ${theme.gradient.primaryBtn};
    background-position: 50% 0;
    background-size: 200%;
    box-shadow: 0 5px 10px 0 rgba(6, 8, 15, .1), inset 0 0 3px 0 #ffdd8f;
    color: #fff;
    
    &:hover{
      background-position: 0 0;
      box-shadow: 0 2px 2px 1px rgba(6, 8, 15, .1), 0 4px 4px 1px rgba(6, 8, 15, .1), 0 8px 8px 1px rgba(6, 8, 15, .1), 0 16px 16px 1px rgba(6, 8, 15, .1), 0 32px 32px 1px rgba(6, 8, 15, .1), inset 0 0 3px 0 #ffdd8f;
      color: #fff;
      text-shadow: 0 1px 3px #967302;
    }
  }

  .btn-secondary{
    background: linear-gradient(to right, #3356cd 0, #5471d5 15%, #5471d5 30%, #3356cd 55%, #3356cd 100%);
    background-position: 50% 0;
    background-size: 200%;
    box-shadow: 0 5px 10px 0 rgba(30, 52, 124, .1), inset 0 0 3px 0 #859ae1;
    color: #fff;

    &:hover{
      background-position: 0 0;
      box-shadow: 0 2px 2px 1px rgba(30, 52, 124, .1), 0 4px 4px 1px rgba(30, 52, 124, .1), 0 8px 8px 1px rgba(30, 52, 124, .1), 0 16px 16px 1px rgba(30, 52, 124, .1), 0 32px 32px 1px rgba(30, 52, 124, .1), inset 0 0 3px 0 #859ae1;
      color: #fff;
      text-shadow: 0 1px 3px #1e347c;
    }
  }

  .btn-3nd{
    color: #fff;
    background: linear-gradient(to right, #e32131 0, #e63846 15%, #e63846 30%, #e32131 55%, #e32131 100%);
    background-position: 50% 0;
    background-size: 200%;
    box-shadow: 0 5px 10px 0 rgba(140, 18, 28, .1), inset 0 0 3px 0 #e63846;

    &:hover{
      background-position: 0 0;
      box-shadow: 0 2px 2px 1px rgba(140, 18, 28, .1), 0 4px 4px 1px rgba(140, 18, 28, .1), 0 8px 8px 1px rgba(140, 18, 28, .1), 0 16px 16px 1px rgba(140, 18, 28, .1), 0 32px 32px 1px rgba(140, 18, 28, .1), inset 0 0 3px 0 #e63846;
      color: #fff;
      text-shadow: 0 1px 3px #8c121c;
    }
  }

  .btn-disabled{
    background: linear-gradient(to right, #5a5a5a 0, #4d4d4d 15%, #4d4d4d 30%, #5a5a5a 55%, #5a5a5a 100%);
    background-position: 50% 0;
    background-size: 200%;
    box-shadow: 0 5px 10px 0 rgba(71, 71, 71, .1), inset 0 0 3px 0 #5a5a5a;
    color: gray;
    border: none;
    outline: none;
  }

  .loader-custom-dots{
    width: 60px;
    aspect-ratio: 2;
    --_g: no-repeat radial-gradient(circle closest-side, ${theme.color.primary} 90%,#0000);
    background: 
      var(--_g) 0%   50%,
      var(--_g) 50%  50%,
      var(--_g) 100% 50%;
    background-size: calc(100%/3) 50%;
    animation: loader 1s infinite linear;

    ${media.md}{
      width: 45px;
    }

    @keyframes loader {
        20%{background-position:0%   0%, 50%  50%,100%  50%}
        40%{background-position:0% 100%, 50%   0%,100%  50%}
        60%{background-position:0%  50%, 50% 100%,100%   0%}
        80%{background-position:0%  50%, 50%  50%,100% 100%}
    }
      
  }

  .loader-custom-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #17916b;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;

    &.small{
      width: 33px;
      height: 33px;
      border-width: 3px;
    }

    &.dark{
      border: 4px solid #0d543e;
      border-bottom-color: transparent;
    }

    @keyframes rotation {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
    } 
  }


`;
