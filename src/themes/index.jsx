// ThemeCustomization.js
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  darken,
  lighten,
  getContrastRatio,
} from "@mui/material/styles";
import PropTypes from "prop-types";

const ThemeCustomization = ({ children }) => {
  const theme = createTheme({
    palette: {
      mode: "light",
      // primary: {
      //   main: darken("#ffffff", 0.2),
      // },
      // secondary: {
      //   main: lighten("#ff4081", 0.2), // example usage of lighten
      // },
      // background: {
      //   default: "#121212",
      //   paper: "#1d1d1d",
      // },
      // text: {
      //   primary: "#ffffff",
      //   secondary: "#bbbbbb",
      //   contrastText:
      //     getContrastRatio("#ffffff", "#121212") > 3 ? "#ffffff" : "#000000",
      // },
    },
    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      h1: {
        fontSize: "2.5rem",
        fontWeight: 300,
      },
      h2: {
        fontSize: "2rem",
        fontWeight: 300,
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.5,
      },
      button: {
        textTransform: "none",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    shape: {
      borderRadius: 2,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
        },
      },
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

ThemeCustomization.propTypes = {
  children: PropTypes.node,
};

export default ThemeCustomization;
