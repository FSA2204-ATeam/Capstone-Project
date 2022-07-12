import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/styles";

const theme = createTheme({
  components: {
    MuiTypography: {
      root: {
        fontFamily: "Roboto",
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
      ],
    },
  }
});

export const useFrontEndStyles = makeStyles((theme) => ({
  root: {
    display: "flex grow",
    maxHeight: "60%",
    minHeight: "60%",
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
    flexGrow: 1,
    // color: green,
    // color: "inherit",
  },
  appBar: {
    height: 60,
    color: "#8FA01F",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      margin: 0
    },
    color: "#3D550C",
    backgroundColor: "#8FA01F",
  }
}));

export default theme;
