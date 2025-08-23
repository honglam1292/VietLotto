import styled from "@emotion/styled";

export const LayoutCenterStyle = styled.div`
  opacity: 1;
  transition: 1s;
  padding-top: 20px;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 20px;
  font-size: 14px;
  text-align: left;
`;

export const MainContent = styled.div`
  width: 926px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar{
    display: none;
  }
`;
