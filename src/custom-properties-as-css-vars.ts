export const themes = {
  default: {
    colorNeutral60: "hsl(0, 0%, 60%)",
    borderRadius6: "6px",
    borderRadiusForInput: "6px",
  },
} as const;

export default {
  colorNeutral60: "var(--color-neutral-60, hsl(0, 0%, 60%))",
  borderRadius6: "var(--border-radius-6, 6px)",
  borderRadiusForInput: "var(--border-radius-for-input, 6px)",
} as const;
