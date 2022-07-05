import { createTheme } from "@material-ui/core/styles";
import {
  black,
  deepPurple,
  amber,
  brown,
  orange,
} from "@material-ui/core/colors";
import { alpha, makeStyles } from "@material-ui/core/styles";

const theme = createTheme({
  components: {
    MuiTypography: {
      root: {
        fontFamily: "Emilys Candy",
      },
      variants: [
        {
          props: {
            variant: "body2",
          },
          style: {
            fontSize: 11,
          },
        },
        {
          props: {
            variant: "button",
          },
          style: {
            fontSize: 9,
          },
        },
        {
          props: {
            variant: "body1",
          },
          style: {
            fontSize: 25,
          },
        },
      ],
    },
  },
  palette: {
    primary: {
      main: "#F5DADF",
    },

    secondary: {
      main: "#000000",
      contrastText: amber[900],
    },
  },
});

theme.overrides = {
  MuiButton: {
    root: {
      borderRadius: 15,
      textTransform: "none",
      fontSize: 20,
      fontFamily: "Emilys Candy",
    },
    containedPrimary: {
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
      },
    },
    containedSecondary: {
      fontWeight: 700,
    },
  },
};

export const useFrontEndStyles = makeStyles((theme) => ({
  root: {
    display: "flex grow",
    maxHeight: "100%",
    minHeight: "100%",
    maxWidth: 300,
    minWidth: 200,
    color: "#808080",
  },
  p: {
    display: "flex grow",
    maxHeight: "100%",
    minHeight: "100%",
    maxWidth: 300,
    minWidth: 200,
    color: "#808080",
    fontSize: 20,
    fontFamily: "Arial",
  },
  h4: {
    display: "flex grow",
    maxHeight: "100%",
    minHeight: "100%",
    maxWidth: 500,
    minWidth: 200,
    color: "#000000",
    fontSize: 20,
    fontFamily: "Arial",
  },
}));

export const useNavStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 4,
    marginBottom: 25,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  }
}));

export default theme;
