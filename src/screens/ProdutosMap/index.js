import React, {useState, useContext} from 'react';
import {StyleSheet, View, Alert, TouchableHighlight, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {colors} from '../../assets/colors';
import {ProdutosContext} from '../../context/ProdutosProvider';
import Icon from 'react-native-vector-icons/Ionicons';

const ProdutosMap = ({route}) => {
  const [mapType, setMapType] = useState('standard');
  const {produtos} = useContext(ProdutosContext);

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    text: {
      fontSize: 20,
      color: mapType === 'standard' ? colors.primary : colors.white,
    },
    button: {
      width: '35%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff0',
      padding: 10,
      margin: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: mapType === 'standard' ? colors.primary : colors.white,
    },
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        ref={map => (this.map = map)}
        style={styles.map}
        mapType={mapType}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={e => {
          route.params.onGoBack(
            e.nativeEvent.coordinate.latitude,
            e.nativeEvent.coordinate.longitude,
          );
          Alert.alert(
            'Coordenadas',
            'latitude= ' +
              e.nativeEvent.coordinate.latitude +
              ' longitude= ' +
              e.nativeEvent.coordinate.longitude,
          );
        }}
        initialRegion={{
          //região onde deve focar o mapa na inicialização
          latitude: -31.766108372781073,
          longitude: -52.35215652734042,
          latitudeDelta: 0.015, //baseado na documentação
          longitudeDelta: 0.0121, //baseado na documentação
        }}>
        {produtos.map(produto => {
          return (
            <Marker
              key={produto.id}
              coordinate={{
                latitude: Number(produto.latitude),
                longitude: Number(produto.longitude),
              }}
              title={produto.modelo}
              description={produto.categoria}
              draggable>
              <Icon
                name="business"
                color={mapType === 'standard' ? colors.primary : colors.white}
                size={35}
              />
            </Marker>
          );
        })}
      </MapView>
      <TouchableHighlight
        style={styles.button}
        onPress={() =>
          mapType === 'standard'
            ? setMapType('satellite')
            : setMapType('standard')
        }>
        <Text style={styles.text}>
          {mapType === 'standard' ? 'Padrão' : 'Satélite'}
        </Text>
      </TouchableHighlight>
    </View>
  );
};
export default ProdutosMap;
