import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={require('../screens/Welcome').default} />
            <Stack.Screen name="Detector" component={require('../screens/Detector').default} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator
