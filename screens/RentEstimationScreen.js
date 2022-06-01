import { Dimensions, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import RateHeader from '../components/RateHeader';
import Slider from '@sharcoux/slider'
import { IconButton } from 'react-native-paper';
import Tooltip from 'react-native-walkthrough-tooltip';
import uuid from 'react-native-uuid';
import { auth, uploadPhotoAsync} from '../firebase';
import client from '../api/client';

const RentEstimationScreen = ({route}) => {
  const details = route.params.data;
  const carDetails = details.carDetails;
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

  const [showTip, setShowTip] = useState(true);

  const [rent, setRent] = useState(details.estRent);

  const addCar = async () => {
    try {
        auth.onAuthStateChanged(async user => {
            if (user) {
                const uid = user.uid;
                const imageId = uuid.v4();
                var tempImg = '';
                const image = carDetails.image;
                await uploadPhotoAsync(image, `cars/${imageId}`)
                    .then((downloadUrl) => {
                        tempImg = downloadUrl;
                    })
                const remoteUri = tempImg;

                const res = await client.get(`/users/${uid}`);
                const username = res.data.user.name;
                console.log(username);

                const tempCarId = uuid.v4();
                const carId = tempCarId;

                const car = {
                    _id: carId,
                    owner: uid,
                    ownerName: username,
                    make: carDetails.carMake,
                    model: carDetails.carModel,
                    version: carDetails.carVersion,
                    modelYear: carDetails.modelYear,
                    mileage: carDetails.mileage,
                    carType: carDetails.carType,
                    picture: remoteUri,
                    damages: details.damages,
                    engineCapacity: carDetails.engineCapacity,
                    engineType: carDetails.engineType,
                    transmissionType: carDetails.transmissionType,
                    pickupCity: carDetails.pickupCity,
                    location: carDetails.currentPosition,
                    rate: rent,
                    carPrice: carDetails.carPrice,
                }

                console.log(car)

                await client.post('/cars', {
                  ...car,
                })
                console.log(car.modelYear, '', car.make, '', car.model, ' Added Successfully ');
                navigation.navigate('AddCarSuccess');
            }
        })
    }catch(error){
        alert(error.message);
    }
  }

  const handleSubmitRent = () => {
    navigation.navigate('CarDocumentsSubmission', {
      data: {
        carDetails: details,
        rent: rent,
      }
    })
  }

  return (
    <View style={styles.container}>
      <RateHeader navigation={navigation} width={screenWidth} route={details}/>
      <View style={styles.viewContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>SET RENT</Text>
          <Text style={styles.headerText}>Rs. {rent} /day</Text>
        </View>
        <View>
          <View style={{alignSelf: 'flex-end'}}>
            <Tooltip
              isVisible={showTip}
              content={
                <View>
                  <Text style={{textAlign: 'center'}}>The Slider shows an Estimated Range of your rent that is suitable for the Car Details you've given.</Text>
                  <Text style={{textAlign: 'center'}}>Choose from this Slider to have a suitable for your car.</Text>
                </View>
              }
              onClose={() => setShowTip(false)}
              placement='top'
              topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
            >
              <IconButton
                icon="help-circle"
                color='#0782F9'
                size={20}
                onPress={() => setShowTip(true)} 
              />
            </Tooltip>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              style={{width: 300, height: 10}}
              value={rent}
              minimumValue={details.minRent}
              maximumValue={details.maxRent}
              onValueChange={(value) => setRent(Math.floor(value))}
              minimumTrackTintColor='#60d405'
              maximumTrackTintColor='#f52d05'
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
              vertical= {false}
              step={10}
            />
          </View>
          <View style={{flexDirection: 'row', alignContent: 'space-between', opacity: 0.5}}>
            <Text style={{marginRight: 190}}>Rs. {details.minRent}</Text>
            <Text>Rs. {details.maxRent}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
              onPress={addCar}
              style={styles.button}
          >
              <Text style={styles.buttonText}>Submit Rent</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default RentEstimationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width-60,
    height: Dimensions.get('window').height-120,
  },
  headerContainer: {
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    position: 'absolute', 
    top: 20
  },
  headerText:{
    fontWeight: '800',
    fontSize: 30,
    color: '#0782F9',
    fontWeight: 'bold'
  },
  sliderContainer: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumb: {
    backgroundColor: '#0782F9',
    borderRadius: 1,
    height: 30,
    width: 20,
  },
  track: {
    borderRadius: 10,
    height: 18,
  },
  buttonContainer: {
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    position: 'absolute', 
    bottom: 10
  },
  button: {
    backgroundColor: '#0782F9',
    width: 300,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'flex-end'
  },
  buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16
  },
})