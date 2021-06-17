import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Logo from '../Assets/Img/Logos/logo.png';
import { FormControl, FormHelperText, Input, InputLabel, Link, Typography } from '@material-ui/core';
import { LoginService } from '../Services/AuthServices';
import { UserContext } from '../Contexts/UserContext';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [authError, setAuthError] = useState('')
  const userContext = useContext(UserContext)

  function handleSubmit(e){
    e.preventDefault();
    
    LoginService(email, password).then(response => {
        console.log(response)
        userContext.setData(response.data.data.name, "Bearer " + response.data.data.token)
        console.log(userContext)
        localStorage.setItem('token', "Bearer " + response.data.data.token)
        localStorage.setItem('username', response.data.data.username)
    }).catch(response => {
        setAuthError(response.response.data.message)
    })
  }

  function handleEmailChange(e){
    if(!/^(\w*@\w*\.\w{2,3})$/i.test(e.target.value)){
      setEmailError("Por favor, introduce un email válido")
    }else{
      setEmailError("")
    }
    setEmail(e.target.value)
  }

  function handlePasswordChange(e){
    if(!/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(e.target.value)){
      setPasswordError("Por favor, introduce una contraseña válida")
    }else{
      setPasswordError("")
    }
    setPassword(e.target.value)
  }

  const theme = createMuiTheme({
    palette: {
        primary: {main:'#faa980'}
    }
  });

  const useStyles = makeStyles({
    btn: {
      marginTop: "25px"
    },
    linksContainer: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "column"
    },
    loginForm: {
        display: "grid",
        width: "300px",
        "& img": {
            width: "80px",
            justifySelf: "center"
        }
    },
    loginFormContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "50px"
    }
  })

  const classes = useStyles()
  
  return (
    <div className={classes.loginFormContainer}>
      <form noValidate onSubmit={handleSubmit} className={classes.loginForm}>
        <Typography component="h1" variant="h5">Iniciar sesión</Typography>
        <MuiThemeProvider theme={theme}>
          <img src={Logo} className="logo" alt="Logo"/>
          <FormControl className={classes.formControl} margin="dense" variant="filled" error={emailError !== ""}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input 
              id="email" 
              value={email} 
              onChange={handleEmailChange}
              aria-describedby="email-error"/>
            <FormHelperText id="email-error">{emailError}</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} variant="filled" error={passwordError !== ""}>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <Input 
              type="password"
              id="password" 
              value={password} 
              onChange={handlePasswordChange}
              aria-describedby="password-error"/>
            <FormHelperText id="password-error">{passwordError}</FormHelperText>
          </FormControl>
          <FormControl error>
            <FormHelperText id="auth-error">{authError}</FormHelperText>
          </FormControl>
        </MuiThemeProvider>
        <div className={classes.linksContainer}>
          <Link href="/register">
            Registrarme
          </Link>
          <Link href="/register">
            He olvidado mi contraseña
          </Link>
        </div>
        <MuiThemeProvider theme={theme}>
          <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.btn}>
            Enviar
          </Button>
        </MuiThemeProvider>
      </form>
    </div>
  );
}