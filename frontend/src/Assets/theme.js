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
                  fontSize: '5rem',
                  fontWeight: 'bold',
                  color: primaryColor,
                  border: '3px solid',
                  borderColor: primaryColor,
                  padding: '1rem',
                  borderRadius: '1rem',
                  margin: '1rem',
                  shadow: '0px 0px 10px rgba(0, 0, 0, 1)',
                },
              },
            },
    },
  });

export default theme;