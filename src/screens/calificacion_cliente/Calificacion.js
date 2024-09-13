import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native';
import colors from "../../styles/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductContainer from "../../components/ProductContainer";
import CardContainer from "../../components/CardContainer";
import productos from "../../data/productos";
import tarjetas from "../../data/tarjetas";
import TitleContainer from "../../components/TitleContainer";

const Calificacion = ({ navigation }) => {
    const ingresos = 5000;
    const egresos = 1000;
    const libre = ingresos - egresos;
    const disponibilidad_decimal = libre / egresos;
    const disponibilidad_porcentaje = disponibilidad_decimal * 100;

    let products = productos.riesgo_test;
    let cards = tarjetas.riesgo_test;

    if(ingresos <= 0 && egresos <= 0){
        products = productos.riesgo_default;
        cards = tarjetas.riesgo_default;
    }
    else if(ingresos <= egresos){
        products = productos.riesgo_extremo;
        cards = tarjetas.riesgo_extremo;
    }
    else if(ingresos <= 360){
        products = productos.riesgo_alto;
        cards = tarjetas.riesgo_alto;
    }
    else if(ingresos > 360 && ingresos <= 700){
        products = productos.riesgo_suficiente;
        cards = tarjetas.riesgo_suficiente;
    }
    else if(ingresos > 700 && ingresos <= 1200){
        products = productos.riesgo_bueno;
        cards = tarjetas.riesgo_bueno;
    }
    else if(ingresos > 1200 && ingresos <= 3000){
        products = productos.riesgo_muy_bueno;
        cards = tarjetas.riesgo_muy_bueno;
    }
    else if(ingresos > 3000){
        products = productos.riesgo_excelente;
        cards = tarjetas.riesgo_excelente;
    }

    return(
        <ScrollView style={styles.scroll}>
            <View style={styles.section}>
                {
                    products.length > 0 ? (
                        <>
                        <TitleContainer title={"Productos"} />

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
                        <TitleContainer title={"Tarjetas"} />

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