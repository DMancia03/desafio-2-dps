import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../styles/colors";

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

    const guardarEgresos = async (values) => {
        try {
            // Guardar los valores de egresos en AsyncStorage
            await AsyncStorage.setItem('egresos', JSON.stringify(values));
            // Mostrar modal de éxito
            setModalVisible(true);
        } catch (error) {
            console.error('Error al guardar los egresos:', error);
        }
    };

    return (
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
            onSubmit={(values) => { guardarEgresos(values); }} // Guardar datos y limpiar formulario
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
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

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Guardar Egresos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('Ingresos'); }}>
                            <Text style={styles.buttonText}>Ver Ingresos</Text>
                        </TouchableOpacity>

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
                                        onPress={() => { navigation.navigate('Ingresos'); }}
                                    >
                                        <Text style={styles.closeButtonText}>Ver Ingresos</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            )}
        </Formik>
    );
};

export default Egresos;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        backgroundColor: colors.GRAY_BACKGROUND,
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