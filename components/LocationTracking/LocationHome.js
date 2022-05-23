import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import React, {useRef} from 'react';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const googleApiKey = 'AIzaSyCehTiHyabP2UeQKY09u8E18wS3BBc3Bvo';
const cureentMarker = require('../../assets/Images/greenMarker.png');
const bike = require('../../assets/Images/bike.png');
const indicator = require('../../assets/Images/greenIndicator.png');
import {getLocation, locationPermission} from './helper/HelperFunction';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LocationHome = ({navigation}) => {
  const [state, setState] = React.useState({
    curLoc: {
      latitude: 33.7001502,
      longitude: 73.0633943,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    destinationCords: {},
    coordinate: new AnimatedRegion({
      latitude: 33.7001502,
      longitude: 73.0633943,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    heading: 0
  });

  const {curLoc, destinationCords, coordinate, heading} = state;
  const mapRef = useRef();
  const markerRef = useRef();

  const onPressLocation = () => {
    navigation.navigate('chooseLocation', {getCoordinates: fetchValues});
  };

  const onCenter = () => {
        mapRef.current.animateToRegion({
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }

  const fetchValues = data => {
    updateState({
      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      },
    });
    console.log("My State: ", state);
  };

  const getCurrentLocation = async () => {
    const permissionDenied = await locationPermission();
    if (permissionDenied) {
      const {latitude, longitude, heading} = await getLocation();
      animate(latitude, longitude);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
        coordinate: new AnimatedRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
      });
    }
  };

  const updateState = data => setState(state => ({...state, ...data}));

  React.useEffect(() => {
    const interval = setInterval(() => {
      getCurrentLocation();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            ...curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker.Animated
            ref={markerRef}
            coordinate={coordinate}
          >
            <Image
                            source={bike}
                            style={{
                                width: 40,
                                height: 40,
                                transform: [{rotate: `${heading}deg`}]
                            }}
                            resizeMode="contain"
                        />
          </Marker.Animated>
          {Object.keys(destinationCords).length > 0 && (
            <Marker coordinate={destinationCords} image={cureentMarker} />
          )}
          {Object.keys(destinationCords).length > 0 && (
            <MapViewDirections
              origin={curLoc}
              destination={destinationCords}
              apikey={googleApiKey}
              strokeWidth={3}
              strokeColor="hotpink"
              optimizeWaypoints={true}
              //   onReady = {result => {
              //     mapRef.current.fitToCoordinates(result.coordinates, {
              //         edgePadding: {
              //           right: 300,
              //           bottom: 300,
              //           left: 30,
              //           top: 100,
              //         }
              //       });
              //   }}
            />
          )}
        </MapView>
        <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                    }}
                    onPress={onCenter}
                >
                    <Image source={indicator} />
                </TouchableOpacity>
      </View>
      <View style={styles.bottomCard}>
        <Text>Where are you going?...</Text>
        <TouchableOpacity style={styles.button} onPress={onPressLocation}>
          <Text>Choose Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});
