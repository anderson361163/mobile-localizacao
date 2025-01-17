import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';

const App = () => {
  const [location, setLocation] = useState<null | Location.LocationObject>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const referencePoint = { latitude: -23.56411, longitude: -46.6524 }; // Ponto de referência

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão negada para acessar a localização!');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

    const distance = getDistance(
      { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude },
      referencePoint
    );
    setDistance(distance / 1000); // Converte de metros para quilômetros
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Obter Localização" onPress={getLocation} />
      {location && (
        <Text style={{color:'white'}}>
          Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
        </Text>
      )}
      {distance !== null ? (
        <Text style={{color:'white'}}>
          A distância até o ponto de referência é: {distance.toFixed(2)} km
        </Text>
      ):(
          <Text style={{color:'white'}}>Localização não disponível</Text>
      )
      }
    </View>
  );
};

export default App;
