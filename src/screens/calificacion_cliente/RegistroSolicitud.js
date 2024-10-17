import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
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
  const [ingresos, setIngresos] = useState('');  // Nuevo estado para ingresos
  const [egresos, setEgresos] = useState('');
  

  // Función para tomar una foto con la cámara
  const takePhoto = async (setImage) => {
    const options = {
      mediaType: 'photo',
      includeBase64: true, // Para guardar la imagen como base64
      saveToPhotos: false,  // No guardar en galería
    };

    const result = await launchCamera(options);

    if (result.didCancel) {
      console.log('El usuario canceló la toma de la foto');
    } else if (result.errorMessage) {
      console.log('Error al abrir la cámara: ', result.errorMessage);
    } else {
      setImage(result.assets[0].base64); // Guarda la imagen en formato base64
    }
  };
  

  const handleSubmit = async () => {
    // Validación básica de campos
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

    console.log("Datos que se enviarán a la API:", requestData);

    try {
      const response = await axios.post(
        'https://api-rest-desafio-dps-747620528393.us-central1.run.app/Solicitudes', 
        requestData,
        {
        headers: {
          'Content-Type': 'application/json',
        },
        }
      );

      console.log('Respuesta de la API:', response.data);
      Alert.alert('Éxito', 'La solicitud ha sido registrada con éxito.');
      resetFields();
    } catch (error) {
      console.error('Error al registrar la solicitud:', error.response ? error.response.data : error.message);
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
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Solicitud</Text>
      <Text style={styles.label}>Producto:</Text>
      <TextInput
        placeholder="Ingrese el producto"
        value={producto}
        onChangeText={setProducto}
        style={styles.input}
      />

      <Text style={styles.label}>Nombre Completo:</Text>
      <TextInput
        placeholder="Ingrese su nombre completo"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <Text style={styles.label}>Carnet (Foto):</Text>
      <TouchableOpacity onPress={() => takePhoto(setCarnetBase64)}>
        <View style={styles.imagePicker}>
          <Text style={styles.imageText}>{carnetBase64 ? 'Foto tomada' : 'Tomar foto del Carnet'}</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.label}>Selfie:</Text>
      <TouchableOpacity onPress={() => takePhoto(setSelfieBase64)}>
        <View style={styles.imagePicker}>
          <Text style={styles.imageText}>{selfieBase64 ? 'Selfie tomada' : 'Tomar una Selfie'}</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        placeholder="Ingrese su número de teléfono"
        value={telefono}
        onChangeText={setTelefono}
        style={styles.input}
      />

      <Text style={styles.label}>Dirección:</Text>
      <TextInput
        placeholder="Ingrese su dirección"
        value={direccion}
        onChangeText={setDireccion}
        style={styles.input}
      />

            <Text style={styles.label}>Ingresos:</Text>
              <TextInput
                placeholder="Token Push"
                value={tokenPush}
                onChangeText={setTokenPush}
                style={styles.input}
            />


<Text style={styles.label}>Ingresos:</Text>
      <TextInput
        placeholder="Ingrese sus ingresos"
        value={ingresos}
        onChangeText={setIngresos}
        style={styles.input}
      />

      <Text style={styles.label}>Egresos:</Text>
      <TextInput
        placeholder="Ingrese sus egresos"
        value={egresos}
        onChangeText={setEgresos}
        style={styles.input}
      />



      <Button title="Enviar Solicitud" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#003366',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#003366',
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  imagePicker: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 15,
  },
  imageText: {
    color: '#555',
  },
});

export default RegistroSolicitud;
