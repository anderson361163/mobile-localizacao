import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as Location from 'expo-location';

export default function HomeScreen() {

  const [location, setLocation] = useState<null | Location.LocationObject>(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão negada para acessar a localização!');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    console.log(currentLocation);
    console.log(location?.coords);


  };

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Obter Localização" onPress={getLocation} />
        {location ? (
          <Text style={{ color: 'white' }}>
            Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
          </Text>
        ) : (
          <Text>Localização não disponível</Text>
        )}
      </View>
  );
}
