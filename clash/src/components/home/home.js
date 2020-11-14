import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/images/minion.png";
import { Link, Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { SignInCognito, SignUpCognito, ConfirmRegistration, ForgotPassword, ConfirmPassword } from "../../services/cognito.service";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  heroVideoWrapper: {
    position: "fixed",
  },
  image: {
    backgroundImage:
      "url(https://lolstatic-a.akamaihd.net/frontpage/apps/prod/clash-2018/es_MX/a46e742ae82f9d4f9db8e34ba57873e513e727b7/assets/static/img/hero-video-overlay.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "opacity .35s",
    opacity: 0.8,
    textAlign: 'center',
  },
  videosize: {
    position: "absolute",
    zIndex: -1,
    top: 0,
    left: "-15%",
    height: "100vh",
  },
  gridContainer: {
    position: "relative",
    display: "flex",
  },
  textLogo: {
    width: '60%',
    position: 'relative',
    marginTop: '23%',
    display: 'inline-block',
  },
  svgLogo:{
    position: 'relative!important',
    width: '100%',
    zIndex: 2,
  },
  st0:{
    fill: '#0c141d',
    stroke: '#d1a856',
    strokeWidth: .25,
    strokeMiterlimit: 10,
  },
  paper: {
    margin: theme.spacing(4, 14),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    width: "-webkit-fill-available",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    display: "inherit",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  success: {
    backgroundColor: "#ace0ac",
    color: "#348c34",
    textAlign: 'center',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  error: {
    backgroundColor: "#ef9a9a",
    color: "brown",
    textAlign: 'center',
    padding: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  barProgress: {
    textAlign: 'center',
    margin: theme.spacing(2),
  },
  spaceTop: {
    marginTop: theme.spacing(2),
  }
}));

const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link
          color="inherit"
          to="https://github.com/BMac9715/ClashTeamWebPage.git"
        >
          Clash Team
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
};
  
