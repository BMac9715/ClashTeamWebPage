import { CognitoUser, AuthenticationDetails, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const UserPool = () => {
    const poolData = {
        UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
        ClientId: process.env.REACT_APP_COGNITO_CLIEND_ID
    };
    
    return new CognitoUserPool(poolData);
}

export const SignInCognito = (email, password) => {
    const user = new CognitoUser({
        Username: email,
        Pool: UserPool()
    });

    const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
    })

    return new Promise((resolve, reject)=>{
        user.authenticateUser(authDetails, {
            onSuccess: data => {
                localStorage.setItem('summonerName', data.idToken.payload.nickname);
                localStorage.setItem('accessToken', data.accessToken.jwtToken);
                localStorage.setItem('refreshToken', data.refreshToken.token);
                localStorage.setItem('expiration', data.idToken.payload.exp.toString() + '000');
                resolve(data)
            },
            onFailure: err => reject(err),
            newPasswordRequired: data => resolve(data)
        });
    });
}

export const SignUpCognito = (email, password, name, lastname, nickname) => {
    const pool = UserPool();

    var dataName = { "Name": "name", "Value": name };
    var dataFamilyName = { "Name": "family_name", "Value": lastname };
    var dataNickName = { "Name": "nickname", "Value": nickname }
    var dataEmail = {   "Name": "email", "Value": email}

    var attributes = [];

    attributes.push(new CognitoUserAttribute(dataNickName));
    attributes.push(new CognitoUserAttribute(dataName));
    attributes.push(new CognitoUserAttribute(dataFamilyName));
    attributes.push(new CognitoUserAttribute(dataEmail));

    return new Promise((resolve, reject) => {
        pool.signUp(nickname, password, attributes, null, (err, data) => {
            if(err) return reject(err)
            resolve(data)
        });
    });   
}

export const ConfirmRegistration = (cognitoUser, code) => {

    return new Promise((resolve, reject)=>{
        cognitoUser.confirmRegistration(code, true, (err, data) =>{
            if(err) reject(err)
            resolve(data)
        })
    });
}

export const ForgotPassword = (email) => {
    
    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: UserPool()
    });

    return new Promise((resolve, reject)=>{
        cognitoUser.forgotPassword({
            onFailure: err => reject(err),
            inputVerificationCode: ()=> {
                resolve({
                    'message': 'Se ha enviado el código de recuperación de contraseñas'
                })
            }
        });
    });
}

export const ConfirmPassword = (email, code, password) => {
    
    const cognitoUser = new CognitoUser({
        Username: email,
        Pool: UserPool()
    });

    return new Promise((resolve, reject)=>{
        cognitoUser.confirmPassword( code, password, {
            onSuccess: data => resolve(data),
            onFailure: err => reject(err)
        });
    });
}