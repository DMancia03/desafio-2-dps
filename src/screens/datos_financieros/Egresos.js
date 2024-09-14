import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../styles/colors";

// Validación con Yup
const validationSchema = Yup.object({
    alquiler: Yup.string().required('Campo obligatorio'),
    canastaBasica: Yup.string().required('Campo obligatorio'),
    financiamiento: Yup.string().required('Campo obligatorio'),
    transporte: Yup.string().required('Campo obligatorio'),
    servicios: Yup.string().required('Campo obligatorio'),
    salud: Yup.string().required('Campo obligatorio'),
    varios: Yup.string().required('Campo obligatorio')
});

const Egresos = ({ navigation }) => {
    const guardarEgresos = async (values) => {
        try {
          await AsyncStorage.setItem('egresos', JSON.stringify(values));
          Alert.alert('Guardado', 'Los egresos han sido guardados exitosamente.');
        } catch (error) {
          console.error('Error al guardar los egresos:', error);
        }
    };

    return (
        <Formik
          initialValues={{
            alquiler: '',
            canastaBasica: '',
            financiamiento: '',
            transporte: '',
            servicios: '',
            salud: '',
            varios: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            guardarEgresos(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <KeyboardAvoidingView 
              style={{ flex: 1 }} 
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                  <Text style={styles.title}>Egresos Mensuales</Text>

                  {/* Campos del formulario */}
                  {["Alquiler/Hipoteca", "Canasta Básica", "Financiamientos", "Transporte", "Servicios Públicos", "Salud y Seguro", "Egresos Varios"].map((label, index) => (
                    <View key={index} style={styles.inputContainer}>
                      <Text style={styles.label}>{label}</Text>
                      <TextInput
                        style={styles.input}
                        placeholder={label}
                        onChangeText={handleChange(label.toLowerCase().replace(/\s+/g, ''))}
                        onBlur={handleBlur(label.toLowerCase().replace(/\s+/g, ''))}
                        value={values[label.toLowerCase().replace(/\s+/g, '')]}
                      />
                      {touched[label.toLowerCase().replace(/\s+/g, '')] && errors[label.toLowerCase().replace(/\s+/g, '')] && 
                        <Text style={styles.errorText}>{errors[label.toLowerCase().replace(/\s+/g, '')]}</Text>
                      }
                    </View>
                  ))}

                  {/* Botón de guardar */}
                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Guardar Egresos</Text>
                  </TouchableOpacity>

                  {/* Botón para regresar a la pantalla de Ingresos */}
                  <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Ingresos')}>
                    <Text style={styles.buttonText}>Regresar a Ingresos</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </Formik>
    );
};

export default Egresos;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 20,  // Espacio para evitar que el contenido sea cubierto por el tab
    },
    container: {
        paddingHorizontal: 16,
        backgroundColor: colors.GRAY_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.PRYMARY_COLOR,
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
        width: '100%', // Para que los inputs ocupen todo el ancho posible
    },
    label: {
        fontSize: 16,
        color: colors.SECONDARY_COLOR,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        width: '100%',
    },
    button: {
        marginTop: 30,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: colors.PRYMARY_COLOR,
        alignItems: 'center',
        width: '100%', // Botón más ancho
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    backButton: {
        marginTop: 15,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: colors.SECONDARY_COLOR,
        alignItems: 'center',
        width: '100%', // Botón más ancho
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});
