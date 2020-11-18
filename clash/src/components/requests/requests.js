import React, { useEffect, useState }  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Minion from '../../assets/images/battle.jpg';
import Poro from '../../assets/images/poro.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from '@material-ui/core/Button';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { GetTeamClash, UpdateTeamClash, GetRequestsTeam, DeleteRequestClash } from '../../services/clash.service';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    content:{
      display: 'flex',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    dprof:{
      alignSelf: 'center',
    },
    crdRequests:{
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: theme.spacing(2),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    crdRow:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    center:{
        textAlign: 'center',
    },
    barProgress: {
        textAlign: 'center',
        margin: theme.spacing(2),
    },
    lstCust:{
        display: 'inline-grid',
    },
  }));

const useStylesRequest = makeStyles((theme) => ({
    crdRequests:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        display: 'inline-flex',
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1,
        alignItems: 'center',
    },
    large: {
        width: theme.spacing(13),
        height: theme.spacing(13),
        display: 'inherit',
    },
    crdCalendarInfo:{
        textAlign: 'left',
        width: theme.spacing(30),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    crdbtns:{
        textAlign: 'center',
    },
    btnprofile:{
        width: '60%'
    },
    btnsuccess:{
        margin: theme.spacing(1),
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.white,
        width: '60%'
    },
    btndelete:{
      backgroundColor: theme.palette.error.dark,
      color: theme.palette.common.white,
      width: '60%'
    },
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

const Request = (params) => {
    const classes = useStylesRequest();

    return (
        <div className={classes.crdRequests}>
            <Avatar variant="square" src={Minion} className={classes.large}/>
            <div className={classes.crdCalendarInfo}>
                <Typography variant="h6">{params.req.nickname}</Typography>
                <Typography variant="body2">Rol Primario: {params.req.primaryRole}</Typography>
                <Typography variant="body2">Rol Secundario: {params.req.secondaryRole}</Typography>
                <Typography variant="body2">Mensaje: {params.req.message}</Typography>
            </div>
            <div className={classes.crdbtns}>
                <Button variant="contained" color="primary" className={classes.btnprofile} size="medium" onClick={params.profile}>Ver Perfil</Button>
                <Button variant="contained" color="default" className={classes.btnsuccess} size="medium" onClick={params.accept}>Aceptar</Button>
                <Button variant="contained" color="default" className={classes.btndelete} size="medium" onClick={params.delete}>Rechazar</Button>
            </div>
        </div>      
    );
};

const NoData = () => {
    const classes = useStyleNoData();

    return (
        <div className={classes.content}>
            <Avatar alt="Remy Sharp" src={Poro} className={classes.extraLarge}/>
            <Typography variant="subtitle1">No existen solicitudes para este equipo</Typography>
        </div>
    );
}

const CustomCircularProgress = params => 
{
  const classes = useStyles();
  return(
    <div className={classes.barProgress}>
      <CircularProgress color="secondary" size={params.size}/>
      <div>
        <span>Procesando solicitud</span>
      </div>
    </div>
  );
}

const Requests = () => {
    const classes = useStyles();
    const [spinner, setSpinner] = useState('');
    const [state, setState] = useState({
        teamName: '',
        requests: []
    });
    const { id } = useParams();
    let history = useHistory();
    let match = useRouteMatch();

    useEffect(() => {
        setSpinner(<CustomCircularProgress size="80px"/>);

        GetRequestsTeam(id)
        .then( data => {
            console.log(data);
            if(data.data.items.length > 0){
                state.teamName = data.data.items[0].teamName.toUpperCase();
                state.requests = data.data.items;
                setSpinner(null);
            }
            else{
                setSpinner(<NoData />);
            }
        })
        .catch( err => {
            console.error(err);
            setSpinner(<NoData />);
        });
    }, []);

    const deleteEvent = (index) =>{
        setSpinner(<CustomCircularProgress size="40px"/>);
        var request_id = state.requests[index].uuid;

        DeleteRequestClash(request_id)
        .then(data => {
            if(data.status === 200){
                const copyItems = Object.assign([], state.requests);
                copyItems.splice(index, 1);
                setState({requests: copyItems});
                setSpinner(null);
                if(copyItems.length === 0){
                  setSpinner(<NoData />);
                }
            }else{
              console.log(data);
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    const acceptEvent = (index) =>{
        setSpinner(<CustomCircularProgress size="40px"/>);

        var request_id = state.requests[index].uuid;
        var player = {
            "nickname": state.requests[index].nickname,
            "role": state.requests[index].primaryRole.toUpperCase()
        }

        GetTeamClash(id)
        .then(data =>{
            var t = {team: ''}
            t.team = data.data.items[0];
            t.team.players.push(player);
            UpdateTeamClash(id, t)
            .then(data2 => {
                if(data2.status === 200){
                    DeleteRequestClash(request_id)
                    .then(data3 =>{
                        if(data3.status === 200){
                            const copyItems = Object.assign([], state.requests);
                            copyItems.splice(index, 1);
                            setState({requests: copyItems});
                            setSpinner(null);
                            if(copyItems.length === 0){
                                setSpinner(<NoData />);
                            }
                        }else{
                            console.log(data);
                        }
                    })
                    .catch(err =>{
                        console.error(err);
                        alert('Delete Request: Ocurrio un error');
                    })
                }
            })
            .catch(err => {
                console.error(err);
                alert('Update Team: Ocurrio un error');
            });
        })
        .catch(err =>{
            console.error(err);
            alert('Get Team: Ocurrio un error');
        });
    }

    const profileEvent = (index) =>{
        var nick = state.requests[index].nickname;

        history.push(`${match.url}/${nick}`)
    }

    return (
        <Container fixed>
            <Card className={classes.crdRequests}>
            <Typography variant="h5">SOLICITUDES DE INGRESO - {state.teamName}</Typography>
                <div className={classes.center}>
                    {spinner}
                    <List className={classes.lstCust}>
                        {
                            state.requests.map((element, index) => {
                                return (
                                    <ListItem key={element.uuid}>
                                        <Request req={element} delete={deleteEvent.bind(this, index)} 
                                                accept={acceptEvent.bind(this, index)}
                                                profile={profileEvent.bind(this, index)}
                                        />
                                    </ListItem> 
                                )
                            })
                        }
                    </List>
                </div>
            </Card>
        </Container>
    );
};

export default Requests;