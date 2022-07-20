import type { ReactNode } from "react";
import { css } from "@emotion/react";
import designTokens from "./design-tokens";

type TInputProps = {
  vars: Record<string, string>;
};

const getInputStyles = (props: TInputProps) => css`
  border: 1px solid ${props.vars[designTokens.borderColorForInput]};
  border-radius: ${props.vars[designTokens.borderRadiusForInput]};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const getCurrencyLabelStyles = (props: TInputProps) => css`
  border: 1px solid ${props.vars[designTokens.borderColorForInput]};
  border-right: 0;
  border-top-left-radius: ${props.vars.borderRadiusForInput};
  border-bottom-left-radius: ${props.vars.borderRadiusForInput};
`;

type TLabel = {
  id: string;
  children?: ReactNode;
  vars: Record<string, string>;
};

const CurrencyLabel = (props: TLabel) => (
  <label htmlFor={props.id} css={getCurrencyLabelStyles(props)}>
    {props.children}
  </label>
);

const MoneyInput = (props: TInputProps) => (
  <div
    css={css`
      width: 100%;
      position: relative;
      display: flex;
    `}
  >
    <CurrencyLabel id="money-input" vars={props.vars}>
      EUR
    </CurrencyLabel>
    <input
      id="money-input"
      value={20}
      css={getInputStyles(props)}
      onChange={() => {}}
    />
  </div>
);

export default MoneyInput;
