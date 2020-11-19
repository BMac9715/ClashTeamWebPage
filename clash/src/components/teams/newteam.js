import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";
import { green } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { CreateTeamClash, GetLeaguesFromRedis } from '../../services/clash.service';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
  },
  formCrd: {
    padding: theme.spacing(10),
  },
  heroVideoWrapper: {
    position: "fixed",
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
    margin: theme.spacing(2),
  },
  btns:{
    margin: theme.spacing(2),
    textAlign: 'center',
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
  },
  crdNewTeam:{
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  mrgTitle:{
    margin: theme.spacing(2,0),
  },
  mrgSubTitle:{
    margin: theme.spacing(1,0),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginRight: theme.spacing(5),
  },
  configIcon:{
    margin: theme.spacing(2),
  }
}));

const useStylesPB = makeStyles((theme) => ({
  barProgress: {
    textAlign: 'center',
    margin: theme.spacing(2),
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
  disabled: {},
})((props) => <Checkbox color="default" {...props} />);

const CustomCircularProgress = () => 
{
  const classes = useStylesPB();

  return(
    <div className={classes.barProgress}>
      <CircularProgress color="secondary" size="40px"/>
      <div>
        <span>Procesando solicitud</span>
      </div>
    </div>
  );
};

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getInitStates = () => {
  var ligas = ['Hierro', 'Bronze', 'Plata', 'Oro', 
    'Platino', 'Diamante', 'Master', 'GrandMaster', 
    'Challenger'];

  var elements = {};
  elements.checkedT = true;
  elements.rol = '';
  elements.teamName = '';
  elements.description = '';
  elements.discord = '';

  for(var i=0; i<ligas.length; i++){
    elements['checked_'+ligas[i]] =  false;
  }

  return elements;
};

const NewTeam = () => {
  const classes = useStyles();
  const [state, setState] = useState(getInitStates());
  const [message, setMessage] = useState('');
  const [icono, setIcon] = useState('');
  const [ligas, setLigas] = useState([]);
  let history = useHistory();

  useEffect(() => {
    setIcon(process.env.REACT_APP_ICONS_CLASH_URL +'team' + getRandomArbitrary(1,17).toString() + '.svg');
    
    GetLeaguesFromRedis()
    .then(data => {
        let objs = Object.values(data);
        let leagues = [];
        
        objs.forEach(item => {
          leagues.push(item.liga);
        });

        setLigas(leagues);
    })
    .catch(err =>{
      console.error(err);
    });
  }, []);

  const getLigas = () => {
    var res = [];

    if(state.checkedT){
      res = ligas;
    }
    else{
      for(var i=0; i<ligas.length; i++){
        if(state['checked_'+ligas[i]]){
          res.push(ligas[i]);
        }
      }
    }

    return res;
  };

  const SendTeam = event => {
    event.preventDefault();
  
    setMessage(<CustomCircularProgress/>);

    var team = {
      'team':{
        'owner': localStorage.getItem('summonerName'),
        'region': 'LAN',
        'nombre': state.teamName,
        'descripcion': state.description,
        'icono': icono,
        'ligas': getLigas(),
        'discord': state.discord,
        'players':[{
          'nickname': localStorage.getItem('summonerName'),
          'role': state.rol
        }]
      }
    };

    CreateTeamClash(team)
    .then(data =>{
      if(data.status === 201){
        setMessage(
          <div className={classes.success}>
            <span>Se ha creado el equipo correctamente</span>
          </div>
        );

        setTimeout(() => {
          setMessage(null);
          clearInterval(this);
          history.goBack();
        }, 2000); 
      }
      else{
        console.log(data);
        setMessage(
          <div className={classes.error}>
            <span>Ha ocurrido un error, vuelve a intentarlo</span>
          </div>
        );
      }
    })
    .catch(err => {
      console.error(err);
      setMessage(
        <div className={classes.error}>
          <span>{err}</span>
        </div>
      );
    });
  };

  const handleChangeCheckbox = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Container fixed>
      <Card className={classes.crdNewTeam} >
      <Typography variant="h5" className={classes.mrgTitle}>
        NUEVO EQUIPO
      </Typography>
      <Typography variant="subtitle1" className={classes.mrgSubTitle}>
        Icono asignado:
      </Typography>
      <div className={classes.configIcon}>
        <Avatar variant="square" src={icono} className={classes.large} />
      </div>
      <Divider /> 
      <Typography variant="subtitle1" className={classes.mrgSubTitle}>
        Completa los siguientes datos:
      </Typography>
      <form className={classes.form} noValidate onSubmit={SendTeam}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="teamName"
              variant="outlined"
              required
              fullWidth
              label="Nombre del equipo"
              autoFocus
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Descripción sobre el equipo"
              name="description"
              multiline
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Servidor de Discord"
              name="discord"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider /> 
            <Typography variant="subtitle1" className={classes.mrgSubTitle}>
              Ligas admitidas:
            </Typography>
            <FormControlLabel
              control={<GreenCheckbox checked={state.checkedT} onChange={handleChangeCheckbox} name="checkedT" />}
              label="Todas"
            />
            {ligas.map(name => (
              <FormControlLabel
                control={<GreenCheckbox checked={state['checked_'+name]} disabled={state.checkedT} onChange={handleChangeCheckbox} name={'checked_'+name} />}
                label={name}
              />
            ))}
          </Grid>
          <Grid item xs={12}>
            <Divider /> 
            <Typography variant="subtitle1" className={classes.mrgSubTitle}>
              Elige tu rol:
            </Typography>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={state.rol}
                onChange={handleChange}
                inputProps={{
                  name: 'rol'
                }}
              >
                <option aria-label="None" value="" />
                <option value={'Superior'}>Superior</option>
                <option value={'Jungla'}>Jungla</option>
                <option value={'Central'}>Central</option>
                <option value={'Inferior'}>Inferior</option>
                <option value={'Soporte'}>Soporte</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {message}
        <div className={classes.btns}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={()=>{history.goBack()}}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Guardar
          </Button>
        </div>    
      </form>
      </Card>
    </Container>
  );
};

export default NewTeam;
