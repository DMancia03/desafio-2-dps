import React, {useState} from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Dimensions } from 'react-native';
import colors from "../../styles/colors";
import ProductContainer from "../../components/ProductContainer";
import CardContainer from "../../components/CardContainer";
import productos from "../../data/productos";
import tarjetas from "../../data/tarjetas";
import TitleContainer from "../../components/TitleContainer";
import { ProgressChart } from "react-native-chart-kit";

const Calificacion = ({ navigation }) => {
    const ingresos = 5000;
    const egresos = 190;
    let libre = 0;
    let disponibilidad_decimal = 0;
    let disponibilidad_porcentaje = 0;

    //Arrays principales
    let products = productos.riesgo_default;
    let cards = tarjetas.riesgo_default;

    const setProducts = (array) => {
        products = array;
    }

    const setCards = (array) => {
        cards = array;
    }

    //Llenar arrays con productos y tarjetas dependiendo de la calificación
    const llenarExtremo = () => {
        setProducts(productos.riesgo_extremo);
        setCards(tarjetas.riesgo_extremo);
    }

    const llenarAlto = () => {
        setProducts(productos.riesgo_alto);
        setCards(tarjetas.riesgo_alto);
    }

    const llenarSuficiente = () => {
        setProducts(productos.riesgo_suficiente);
        setCards(tarjetas.riesgo_suficiente);
    }

    const llenarBueno = () => {
        setProducts(productos.riesgo_bueno);
        setCards(tarjetas.riesgo_bueno);
    }

    const llenarMuyBueno = () => {
        setProducts(productos.riesgo_muy_bueno);
        setCards(tarjetas.riesgo_muy_bueno);
    }

    const llenarExcelente = () => {
        setProducts(productos.riesgo_excelente);
        setCards(tarjetas.riesgo_excelente);
    }

    if(ingresos > 0 && egresos > 0){
        libre = ingresos - egresos;
        disponibilidad_decimal = libre.toFixed(2) / ingresos.toFixed(2);
        disponibilidad_porcentaje = disponibilidad_decimal.toFixed(2) * 100;

        if(ingresos <= egresos) llenarExtremo();
        else if(ingresos <= 360) llenarAlto();
        else if(ingresos > 360 && ingresos <= 700){
            if(disponibilidad_porcentaje <= 40) llenarAlto();
            else llenarSuficiente();
        }
        else if(ingresos > 700 && ingresos <= 1200){
            if(disponibilidad_porcentaje <= 20) llenarAlto();
            else if(disponibilidad_porcentaje > 20 && disponibilidad_porcentaje <= 40) llenarSuficiente();
            else llenarBueno();
        }
        else if(ingresos > 1200 && ingresos <= 3000){
            if(disponibilidad_porcentaje <= 20) llenarSuficiente();
            else if(disponibilidad_porcentaje > 20 && disponibilidad_porcentaje <= 40) llenarBueno();
            else llenarMuyBueno();
        }
        else if(ingresos > 3000){
            if(disponibilidad_porcentaje <= 20) llenarBueno();
            else if(disponibilidad_porcentaje > 20 && disponibilidad_porcentaje <= 40) llenarMuyBueno();
            else llenarExcelente();
        }
    }
    
    return(
        <ScrollView style={styles.scroll}>
            <View style={styles.section}>
                {
                    disponibilidad_porcentaje > 0 ? (
                        <TitleContainer title={"Tienes una disponibiliad de " + disponibilidad_porcentaje + "%"} />
                    ) : (
                        <TitleContainer title={"Tienes una disponibiliad negativa :c"} />
                    )
                }
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