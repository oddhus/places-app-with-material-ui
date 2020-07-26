import { createMuiTheme } from '@material-ui/core/styles'
import { red } from "@material-ui/core/colors";

const lightGreen = "#9ccc65"
const amber = "#ffca28"
const grey = "#868686"

const theme = createMuiTheme({
  palette: {
    common: {
      lightGreen,
      amber
    },
    primary: {
      light: '#cfff95',
      main: '#9CCC65',
      dark: '#6b9b37',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fffd61',
      main: '#FFCA28',
      dark: '#c79a00',
      contrastText: '#000',
    },
    error: {
      main: red.A400
    },
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem"
    },
    h2: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: `${lightGreen}`,
      lineHeight: 1.5
    },
    h3: {
      fontFamily: "Pacifico",
      fontSize: "2.5rem",
      color: lightGreen
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      color: lightGreen,
      fontWeight: 700
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: grey
    },
    subtitle2: {
      color: "white",
      fontSize: "1.25rem",
      fontWeight: 300
    },
    body1: {
      color: grey,
      fontWeight: 300,
      fontSize: "1.25rem"
    },
    overrides: {
      MuiInputLabel: {
        root: {
          color: lightGreen,
          fontSize: "1rem"
        }
      },
      MuiInput: {
        root: {
          color: grey,
          fontWeight: 300
        },
        underline: {
          "&:before": {
            borderBottom: `2px solid ${lightGreen}`
          },
          "&:hover:not($disabled):not($focused):not($error):before": {
            borderBottom: `2px solid ${lightGreen}`
          }
        }
      }
    }
  }
})

export default theme