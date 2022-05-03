import { createTheme } from "@mui/material";
import { cyan, teal, pink } from "@mui/material/colors";

const primaryColor = cyan[700];
const secondaryColor = teal[900];
const accentColor = pink[900];

const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      info: {
        main: accentColor,
      },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { 
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                  
                },
              },
            },
    },
  });

export default theme;