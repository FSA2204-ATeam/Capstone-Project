import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { grey, green, brown } from "@material-ui/core/colors";

const white = grey[50];
const black = grey[900];

const theme = createTheme({
  palette: {
    primary: {
      main: "#F9DB53",
      contrastText: black,
    },
    secondary: {
      main: "#F9DB53",
      contrastText: black,
    },
  },
});

export const useFrontEndStyles = makeStyles((theme) => ({
  cHeader: {
    color: black,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Shrikhand",
  },
  typography: {
    color: black,
    fontSize: 15,
    fontWeight: "italic",
    fontFamily: "Arial",
    align: "center",
  },
  links: {
    display: "flex",
    fontSize: 15,
    fontColor: black,
    backgroundColor: brown,
  },
  singleEv: {
    color: black,
    background: white,
    fontWeight: "italic",
    margin: "15px",
    fontSize: 15,
    fontFamily: "Arial",
    align: "center",
  },
  myEventsStyle: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Arial",
    align: "justify",
  },
}));

export default theme;

