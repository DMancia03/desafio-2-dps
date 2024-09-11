import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import colors from "../../styles/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Calificacion = ({ navigation }) => {
    return(
        <ScrollView style={styles.scroll_container}>
            <View style={styles.container}>
                <View style={styles.container_header}>
                    <Text style={styles.container_header_text}>Consolidación de deudas</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.container_header}>
                    <Text style={styles.container_header_text}>Apertura de cuenta</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.container_header}>
                    <Text style={styles.container_header_text}>Crédito personal</Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.container_header}>
                    <Text style={styles.container_header_text}> Tarjetas disponibles</Text>
                </View>
                <Image source={require('../../../assets/img-cards/clasica.png')} style={styles.card} />
                <Image source={require('../../../assets/img-cards/oro.png')} style={styles.card} />
                <Image source={require('../../../assets/img-cards/platinum.png')} style={styles.card} />
                <Image source={require('../../../assets/img-cards/black.png')} style={styles.card} />
                <View style={styles.container_header}>
                    <Text>No puedes optar por una tarjeta.</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Calificacion;

const styles = StyleSheet.create({
    scroll_container: {
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        backgroundColor: colors.GRAY_BACKGROUND,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
    card: {
        width: '100%',
        height: 250,
        borderRadius: 10,
    },
    container_header: {
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        padding:20,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
    },
    container_header_text: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});