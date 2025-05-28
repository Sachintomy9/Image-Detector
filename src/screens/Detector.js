import React, { useState, useEffect,useRef } from 'react'
import { View, Text,ScrollView } from 'react-native'
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera'
import { useImageLabeler } from "react-native-vision-camera-v3-image-labeling";
import { Worklets } from 'react-native-worklets-core';


export default function CameraScreen() {
  const cameraRef = useRef(null)
  const [result, setResult] = useState([])
  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice('back')

  const options = {
    minConfidence: 0.75, // You can adjust this value
  };

  const {scanImage} = useImageLabeler(options)

  useEffect(() => {
    requestPermission()
  }, [])

  const updateResults = (detected) => {
    setResult(detected);
  };

  const setResultJS = Worklets.createRunOnJS(updateResults)

 const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    const data = scanImage(frame)
	  console.log(data, 'data')
    setResultJS(data)
  }, [])
  
  if (device == null) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-lg">Camera not available</Text>
      </View>
    )
  }

  if (!hasPermission) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white text-lg">Permission denied</Text>
      </View>
    )
  }

  return (
    <View className="flex-1">
      <Camera
        ref={cameraRef}
        device={device}
        style={{ flex: 1 }}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={1} 
        className="absolute inset-0"
      />
      <View className="absolute top-10 left-5 right-5 bg-black bg-opacity-60 p-3 rounded-lg max-h-60">
        <Text className="text-white font-bold mb-2">Detected Items:</Text>
        <ScrollView>
          {result.length > 0 ? (
            result.map((item, index) => (
              <Text key={index} className="text-white">
                • {item.label} ({(item.confidence * 100).toFixed(1)}%)
              </Text>
            ))
          ) : (
            <Text className="text-white italic">No items detected yet...</Text>
          )}
        </ScrollView>
      </View>
    </View>
  )
}