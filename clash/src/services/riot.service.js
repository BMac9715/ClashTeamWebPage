import axios from 'axios';
import { TranslateText } from '../services/clash.service';

export function GetCalendars(){

    return new Promise((resolve, reject) => {
        axios.get(process.env.REACT_APP_URL_PLATFORM_RIOT_API 
            + '/lol/clash/v1/tournaments?api_key=' 
            + process.env.REACT_APP_RIOT_API_KEY,
        {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept',   
        }
        )
        .then(data => {
            var tournaments = [];
            var promises = [];
 
            data.data.forEach(element => {
                let f = new Date(element.schedule[0].startTime);
                
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                promises.push (
                    TranslateText(element.nameKey.replaceAll('_', ' ') 
                    + ' - ' + element.nameKeySecondary.replaceAll('_', ' '))
                    .then( data => {
                        tournaments.push({
                            'name': 'COPA ' + data.toUpperCase(),
                            'schedule': f.toLocaleDateString('es-GT', options).toUpperCase(),
                            'time': element.schedule[0].startTime
                        });
                    })
                    .catch( err => reject(err))
                );    
            });

            Promise.all(promises)
            .then( () => {
                tournaments.sort((a,b) =>{
                    return new Date(a.time) - new Date(b.time);
                });
                resolve(tournaments) 
            })
            .catch( (err) => reject(err));
        })
        .catch(err => {
            reject(err);
        });
    });
}

export function GetGeneralInformation(summonername){
    return new Promise((resolve, reject) => {
        axios.get(process.env.REACT_APP_URL_PLATFORM_RIOT_API
            + '/lol/summoner/v4/summoners/by-name/'
            + summonername.trim() 
            + '?api_key=' + process.env.REACT_APP_RIOT_API_KEY,
            {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept',   
            }
        )
        .then( data => {
            resolve(data.data);
        })
        .catch( err => {
            reject(err);
        });
    });
};

export function GetChampionsPool(summoner_id){
   return new Promise((resolve, reject) => {
        axios.get(process.env.REACT_APP_URL_PLATFORM_RIOT_API
            + '/lol/champion-mastery/v4/champion-masteries/by-summoner/'
            + summoner_id
            + '?api_key=' + process.env.REACT_APP_RIOT_API_KEY,
            {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept',   
            } 
        )
        .then( data => {
            resolve(data.data);
        })
        .catch( err => {
            reject(err);
        });
    });
};

export function GetRankedsInformation(summoner_id){
    return new Promise((resolve, reject) => {
        axios.get(process.env.REACT_APP_URL_PLATFORM_RIOT_API
            + '/lol/league/v4/entries/by-summoner/'
            + summoner_id 
            + '?api_key=' + process.env.REACT_APP_RIOT_API_KEY)
        .then( data => {
            resolve(data.data);
        })
        .catch( err => {
            reject(err);
        });
    });
};

export function GetChampionInfo (champs) {

   return new Promise((resolve, reject) => {
    axios.get(process.env.REACT_APP_DATA_DRAGON_CHAMPS_INFO)
    .then( data => {
        var pool = Object.values(data.data.data);
        var info = [];

        pool.forEach(element => {        
            champs.forEach( chmp =>{
                if( parseInt(element.key) === parseInt(chmp.championId)){
                    info.push({
                        'championName': element.name,
                        'championPoints': chmp.championPoints,
                        'chchampionLevelamp': chmp.championLevel,
                        'icon': process.env.REACT_APP_DATA_DRAGON_URL_CHAMPS_ICONS + '/' + element.image.full
                    });
                }
            });      
        });
        
        resolve(info);
    })
    .catch( err => {
        reject(err);
    });
});

};

export function GetCompleteProfile(summonername){
    
    return new Promise((resolve, reject) => {
        GetGeneralInformation(summonername)   
        .then( dataInf => {

            var prof = {
                'summonerId': '',
                'nickname': '',
                'server': 'Latinoamerica Norte (LAN)',
                'level': '',
                'profileIcon': '',
                'ranks': [],
                'champs': []
            };

            GetRankedsInformation(dataInf.id)         
            .then( dataRnk => {
                GetChampionsPool(dataInf.id)      
                .then( dataPool =>{

                    /* Order by champions points (descending) */
                    dataPool.sort((a,b)=>{
                        return parseInt(b.championPoints) - parseInt(a.championPoints);
                    })

                    GetChampionInfo(dataPool.slice(0,7))
                    .then( dataChmp =>{
                        /* Build object for response */
                        /* 1. General Information */
                        prof.summonerId = dataInf.id;
                        prof.nickname = dataInf.name;
                        prof.level = 'Nivel ' + dataInf.summonerLevel;
                        prof.profileIcon = process.env.REACT_APP_DATA_DRAGON_URL_PROFILE_ICONS + '/' + dataInf.profileIconId + '.png';
                        
                        /* 2. Rankeds Information */
                        dataRnk.forEach(element =>{
                            prof.ranks.push({
                                'queueType': element.queueType,
                                'tier': element.tier,
                                'rank': element.tier + ' ' + element.rank,
                                'wins': element.wins,
                                'losses': element.losses,
                                'points': element.leaguePoints
                            })
                        });

                        /* 3. Champions Mastery Information */
                        prof.champs = dataChmp;

                        prof.champs.sort((a,b)=>{
                            return parseInt(b.championPoints) - parseInt(a.championPoints);
                        })

                        resolve(prof);
                    })         
                    .catch( errChmp =>{
                        reject(errChmp);
                    });
                })           
                .catch( errPool =>{
                    reject(errPool);
                });
            })
            .catch( errRnk => {
                reject(errRnk);
            });
        })
        .catch( errInf => {
            reject(errInf);
        });
    });   
}
