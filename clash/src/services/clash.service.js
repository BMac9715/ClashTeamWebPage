import axios from 'axios';

export const TranslateText = (text) => {

    return new Promise((resolve, reject) =>{
        axios.post(process.env.REACT_APP_URL_CLASH_API + '/translate',
        {
            'text': text,
            'source_language': 'en',
            'target_language': 'es-MX'
        }
        ,
        {
            'headers' :{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept', 
                'Authorization': process.env.REACT_APP_CLASH_API_KEY 
            }
        }
        )
        .then( data => {
            resolve(data.data.translation);
        })
        .catch( err => {
            reject(err);
        });
    });
}

export const CreateTeamClash = (team) => {
    
    return new Promise((resolve, reject) =>{
        axios.post(process.env.REACT_APP_URL_CLASH_API + '/teams',
        team,
        {
            'headers' :{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept', 
                'Authorization': process.env.REACT_APP_CLASH_API_KEY 
            }
        }
        )
        .then( data => {
            resolve(data);
        })
        .catch( err => {
            reject(err);
        });
    });
}

export const UpdateTeamClash = (id_team, team) => {
    return new Promise((resolve, reject) =>{
        axios.put(process.env.REACT_APP_URL_CLASH_API + '/teams/' + id_team,
        team,
        {
            'headers' :{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept', 
                'Authorization': process.env.REACT_APP_CLASH_API_KEY 
            }
        }
        )
        .then( data => {
            resolve(data);
        })
        .catch( err => {
            reject(err);
        });
    });
}

export const GetTeamClashByOwner = (owner_id) => {
    return new Promise((resolve, reject) =>{
        axios.get(process.env.REACT_APP_URL_CLASH_API + '/teams/' + owner_id,
        {
            'headers' :{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept', 
                'Authorization': process.env.REACT_APP_CLASH_API_KEY 
            }
        }
        )
        .then( data => {
            resolve(data);
        })
        .catch( err => {
            reject(err);
        });
    });
}

export const GetTeamsClash = () => {
    return new Promise((resolve, reject) =>{
        axios.get(process.env.REACT_APP_URL_CLASH_API + '/teams',
        {
            'headers' :{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept', 
                'Authorization': process.env.REACT_APP_CLASH_API_KEY 
            }
        }
        )
        .then( data => {
            resolve(data);
        })
        .catch( err => {
            reject(err);
        });
    });
}

export const GetTeamClash = (uuid) => {
    return new Promise((resolve, reject) =>{
        axios.get(process.env.REACT_APP_URL_CLASH_API + '/team/' + uuid,
        {
            'headers' :{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept', 
                'Authorization': process.env.REACT_APP_CLASH_API_KEY 
            }
        }
        )
        .then( data => {
            resolve(data);
        })
        .catch( err => {
            reject(err);
        });
    });
}

export const DeleteTeamClash = (id_team) => {
    return new Promise((resolve, reject) =>{
        axios.delete(process.env.REACT_APP_URL_CLASH_API + '/teams/' + id_team,
        {
            'headers' :{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept', 
                'Authorization': process.env.REACT_APP_CLASH_API_KEY 
            }
        }
        )
        .then( data => {
            resolve(data);
        })
        .catch( err => {
            reject(err);
        });
    });
}

export const CreateRequestClash = (request) => {
    return new Promise((resolve, reject) =>{
        axios.post(process.env.REACT_APP_URL_CLASH_API + '/requests',
        request,
        {
            'headers' :{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept', 
                'Authorization': process.env.REACT_APP_CLASH_API_KEY 
            }
        }
        )
        .then( data => {
            resolve(data);
        })
        .catch( err => {
            reject(err);
        });
    });
}

export const UpdateRequestClash = (id_request, request) => {
    return new Promise((resolve, reject) =>{
        axios.put(process.env.REACT_APP_URL_CLASH_API + '/requests/' + id_request,
        request,
        {
            'headers' :{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept', 
                'Authorization': process.env.REACT_APP_CLASH_API_KEY 
            }
        }
        )
        .then( data => {
            resolve(data);
        })
        .catch( err => {
            reject(err);
        });
    });
}

export const DeleteRequestClash = (id_request) =>{
    return new Promise((resolve, reject) =>{
        axios.delete(process.env.REACT_APP_URL_CLASH_API + '/requests/' + id_request,
        {
            'headers' :{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept', 
                'Authorization': process.env.REACT_APP_CLASH_API_KEY 
            }
        }
        )
        .then( data => {
            resolve(data);
        })
        .catch( err => {
            reject(err);
        });
    });
}

export const GetRequestsTeam = (id_team) => {
    return new Promise((resolve, reject) =>{
        axios.get(process.env.REACT_APP_URL_CLASH_API + '/requests/' + id_team,
        {
            'headers' :{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept', 
                'Authorization': process.env.REACT_APP_CLASH_API_KEY 
            }
        }
        )
        .then( data => {
            resolve(data);
        })
        .catch( err => {
            reject(err);
        });
    });
}

export const GetLeaguesFromRedis = () => {

    return new Promise((resolve, reject) =>{
        axios.get(process.env.REACT_APP_URL_CLASH_API + '/leagues',
        {
            'headers' :{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept', 
                'Authorization': process.env.REACT_APP_CLASH_API_KEY 
            }
        }
        )
        .then( data => {
            resolve(data.data.data);
        })
        .catch( err => {
            reject(err);
        });
    });
}
