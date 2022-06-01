import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DrawerNav from './navigation/DrawerNav';
import CarDetailsRenter from './screens/CarDetailsRenter';
import CarDetailsOwner from './screens/CarDetailsOwner';
import BookCar from './screens/BookCar';
import EditCar from './screens/EditCar';
import AddComplaint from './screens/AddComplaint';
import AddComplaintConfirm from './screens/AddComplaintConfirm';
import NegotiationBiddingOwner from './screens/NegotiationBiddingOwner';
import NegotiationBiddingRenter from './screens/NegotiationBiddingRenter';
import NegotiationBiddingSuccess from './screens/NegotiationBiddingSuccess';
import ChatScreen from './screens/Chat';
import AllChats from './screens/AllChats';
import Map from './screens/Map';
import BookingSuccess from './screens/BookingSuccess';
import DamageControlForm from './screens/DamageControlForm';
import RentEstimationScreen from './screens/RentEstimationScreen';
import AddCarSuccess from './screens/AddCarSuccess';
import CarDocumentsSubmission from './screens/CarDocumentsSubmission';
import EditMap from './screens/EditMap';
import EditDamageControlForm from './screens/EditDamageControlForm';
import EditRentEstimationScreen from './screens/EditRentEstimationScreen';
import EditCarSuccess from './screens/EditCarSuccess';
// import ScanbotSDK, { InitializationOptions } from 'react-native-scanbot-sdk';
// import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

// const LICENSE_KEY =
//   "EEc83ewJIUbTiZZW7fB8cSALzTZR3I" +
//   "APqxPX/xk7moaye6OBdJH6XIkUjnsU" +
//   "FLFAgkfNgrYM8qBIaZm+9MfRvFuqOg" +
//   "2XXCsGCoNWUxUip9eCPYWQc+wKeA9f" +
//   "/a0lR4YUh1GoWHbgo33CT3sqArv0aO" +
//   "xePPzSD3fGBj+hAr7FeRITgvmg6D6x" +
//   "a0Lhyp/So4D1pKQWzKf5nbtgawUXTD" +
//   "UwbKkjzqeXnvf+vnrxaxoQG29nfnpk" +
//   "Jg6otRMHOEx0ZWv29ZNJ07PpRn8lvc" +
//   "tUA3Y4yPX6goxbSRgZyxtUYmc5oajR" +
//   "+i7ODVpA7qp47oWiOuPXET/C4SbXw+" +
//   "dXc0/w67P/HQ==\nU2NhbmJvdFNESw" +
//   "pjb20ucmVudEFDYXIucmVudEFDYXJB" +
//   "cHAKMTY1NDY0NjM5OQo4Mzg4NjA3Cj" +
//   "M=\n";

export default function App() {
  // useEffect(() => {
  //   const initScanbot = async() => {
  //     const options = {
  //       licenseKey: LICENSE_KEY,
  //       loggingEnabled: true,
  //     };
  //     let result = await ScanbotSDK.initializeSDK(options);
  //     console.log(result.result);
  //   }
  //   initScanbot();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{headerShown: false}} name="DrawerNav" component={DrawerNav} />
        <Stack.Screen options={{headerShown: false}} name="CarDetailsRenter" component={CarDetailsRenter} />
        <Stack.Screen options={{headerShown: false}} name="CarDetailsOwner" component={CarDetailsOwner} />
        <Stack.Screen options={{headerShown: false}} name="BookCar" component={BookCar} />
        <Stack.Screen options={{headerShown: false}} name="EditCar" component={EditCar} />
        <Stack.Screen options={{headerShown: false}} name="AddComplaint" component={AddComplaint} />
        <Stack.Screen options={{headerShown: false}} name="AddComplaintConfirm" component={AddComplaintConfirm} />
        <Stack.Screen options={{headerShown: false}} name="NegotiationBiddingOwner" component={NegotiationBiddingOwner} />
        <Stack.Screen options={{headerShown: false}} name="NegotiationBiddingRenter" component={NegotiationBiddingRenter} />
        <Stack.Screen options={{headerShown: false}} name="NegotiationBiddingSuccess" component={NegotiationBiddingSuccess}/>
        <Stack.Screen options={{headerShown: false}} name="ChatScreen" component={ChatScreen} />
        <Stack.Screen options={{headerShown: false}} name="AllChats" component={AllChats} />
        <Stack.Screen options={{headerShown: false}} name="Map" component={Map} />
        <Stack.Screen options={{headerShown: false}} name="BookingSuccess" component={BookingSuccess} />
        <Stack.Screen options={{headerShown: false}} name="DamageControlForm" component={DamageControlForm} />
        <Stack.Screen options={{headerShown: false}} name="RentEstimationScreen" component={RentEstimationScreen} />
        <Stack.Screen options={{headerShown: false}} name="AddCarSuccess" component={AddCarSuccess} />
        <Stack.Screen options={{headerShown: false}} name="CarDocumentsSubmission" component={CarDocumentsSubmission} />
        <Stack.Screen options={{headerShown: false}} name="EditMap" component={EditMap} />
        <Stack.Screen options={{headerShown: false}} name="EditDamageControlForm" component={EditDamageControlForm} />
        <Stack.Screen options={{headerShown: false}} name="EditRentEstimationScreen" component={EditRentEstimationScreen} />
        <Stack.Screen options={{headerShown: false}} name="EditCarSuccess" component={EditCarSuccess} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
