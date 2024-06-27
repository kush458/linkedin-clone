import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {storage} from './storage';

const webClientId = require('./config.json').webClientId;
const data = ['profile', 'email'];

GoogleSignin.configure({scopes: data, webClientId: webClientId});

const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    storage.set('googleInfo', JSON.stringify(userInfo));
  } catch (err) {
    console.log('Google Sign In Error: ', err);
  }
};

export {googleSignIn};
