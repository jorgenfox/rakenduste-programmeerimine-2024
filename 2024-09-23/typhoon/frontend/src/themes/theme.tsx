import { createTheme } from "@mui/material/styles";
import { deepPurple, blue } from "@mui/material/colors";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: blue[500],
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
    },
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
