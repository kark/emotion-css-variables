import ThemeProvider from "./theme-provider";
import customProperties from "./custom-properties-as-css-vars";
import customPropertiesHardcoded from "./custom-properties-hardcoded";
import MoneyInput from "./money-input";

function App() {
  return (
    <>
      <ThemeProvider>
        <p>MoneyInput - css vars</p>
        <MoneyInput vars={customProperties} />
      </ThemeProvider>

      <p>MoneyInput - hardcoded</p>
      <MoneyInput vars={customPropertiesHardcoded} />
    </>
  );
}

export default App;
