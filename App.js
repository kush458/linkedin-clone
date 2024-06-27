/* eslint-disable react-native/no-inline-styles */
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {MD3DarkTheme, PaperProvider} from 'react-native-paper';
import Feed from './screens/feed';
import Profile from './screens/profile';
import Settings from './screens/settings';
import Login from './screens/login';
import {NavigationContainer} from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      activeColor="white"
      inactiveColor="#71797E"
      backBehavior="none"
      theme={{colors: {secondaryContainer: '#3b4252'}}}
      barStyle={{backgroundColor: '#1b1f23'}}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <FaIcon name="user-circle" size={25} />,
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: () => <IonIcon name="newspaper-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: () => <IonIcon name="settings-sharp" size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="TabScreen" component={TabScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <PaperProvider theme={MD3DarkTheme}>
      <NavigationContainer>
        <StatusBar barStyle={'light-content'} />
        <AppStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
