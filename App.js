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

const Stack = createNativeStackNavigator();

export default function App() {
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
        <Stack.Screen options={{headerShown: false}} name="NegotiationBiddingSuccess" component={NegotiationBiddingSuccess} />
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
