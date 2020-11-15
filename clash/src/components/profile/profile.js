import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import IRON from '../../assets/images/Emblem_Iron.png';
import BRONZE from '../../assets/images/Emblem_Bronze.png';
import SILVER from '../../assets/images/Emblem_Silver.png';
import GOLD from '../../assets/images/Emblem_Gold.png';
import PLATINUM from '../../assets/images/Emblem_Platinum.png';
import DIAMOND from '../../assets/images/Emblem_Diamond.png';
import MASTER from '../../assets/images/Emblem_Master.png';
import GRANDMASTER from '../../assets/images/Emblem_Grandmaster.png'
import CHALLENGER from '../../assets/images/Emblem_Challenger.png';
import Poro from '../../assets/images/poro.png';
import { GetCompleteProfile } from '../../services/riot.service';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
      marginRight: theme.spacing(5),
    },
    content:{
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    dprof:{
      alignSelf: 'center',
    },
    crdProfile:{
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: theme.spacing(2),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        textAlign: '-webkit-center',
    },
    crdRow:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    center:{
        textAlign: 'center',
    },
    left:{
        textAlign: 'left',
    },
    barProgress: {
        textAlign: 'center',
        margin: theme.spacing(2),
    },
    prfHeader:{
        display: 'flex',
        margin: theme.spacing(3),
    },
  }));

const useStylesChamp = makeStyles((theme) => ({
    crdChamp:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        padding: theme.spacing(1),
        display: 'inline-block',
        alignSelf: 'center',
        textAlign: 'center',
    },
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        display: 'inherit',
    },
    chmpInfo:{
        margin: theme.spacing(1),
        alignItems: 'center'
    },
})); 

const useStyleRanked = makeStyles((theme) => ({
    crdRank:{
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        padding: theme.spacing(1),
        display: 'inline-block',
        alignSelf: 'center',
        textAlign: 'center',
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        display: 'inherit',
    },
    rankInfo:{
        margin: theme.spacing(1),
        alignItems: 'center'
    },
    clrGreen:{
        color: 'forestgreen',
    },
    clrRed:{
        color: 'red',
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

const NoData = () => {
    const classes = useStyleNoData();

    return (
        <div className={classes.content}>
            <Avatar alt="Remy Sharp" src={Poro} className={classes.extraLarge}/>
            <Typography variant="subtitle1">No fue posible obtener datos. Vuelve a intentarlo.</Typography>
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

const Champ = (params) => {
    const classes = useStylesChamp();

    return (
    <div className={classes.crdChamp}>
        <Avatar alt="Remy Sharp" src={params.info.icon} className={classes.large} />
        <div className={classes.chmpInfo}>
            <Typography variant="h6">{params.info.championName}</Typography>
            <Typography variant="subtitle1">Maestria {params.info.championLevel}</Typography>
            <Typography variant="subtitle1">{params.info.championPoints} pts</Typography>
        </div>
    </div>
    );
}

const Emblems = (tier) => {
    switch(tier){
        case "IRON":
            return IRON;
        case "BRONZE":
            return BRONZE;
        case "SILVER": 
            return SILVER;
        case "GOLD":
            return GOLD;
        case "PLATINUM":
            return PLATINUM;
        case "DIAMOND":
            return DIAMOND;
        case "MASTER":
            return MASTER;
        case "GRANDMASTER":
            return GRANDMASTER;
        case "CHALLENGER":
            return CHALLENGER;
        default:
            return null;
    }
}

const Ranked = (params) => {
    const classes = useStyleRanked();

    return (
    <div className={classes.crdRank}>
        <Typography variant="h6">{params.ranked.queueType}</Typography>
        <Avatar variant="square" src={Emblems(params.ranked.tier)} className={classes.large} />
        <div className={classes.rankInfo}>
            <Typography variant="h6">{params.ranked.rank}</Typography>
            <Typography variant="subtitle1">{params.ranked.points} pts</Typography>
            <Typography variant="subtitle1">
                V: <span className={classes.clrGreen}>{params.ranked.wins}</span> D: <span className={classes.clrRed}>{params.ranked.losses}</span>
            </Typography>
        </div>
    </div>
    );
}

const ProfileSummoner = (params) => {
    const classes = useStyles();

    return ( 
        <div className={classes.content}>
            <div className={classes.prfHeader}>
                <Avatar alt="Remy Sharp" src={params.params.profileIcon} className={classes.large} />
                <div className={classes.left}>
                    <Typography variant="h4">{params.params.nickname}</Typography>
                    <Typography variant="subtitle1">{params.params.server}</Typography>
                    <Typography variant="subtitle1">{params.params.level}</Typography>
                </div>
            </div>
            <Divider />
            <div className={classes.crdRow}>
                <Typography variant="h5">CLASIFICATORIAS</Typography>
                <div className={classes.center}>
                    {params.params.ranks.map(rank => {
                        return <Ranked ranked={rank}></Ranked>
                    })}
                </div>
            </div>
            <Divider />
            <div className={classes.crdRow}>
                <Typography variant="h5">CAMPEONES</Typography>
                <div className={classes.center}>
                    {params.params.champs.map(champ => {
                        return <Champ info={champ}></Champ>
                    })}
                </div> 
            </div>
        </div>  
    );
}

const Profile = () => {
    const classes = useStyles();
    const [spinner, setSpinner] = useState('');
    const [profile, setProfile] = useState('');

    useEffect(() => {
        setSpinner(<CustomCircularProgress/>);

        GetCompleteProfile(localStorage.getItem('summonerName'))
        .then(data => {
            setSpinner(null);
            setProfile(<ProfileSummoner params={data} />);
        })
        .catch(err => {
            console.error(err);
            setSpinner(null);
            setProfile(<NoData />);
        });

    }, []);

    return (
        <Container fixed>
            <Card className={classes.crdProfile}>
                { spinner }
                { profile }                        
            </Card>
        </Container>
    );
};

export default Profile;