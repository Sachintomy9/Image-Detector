import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { labelImage } from 'react-native-vision-camera-v3-image-labeling';
import { runOnJS } from 'react-native-reanimated';
import { useWorkletCallback } from 'react-native-worklets-core';

export default function Detector({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [detectedObject, setDetectedObject] = useState('');
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission to detect objects.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
      console.warn(err);
    }
  };

  const onFrameProcessed = useWorkletCallback((frame) => {
    'worklet';
    const labels = labelImage(frame);
    if (labels && labels.length > 0) {
      const highConfidenceLabel = labels.find(
        (label) => label.confidence > 0.7,
      );
      if (highConfidenceLabel) {
        runOnJS(setDetectedObject)(
          `${highConfidenceLabel.label} (${Math.round(
            highConfidenceLabel.confidence * 100,
          )}%)`,
        );
      }
    }
  }, []);

  if (!hasPermission || !device) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-white text-lg">
          {!hasPermission ? 'No camera permission' : 'Camera not available'}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        frameProcessor={onFrameProcessed}
        frameProcessorFps={5}
      />
      <TouchableOpacity
        className="absolute top-12 left-4 p-4"
        onPress={() => navigation.goBack()}>
        <Text className="text-white text-lg">← Back</Text>
      </TouchableOpacity>
      {detectedObject && (
        <View className="absolute bottom-0 w-full bg-black/75 p-4">
          <Text className="text-white text-center text-xl">
            {detectedObject}
          </Text>
        </View>
      )}
    </View>
  );
} 