import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: '',
    CliendId: ''
}

export default new CognitoUserPool(poolData);