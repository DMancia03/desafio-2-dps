import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker'; // Importa Picker
import axios from 'axios';  // Importar Axios

const RegistroSolicitud = () => {
  const [producto, setProducto] = useState('');
  const [nombre, setNombre] = useState('');
  const [carnetBase64, setCarnetBase64] = useState('');
  const [selfieBase64, setSelfieBase64] = useState('');
  const [telefono, setTelefono] = useState('');
  const [estado, setEstado] = useState('SOLICITADO');
  const [direccion, setDireccion] = useState('');
  const [tokenPush, setTokenPush] = useState("");
  const [ingresos, setIngresos] = useState('');
  const [egresos, setEgresos] = useState('');
  
  const takePhoto = async (setImage) => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: false,
    };

    const result = await launchCamera(options);

    if (result.didCancel) {
      console.log('El usuario canceló la toma de la foto');
    } else if (result.errorMessage) {
      console.log('Error al abrir la cámara: ', result.errorMessage);
    } else {
      setImage(result.assets[0].base64);
    }
  };

  const handleSubmit = async () => {
    if (!producto || !nombre || !telefono || !direccion) {
      Alert.alert('Error', 'Por favor, completa todos los campos obligatorios.');
      return;
    }

    const requestData = {
      producto,
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
    setProducto('');
    setNombre('');
    setCarnetBase64('');
    setSelfieBase64('');
    setTelefono('');
    setDireccion('');
    setTokenPush('');
    setIngresos('');
    setEgresos('');
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Registro de Solicitud</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Producto:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={producto}
              onValueChange={(itemValue) => setProducto(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccione un producto" value="" />
              <Picker.Item label="Apertura de cuenta" value="Apertura de cuenta" />
              <Picker.Item label="Crédito personal" value="Crédito personal" />
              <Picker.Item label="Tarjetas" value="Tarjetas" />
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
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Ingresos:</Text>
          <TextInput
            placeholder="Ingrese sus ingresos"
            value={ingresos}
            onChangeText={setIngresos}
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Egresos:</Text>
          <TextInput
            placeholder="Ingrese sus egresos"
            value={egresos}
            onChangeText={setEgresos}
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar Solicitud</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f7f8fa', // Fondo claro y suave
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
  input: {
    height: 45,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Elevación para Android
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
  imagePicker: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imageText: {
    color: '#555',
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegistroSolicitud;
