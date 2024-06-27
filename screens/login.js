/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {googleSignIn} from '../utils/google';
import {create} from 'zustand';
import colors from '../utils/colors';

const useErrorStore = create(set => ({
  err: false,
  errMsg: '',
  setErr: val => set(state => ({err: val})),
  setErrMsg: msg => set(state => ({errMsg: msg})),
}));

const useUserStore = create(set => ({
  email: '',
  password: '',
  setPassword: passwd => set(state => ({password: passwd})),
  setEmail: email => set(state => ({email: email})),
}));

const Login = props => {
  const {email, password, setPassword, setEmail} = useUserStore();
  const {err, errMsg, setErr, setErrMsg} = useErrorStore();

  const validate = async () => {
    if (!email) {
      throw new Error('Email is required.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Email is invalid.');
    }

    // Validate password field
    if (!password) {
      throw new Error('Password is required.');
    } else if (password.length < 6) {
      throw new Error('Password needs to be atleast 6 characters long.');
    }
  };

  const reset = () => {
    setEmail('');
    setPassword('');
    setErr(false);
    setErrMsg('');
  };

  const login = isNew => {
    validate()
      .then(() => {
        if (isNew) {
          return auth().createUserWithEmailAndPassword(email, password);
        } else {
          return auth().signInWithEmailAndPassword(email, password);
        }
      })
      .then(() => {
        reset();
        props.navigation.navigate('TabScreen');
      })
      .catch(error => {
        setErr(true);
        setErrMsg(error.message);
      });
  };

  const loginWithGoogle = async () => {
    await googleSignIn().then(() => {
      reset();
      props.navigation.navigate('TabScreen');
    });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo-3.png')} />
        <Text variant="displayMedium" style={{fontWeight: 'bold'}}>
          Sign in
        </Text>
        <Text
          variant="labelLarge"
          style={{color: colors.GRAY_TXT, marginBottom: '5%'}}>
          Stay updated on your professional world
        </Text>
        <TextInput
          mode="outlined"
          label="Email"
          textContentType="emailAddress"
          error={err}
          value={email}
          style={styles.input}
          activeOutlineColor="white"
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          mode="outlined"
          label="Password"
          textContentType="password"
          secureTextEntry={true}
          error={err}
          value={password}
          style={styles.input}
          activeOutlineColor="white"
          onChangeText={password => setPassword(password)}
        />
        {err ? (
          <Text variant="titleSmall" style={{color: 'rgb(255, 180, 171)'}}>
            {errMsg}
          </Text>
        ) : (
          <></>
        )}
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => login(false)}>
          <Text
            variant="titleMedium"
            style={{color: colors.BLACK_BG, fontSize: 19}}>
            Sign in
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: colors.GRAY_TXT,
            }}
          />
          <View>
            <Text
              style={{
                width: 50,
                textAlign: 'center',
                color: colors.GRAY_TXT,
              }}>
              or
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: colors.GRAY_TXT,
            }}
          />
        </View>
        <Text
          variant="labelLarge"
          style={{color: colors.GRAY_TXT, marginTop: '5%'}}>
          By clicking Continue to join or sign in, you agree to LinkedIn’s User
          Agreement, Privacy Policy, and Cookie Policy
        </Text>
        <TouchableOpacity
          style={styles.googleSignInButton}
          onPress={loginWithGoogle}>
          <Image
            source={require('../assets/google.png')}
            resizeMode="contain"
            style={{flex: 0.2}}
          />
          <Text style={{fontSize: 19, marginHorizontal: '5%'}}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '5%',
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 19}}>New to LinkedIn? </Text>
          <TouchableOpacity
            style={{backgroundColor: 'transparent'}}
            onPress={() => login(true)}>
            <Text style={{fontSize: 19, color: '#71b7fb', fontWeight: 'bold'}}>
              Join now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingHorizontal: '7%',
  },
  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '85%',
  },
  logo: {
    width: '40%',
    height: '8%',
    marginVertical: '5%',
    marginLeft: '1%',
    resizeMode: 'contain',
  },
  input: {
    backgroundColor: 'transparent',
    marginVertical: '2.5%',
    width: '100%',
  },
  signInButton: {
    marginVertical: '5%',
    backgroundColor: colors.LIGHT_BLUE,
    width: '100%',
    height: '7%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleSignInButton: {
    marginVertical: '10%',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent',
    width: '100%',
    height: '7%',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
