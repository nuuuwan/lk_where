import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Fira Mono", monospace',
    fontSize: 14,
    body1: {
      fontSize: 14,
      fontFamily: '"Fira Mono", monospace',
      "@media (max-width: 600px)": {
        fontSize: 12,
      },
    },
    body2: {
      fontSize: 14,
      fontFamily: '"Fira Mono", monospace',
      "@media (max-width: 600px)": {
        fontSize: 12,
      },
    },
    h1: {
      fontFamily: '"Fira Mono", monospace',
      "@media (max-width: 600px)": {
        fontSize: "1.5rem",
      },
    },
    h2: {
      fontFamily: '"Fira Mono", monospace',
      "@media (max-width: 600px)": {
        fontSize: "1.25rem",
      },
    },
    h3: {
      fontFamily: '"Fira Mono", monospace',
      "@media (max-width: 600px)": {
        fontSize: "1.1rem",
      },
    },
    h4: {
      fontFamily: '"Fira Mono", monospace',
    },
    h5: {
      fontFamily: '"Fira Mono", monospace',
    },
    h6: {
      fontFamily: '"Fira Mono", monospace',
    },
    button: {
      fontFamily: '"Fira Mono", monospace',
      "@media (max-width: 600px)": {
        fontSize: "0.75rem",
      },
    },
  },
});

export default theme;
