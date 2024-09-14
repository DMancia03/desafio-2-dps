import React from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
import colors from "../../styles/colors";

// Validación con Yup
const validationSchema = Yup.object({
  tipoIngreso: Yup.string().required('Seleccione un tipo de ingreso'),
  monto: Yup.number()
    .typeError('El monto debe ser un número')
    .required('Campo obligatorio')
    .positive('El monto debe ser positivo')
});

const Ingresos = ({ navigation }) => {
  const guardarIngresos = async (values) => {
    try {
      // Guardar los valores en AsyncStorage
      await AsyncStorage.setItem('ingresos', JSON.stringify(values));
      Alert.alert('Guardado', 'Los ingresos han sido guardados exitosamente.');
      // Navegar a la pantalla de Resultados
      navigation.navigate('Egresos');
    } catch (error) {
      console.error('Error al guardar los ingresos:', error);
    }
  };

  return (
    <Formik
      initialValues = {{ tipoIngreso: '', monto: '' }}
      validationSchema = {validationSchema}
      onSubmit={(values) => {
        guardarIngresos(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
        <View style = {styles.container}>
          <Text style = {styles.title}>Ingresos del Cliente</Text>

          {/* Picker para seleccionar el tipo de ingreso */}
          <View style = {styles.inputContainer}>
            <Text style = {styles.label}>Tipo de Ingreso:</Text>
            <View style = {styles.pickerContainer}>
              <Picker
                selectedValue = {values.tipoIngreso}
                onValueChange = {(itemValue) => setFieldValue('tipoIngreso', itemValue)}
                style = {styles.picker}
              >
                <Picker.Item
                  label = "Seleccione un tipo de ingreso"
                  value = ""
                  style = {styles.pickerPlaceholder}
                />
                <Picker.Item label="Salario" value = "Salario" />
                <Picker.Item label="Negocio Propio" value = "Negocio Propio" />
                <Picker.Item label="Pensiones" value = "Pensiones" />
                <Picker.Item label="Remesas" value = "Remesas" />
                <Picker.Item label="Ingresos Varios" value = "Ingresos Varios" />
              </Picker>
            </View>
            {touched.tipoIngreso && errors.tipoIngreso && <Text style={styles.error}>{errors.tipoIngreso}</Text>}
          </View>

          {/* Campo para el monto */}
          <View style = {styles.inputContainer}>
            <Text style = {styles.label}>Monto:</Text>
            <TextInput
              style = {styles.input}
              placeholder = "Ingrese el monto"
              keyboardType = "numeric"
              onChangeText = {handleChange('monto')}
              onBlur = {handleBlur('monto')}
              value = {values.monto}
            />
            {touched.monto && errors.monto && <Text style={styles.error}>{errors.monto}</Text>}
          </View>

          {/* Botón de Guardar */}
          <TouchableOpacity style = {styles.button} onPress = {handleSubmit}>
            <Text style = {styles.buttonText}>Guardar Ingresos</Text>
          </TouchableOpacity>
          {/* Botón para regresar a la pantalla de Ingresos */}
          <TouchableOpacity style = {styles.button} onPress = {() => {navigation.navigate('Egresos')}}>
            <Text style = {styles.buttonText}>Ver egresos</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Ingresos;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.GRAY_BACKGROUND,
        height: '100%',
        padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    pickerContainer: {
      borderRadius: 10,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#f9f9f9',
    },
    picker: {
      height: 50,
      paddingHorizontal: 10,
      color: '#333',
    },
    pickerPlaceholder: {
      fontWeight: 'bold',
      color: '#999',
    },
    input: {
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      backgroundColor: '#f9f9f9',
      fontSize: 16,
    },
    error: {
      color: '#ff0000',
      marginTop: 5,
    },
    button: {
      backgroundColor: '#4CAF50',
      paddingVertical: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 4,
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  