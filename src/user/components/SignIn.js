import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form'
import CircularProgress from '@material-ui/core/CircularProgress';

import StatusBar from '../../shared/components/UIElements/StatusBar'
import { useStore } from '../../shared/store/store';
import { useObserver } from 'mobx-react-lite';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    textTransform: "none",
    fontFamily: "Arial"
  }
}));

export default function SignIn({setSignInMode}) {
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm();
  const { auth } = useStore()

  const onSubmit = async ({email, password}) => {
    await auth.login(`${process.env.REACT_APP_API_URL}/api/users/signin`, email, password)
  }  

  return useObserver(() => (
    <Container component="main" maxWidth="xs">
      <StatusBar open={auth.openLoginError} setOpen={auth.setOpenLoginError} severity={"error"}>
        {auth.loginError}
      </StatusBar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={TextField}
            rules={{
                  required: "Email is required", 
                  pattern: {
                    value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/, 
                    message: "Enter a valid email address"
                }}}
            control={control}
            defaultValue=""
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
          <Controller
            as={TextField}
            rules={{required: "Password is required", minLength: {value: 8, message: "Password must be atleast 8 chars"}}}
            control={control}
            defaultValue=""
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={auth.isLoading}
          >
            {!auth.isLoading && "Sign In"}
            {auth.isLoading && <CircularProgress size={16}/>}
          </Button>
          <Grid container>
            <Grid item xs>
              <Button size="small" variant="text" color="primary" className={classes.button}>
                Forgot password?
              </Button>
            </Grid>
            <Grid item>
              <Button size="small" variant="text" color="primary" onClick={() => setSignInMode(false)} className={classes.button}>
                Don't have an account? Sign Up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  ));
}