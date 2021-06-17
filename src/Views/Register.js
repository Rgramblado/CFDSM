import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Logo from '../Assets/Img/Logos/logo.png';
import { FormControl, FormHelperText, Input, InputLabel, Link, Typography } from '@material-ui/core';
import { RegisterService } from '../Services/AuthServices';
import { UserContext } from '../Contexts/UserContext';

export default function Login() {
    const [email, setEmail] = useState('rgramblado3@gmail.com')
    const [password, setPassword] = useState('Pass123.,')
    const [passwordConfirmation, setPasswordConfirmation] = useState('Pass123.,')
    const [username, setUsername] = useState('rgramblado3')
    const [name, setName] = useState('Rafael')
    const [surname, setSurname] = useState('Gonzalez')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordConfirmationError, setPasswordConfirmationError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [nameError, setNameError] = useState('')
    const [surnameError, setSurnameError] = useState('')

    const [authError, setAuthError] = useState({})
    const userContext = useContext(UserContext)

    function handleSubmit(e){
        e.preventDefault();
        
        RegisterService(username, email, password, passwordConfirmation, name, surname).then(response => {
            console.log(response)
        }).catch(response => {
            Object.keys(response.response.data.errors).map((key) => {
              switch (key) {
                case "email":
                  setEmailError(response.response.data.errors[key][0])
                  break;
                case "username":
                  setUsernameError(response.response.data.errors[key][0])
                  break;
                case "password":
                  setPasswordError(response.response.data.errors[key][0])
                  break;
                case "name":
                  setNameError(response.response.data.errors[key][0])
                  break;
                case "surname":
                  setSurname(response.response.data.errors[key][0])
                  break;
                default:
                  break;
              }
            })

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

    function handlePasswordConfirmationChange(e){
        if(!e.target.value === password){
            setPasswordConfirmationError("Las contraseñas no coinciden")
        }else{
            setPasswordConfirmationError("")
        }
        setPasswordConfirmation(e.target.value)
    }

    function handleUsernameChange(e){
        if(!/^[\w$&]{6,20}$/.test(e.target.value)){
          setUsernameError("Nombre de usuario inválido. Debe contener entre 6 y 20 caracteres. Se permiten letras, números y los símbolos _ $ & . ")
        }else{
          setUsernameError("")
        }
        setUsername(e.target.value)
      }
    
    function handleNameChange(e){
        if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(e.target.value)){
            setNameError("Introduce un nombre válido")
        }else{
            setNameError("")
        }
        setName(e.target.value)
    }
    function handleSurnameChange(e){
        if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(e.target.value)){
            setSurnameError("Introduce un nombre válido")
        }else{
            setSurnameError("")
        }
        setSurname(e.target.value)
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
          <FormControl className={classes.formControl} margin="dense" variant="filled" error={nameError !== ""}>
            <InputLabel htmlFor="name">Nombre</InputLabel>
            <Input 
              id="name" 
              value={name} 
              onChange={handleNameChange}
              aria-describedby="name-error"/>
            <FormHelperText id="name-error">{nameError}</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} margin="dense" variant="filled" error={surnameError !== ""}>
            <InputLabel htmlFor="name">Apellidos</InputLabel>
            <Input 
              id="surname" 
              value={surname} 
              onChange={handleSurnameChange}
              aria-describedby="surname-error"/>
            <FormHelperText id="surname-error">{surnameError}</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl} margin="dense" variant="filled" error={usernameError !== ""}>
            <InputLabel htmlFor="name">Usuario</InputLabel>
            <Input 
              id="username" 
              value={username} 
              onChange={handleUsernameChange}
              aria-describedby="username-error"/>
            <FormHelperText id="username-error">{usernameError}</FormHelperText>
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
          <FormControl className={classes.formControl} variant="filled" error={passwordConfirmationError !== ""}>
            <InputLabel htmlFor="password_confirmation">Repetir contraseña</InputLabel>
            <Input 
              type="password"
              id="password_confirmation" 
              value={passwordConfirmation} 
              onChange={handlePasswordConfirmationChange}
              aria-describedby="password-confirmation-error"/>
            <FormHelperText id="password-confirmation-error">{passwordConfirmationError}</FormHelperText>
          </FormControl>
          <FormControl error>
            {Object.keys(authError).map((key) => {return(
              <FormHelperText>
                {authError[key]}
              </FormHelperText>
            )})}
          </FormControl>
        </MuiThemeProvider>
            <div className={classes.linksContainer}>
            <Link href="/login">
                ¿Ya tienes una cuenta? Inicia sesión
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