import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Poro from '../../assets/images/poro.png';
import SendIcon from '@material-ui/icons/Send';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import { GetTeamsClash, CreateRequestClash } from '../../services/clash.service';

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(2),
    },
    crdTeams:{
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      paddingTop: theme.spacing(2),
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    button: {
      marginTop: theme.spacing(3),
    },
    btnedit:{
      margin: theme.spacing(2, 2, 1, 0),
      backgroundColor: theme.palette.success.main,
      color: theme.palette.common.white,
      width: '80%'
    },
    btndelete:{
      margin: theme.spacing(1, 2, 2, 0),
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.common.white,
      width: '80%'
    },
    center: {
      textAlign: '-webkit-center'
    },
    crdTeam:{
      margin: theme.spacing(2, 0),
      color: 'white',
      backgroundImage: 'url('+ 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/clash-2018/es_MX/a46e742ae82f9d4f9db8e34ba57873e513e727b7/assets/static/img/backgrounds/team-creation-bg.jpg' +')',
      backgroundPositionY: 'center',
      backgroundBlendMode: 'hard-light',
      display: 'flex',
      alignItems: 'center',
    },
    confAvatar:{
      margin: theme.spacing(2),
    },
    large:{
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    confInfo:{
      margin: theme.spacing(2),
      alignSelf: 'baseline',
      textAlign: 'left',
      width: theme.spacing(50)
    },
    confInfoLeagues:{
        margin: theme.spacing(2),
        alignSelf: 'baseline',
        textAlign: 'left',
        width: theme.spacing(25)
    },
    confInfoPlayers:{
      margin: theme.spacing(2),
      alignSelf: 'baseline',
      textAlign: 'left',
      width: theme.spacing(25)
    },
    confUuid:{
      fontSize: '11px',
      fontStyle: 'italic',
      marginTop: theme.spacing(2), 
    },
    confDesc:{
      fontSize: '15px',
    },
    confBtns:{
      margin: theme.spacing(2)
    },
    details:{
      alignSelf: 'baseline',
    },
    confBold: {
      fontWeight: 'bold',
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
    cnfTxtDialog:{
      margin: theme.spacing(2, 0),
    }
  }));

const useStyleNoData = makeStyles((theme)=> ({
    extraLarge:{
        width: theme.spacing(25),
        height: theme.spacing(25),
        marginRight: theme.spacing(5),
    },
    content:{
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(20),
        display: 'inline-block',
        textAlign: '-webkit-center',
        opacity: '0.7'
    }
  }));

const useStylesPB = makeStyles((theme) => ({
  barProgress: {
    textAlign: 'center',
    margin: theme.spacing(2),
  },
}));

const CustomCircularProgress = props => 
{
  const classes = useStylesPB();

  return(
    <div className={classes.barProgress}>
      <CircularProgress color="secondary" size={props.size}/>
      <div>
        <span>Procesando solicitud</span>
      </div>
    </div>
  );
};

const Team = props => {
  const classes = useStyles();

  return (
    <Card className={classes.crdTeam}>
      <div className={classes.confAvatar}>
        <Avatar variant="square" src={props.icon} className={classes.large} />
      </div>
      <div className={classes.confInfo}>
        <Typography variant="h6">{props.name.toUpperCase()}</Typography>
        <Typography variant="body2" className={classes.confDesc}>{props.desc}</Typography>
        <Typography variant="body2" className={classes.confUuid}>{props.uuid}</Typography>
      </div>
      <div className={classes.confInfoLeagues}>
        <Typography variant="body2" className={classes.confBold}>LIGAS</Typography>
        <div className={classes.details}>
          {
            props.leagues.map((liga)=>(
              <li key={liga}>{liga}</li>
            ))
          }
        </div>    
      </div>
      <div className={classes.confInfoPlayers}>
        <Typography variant="body2" className={classes.confBold}>ROLES OCUPADOS</Typography>
        <div className={classes.details}>
          {
            props.players.map((player)=>(
              <Typography key={player} variant="body2">{player.role.toUpperCase()}</Typography>
            ))
          }
        </div>    
      </div>
      <div className={classes.confBtns}>
        <Button variant="contained" color="default" className={classes.btnedit} size="medium" startIcon={<SendIcon />} onClick={props.clickOpen}>
            SOLICITAR INGRESO
        </Button>
        <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Solicitud de Ingreso a Equipo</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="primaryRol"
                name="primaryRol"
                label="Rol Primario"
                onChange={props.change}
                fullWidth
            />
            <TextField
                className={classes.cnfTxtDialog}
                margin="dense"
                id="secondaryRol"
                name="secondaryRol"
                label="Rol Secundario"
                onChange={props.change}
                fullWidth
            />
            <TextField
                margin="dense"
                id="message"
                name="message"
                label="Mensaje (opcional)"
                onChange={props.change}
                fullWidth
            />
            {
                props.message
            }
            </DialogContent>
            <DialogActions>
            <Button variant="contained" color="secondary" onClick={props.close}>
                Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={props.send}>
                Enviar
            </Button>
            </DialogActions>
        </Dialog>
      
      </div>               
    </Card>  
  );
};

