import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colors from './src/styles/colors';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ingresos from './src/screens/datos_financieros/Ingresos';
import Calificacion from './src/screens/calificacion_cliente/Calificacion';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const Tab = createBottomTabNavigator();

  //Constantes para ingresos y egresos
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);

  //Ejemplo de obtener datos y guardar datos en AsyncStorage
  useEffect(() => {
    const getIngresos = async () => {
      const ingresosStorage = await AsyncStorage.getItem('citas');
      if(ingresosStorage){
        setIngresos(JSON.parse(ingresosStorage));
      }
    }

    getIngresos();
  }, []);

  //JSON.stringfy() para convertir a JSON
  const saveIngresos = async (citasJSON) => {
    await AsyncStorage.setItem('citas', citasJSON);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: colors.PRYMARY_COLOR,
          tabBarActiveTintColor: colors.WHITE,
          tabBarInactiveBackgroundColor: colors.SECONDARY_COLOR,
          tabBarInactiveTintColor: colors.WHITE,
        }} >
        <Tab.Screen 
          name='datos' 
          component={Ingresos}
          options={{
            title: 'Datos financieros',
            headerStyle: {
              backgroundColor: colors.PRYMARY_COLOR,
            },
            headerTitleStyle: {
              color: colors.WHITE,
            },
            tabBarIcon: ({ color }) => <Icon  name="piggy-bank" color={color} size={26} />,
          }} />
        <Tab.Screen 
          name='calificacion' 
          component={Calificacion}
          options={{
            title: 'Calificación cliente',
            headerStyle: {
              backgroundColor: colors.PRYMARY_COLOR,
            },
            headerTitleStyle: {
              color: colors.WHITE,
            },
            tabBarIcon: ({ color }) => <Icon  name="account" color={color} size={26} />,
          }} />
      </Tab.Navigator>

      <StatusBar style="auto" backgroundColor={colors.PRYMARY_COLOR} />
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
