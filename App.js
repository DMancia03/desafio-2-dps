import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import colors from './src/styles/colors';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';  // Añadimos el Stack Navigator
import Ingresos from './src/screens/datos_financieros/Ingresos';
import Egresos from './src/screens/datos_financieros/Egresos';  // Asegúrate de tener importada esta pantalla
import Calificacion from './src/screens/calificacion_cliente/Calificacion';
import RegistroSolicitud from './src/screens/calificacion_cliente/RegistroSolicitud'; // nuevo componente
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Creación del Stack Navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Constantes para ingresos y egresos
export default function App() {
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);

  useEffect(() => {
    const getIngresos = async () => {
      const ingresosStorage = await AsyncStorage.getItem('citas');
      if (ingresosStorage) {
        setIngresos(JSON.parse(ingresosStorage));
      }
    };

    getIngresos();
  }, []);

  const saveIngresos = async (citasJSON) => {
    await AsyncStorage.setItem('citas', citasJSON);
  };

  // Crear un stack para los datos financieros (Ingresos -> Egresos)
  const DatosFinancierosStack = () => (
    <Stack.Navigator>
      <Stack.Screen 
        name="Ingresos" 
        component={Ingresos} 
        options={{
          title: 'Ingresos del Cliente',
          headerStyle: {
            backgroundColor: colors.PRYMARY_COLOR,
          },
          headerTitleStyle: {
            color: colors.WHITE,
          },
        }} 
      />
      <Stack.Screen 
        name="Egresos" 
        component={Egresos} 
        options={{
          title: 'Egresos del Cliente',
          headerStyle: {
            backgroundColor: colors.PRYMARY_COLOR,
          },
          headerTitleStyle: {
            color: colors.WHITE,
          },
        }} 
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: colors.PRYMARY_COLOR,
          tabBarActiveTintColor: colors.WHITE,
          tabBarInactiveBackgroundColor: colors.SECONDARY_COLOR,
          tabBarInactiveTintColor: colors.WHITE,
        }} >
        {/* Pestaña de Datos Financieros con Stack Navigator */}
        <Tab.Screen 
          name="DatosFinancieros" 
          component={DatosFinancierosStack}  // Aquí usamos el Stack Navigator en vez de solo el componente Ingresos
          options={{
            title: 'Datos financieros',
            headerStyle: {
              backgroundColor: colors.PRYMARY_COLOR,
            },
            headerTitleStyle: {
              color: colors.WHITE,
            },
            tabBarIcon: ({ color }) => <Icon name="piggy-bank" color={color} size={26} />,
          }} 
        />
        
        {/* Pestaña de Calificación */}
        <Tab.Screen 
          name="calificacion" 
          component={Calificacion}
          options={{
            title: 'Productos disponibles',
            headerStyle: {
              backgroundColor: colors.PRYMARY_COLOR,
            },
            headerTitleStyle: {
              color: colors.WHITE,
            },
            tabBarIcon: ({ color }) => <Icon name="account" color={color} size={26} />,
          }} 
        />

        {/* Pestaña de Solicitud */}
        <Tab.Screen 
          name="solicitud" 
          component={RegistroSolicitud}
          options={{
            title: 'Registro de Producto',
            headerStyle: {
              backgroundColor: colors.PRYMARY_COLOR,
            },
            headerTitleStyle: {
              color: colors.WHITE,
            },
            tabBarIcon: ({ color }) => <Icon name="archive" color={color} size={26} />,
          }} 
        />

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
