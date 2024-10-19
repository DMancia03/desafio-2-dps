import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';  
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import listado from '../../data/listado'; //Listado de productos globales
import MapView, {Marker} from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';

const RegistroSolicitud = ({ route }) => {
  const id = route.params.id; // Obtener el id del producto seleccionado

  const [selectedProducto, setSelectedProducto] = useState(id); // Asigna el valor del producto al state

  const [nombre, setNombre] = useState('');
  const [carnetBase64, setCarnetBase64] = useState('');
  const [selfieBase64, setSelfieBase64] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState('SOLICITADO');
  const [direccion, setDireccion] = useState('');
  const [tokenPush, setTokenPush] = useState("");

  //DATOS FINANCIEROS ------------------------------------------------
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);
  //DATOS FINANCIEROS ------------------------------------------------

  //CALCULADO --------------------------------------------------------
  const [calculado, setCalculado] = useState(false);
  //CALCULADO --------------------------------------------------------

  const takePhoto = async (setImage) => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: false,
    };

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    //console.log(result.assets[0].base64);

    //const result = await launchCamera(options);

    setImage(result.assets[0].base64);
    if (result.didCancel) {
      console.log('El usuario canceló la toma de la foto');
    } else if (result.errorMessage) {
      console.log('Error al abrir la cámara: ', result.errorMessage);
    } else {
      setImage('data:image/png;base64,' + result.assets[0].base64);
    }
  };

  const handleSubmit = async () => {
    if (!selectedProducto || !nombre || !telefono || !direccion) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }

    const requestData = {
      producto: selectedProducto,
      nombre,
      carnetBase64,
      selfieBase64,
      telefono,
      estado,
      direccion,
      tokenPush,
      ingresos,
      egresos,
    };

    console.log(requestData);
    try {
      const response = await axios.post(
        'https://api-rest-desafio-dps-747620528393.us-central1.run.app/Solicitudes', 
        requestData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      Alert.alert('Éxito', 'La solicitud ha sido registrada con éxito.');
      resetFields();
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar la solicitud. Inténtalo de nuevo.');
    }
  };

  const resetFields = () => {
    setSelectedProducto('');
    setNombre('');
    setCarnetBase64('');
    setSelfieBase64('');
    setTelefono('');
    setDireccion('');
    //setTokenPush('');
    //setIngresos('');
    //setEgresos('');
  };

  useEffect(() => {
    // Cuando el componente se monta, asegura que el picker se haya seleccionado
    if (id) {
      //setSelectedProducto(id); //No se va usar
    }
  }, [selectedProducto]);

  useEffect(() => {
    //Obtener token push desde el async storage
    const getPushToken = async () => {
      let tokenPushStorage = await AsyncStorage.getItem('tokenPush');
      if (tokenPushStorage) {
        tokenPushStorage = tokenPushStorage.replace('"', '').replace(']"', ']'); //Quitar comillas
        setTokenPush(tokenPushStorage);
      }
    };

    //Obtener ingresos y egresos desde el async storage ------------------------------------------------
    const getDatosFinancieros = async () => {
      const ingresosStorage = await AsyncStorage.getItem('ingresos');
      const egresosStorage = await AsyncStorage.getItem('egresos');

      if (ingresosStorage && egresosStorage) {
          const auxIng = JSON.parse(ingresosStorage);
          const auxEgr = JSON.parse(egresosStorage);
          const sumaIng = (!isNaN(auxIng.monto) ? parseFloat(auxIng.monto) : 0);
          const sumaEgr = (!isNaN(auxEgr.alquiler) ? parseFloat(auxEgr.alquiler) : 0) 
          + (!isNaN(auxEgr.canastaBasica) ? parseFloat(auxEgr.canastaBasica) : 0) 
          + (!isNaN(auxEgr.financiaciones) ? parseFloat(auxEgr.financiaciones) : 0)
          + (!isNaN(auxEgr.transporte) ? parseFloat(auxEgr.transporte) : 0) 
          + (!isNaN(auxEgr.serviciosPublicos) ? parseFloat(auxEgr.serviciosPublicos) : 0) 
          + (!isNaN(auxEgr.saludSeguro) ? parseFloat(auxEgr.saludSeguro) : 0)
          + (!isNaN(auxEgr.egresosVarios) ? parseFloat(auxEgr.egresosVarios) : 0);
          
          setIngresos(sumaIng);
          setEgresos(sumaEgr);
      }
    };

    getDatosFinancieros();
    //Obtener ingresos y egresos desde el async storage ------------------------------------------------

    getPushToken();
  }, [calculado])

  const handleCalcular = () => {
    setCalculado(!calculado);
    Alert.alert('Calificación', 'Se ha calculado tu calificación exitosamente');
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Registro de Solicitud</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Producto:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedProducto}
              onValueChange={(itemValue) => setSelectedProducto(itemValue)}
              style={styles.picker}
              enabled={false}
            >
              <Picker.Item label="Seleccione un producto" value="" />
              {
                listado.riesgo_global.map((item) => (<Picker.Item label={item.title} value={item.id} key={item.id} />))
              }
            </Picker>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre Completo:</Text>
          <TextInput
            placeholder="Ingrese su nombre completo"
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Carnet (Foto):</Text>
          <TouchableOpacity onPress={() => takePhoto(setCarnetBase64)}>
            <View style={styles.imagePicker}>
              <Text style={styles.imageText}>{carnetBase64 ? 'Foto tomada' : 'Tomar foto del Carnet'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Selfie:</Text>
          <TouchableOpacity onPress={() => takePhoto(setSelfieBase64)}>
            <View style={styles.imagePicker}>
              <Text style={styles.imageText}>{selfieBase64 ? 'Selfie tomada' : 'Tomar una Selfie'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Teléfono:</Text>
          <TextInput
            placeholder="Ingrese su número de teléfono"
            value={telefono}
            onChangeText={setTelefono}
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Dirección:</Text>
          <TextInput
            placeholder="Ingrese su dirección"
            value={direccion}
            onChangeText={setDireccion}
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Token Push:</Text>
          <TextInput
            placeholder="Token Push"
            value={tokenPush}
            onChangeText={setTokenPush}
            style={styles.input}
            editable={false}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Ingresos:</Text>
          <Text style={styles.input}>$ {ingresos}</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Egresos:</Text>
          <Text style={styles.input}>$ {egresos}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar Solicitud</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress={() => handleCalcular()}>
                    <Text style = {styles.buttonText}>Recalcular</Text>
                </TouchableOpacity>


                <MapView
      style = {styles.map}
        initialRegion={
          {
            latitude: 13.702320245091459, 
            longitude: -89.2299101470586,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        }
      >
        <Marker
          coordinate={{
            latitude: 13.702320245091459, 
            longitude: -89.2299101470586,
          }}
          title='UDB Banco'
          description="Sucursal principal"

        />
      </MapView>
      </View>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#003366',
  },
  pickerContainer: {
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  picker: {
    height: 45,
  },
  button: {
    backgroundColor: '#004080',
    paddingVertical: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
    height:300,
  },

});

export default RegistroSolicitud;