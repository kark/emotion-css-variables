import type { ReactNode } from "react";
import { css } from "@emotion/react";
import designTokens from "./design-tokens";

type TInputProps = {
  isDisabled?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  readOnly?: boolean;
  vars: Record<string, string>;
};

const getInputBorderColor = (props: TInputProps) => {
  if (props.isDisabled || props.disabled) {
    return props.vars[designTokens.borderColorForInputWhenDisabled];
  }
  if (props.hasError) {
    return props.vars[designTokens.borderColorForInputWhenError];
  }
  if (props.hasWarning) {
    return props.vars[designTokens.borderColorForInputWhenWarning];
  }
  if (props.isReadOnly || props.readOnly) {
    return props.vars[designTokens.borderColorForInputWhenReadonly];
  }
  return props.vars[designTokens.borderColorForInput];
};

const getInputFontColor = (props: TInputProps) => {
  if (props.isDisabled || props.disabled) {
    return props.vars[designTokens.fontColorForInputWhenDisabled];
  }
  if (props.hasError) {
    return props.vars[designTokens.fontColorForInputWhenError];
  }
  if (props.hasWarning) {
    return props.vars[designTokens.fontColorForInputWhenWarning];
  }
  if (props.isReadOnly || props.readOnly) {
    return props.vars[designTokens.fontColorForInputWhenReadonly];
  }
  return props.vars[designTokens.fontColorForInput];
};

const getInputStyles = (props: TInputProps) => css`
  appearance: none;
  background-color: ${props.isDisabled || props.disabled
    ? props.vars[designTokens.backgroundColorForInputWhenDisabled]
    : props.vars[designTokens.backgroundColorForInput]};
  border: 1px solid ${getInputBorderColor(props)};
  border-radius: ${props.vars[designTokens.borderRadiusForInput]};
  box-sizing: border-box;
  color: ${getInputFontColor(props)};
  cursor: ${props.isDisabled ? "not-allowed" : "default"};
  display: flex;
  flex: 1;
  font-family: inherit;
  font-size: ${props.vars[designTokens.fontSizeForInput]};
  height: ${props.vars.sizeHeightInput};
  min-height: ${props.vars.sizeHeightInput};
  outline: none;
  overflow: hidden;
  padding: 0 ${props.vars.spacingS};
  transition: border-color ${props.vars.transitionStandard},
    background-color ${props.vars.transitionStandard},
    color ${props.vars.transitionStandard},
    box-shadow ${props.vars.transitionStandard};
  width: 100%;

  &::placeholder {
    color: ${props.vars[designTokens.placeholderFontColorForInput]};
  }
  :active,
  :focus,
  :hover:not(:disabled):not(:read-only) {
    border-color: ${props.vars[designTokens.borderColorForInputWhenFocused]};
  }
  :focus {
    box-shadow: inset 0 0 0 2px
      ${props.vars[designTokens.borderColorForInputWhenFocused]};
  }

  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 0;
`;

const getCurrencyLabelStyles = (props: TInputProps) => css`
  display: flex;
  color: ${props.vars.fontColorForInputWhenDisabled};
  background-color: ${props.vars.backgroundColorForInputWhenDisabled};
  border-top-left-radius: ${props.vars.borderRadiusForInput};
  border-bottom-left-radius: ${props.vars.borderRadiusForInput};
  border: 1px solid ${props.vars.borderColorForInputWhenDisabled};
  border-right: 0;
  padding: 0 ${props.vars.spacingS};
  align-items: center;
  font-size: ${props.vars.fontSizeForInput};
  box-sizing: border-box;
`;

type TLabel = {
  id: string;
  children?: ReactNode;
  isDisabled?: boolean;
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
      font-family: inherit;
      width: 100%;
      position: relative;
      display: flex;
    `}
  >
    <CurrencyLabel
      id="money-input"
      isDisabled={props.isDisabled}
      vars={props.vars}
    >
      EUR
    </CurrencyLabel>
    <input id="money-input" value={20} css={getInputStyles(props)} />
  </div>
);

export default MoneyInput;
