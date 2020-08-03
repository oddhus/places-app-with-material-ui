import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios'

import { useAuth } from '../../shared/context/auth-context';
import StatusBar from '../../shared/components/UIElements/StatusBar'


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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    textTransform: "none",
    fontFamily: "Arial"
  }
}));

export default function SignUp({setSignInMode}) {
  const classes = useStyles();
  const { control, handleSubmit, errors } = useForm();
  const [dbError, setDbError] = useState("")
  const [openError, setOpenError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const onSubmit = async ({firstName, lastName, email, password}) => {
    setOpenError(false)
    setIsLoading(true)
    try {
      await axios.post('http://localhost:5000/api/users/signup',{
        name: `${firstName} ${lastName}`,
        email,
        password
      })
      setIsLoading(false)
      login({newUser: true})
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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                as={TextField}
                rules={{required: "FirstName is required", minLength: {value: 2, message: "Firstname must be atleast 2 chars"}}}
                control={control}
                defaultValue=""
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                as={TextField}
                rules={{required: "Lastname is required", minLength: {value: 2, message: "Lastname must be atleast 2 chars"}}}
                control={control}
                defaultValue=""
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={TextField}
                rules={{
                  required: "Email is required", 
                  pattern: {
                    value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 
                    message: "Enter a valid email address"
                }}}
                control={control}
                defaultValue=""
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={TextField}
                rules={{required: "Password is required", minLength: {value: 8, message: "Password must be atleast 8 chars"}}}
                control={control}
                defaultValue=""
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isLoading}
          >
            {!isLoading && "Sign Up"}
            {isLoading && <CircularProgress size={16}/>}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button size="small" variant="text" color="primary" onClick={() => setSignInMode(true)} className={classes.button}>
                Already have an account? Sign In
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}