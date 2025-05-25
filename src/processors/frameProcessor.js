// src/processors/frameProcessor.js

// This is your custom frame processor that wraps the native function
export function scanImageLabeling(frame, options = {}) {
  'worklet';

  // Call the native image labeling worklet registered under __labelImage
  return __labelImage(frame, options);
}
