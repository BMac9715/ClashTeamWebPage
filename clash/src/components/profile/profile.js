import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Gold from '../../assets/images/Emblem_Gold.png';
import Platinum from '../../assets/images/Emblem_Platinum.png';

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
    crdProfile:{
        paddingLeft: theme.spacing(13),
        paddingRight: theme.spacing(13),
        paddingTop: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    crdRow:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    center:{
        textAlign: 'center',
    }
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

const Ranked = (params) => {
    const classes = useStyleRanked();

    return (
    <div className={classes.crdRank}>
        <Typography variant="h5">{params.ranked.queueType}</Typography>
        <Avatar variant="square" src={params.ranked.emblem} className={classes.large} />
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

const Profile = () => {
    const classes = useStyles();

    var profileIcon = "http://ddragon.leagueoflegends.com/cdn/10.18.1/img/passive/Anivia_P.png";
    var nickname = "BMac9715";
    var server = "Latinoamerica Norte (LAN)";
    var level = "Level 107";

    var champs = [
        {
            icon:"http://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/Aatrox.png",
            championName: "Aatrox",
            championLevel: 7,
            championPoints: 179331
        },
        {
            icon:"http://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/Chogath.png",
            championName: "Chogath",
            championLevel: 7,
            championPoints: 179331
        },
        {
            icon:"http://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/Nautilus.png",
            championName: "Nautilus",
            championLevel: 7,
            championPoints: 200000
        },
        {
            icon:"http://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/Fiora.png",
            championName: "Fiora",
            championLevel: 6,
            championPoints: 210024
        },
        {
            icon:"http://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/Thresh.png",
            championName: "Thresh",
            championLevel: 6,
            championPoints: 150789
        },
        {
            icon:"http://ddragon.leagueoflegends.com/cdn/10.19.1/img/champion/Teemo.png",
            championName: "Teemo",
            championLevel: 5,
            championPoints: 150789
        }
    ];

    var ranks = [
        {
            rank: "ORO III",
            emblem: Gold,
            wins: 21,
            losses: 19,
            points: 72,
            queueType: "RANKED SOLO 5x5"
        },
        {
            rank: "PLATINO IV",
            emblem: Platinum,
            wins: 20,
            losses: 8,
            points: 58,
            queueType: "RANKED FLEX SR"
        }
    ]

    return (
        <Container fixed>
            <Card className={classes.crdProfile}>
                <div className={classes.content}>
                    <Avatar alt="Remy Sharp" src={profileIcon} className={classes.large} />
                    <div className={classes.dprof}>
                        <Typography variant="h4">{nickname}</Typography>
                        <Typography variant="subtitle1">{server}</Typography>
                        <Typography variant="subtitle1">{level}</Typography>
                    </div>
                </div>
                <Divider />
                <div className={classes.crdRow}>
                    <Typography variant="h6">Clasificatoria</Typography>
                    <div className={classes.center}>
                        {ranks.map(rank => {
                            return <Ranked ranked={rank}></Ranked>
                        })}
                    </div>
                </div>
                <Divider />
                <div className={classes.crdRow}>
                    <Typography variant="h6">Campeones</Typography>
                    <div className={classes.center}>
                        {champs.map(champ => {
                            return <Champ info={champ}></Champ>
                        })}
                    </div> 
                </div>                    
            </Card>
        </Container>
    );
};


export default Profile;