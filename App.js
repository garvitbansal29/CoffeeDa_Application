import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {} from 'react-native';

import SignIn from './Screens/stacks/Signin';
import SignUp from './Screens/stacks/Signup';
import Search from './Screens/tabs/Search';
import Favourite from './Screens/tabs/Favourite';
import Settings from './Screens/tabs/Settings';
import SearchResult from './Screens/stacks/SearchResult';
import LocationReviews from './Screens/stacks/LocationReview';
import Colours from './Components/ColourPallet';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const App = () => {
  function returnSearchRes() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen name="SearchResult" component={SearchResult} />
        <Stack.Screen name="LocationReviews" component={LocationReviews} />
      </Stack.Navigator>
    );
  }
  function Home() {
    return (
      <Tab.Navigator barStyle={{backgroundColor: Colours.accent}}>
        <Tab.Screen
          name="Search"
          component={returnSearchRes}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="feature-search"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favourite"
          component={Favourite}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="cards-heart"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Settings}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="account-settings"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{title: 'Coffee Da'}}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
