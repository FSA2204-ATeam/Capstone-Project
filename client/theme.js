import { createTheme } from "@material-ui/core/styles";
import {
  amber,
} from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

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
    maxHeight: "60%",
    minHeight: "60%",
    // maxWidth: 100,
    // minWidth: 150,
    color: "#808080",
  },
  p: {
    display: "flex grow",
    maxHeight: "60%",
    minHeight: "60%",
    maxWidth: 100,
    minWidth: 150,
    color: "#808080",
    fontSize: 10,
    fontFamily: "Arial",
  },
  popover: {
    textAlign: "center",
    display: "flex grow",
    maxHeight: "60%",
    minHeight: "60%",
    maxWidth: 200,
    minWidth: 200,
    color: "#000000",
    fontSize: 10,
    fontFamily: "Arial",
  },
}));

export const useNavStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 4,
    marginBottom: 25,
    backgroundColor: "#8FA01F"
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
    color: "#3D550C",
    backgroundColor: "#8FA01F"
  }
}));

export default theme;