const Home = props => {
  const classes = useStyles();

  let match = useRouteMatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [cognitoUser, setCognitoUser] = useState('');

  const SignIn = event => {
    event.preventDefault();

    setMessage(<CustomCircularProgress/>);

    setTimeout(() => {
      SignInCognito(email, password)
      .then(data => {
        console.log(data);
        setMessage(
          <div className={classes.success}>
            <span>Autenticación correcta</span>
          </div>
        );
        clearInterval(this); 

        setTimeout(() => {
          setMessage(null);
          clearInterval(this);
          props.history.push(`/dashboard`);
        }, 1500); 
      })
      .catch(err => { 
        setMessage(
          <div className={classes.error}>
            <span>{err.message}</span>
          </div>
        );
        clearInterval(this);   
      });
    }, 1000);
  }

  const SignUp = event => {
    event.preventDefault();

    setMessage(<CustomCircularProgress/>);
    
    if(password === confirmPassword){
      SignUpCognito(email, password, name, lastname, username)
      .then(data => {
        setCognitoUser(data.user);
        setMessage(
          <div className={classes.success}>
            <span>Registro exitoso</span>
          </div>
        );
        
        setTimeout(() => {
          setMessage(null);
          clearInterval(this);
          props.history.push(`${match.url}/confirm`);
        }, 1200); 
      })
      .catch(err => {
        setMessage(
          <div className={classes.error}>
            <span>{err.message}</span>
          </div>
        );
      });
    }
    else{
      setMessage(
        <div className={classes.error}>
          <span>La confirmación de contraseña no coincide</span>
        </div>
      );
    }  
  }

  const UserForgotPassword = event => {
    event.preventDefault();

    setMessage(<CustomCircularProgress/>);
    
    ForgotPassword(email)
    .then( data => {
      setMessage(
        <div className={classes.success}>
          <span>{data.message}</span>
        </div>
      );

      setTimeout(() => {
        setMessage(null);
        clearInterval(this);
        props.history.push(`${match.url}/newPassword`);
      }, 2000);
    })
    .catch( err => {
      setMessage(
        <div className={classes.error}>
          <span>{err.message}</span>
        </div>
      );
    });
  }

  const ConfirmNewPassword = event => {
    event.preventDefault();

    setMessage(<CustomCircularProgress/>);

    if(password === confirmPassword){
      ConfirmPassword(email, code, password)
      .then(data => {
        setMessage(
          <div className={classes.success}>
            <span>Se ha realizado el cambio correctamente</span>
          </div>
        );
        
        setTimeout(() => {
          setMessage(null);
          clearInterval(this);
          props.history.push(`${match.url}/signin`);
        }, 2000); 
      })
      .catch(err => {
        setMessage(
          <div className={classes.error}>
            <span>{err.message}</span>
          </div>
        );

        setTimeout(() => {
          setMessage(null);
          clearInterval(this);
          props.history.push(`${match.url}/forgotPassword`);
        }, 2000);

      });
    }
    else{
      setMessage(
        <div className={classes.error}>
          <span>La confirmación de contraseña no coincide</span>
        </div>
      );
    }  
  }

  const ConfirmUserRegistration = event => {
    event.preventDefault();

    setMessage(<CustomCircularProgress/>);

    ConfirmRegistration(cognitoUser, code)
    .then(data => { 
      setMessage(
        <div className={classes.success}>
          <span>Confirmación exitosa</span>
        </div>
      );

      setTimeout(() => {
        setMessage(null);
        props.history.push(`${match.url}/signin`);
        clearInterval(this)
      }, 1200);
    })
    .catch(err => {
      setMessage(
        <div className={classes.error}>
          <span>{err.message}</span>
        </div>
      );
      setTimeout(() => {
        setMessage(null);
        props.history.push(`${match.url}/signup`);
        clearInterval(this)
      }, 2000);
    });
  }

  const CustomCircularProgress = () => 
  {
    return(
      <div className={classes.barProgress}>
        <CircularProgress color="secondary" />
        <div>
          <span>Procesando solicitud</span>
        </div>
      </div>
    );
  }

  const ClearMessage = () => {
    setMessage(null);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <video
          className={classes.videosize}
          src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/clash-2018/es_MX/a46e742ae82f9d4f9db8e34ba57873e513e727b7/assets/static/video/clash-intro-bg-video.mp4"
          autoPlay="autoplay"
          loop="loop"
          muted="muted"
        />
        <div className={classes.textLogo}>
          <svg className={classes.svgLogo} x='0px' y='0px' viewBox='0 0 100 20'>
            <polyline className={classes.st0} points="96.2,1.6 96.2,8.8 93.2,8.8 93.2,1.4 90.5,1.4 90.5,18.6 93.2,18.6 93.2,11.2 96.2,11.2 96.2,18.6 98.9,18.6 98.9,1.4 96.2,1.4 96.2,1.6 "></polyline>
            <path className={classes.st0} d="M9.3,8.1V3.6c0-1.2-1-2.2-2.2-2.2H3.3c-1.2,0-2.2,1-2.2,2.2v12.8c0,1.2,1,2.2,2.2,2.2h3.8c1.2,0,2.2-1,2.2-2.2 v-3.3H6.6v3.1H3.8V3.8h2.8v1.7L9.3,8.1L9.3,8.1"></path>
            <path className={classes.st0} d="M75.9,8.8V3.6c0-1.2-1-2.2-2.2-2.2h-3.4c-1.2,0-2.2,1-2.2,2.2v2.5c0,0.5,0.2,1,0.4,1.4l4.6,6v2.6h-2.4v-2.5 h-2.7v2.7c0,1.2,1,2.2,2.2,2.2h3.4c1.2,0,2.2-1,2.2-2.2v-2.8c0-0.5-0.1-1-0.4-1.4l-4.7-6V3.8h2.4v1.7L75.9,9V8.8"></path>
            <polyline className={classes.st0} points="24.5,1.6 24.5,18.6 33.3,18.6 31.2,16 27.2,16 27.2,1.4 24.5,1.4 24.5,1.6 "></polyline>
            <path className={classes.st0} d="M49.9,1.6l-3.2,8.5c-1-0.7-2-1.5-3-2.4c1.2,1.8,2.6,3.4,4.1,4.9c-0.6-0.1-1.3-0.3-1.9-0.6l-2.5,6.5h3l2-5.3 c1.2,1.1,2.6,2,4,2.8l0.9,2.5h3L50,1.4L49.9,1.6 M49.2,11.5L50,9.3l1.3,3.4c-0.7-0.3-1.4-0.7-2.1-1.1l0,0L49.2,11.5"></path>
          </svg>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.gridContainer}>
        <Switch>
          <Route exact path={`${match.path}/`} render={()=>{
            return(
              <Redirect to={`${match.url}/signin`}/>
            )
          }}/>
          <Route exact path={`${match.path}/signin`}>
            <div className={classes.paper}>
              <Avatar src={logo} className={classes.avatar} />
              <Typography component="h1" variant="h4">
                Inicio de Sesión
              </Typography>
              <form className={classes.form} onSubmit={SignIn} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Nombre de Invocador o Correo Electrónico"
                  name="email"
                  onChange={event => setEmail(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  onChange={event => setPassword(event.target.value)}
                />
                { message } 
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link variant="body2" to={`${match.url}/forgotPassword`} onClick={ClearMessage}>
                      ¿Olvidate tu contraseña?
                    </Link>
                  </Grid>
                  <Grid item>
                    ¿No tienes una cuenta?  
                    <Link variant="body2" to={`${match.url}/signup`} onClick={ClearMessage}>
                      {" Registrate"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Route>
          <Route exact path={`${match.path}/signup`}>
            <div className={classes.paper}>
              <Avatar src={logo} className={classes.avatar} />
              <Typography component="h1" variant="h4">
                Registro
              </Typography>
              <form className={classes.form} noValidate onSubmit={SignUp}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="Nombre"
                      autoFocus
                      onChange={event => setName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Apellido"
                      name="lastName"
                      onChange={event => setLastname(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="nickname"
                      label="Nombre de Invocador"
                      name="nickname"
                      onChange={event => setUsername(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email_signup"
                      label="Correo Electrónico"
                      name="email_signup"
                      onChange={event => setEmail(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Contraseña"
                      type="password"
                      id="password"
                      onChange={event => setPassword(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Confirmar Contraseña"
                      type="password"
                      id="password"
                      onChange={event => setConfirmPassword(event.target.value)}
                    />
                  </Grid>
                </Grid>
                {message}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Registrarse
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    ¿Ya tienes cuenta? 
                    <Link variant="body2" to={`${match.url}/signin`} onClick={ClearMessage}>
                      {" Inicia Sesión"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Route>
          <Route exact path={`${match.path}/confirm`}>
            <div className={classes.paper}>
              <Avatar src={logo} className={classes.avatar} />
              <Typography component="h1" variant="h4">
                Confirmar Registro
              </Typography>
              <Typography variant="subtitle1" className={classes.spaceTop}>
                Ingrese el código de verificación enviado al correo eléctronico registrado
              </Typography>
              <form className={classes.form} onSubmit={ConfirmUserRegistration} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="code"
                  label="Código de verificación"
                  id="code"
                  onChange={event => setCode(event.target.value)}
                /> 
                { message }          
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Confirmar
                </Button>       
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Route>
          <Route exact path={`${match.path}/forgotPassword`}>
            <div className={classes.paper}>
              <Avatar src={logo} className={classes.avatar} />
              <Typography component="h1" variant="h4">
                Recuperar Contraseña
              </Typography>
              <Typography variant="subtitle1" className={classes.spaceTop}>
                Ingrese la dirección de correo eléctronico registrado
              </Typography>
              <form className={classes.form} onSubmit={UserForgotPassword} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email_forgot"
                  label="Correo Electrónico"
                  name="email_forgot"
                  onChange={event => setEmail(event.target.value)}
                  value= {email}
                />
                { message } 
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Enviar
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link variant="body2" to={`${match.url}/signin`} onClick={ClearMessage}>
                      Iniciar Sesión
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link variant="body2" to={`${match.url}/signup`} onClick={ClearMessage}>
                      Registrarse
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Route>
          <Route exact path={`${match.path}/newPassword`}>
            <div className={classes.paper}>
              <Avatar src={logo} className={classes.avatar} />
              <Typography component="h1" variant="h4">
                Nueva Contraseña
              </Typography>
              <Typography variant="subtitle1" className={classes.spaceTop}>
                Ingrese el código de recuperación y configure la nueva contraseña
              </Typography>
              <form className={classes.form} onSubmit={ConfirmNewPassword} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email_cnfpass"
                  label="Correo Electrónico"
                  name="email_cnfpass"
                  disabled
                  value= {email}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="code_confPass"
                  label="Código de recuperación"
                  id="code_confPass"
                  onChange={event => setCode(event.target.value)}
                /> 
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password_cnfPass"
                  label="Nueva Contraseña"
                  type="password"
                  id="password_cnfPass"
                  onChange={event => setPassword(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="conf_password_conf"
                  label="Confirmar Contraseña"
                  type="password"
                  id="conf_password_conf"
                  onChange={event => setConfirmPassword(event.target.value)}
                />
                { message } 
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Enviar
                </Button>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
};

export default Home;

