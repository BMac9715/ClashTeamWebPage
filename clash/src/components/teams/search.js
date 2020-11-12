import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Cup from '../../assets/images/cup.jpg';
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

const useStylesCalendar = makeStyles((theme) => ({
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

const Team = (params) => {
    const classes = useStylesCalendar();

    return (
        <div className={classes.crdCalendar}>
           <p>{params.team.name}</p>
        </div>      
    );
};

const Search = () => {
    const classes = useStyles();

    let teams = [
        {
            "name": "KOHAKU"
        },
        {
            "name": "TEAM DIGNITAS"
        },
        {
            "name": "INTELAF GT"
        }
    ];

    return (
        <Container fixed>
            <Card className={classes.crdCalendar}>
                <Typography variant="h5">EQUIPOS DISPONIBLES</Typography>
                <div className={classes.center}>
                    {teams.map(team => {
                        return (
                            <div>
                                <Team team={team}></Team>
                                <Divider/>
                            </div>    
                        );
                     })}
                </div>
            </Card>
        </Container>
    );
};

export default Search;