import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Poro from '../../assets/images/poro.png';
import { useRouteMatch, useHistory } from "react-router-dom";
import { GetTeamClashByOwner, DeleteTeamClash } from '../../services/clash.service';

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
      width: '80%'
    },
    btnRequests:{
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
      margin: theme.spacing(4, 2),
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
      width: theme.spacing(35)
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

  const NoData = (params) => {
    const classes = useStyleNoData();

    return (
        <div className={classes.content}>
            <Avatar alt="Remy Sharp" src={Poro} className={classes.extraLarge}/>
            <Typography variant="subtitle1">{params.texto}</Typography>
        </div>
    );
  }

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
                <li>{liga}</li>
              ))
            }
          </div>    
        </div>
        <div className={classes.confInfoPlayers}>
          <Typography variant="body2" className={classes.confBold}>JUGADORES</Typography>
          <div className={classes.details}>
            {
              props.players.map((player)=>(
                <Typography variant="body2">{player.nickname + ' - ' + player.role.toUpperCase()}</Typography>
              ))
            }
          </div>    
        </div>
        <div className={classes.confBtns}>
          <Button variant="contained" color="default" className={classes.btnRequests} size="medium" startIcon={<ContactMailIcon />} onClick={props.requests}>Solicitudes</Button>
          <Button variant="contained" color="secondary" className={classes.btnedit} size="medium" startIcon={<CreateIcon />} onClick={props.edit}>Editar</Button>
          <Button variant="contained" color="default" className={classes.btndelete} size="medium" startIcon={<DeleteIcon />} onClick={props.delete}>Eliminar</Button>
        </div>               
      </Card>  
    );
  }

  const CustomCircularProgress = () => 
  {
    const classes = useStylesPB();

    return(
      <div className={classes.barProgress}>
        <CircularProgress color="secondary" size="80px"/>
        <div>
          <span>Procesando solicitud</span>
        </div>
      </div>
    );
  };

  const TeamsMain = () => {
    const classes = useStyles();
    let match = useRouteMatch();
    let history = useHistory();
    const [state, setState]= useState({items: []});
    const [bodyData, setBodyData] = useState('');

    useEffect(()=>{
      setBodyData(<CustomCircularProgress/>);

      GetTeamClashByOwner(localStorage.getItem('summonerName'))
      .then( data =>{
        if(data.data.items.length > 0){
          state.items = data.data.items;
          setBodyData(null);
        }
        else{
          setBodyData(<NoData texto={'Aún no cuentas con equipos'}/>);
        }
      })
      .catch( err => {
        console.error(err);
        setBodyData(<NoData texto={'Ha ocurrido un error al cargar los datos'} />);
      });

    }, [])


    const deleteEvent = (index) => {
      
      DeleteTeamClash(state.items[index].uuid)
      .then( data => {
        if(data.status === 200){
          const copyItems = Object.assign([], state.items);
          copyItems.splice(index, 1);
          setState({items: copyItems});

          if(copyItems.length === 0){
            setBodyData(<NoData texto={'Aún no cuentas con equipos'}/>);
          }
        }else{
          console.log(data);
        }
      })
      .catch( err => {
        console.log(err);
      });
    }

    const editEvent = (index) => {
      var id = state.items[index].uuid;

      history.push(`${match.url}/${id}`)
    }

    const requestsEvent = (index) => {
      var id = state.items[index].uuid;

      history.push(`${match.url}/requests/${id}`)
    }

    return (
      <Container fixed>
        <Card className={classes.crdTeams}>
          <Typography variant="h5">MIS EQUIPOS</Typography>
          <Button 
            variant="contained" 
            size='large'
            color='primary' 
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={() => { history.push(`${match.url}/new`)}}
          >
          CREAR
          </Button>
          <div className={classes.center}>
            {
              state.items.map((row, index)=>(
                <Team key={row.uuid} id={row.uuid} name={row.nombre} 
                      icon={row.icono} desc={row.descripcion} leagues={row.ligas} 
                      players={row.players} delete={deleteEvent.bind(this, index)}
                      requests={requestsEvent.bind(this, index)}
                      edit={editEvent.bind(this, index)}/>
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

export default TeamsMain;