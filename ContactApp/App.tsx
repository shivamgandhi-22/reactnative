import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';
import AddContactForm from './routes/AddContactForm';
import Contactlist from './routes/contactlist';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UpdateContact from './routes/UpdateContact';
import FavouriteContactList from './routes/FavouriteContactList';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Contact List" component={Contactlist} />
      <Drawer.Screen
        name="Favourite Contact List"
        component={FavouriteContactList}
      />
    </Drawer.Navigator>
  );
}
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="contactlist"
          component={DrawerNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="addcontact" component={AddContactForm} />
        <Stack.Screen name="updatecontact" component={UpdateContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
