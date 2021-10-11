import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../screens/Dashboard';
import CreateAppointment from '../screens/CreateAppointment';
import AppointmentCreated from '../screens/AppointmentCreated';

import Profile from '../screens/Profile';

export type AppStackList = {
  Dashboard: undefined;
  CreateAppointment: undefined;
  AppointmentCreated: undefined;

  Profile: undefined;
};

const AppStack = createNativeStackNavigator<AppStackList>();

const AuthRoutes: React.FC = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: '#312e38' },
    }}
  >
    <AppStack.Screen name="Dashboard" component={Dashboard} />
    <AppStack.Screen name="CreateAppointment" component={CreateAppointment} />
    <AppStack.Screen name="AppointmentCreated" component={AppointmentCreated} />

    <AppStack.Screen name="Profile" component={Profile} />
  </AppStack.Navigator>
);

export default AuthRoutes;
