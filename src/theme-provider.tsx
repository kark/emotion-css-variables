import {
  createContext,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useContext,
  type ReactNode,
  type LegacyRef,
} from "react";
import kebabCase from "lodash/kebabCase";
import { themes } from "./custom-properties-as-css-vars";

type ThemeName = keyof typeof themes;

const ThemeContext = createContext({});

const toVars = (obj: Record<string, string>) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [`--${kebabCase(key)}`, value])
  );

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = (props: ThemeProviderProps) => {
  const root = useRef<HTMLDivElement>();
  const [theme] = useState<ThemeName>("default");

  useLayoutEffect(() => {
    const vars = toVars(themes[theme]);
    Object.entries(vars).forEach(([key, value]) => {
      root.current?.style.setProperty(key, value);
    });
  }, [theme]);

  const value = useMemo(() => {
    return { theme };
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <div ref={root as LegacyRef<HTMLDivElement>}>{props.children}</div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
