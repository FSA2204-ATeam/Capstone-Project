import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { white, grey, black, green, brown, purple, blue} from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
      contrastText: black
    },
  },
});


export const useFrontEndStyles = makeStyles((theme) => ({
  cHeader: {
    color: black,
    fontSize: 20,
    fontFamily: 'Arial',
  },
  h4: {
    textAlign: 'center',
    display: 'flex grow',
    maxHeight: '100%',
    minHeight: '100%',
    maxWidth: 500,
    minWidth: 200,
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Arial',
  },
}));

export const useNavStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 4,
    marginBottom: 25,
    backgroundColor: '#FFFFFF',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: '#3D550C',
    backgroundColor: '#FFFFFF',
  },
}));

export default theme;
