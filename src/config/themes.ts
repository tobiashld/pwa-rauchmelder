import { ThemeOptions } from "@mui/material/styles";

const light: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#2c4e7f",
    },
    info: {
      main: "#2c7f6b",
    },
  },
};

const dark: ThemeOptions = {
  palette: {
    mode: "dark",
    background: {
      default: "#202124",
    },
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#2c4e7f",
    },
    info: {
      main: "#2c7f6b",
    },
  },
};

const palette = { light: light, dark: dark };

export default palette;
