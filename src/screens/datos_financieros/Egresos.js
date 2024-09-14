import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../styles/colors";
import { ScrollView } from "react-native-gesture-handler";

// Validación con Yup para los campos de egresos
const validationSchema = Yup.object({
    alquiler: Yup.string().required('Campo obligatorio'),
    canastaBasica: Yup.string().required('Campo obligatorio'),
    financiaciones: Yup.string().required('Campo obligatorio'),
    transporte: Yup.string().required('Campo obligatorio'),
    serviciosPublicos: Yup.string().required('Campo obligatorio'),
    saludSeguro: Yup.string().required('Campo obligatorio'),
    egresosVarios: Yup.string().required('Campo obligatorio')
});

const Egresos = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);  // Estado para el modal

    const guardarEgresos = async (values, resetForm) => {
        try {
            // Guardar los valores de egresos en AsyncStorage
            await AsyncStorage.setItem('egresos', JSON.stringify(values));
            // Mostrar modal de éxito
            setModalVisible(true);
            // Limpiar el formulario
            resetForm();
        } catch (error) {
            console.error('Error al guardar los egresos:', error);
        }
    };

    return (
      <ScrollView backgroundColor={colors.GRAY_BACKGROUND}>

      
        <Formik
            initialValues={{
                alquiler: '',
                canastaBasica: '',
                financiaciones: '',
                transporte: '',
                serviciosPublicos: '',
                saludSeguro: '',
                egresosVarios: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => guardarEgresos(values, resetForm)} // Guardar datos y limpiar formulario
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Alquiler / Hipoteca"
                        onChangeText={handleChange('alquiler')}
                        onBlur={handleBlur('alquiler')}
                        value={values.alquiler}
                    />
                    {touched.alquiler && errors.alquiler && <Text style={styles.errorText}>{errors.alquiler}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Canasta Básica"
                        onChangeText={handleChange('canastaBasica')}
                        onBlur={handleBlur('canastaBasica')}
                        value={values.canastaBasica}
                    />
                    {touched.canastaBasica && errors.canastaBasica && <Text style={styles.errorText}>{errors.canastaBasica}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Financiamientos (Préstamos fuera de hipoteca)"
                        onChangeText={handleChange('financiaciones')}
                        onBlur={handleBlur('financiaciones')}
                        value={values.financiaciones}
                    />
                    {touched.financiaciones && errors.financiaciones && <Text style={styles.errorText}>{errors.financiaciones}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Transporte"
                        onChangeText={handleChange('transporte')}
                        onBlur={handleBlur('transporte')}
                        value={values.transporte}
                    />
                    {touched.transporte && errors.transporte && <Text style={styles.errorText}>{errors.transporte}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Servicios Públicos"
                        onChangeText={handleChange('serviciosPublicos')}
                        onBlur={handleBlur('serviciosPublicos')}
                        value={values.serviciosPublicos}
                    />
                    {touched.serviciosPublicos && errors.serviciosPublicos && <Text style={styles.errorText}>{errors.serviciosPublicos}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Salud y Seguro"
                        onChangeText={handleChange('saludSeguro')}
                        onBlur={handleBlur('saludSeguro')}
                        value={values.saludSeguro}
                    />
                    {touched.saludSeguro && errors.saludSeguro && <Text style={styles.errorText}>{errors.saludSeguro}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Egresos Varios"
                        onChangeText={handleChange('egresosVarios')}
                        onBlur={handleBlur('egresosVarios')}
                        value={values.egresosVarios}
                    />
                    {touched.egresosVarios && errors.egresosVarios && <Text style={styles.errorText}>{errors.egresosVarios}</Text>}

                    <Button onPress={handleSubmit} title="Guardar Egresos" color={colors.PRYMARY_COLOR} />
                    
                    <Button onPress={() => {navigation.navigate('Ingresos')}} title="Ver Ingresos" color={colors.PRYMARY_COLOR} />

                    {/* Modal para confirmar guardado */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Egresos guardados exitosamente.</Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Cerrar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => {navigation.navigate('Ingresos')}}
                                >
                                    <Text style={styles.closeButtonText}>Ver Ingresos</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
        </Formik>
        </ScrollView>
    );
};

export default Egresos;

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
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: colors.SECONDARY_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});