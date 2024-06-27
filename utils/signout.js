import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {storage} from './storage';

const signOut = async () => {
  try {
    console.log('Signing out...');
    await GoogleSignin.signOut();
    storage.clearAll();
  } catch (err) {
    console.log('Error signing out:', err);
  }
};

export default signOut;
