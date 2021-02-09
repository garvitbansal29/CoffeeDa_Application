import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {} from 'react-native';

import SignIn from './Screens/stacks/Signin';
import SignUp from './Screens/stacks/Signup';
import Search from './Screens/tabs/Search';
import Favourite from './Screens/tabs/Favourite';
import Settings from './Screens/tabs/Settings';
import SearchResult from './Screens/stacks/SearchResult';
import LocationReviews from './Screens/stacks/LocationReview';
import EnterReviewScreen from './Screens/stacks/EnterReview';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  function Home() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Favourite" component={Favourite} />
        <Tab.Screen name="Settings" component={Settings} />
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
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  //REMOVE THIS AND UNCOMMENT PREVIOUS COMMENTED SECTION - ALL OF IT

  // function returnSearchRes() {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen name="Search" component={Search} />
  //       <Stack.Screen name="SearchResult" component={SearchResult} />
  //       <Stack.Screen name="LocationReviews" component={LocationReviews} />
  //       <Stack.Screen name="EnterReviewScreen" component={EnterReviewScreen} />
  //     </Stack.Navigator>
  //   );
  // }
  // return (
  //   <NavigationContainer>
  //     <Tab.Navigator>
  //       <Tab.Screen name="returnSearch" component={returnSearchRes} />
  //       <Tab.Screen name="Favourite" component={Favourite} />
  //       <Tab.Screen name="Settings" component={Settings} />
  //     </Tab.Navigator>
  //   </NavigationContainer>
  // );
};

export default App;
