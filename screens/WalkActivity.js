import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const WalkActivity = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [path, setPath] = useState([]);
  const [isWalking, setIsWalking] = useState(false);

  useEffect(() => {
    let locationSubscription;

    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return false;
      }
      return true;
    };

    const startWalk = async () => {
      const hasPermission = await requestLocationPermission();

      if (!hasPermission) {
        // Handle the case where permission is not granted
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          setLocation({ latitude, longitude });

          // Update the path for drawing on the map
          setPath((prevPath) => [...prevPath, { latitude, longitude }]);
        }
      );
    };

    const stopWalk = () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
      setIsWalking(false);
    };

    if (isWalking) {
      startWalk();
    } else {
      stopWalk();
    }

    return () => {
      // Cleanup: unsubscribe from location updates when the component is unmounted
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [isWalking]);

  const startStopToggle = () => {
    setIsWalking((prevIsWalking) => !prevIsWalking);
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.latitude.toFixed(6)}, Longitude: ${location.longitude.toFixed(6)}`;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        followsUserLocation
        region={{
          latitude: location ? location.latitude : 37.78825,
          longitude: location ? location.longitude : -122.4324,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {/* Display the path as a Polyline */}
        {path.length > 1 && <Polyline coordinates={path} strokeColor="#00F" strokeWidth={2} />}
      </MapView>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity style={styles.button} onPress={startStopToggle}>
        <Text style={styles.buttonText}>{isWalking ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  text: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 8,
    borderRadius: 8,
  },
  button: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WalkActivity;
