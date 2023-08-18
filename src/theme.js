import { createTheme } from "@mui/material/styles";
import "./App.css";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#013d29",
    },
  },
});
const font = "'Barlow Condensed', sans-serif";

export const theme2 = createTheme({
  typography: {
    fontFamily: font,
  },
});
