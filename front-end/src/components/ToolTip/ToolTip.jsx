import { ToolTipText, ToolTipWrapper } from "./ToolTip";

const ToolTip = ({ children, hoverText }) => (
  <ToolTipWrapper>
    {children}
    <ToolTipText>{hoverText}</ToolTipText>
  </ToolTipWrapper>
);

export default ToolTip;
