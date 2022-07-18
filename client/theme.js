import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { grey, green, brown } from "@material-ui/core/colors";

const white = grey[50];
const black = grey[900];

const theme = createTheme({
  palette: {
    primary: {
      main: brown[500],
    },
    secondary: {
      main: green[700],
      contrastText: green[700],
    },
  },
});

export const useFrontEndStyles = makeStyles((theme) => ({
  cHeader: {
    color: black,
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "Arial",
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
  singleEvHead: {
    color: black,
    background: "#F0965B",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Arial",
    align: "justify",
  },
  singleEv: {
    color: black,
    background: "#F0965B",
    margin: "20px",
    fontSize: 15,
    fontFamily: "Arial",
    align: "justify",
  },
  myEventsStyle: {
    color: black,
    background: "#F0965B",
    margin: "20px",
    fontSize: 20,
    fontFamily: "Arial",
    align: "justify",
  },
}));

export const useNavStyles = makeStyles((theme) => ({
  navButton: {
    margin: "15px",
    display: "flex",
    background: white,
    fontColor: green[700],
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: green[700],
  },
}));

export default theme;

