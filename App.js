import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Platform } from 'react-native';
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
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { string } from 'yup';

// Creación del Stack Navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Constantes para ingresos y egresos
export default function App() {
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);

  //Variables para token push
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const getIngresos = async () => {
      const ingresosStorage = await AsyncStorage.getItem('citas');
      if (ingresosStorage) {
        setIngresos(JSON.parse(ingresosStorage));
      }
    };

    getIngresos();
  }, []);

  //Notificaciones en primer plano
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {setNotification(notification)});

    responseListener.current == Notifications.addNotificationReceivedListener(response => {console.log(response)});

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    }
  }, [])

  const saveIngresos = async (citasJSON) => {
    await AsyncStorage.setItem('citas', citasJSON);
  };

  //Funcion para registrar el token push
  const registerForPushNotificationsAsync = async () => {
    let token;
    if(Device.isDevice){
      const {status: existingStatus} = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if(existingStatus !== 'granted'){
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if(finalStatus !== 'granted'){
        Alert.alert('No se pudieron obtener los permisos de notificaciones :c');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
    }else{
      Alert.alert('Debes usar un dispositivo físico para recibir notificaciones push');
    }

    if(Platform.OS === 'android'){
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    guardarTokenPush(token);
    console.log(token);
    return token;
  }

  const guardarTokenPush = async (token) => {
    await AsyncStorage.setItem('tokenPush', JSON.stringify(token));
  }

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

  // Crear un stack para la calificación de clientes y el registro de solicitud
  const CalificacionStack = () => (
    <Stack.Navigator>
      <Stack.Screen 
        name="Calificacion" 
        component={Calificacion} 
        options={{
          title: 'Productos disponibles',
          headerStyle: {
            backgroundColor: colors.PRYMARY_COLOR,
          },
          headerTitleStyle: {
            color: colors.WHITE,
          },
        }} 
      />
      <Stack.Screen 
        name="RegistroSolicitud" 
        component={RegistroSolicitud} 
        options={{
          title: 'Registro de Producto',
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
        
        {/* Pestaña de Calificación con Stack Navigator */}
        <Tab.Screen 
          name="Calificacion" 
          component={CalificacionStack}  // Aquí usamos el Stack Navigator con la pantalla de Calificación y RegistroSolicitud
          options={{
            title: 'Calificación Cliente',
            headerStyle: {
              backgroundColor: colors.PRYMARY_COLOR,
            },
            headerTitleStyle: {
              color: colors.WHITE,
            },
            tabBarIcon: ({ color }) => <Icon name="account" color={color} size={26} />,
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
