import React from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import colors from "../../styles/colors";

// Validación con Yup
const validationSchema = Yup.object({
    ingreso1: Yup.string().required('Campo obligatorio'),
    ingreso2: Yup.string().required('Campo obligatorio'),
    ingreso3: Yup.string().required('Campo obligatorio')
});

const Ingresos = ({ navigation }) => {
    return (
        <Formik
          initialValues={{ ingreso1: '', ingreso2: '', ingreso3: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Enviar datos o hacer lo que necesites
            console.log(values);
            navigation.navigate('Resultados', { ingresos: values });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextInput
                placeholder="Ingreso 1"
                onChangeText={handleChange('ingreso1')}
                onBlur={handleBlur('ingreso1')}
                value={values.ingreso1}
              />
              {touched.ingreso1 && errors.ingreso1 && <Text>{errors.ingreso1}</Text>}
    
              <TextInput
                placeholder="Ingreso 2"
                onChangeText={handleChange('ingreso2')}
                onBlur={handleBlur('ingreso2')}
                value={values.ingreso2}
              />
              {touched.ingreso2 && errors.ingreso2 && <Text>{errors.ingreso2}</Text>}
    
              <TextInput
                placeholder="Ingreso 3"
                onChangeText={handleChange('ingreso3')}
                onBlur={handleBlur('ingreso3')}
                value={values.ingreso3}
              />
              {touched.ingreso3 && errors.ingreso3 && <Text>{errors.ingreso3}</Text>}
    
              <Button onPress={handleSubmit} title="Guardar Ingresos" />
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
    },
});