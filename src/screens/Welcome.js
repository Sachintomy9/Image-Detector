import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';


const WelcomeScreen = () => {
  const navigation = useNavigation();

  const goToDetector = () => {
    navigation.navigate('Detector');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4 ">
      <Text className="text-3xl text-center mb-4 ">Welcome to the Object Detector App</Text>
      <Text className="text-lg text-center mb-6">This is a app is made by Sachin Tomy.</Text>
      <Pressable
        onPress={goToDetector}
        className="bg-blue-500 px-4 py-2 rounded shadow-md ">
        <Text className="text-white text-base font-medium ">Get Started</Text>
      </Pressable>
    </View>
  );
};

export default WelcomeScreen;
// This code defines a simple welcome screen for a React Native application using Tailwind CSS for styling.