const NoData = (params) => {
    const classes = useStyleNoData();

    return (
        <div className={classes.content}>
            <Avatar alt="Remy Sharp" src={Poro} className={classes.extraLarge}/>
            <Typography variant="subtitle1">{params.texto}</Typography>
        </div>
    );
};

const Search = () => {
    const classes = useStyles();
    const [state, setState]= useState({items: [], primaryRol:'', secondaryRol:'', message:''});
    const [bodyData, setBodyData] = useState('');
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [message, setMessage] = useState('');

    const handleClickOpen = (index) => {
        setIndex(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSendInfo = () => {

        setMessage(<CustomCircularProgress size="40px"/>);

        var request = {
            'request': {
                'team': state.items[index].uuid,
                'teamName': state.items[index].nombre,
                'nickname': localStorage.getItem('summonerName'),
                'primaryRole': state.primaryRol,
                'secondaryRole': state.secondaryRol,
                'message': state.message
            }
        };

        CreateRequestClash(request)  
        .then( data => {
            if(data.status === 201){
                setMessage( 
                    <div className={classes.success}>
                        <span>Se ha enviado la solicitud correctamente</span>
                    </div>);
                setTimeout(() => {
                    setMessage(null);
                    clearInterval(this);
                    setOpen(false);
                  }, 1500);
            }
            else{
                console.log(data);
                setMessage( 
                    <div className={classes.error}>
                        <span>Ha ocurrido un error, vuelva a intentarlo</span>
                    </div>);
                setTimeout(() => {
                    setMessage(null);
                    clearInterval(this);
                    setOpen(false);
                  }, 1500);
            }
        })      
        .catch( err => {
            console.error(err);
            setMessage( 
                <div className={classes.error}>
                    <span>{err.message}</span>
                </div>);
             setTimeout(() => {
                setMessage(null);
                clearInterval(this);
                setOpen(false);
              }, 1500);
        });  
  
    };

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
    };

    useEffect(()=>{
        setBodyData(<CustomCircularProgress size="80px"/>)
        GetTeamsClash()
        .then(data => {
            if(data.data.items.length > 0){
                state.items = data.data.items;
                setBodyData(null);
            }
            else{
                setBodyData(<NoData texto={'No exiten equipos registrados'}/>);
            }

        })
        .catch(err => {
            console.error(err);
            setBodyData(<NoData texto={'Ha ocurrido un error al cargar los datos'} />);
        });
    }, []);

    return (
        <Container fixed>
        <Card className={classes.crdTeams}>
          <Typography variant="h5">EQUIPOS DISPONIBLES</Typography>
          <div className={classes.center}>
            {
              state.items.map((row, index)=>(
                <Team key={row.uuid} id={row.uuid} name={row.nombre} 
                      icon={row.icono} desc={row.descripcion} leagues={row.ligas} 
                      players={row.players} clickOpen={handleClickOpen.bind(this, index)}
                      close={handleClose}
                      send={handleSendInfo}
                      change={handleChange}
                      open={open} 
                      message={message}/>
              ))
            }
            {
              bodyData
            } 
          </div>     
        </Card>       
      </Container>
    );
};

export default Search;