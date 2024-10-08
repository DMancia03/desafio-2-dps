import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Dimensions, Alert, TouchableOpacity } from 'react-native';
import colors from "../../styles/colors";
import ProductContainer from "../../components/ProductContainer";
import CardContainer from "../../components/CardContainer";
import productos from "../../data/productos";
import tarjetas from "../../data/tarjetas";
import TitleContainer from "../../components/TitleContainer";
import { ProgressChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BarChart} from "react-native-chart-kit";
import { Button } from "react-native-web";

const Calificacion = ({ navigation }) => {
    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };

      const [data, setData] = useState({
        labels: ["Ingresos", "Egresos"],
        datasets: [
          {
            data: [0, 0]
          }
        ]
      });
    const [ingresos, setIngresos] = useState([]);
    const [egresos, setEgresos] = useState([]);
    const [ingresosTotales, setIngresosTotales] = useState(0);
    const [egresosTotales, setEgresosTotales] = useState(890);
    //setIngresosTotales(ingresos.ingreso1);
    //const [libre, setLibre] = useState(0);
    //const [disponibilidad_decimal, setDisponibilidad_decimal] = useState(0);
    //const [disponibilidad_porcentaje, setDisponibilidad_porcentaje] = useState(0);
    let libre = 0;
    let disponibilidad_decimal = 0;
    let disponibilidad_porcentaje = 0;

    const [calculado, setCalculado] = useState(false);

    useEffect(() => {
        const getIngresos = async () => {
            const ingresosStorage = await AsyncStorage.getItem('ingresos');
            const egresosStorage = await AsyncStorage.getItem('egresos');

            if (ingresosStorage && egresosStorage) {
                const auxIng = JSON.parse(ingresosStorage);
                const auxEgr = JSON.parse(egresosStorage);
                setIngresos(auxIng);
                setEgresos(auxEgr);
                setIngresosTotales((!isNaN(auxIng.monto) ? parseFloat(auxIng.monto) : 0));

                setEgresosTotales((!isNaN(auxEgr.alquiler) ? parseFloat(auxEgr.alquiler) : 0) 
                + (!isNaN(auxEgr.canastaBasica) ? parseFloat(auxEgr.canastaBasica) : 0) 
                + (!isNaN(auxEgr.financiaciones) ? parseFloat(auxEgr.financiaciones) : 0)
                + (!isNaN(auxEgr.transporte) ? parseFloat(auxEgr.transporte) : 0) 
                + (!isNaN(auxEgr.serviciosPublicos) ? parseFloat(auxEgr.serviciosPublicos) : 0) 
                + (!isNaN(auxEgr.saludSeguro) ? parseFloat(auxEgr.saludSeguro) : 0)
                + (!isNaN(auxEgr.egresosVarios) ? parseFloat(auxEgr.egresosVarios) : 0));
                
                setData({
                    labels: ["Ingresos", "Egresos"],
                    datasets: [
                      {
                        data: [ingresosTotales, egresosTotales]
                      }
                    ]
                  });
            }
        };
    
        getIngresos();
    }, [calculado]);

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

    //Arrays principales
    let products = productos.riesgo_default;
    let cards = tarjetas.riesgo_default;

    const setProducts = (array) => {
        products = array;
    }

    const setCards = (array) => {
        cards = array;
    }

    const calcularDisponibilidad = () => {
        if(ingresosTotales > 0 && egresosTotales > 0){
            libre = (ingresosTotales - egresosTotales);
            disponibilidad_decimal = (libre.toFixed(2) / ingresosTotales);
            disponibilidad_porcentaje = (disponibilidad_decimal.toFixed(2) * 100);
    
            if(ingresosTotales <= egresosTotales) llenarExtremo();
            else if(ingresosTotales <= 360) llenarAlto();
            else if(ingresosTotales > 360 && ingresosTotales <= 700){
                if(disponibilidad_porcentaje <= 40) llenarAlto();
                else llenarSuficiente();
            }
            else if(ingresosTotales > 700 && ingresosTotales <= 1200){
                if(disponibilidad_porcentaje <= 20) llenarAlto();
                else if(disponibilidad_porcentaje > 20 && disponibilidad_porcentaje <= 40) llenarSuficiente();
                else llenarBueno();
            }
            else if(ingresosTotales > 1200 && ingresosTotales <= 3000){
                if(disponibilidad_porcentaje <= 20) llenarSuficiente();
                else if(disponibilidad_porcentaje > 20 && disponibilidad_porcentaje <= 40) llenarBueno();
                else llenarMuyBueno();
            }
            else if(ingresosTotales > 3000){
                if(disponibilidad_porcentaje <= 20) llenarBueno();
                else if(disponibilidad_porcentaje > 20 && disponibilidad_porcentaje <= 30) llenarMuyBueno();
                else llenarExcelente();
            }
        }
    }

    calcularDisponibilidad();

    const handleCalcular = () => {
        setCalculado(!calculado);
        Alert.alert('Calificación', 'Se ha calculado tu calificación exitosamente');
    }
    
    return(
        <ScrollView style={styles.scroll}>
            <View style={styles.section}>
                <TouchableOpacity style = {styles.button} onPress={handleCalcular}>
                    <Text style = {styles.buttonText}>Calcular</Text>
                </TouchableOpacity>

                {
                    disponibilidad_porcentaje > 0 ? (
                        <TitleContainer title={"Tienes una disponibilidad de " + disponibilidad_porcentaje.toFixed(2) + "%  | Ingresos: $" + ingresosTotales + " | Egresos: $" + egresosTotales} />
                    ) : (
                        <TitleContainer title={"Tienes una disponibilidad negativa :c"} />
                    )
                }

                <View style={styles.container}>
                <BarChart
                    data={data}
                    width={200}
                    height={220}
                    yAxisLabel="$"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
                </View>

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
        padding:20,
        backgroundColor: colors.WHITE,
        margin:20,
        borderRadius:10,
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
        margin: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});