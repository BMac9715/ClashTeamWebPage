import axios from 'axios';

export function TranslateText(text){

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
    })
}