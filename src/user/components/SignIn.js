import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

import StatusBar from '../../shared/components/UIElements/StatusBar'
import { useAuth } from '../../shared/context/auth-context';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  const [dbError, setDbError] = useState("")
  const [openError, setOpenError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const onSubmit = async ({email, password}) => {
    setOpenError(false)
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/users/signin',{
        email,
        password
      })
      setIsLoading(false)
      if(response.statusText === 'OK'){
        login()
      }
    } catch (error) {
      setIsLoading(false)
      setDbError(error.response.data.message)
      setOpenError(true)
    }
  }  

  return (
    <Container component="main" maxWidth="xs">
      <StatusBar open={openError} setOpen={setOpenError} severity={"error"}>
        {dbError}
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
            rules={{required: "Email is required"}}
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
            disabled={isLoading}
          >
            {!isLoading && "Sign In"}
            {isLoading && <CircularProgress size={16}/>}
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}