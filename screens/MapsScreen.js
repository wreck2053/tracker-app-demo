import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Alert, Text, StyleSheet, View } from "react-native";
import * as Location from "expo-location";

const markerRegion = {
  latitude: 13.5,
  longitude: 80,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

export default function MapsScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the user's current location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
      setLoading(false);
    })();
  }, []);

  const initialRegion = {
    latitude: userLocation?.latitude,
    longitude: userLocation?.longitude,
    latitudeDelta: markerRegion.latitudeDelta,
    longitudeDelta: markerRegion.longitudeDelta,
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker
          coordinate={markerRegion}
          title="Your Location"
          onPress={() => Alert.alert("Destination Location")}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
