import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import shirtOutline from './assets/Outlines/shirt_outline1.png';
import pantsOutline from './assets/Outlines/pants_outline1.png';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [clothingType, setClothingType] = useState(null); // New state for clothing type
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const capturePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri);
      // Handle photo storage or display here
    }
  };

  const getOverlayImage = () => {
    switch (clothingType) {
      case 'shirt':
        return shirtOutline;
      case 'pants':
        return pantsOutline; // Make sure this path is correct
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {!clothingType ? (
        <View style={styles.selectionContainer}>
          <Button title="Select Shirt" onPress={() => setClothingType('shirt')} />
          <Button title="Select Pants" onPress={() => setClothingType('pants')} />
        </View>
      ) : (
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}>
          {clothingType && (
            <Image
              source={getOverlayImage()}
              style={styles.overlay}
            />
          )}
          <View style={styles.buttonContainer}>
            <Button title="Capture Photo" onPress={capturePhoto} />
            <Button title="Change Clothing" onPress={() => setClothingType(null)} />
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  selectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 300,  // Adjust the size of your overlay image
    height: 300, // Adjust the size of your overlay image
    marginTop: -150, // Adjust based on the actual height to center
    marginLeft: -150, // Adjust based on the actual width to center
    opacity: 0.5,  // Set opacity as needed
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
});

export default CameraComponent;
