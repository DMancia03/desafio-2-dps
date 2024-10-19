import React from "react";
import colors from "../styles/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const CardContainer = ({card}) => {
    const navigation = useNavigation(); // Obtén la función de navegación

    const showDescriptionCard = (descriptionCard) => {
        alert(descriptionCard);
    }

    const handlePress = (id) => {
        navigation.navigate('RegistroSolicitud', { "id": id }); // Navegar a RegistroSolicitud pasando el producto seleccionado
    };

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => {handlePress(card.id)}}>
            <Image source={card.image} style={styles.card}/>
        </TouchableOpacity>
    )
}

export default CardContainer;

const styles = StyleSheet.create({
    cardContainer: {
        margin:20,
        flex:1,
    },
    card: {
        width: '100%',
        height: 225,
        borderRadius: 10,
    },
});