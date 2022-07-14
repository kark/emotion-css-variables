import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { css } from "@emotion/react";
import customProperties from "./custom-properties";
import designTokens from "./design-tokens";

type TInputProps = {
  isDisabled?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  hasWarning?: boolean;
  isReadOnly?: boolean;
  readOnly?: boolean;
};

const getInputBorderColor = (
  vars: Record<string, string>,
  props: TInputProps
) => {
  if (props.isDisabled || props.disabled) {
    return vars[designTokens.borderColorForInputWhenDisabled];
  }
  if (props.hasError) {
    return vars[designTokens.borderColorForInputWhenError];
  }
  if (props.hasWarning) {
    return vars[designTokens.borderColorForInputWhenWarning];
  }
  if (props.isReadOnly || props.readOnly) {
    return vars[designTokens.borderColorForInputWhenReadonly];
  }
  return vars[designTokens.borderColorForInput];
};

const getInputFontColor = (
  vars: Record<string, string>,
  props: TInputProps
) => {
  if (props.isDisabled || props.disabled) {
    return vars[designTokens.fontColorForInputWhenDisabled];
  }
  if (props.hasError) {
    return vars[designTokens.fontColorForInputWhenError];
  }
  if (props.hasWarning) {
    return vars[designTokens.fontColorForInputWhenWarning];
  }
  if (props.isReadOnly || props.readOnly) {
    return vars[designTokens.fontColorForInputWhenReadonly];
  }
  return vars[designTokens.fontColorForInput];
};

const getInputStyles = (props: TInputProps) => {
  return css`
    appearance: none;
    background-color: ${props.isDisabled || props.disabled
      ? customProperties[designTokens.backgroundColorForInputWhenDisabled]
      : customProperties[designTokens.backgroundColorForInput]};
    border: 1px solid ${getInputBorderColor(customProperties, props)};
    border-radius: ${customProperties[designTokens.borderRadiusForInput]};
    box-sizing: border-box;
    color: ${getInputFontColor(customProperties, props)};
    cursor: ${props.isDisabled ? "not-allowed" : "default"};
    display: flex;
    flex: 1;
    font-family: inherit;
    font-size: ${customProperties[designTokens.fontSizeForInput]};
    height: ${customProperties.sizeHeightInput};
    min-height: ${customProperties.sizeHeightInput};
    outline: none;
    overflow: hidden;
    padding: 0 ${customProperties.spacingS};
    transition: border-color ${customProperties.transitionStandard},
      background-color ${customProperties.transitionStandard},
      color ${customProperties.transitionStandard},
      box-shadow ${customProperties.transitionStandard};
    width: 100%;

    &::placeholder {
      color: ${customProperties[designTokens.placeholderFontColorForInput]};
    }
    :active,
    :focus,
    :hover:not(:disabled):not(:read-only) {
      border-color: ${customProperties[
        designTokens.borderColorForInputWhenFocused
      ]};
    }
    :focus {
      box-shadow: inset 0 0 0 2px
        ${customProperties[designTokens.borderColorForInputWhenFocused]};
    }

    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: 0;
  `;
};

type TLabel = {
  id: string;
  children?: ReactNode;
  isDisabled?: boolean;
};
const getCurrencyLabelStyles = () => css`
  display: flex;
  color: ${customProperties.fontColorForInputWhenDisabled};
  background-color: ${customProperties.backgroundColorForInputWhenDisabled};
  border-top-left-radius: ${customProperties.borderRadiusForInput};
  border-bottom-left-radius: ${customProperties.borderRadiusForInput};
  border: 1px ${customProperties.borderColorForInputWhenDisabled} solid;
  border-right: 0;
  padding: 0 ${customProperties.spacingS};
  align-items: center;
  font-size: ${customProperties.fontSizeForInput};
  box-sizing: border-box;
`;

const CurrencyLabel = (props: TLabel) => (
  <label htmlFor={props.id} css={getCurrencyLabelStyles()}>
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
    <CurrencyLabel id="money-input" isDisabled={props.isDisabled}>
      EUR
    </CurrencyLabel>
    <input id="money-input" value={20} css={getInputStyles(props)} />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <MoneyInput isDisabled />
    </ThemeProvider>
  );
}

export default App;
