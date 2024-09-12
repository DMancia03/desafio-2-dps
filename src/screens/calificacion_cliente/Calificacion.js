import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import colors from "../../styles/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductContainer from "../../components/ProductContainer";
import CardContainer from "../../components/CardContainer";

const Calificacion = ({ navigation }) => {
    const ingresos = 1000;
    const egresos = 500;
    const libre = ingresos - egresos;
    const disponibilidad_decimal = libre / egresos;
    const disponibilidad_porcentaje = disponibilidad_decimal * 100;

    const products = [
        {
            id: 'P001',
            title: 'Ayuda financiera',
            items: [{
                id: 'P001I001',
                icon: 'finance',
                description: 'Financiamiento para consolidado de deudas',
            },
            {
                id: 'P001I002',
                icon: 'card-account-phone',
                description: 'Contacto para un asesor financiero',
            }],
            message_no_products: {
                icon: 'alert-circle',
                description: 'No tienes productos aquí',
            }
        },
        {
            id: 'P002',
            title: 'Apertura de cuenta',
            items: [{
                id: 'P002I001',
                icon: 'account-cash',
                description: 'Puedes abrir una cuenta de ahorros'
            }],
            message_no_products: {
                icon: 'alert-circle',
                description: 'No tienes productos aquí',
            }
        },
        {
            id: 'P003',
            title: 'Crédito personal',
            items: [{
                id: 'P003I001',
                icon: 'cash',
                description: 'Crédito personal hasta $2,000.00'
            }],
            message_no_products: {
                icon: 'alert-circle',
                description: 'No tienes productos aquí',
            }
        }
    ];

    const cards = [{
        id: 'C001',
        title: 'Clásica',
        description: 'Tarjeta de crédito clásica',
        image: require('../../../assets/img-cards/clasica.png'),
    },
    {
        id: 'C002',
        title: 'Oro',
        description: 'Tarjeta de crédito oro',
        image: require('../../../assets/img-cards/oro.png'),
    },
    {
        id: 'C003',
        title: 'Platinum',
        description: 'Tarjeta de crédito platinum',
        image: require('../../../assets/img-cards/platinum.png'),
    },
    {
        id: 'C004',
        title: 'Black',
        description: 'Tarjeta de crédito black',
        image: require('../../../assets/img-cards/black.png'),
    }];

    return(
        <ScrollView style={styles.scroll}>
            <View style={styles.section}>
                {
                    products.length > 0 ? (
                        <>
                        <View style={styles.section_header}>
                            <Text style={styles.section_title}>Productos</Text>
                        </View>

                        <FlatList
                            data={products}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <ProductContainer product={item}/>
                            )}
                        />
                        </>
                    ) : null
                }

                {
                    cards.length > 0 ? (
                        <>
                        <View style={styles.section_header}>
                            <Text style={styles.section_title}>Tarjetas</Text>
                        </View>

                        <FlatList
                            data={cards}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => (
                                <CardContainer card={item}/>
                            )}
                        />
                    </>
                    ) : null
                }
            </View>
        </ScrollView>
    )
}

export default Calificacion;

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: colors.GRAY_BACKGROUND,
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
    card: {
        width: '100%',
        height: 250,
        borderRadius: 10,
    },
    section_header: {
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        padding:20,
        margin:20,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
    },
    section_title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    container_body: {
        backgroundColor: colors.WHITE,
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        gap:20,
    },
    container_body_line: {
        display: 'flex',
        flexDirection: 'row',
    }
});