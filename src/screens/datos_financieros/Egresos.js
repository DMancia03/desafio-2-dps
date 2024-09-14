import React from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../styles/colors";

// Validación con Yup para egresos
const validationSchema = Yup.object({
    egreso1: Yup.string().required('Campo obligatorio'),
    egreso2: Yup.string().required('Campo obligatorio'),
    egreso3: Yup.string().required('Campo obligatorio')
});

const Egresos = ({ navigation }) => {
    const guardarEgresos = async (values) => {
        try {
          // Guardar los valores de egresos en AsyncStorage
          await AsyncStorage.setItem('egresos', JSON.stringify(values));
          Alert.alert('Guardado', 'Los egresos han sido guardados exitosamente.');
          // Navegar a la pantalla de resultados o siguiente paso
          navigation.navigate('Grafico');  // Puedes cambiarlo según la navegación deseada
        } catch (error) {
          console.error('Error al guardar los egresos:', error);
        }
      };

    return (
        <Formik
          initialValues={{ egreso1: '', egreso2: '', egreso3: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            guardarEgresos(values);  // Guardar los datos al enviar el formulario
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.container}>
              <TextInput
                placeholder="Egreso 1"
                onChangeText={handleChange('egreso1')}
                onBlur={handleBlur('egreso1')}
                value={values.egreso1}
              />
              {touched.egreso1 && errors.egreso1 && <Text style={styles.errorText}>{errors.egreso1}</Text>}
    
              <TextInput
                placeholder="Egreso 2"
                onChangeText={handleChange('egreso2')}
                onBlur={handleBlur('egreso2')}
                value={values.egreso2}
              />
              {touched.egreso2 && errors.egreso2 && <Text style={styles.errorText}>{errors.egreso2}</Text>}
    
              <TextInput
                placeholder="Egreso 3"
                onChangeText={handleChange('egreso3')}
                onBlur={handleBlur('egreso3')}
                value={values.egreso3}
              />
              {touched.egreso3 && errors.egreso3 && <Text style={styles.errorText}>{errors.egreso3}</Text>}
    
              <Button onPress={handleSubmit} title="Guardar Egresos" />
            </View>
          )}
        </Formik>
    );
};

export default Egresos;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.GRAY_BACKGROUND,
        height: '100%',
        padding: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});
