import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import { useImageLabeler } from 'react-native-vision-camera-v3-image-labeling';
import { runOnJS } from 'react-native-reanimated';

export const Detector = () => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [scanning, setScanning] = useState(false);
  const [detectedLabel, setDetectedLabel] = useState('');

  const { scanImage } = useImageLabeler({ minConfidence: 0.1 });

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const handleLabel = (label) => {
    setDetectedLabel(label);
  };

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    if (!scanning) return;
    const result = scanImage(frame);
    if (result.length > 0) {
      runOnJS(handleLabel)(result[0].label);
    }
  }, [scanning]);

  if (!device || !hasPermission) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-lg">Loading camera...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
      <View className="absolute bottom-20 w-full items-center">
        <Text className="text-white text-xl mb-4 font-semibold">Detector Screen</Text>
        <Pressable
          onPress={() => setScanning((prev) => !prev)}
          className="bg-blue-500 px-6 py-3 rounded-xl shadow-md"
        >
          <Text className="text-white text-base font-semibold">
            {scanning ? 'STOP' : 'SCAN'}
          </Text>
        </Pressable>
        {detectedLabel !== '' && (
          <Text className="text-white text-lg mt-4">Detected: {detectedLabel}</Text>
        )}
      </View>
    </View>
  );
};
export default Detector;