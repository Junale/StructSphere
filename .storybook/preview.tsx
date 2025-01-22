/* eslint-disable max-lines */
import type { Preview } from "@storybook/react";
import "../src/index.css";
import React, { useEffect } from "react";

// Custom hook to toggle Tailwind's "dark" class based on background selection
const withTailwindDarkMode = (Story, context) => {

  const backgrounds = context.globals.backgrounds;
  useEffect(() => {
    const isDark = backgrounds?.value === "#333333";
    if (isDark)
      document.documentElement.classList.add("dark"); // Add dark class for Tailwind
    else
      document.documentElement.classList.remove("dark"); // Remove dark class

  }, [backgrounds]);

  return <Story {...context} />;
};

// Custom viewpoints for TailwindCSS breakpoints
const customViewports = {
  xs: {
    name: "Extra Small - 320px",
    styles: {
      width: "320px",
      height: "100%",
    },
  },
  sm: {
    name: "Small - 640px",
    styles: {
      width: "640px",
      height: "100%",
    },
  },
  md: {
    name: "Medium - 768px",
    styles: {
      width: "768px",
      height: "100%",
    },
  },
  lg: {
    name: "Large - 1024px",
    styles: {
      width: "1024px",
      height: "100%",
    },
  },
  xl: {
    name: "Extra Large - 1280px",
    styles: {
      width: "1280px",
      height: "100%",
    },
  },
  xxl: {
    name: "Extra Extra Large - 1536px",
    styles: {
      width: "1536px",
      height: "100%",
    },
  },
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f8f8f8" },
        { name: "dark", value: "#333333" },
      ],
    },
    viewport: {
      viewports: customViewports,
      defaultViewport: "lg",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      // The `a` and `b` arguments in this function have a type of `import('@storybook/types').IndexEntry`. Remember that the function is executed in a JavaScript environment, so use JSDoc for IntelliSense to introspect it.
      storySort: (a, b) => {
        // Prioritize docs stories
        if (a.id.includes("docs") && !b.id.includes("docs"))
          return -1;

        if (!a.id.includes("docs") && b.id.includes("docs"))
          return 1;

        // If both or neither are docs, sort alphabetically
        return a.id === b.id ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true });
      },
    },
  },
  decorators: [withTailwindDarkMode],
  tags: ["autodocs"],
};

export default preview;