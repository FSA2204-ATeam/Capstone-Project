import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { registration } from '../store';
import { useDispatch } from "react-redux";

const defaultValues = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  email: ""
};

const PopUpWindowSignUp = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registration(formValues, 'signup'))
    console.log(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justify="center" direction="column">
      <Grid item>
          <TextField
            id="firstname-input"
            name="firstname"
            label="Firstname"
            type="text"
            variant="outlined"
            value={formValues.firstname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="lastname-input"
            name="lastname"
            label="Lastname"
            type="text"
            variant="outlined"
            value={formValues.lastname}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="username-input"
            name="username"
            label="Username"
            type="text"
            variant="outlined"
            value={formValues.username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="password-input"
            name="password"
            label="Password"
            type="text"
            variant="outlined"
            value={formValues.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email-input"
            name="email"
            label="Email"
            type="text"
            variant="outlined"
            value={formValues.email}
            onChange={handleChange}
          />
        </Grid>
        <Button href="/home" variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
        {/* <div class='success-message'>Success! Thank you for registering</div> */}
      </Grid>
    </form>
  );
};
export default PopUpWindowSignUp;










// import React, { useState, useEffect } from "react";
// import { makeStyles } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import { useForm, Controller } from 'react-hook-form';
// import { registration } from '../store';
// import { useDispatch } from "react-redux";

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: theme.spacing(2),

//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '300px',
//     },
//     '& .MuiButtonBase-root': {
//       margin: theme.spacing(2),
//     },
//   },
// }));

// const PopUpWindowSignUp = ({ handleClose }) => {
//   const classes = useStyles();

//   const { handleSubmit, control } = useForm();

//   const onSubmit = event => {
//     console.log(event);
//   };

//   return (
//     <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         name="firstname"
//         control={control}
//         defaultValue=""
//         render={({ field: { onChange, formValues }, fieldState: { error } }) => (
//           <TextField
//             label="First Name"
//             variant="filled"
//             value={formValues}
//             onChange={onChange}
//             error={!!error}
//             helperText={error ? error.message : null}
//           />
//         )}
//         rules={{ required: 'First name required' }}
//       />
//       <Controller
//         name="lastname"
//         control={control}
//         defaultValue=""
//         render={({ field: { onChange, formValues }, fieldState: { error } }) => (
//           <TextField
//             label="Last Name"
//             variant="filled"
//             value={formValues}
//             onChange={onChange}
//             error={!!error}
//             helperText={error ? error.message : null}
//           />
//         )}
//         rules={{ required: 'Last name required' }}
//       />
//       <Controller
//         name="userame"
//         control={control}
//         defaultValue=""
//         render={({ field: { onChange, formValues }, fieldState: { error } }) => (
//           <TextField
//             label="Username"
//             variant="filled"
//             value={formValues}
//             onChange={onChange}
//             error={!!error}
//             helperText={error ? error.message : null}
//           />
//         )}
//         rules={{ required: 'Username required' }}
//       />
//       <Controller
//         name="email"
//         control={control}
//         defaultValue=""
//         render={({ field: { onChange, formValues }, fieldState: { error } }) => (
//           <TextField
//             label="email"
//             variant="filled"
//             value={formValues}
//             onChange={onChange}
//             error={!!error}
//             helperText={error ? error.message : null}
//             type="email"
//           />
//         )}
//         rules={{ required: 'Email required' }}
//       />
//       <Controller
//         name="password"
//         control={control}
//         defaultValue=""
//         render={({ field: { onChange, formValues }, fieldState: { error } }) => (
//           <TextField
//             label="Password"
//             variant="filled"
//             value={formValues}
//             onChange={onChange}
//             error={!!error}
//             helperText={error ? error.message : null}
//             type="password"
//           />
//         )}
//         rules={{ required: 'Password required' }}
//       />
//       <div>
//         <Button variant="contained" onClick={handleClose}>
//           Cancel
//         </Button>
//         <Button type="submit" variant="contained" color="primary">
//           Signup
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default PopUpWindowSignUp;