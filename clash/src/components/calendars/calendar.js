import React, { useEffect, useState }  from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Cup from '../../assets/images/cup.jpg';
import Poro from '../../assets/images/poro.png';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from '@material-ui/core/Divider';
import { GetCalendars } from '../../services/riot.service';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      marginRight: theme.spacing(5),
    },
    content:{
      display: 'flex',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    dprof:{
      alignSelf: 'center',
    },
    crdCalendar:{
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

const useStylesTournament = makeStyles((theme) => ({
    crdCalendar:{
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        padding: theme.spacing(1),
        display: 'inline-flex',
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1,
    },
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        display: 'inherit',
    },
    crdCalendarInfo:{
        textAlign: 'left',
        width: theme.spacing(60),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(7),
    },
    button: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
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

const Tournament = (params) => {
    const classes = useStylesTournament();

    return (
        <div className={classes.crdCalendar}>
            <Avatar alt="Remy Sharp" src={Cup} className={classes.large}/>
            <div className={classes.crdCalendarInfo}>
                <Typography variant="h6">{params.calendar.name}</Typography>
                <Typography variant="subtitle1">{params.calendar.schedule}</Typography>
            </div>
        </div>      
    );
};

const NoData = () => {
    const classes = useStyleNoData();

    return (
        <div className={classes.content}>
            <Avatar alt="Remy Sharp" src={Poro} className={classes.extraLarge}/>
            <Typography variant="subtitle1">Por el momento no existen torneos programados</Typography>
        </div>
    );
}

const CustomCircularProgress = () => 
{
  const classes = useStyles();
  return(
    <div className={classes.barProgress}>
      <CircularProgress color="secondary" size="80px"/>
      <div>
        <span>Procesando solicitud</span>
      </div>
    </div>
  );
}

const Calendar = () => {
    const classes = useStyles();
    const [bodyCalendar, setBody] = useState('');
    const [spinner, setSpinner] = useState('');
    let schedule = [];

    useEffect(() => {
        setSpinner(<CustomCircularProgress/>);
        GetCalendars()
        .then( data => {
            schedule = data;
            setSpinner(null);
            if(schedule.length > 0){
                setBody(
                    <List className={classes.lstCust}>
                       {
                        schedule.map(element => {
                            return (
                                <div>
                                    <ListItem>
                                        <Tournament calendar={element}></Tournament>
                                    </ListItem>
                                    <Divider /> 
                                </div>       
                            )
                        })
                       }
                    </List>
                 );
            }
            else{
                setBody(<NoData />);
            }
        })
        .catch( err => {
            console.error(err);
        });
    }, []);

    return (
        <Container fixed>
            <Card className={classes.crdCalendar}>
                <Typography variant="h5">PRÓXIMOS TORNEOS</Typography>
                <div className={classes.center}>
                    {spinner}
                    {bodyCalendar}
                </div>
            </Card>
        </Container>
    );
};

export default Calendar;