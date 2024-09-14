import React from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../styles/colors";

// Validación con Yup
const validationSchema = Yup.object({
    ingreso1: Yup.string().required('Campo obligatorio'),
    ingreso2: Yup.string().required('Campo obligatorio'),
    ingreso3: Yup.string().required('Campo obligatorio')
});

const Ingresos = ({ navigation }) => {
    const guardarIngresos = async (values) => {
        try {
          // Guardar los valores en AsyncStorage
          await AsyncStorage.setItem('ingresos', JSON.stringify(values));
          Alert.alert('Guardado', 'Los ingresos han sido guardados exitosamente.');
        } catch (error) {
          console.error('Error al guardar los ingresos:', error);
        }
    };

    return (
        <Formik
          initialValues={{ ingreso1: '', ingreso2: '', ingreso3: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            guardarIngresos(values);  // Guardar los datos al enviar el formulario
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Ingreso 1"
                onChangeText={handleChange('ingreso1')}
                onBlur={handleBlur('ingreso1')}
                value={values.ingreso1}
              />
              {touched.ingreso1 && errors.ingreso1 && <Text style={styles.errorText}>{errors.ingreso1}</Text>}
    
              <TextInput
                style={styles.input}
                placeholder="Ingreso 2"
                onChangeText={handleChange('ingreso2')}
                onBlur={handleBlur('ingreso2')}
                value={values.ingreso2}
              />
              {touched.ingreso2 && errors.ingreso2 && <Text style={styles.errorText}>{errors.ingreso2}</Text>}
    
              <TextInput
                style={styles.input}
                placeholder="Ingreso 3"
                onChangeText={handleChange('ingreso3')}
                onBlur={handleBlur('ingreso3')}
                value={values.ingreso3}
              />
              {touched.ingreso3 && errors.ingreso3 && <Text style={styles.errorText}>{errors.ingreso3}</Text>}
    
              <View style={styles.buttonContainer}>
                {/* Botón para guardar ingresos */}
                <View style={styles.button}>
                  <Button
                    onPress={handleSubmit}
                    title="Guardar Ingresos"
                    color={colors.PRYMARY_COLOR}
                  />
                </View>
    
                {/* Botón para mostrar datos y navegar a Egresos */}
                <View style={styles.button}>
                  <Button
                    title="Mostrar datos"
                    onPress={() => navigation.navigate('Egresos')}  // Navega a Egresos
                    color={colors.SECONDARY_COLOR}
                  />
                </View>
              </View>
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'column',  
        justifyContent: 'space-between',
    },
    button: {
        marginBottom: 10,  
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});
