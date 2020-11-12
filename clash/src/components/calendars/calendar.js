import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Cup from '../../assets/images/cup.jpg';
import Poro from '../../assets/images/poro.png';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

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
  }));

const useStylesTournament = makeStyles((theme) => ({
    crdCalendar:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
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
            <div>
                <Button 
                    variant="contained" 
                    size="large"
                    color="primary" 
                    className={classes.button}
                    startIcon={<AddIcon />}
                >
                    CREAR EQUIPO
                </Button>
            </div>
        </div>      
    );
};

const NoData = () => {
    const classes = useStyleNoData();

    return (
        <div className={classes.content}>
            <Avatar alt="Remy Sharp" src={Poro} className={classes.extraLarge}/>
            <Typography variant="subtitles1">Por el momento no existen torneos programados</Typography>
        </div>
    );
}

const Calendar = () => {
    const classes = useStyles();

    let schedule = [
        {
            "name": "DÍA 2 - ISLAS DE LA SOMBRA",
            "schedule": "15 DE NOVIEMBRE <> 20:00 hrs"
        },
        {
            "name": "DÍA 3 - ISLAS DE LA SOMBRA",
            "schedule": "5 DE DICIEMBRE <> 20:00 hrs"
        },
        {
            "name": "DÍA 4 - ISLAS DE LA SOMBRA",
            "schedule": "6 DE DICIEMBRE <> 20:00 hrs"
        }
    ];
    
    let bodyCalendar;

    if(schedule.length > 0){
        bodyCalendar = schedule.map(element => {
            return (
                <div>
                    <Tournament calendar={element}></Tournament>
                    <Divider/>
                </div>    
            );
     })
    }
    else{
        bodyCalendar = <NoData />;
    }

    return (
        <Container fixed>
            <Card className={classes.crdCalendar}>
                <Typography variant="h5">PRÓXIMOS TORNEOS</Typography>
                <div className={classes.center}>
                    {bodyCalendar}
                </div>
            </Card>
        </Container>
    );
};

export default Calendar;