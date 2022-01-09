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
