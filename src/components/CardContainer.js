import React from "react";
import colors from "../styles/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const CardContainer = ({card}) => {
    const showDescriptionCard = (descriptionCard) => {
        alert(descriptionCard);
    }

    return (
        <TouchableOpacity style={styles.cardContainer}>
            <Image source={card.image} style={styles.card}/>
        </TouchableOpacity>
    )
}

export default CardContainer;

const styles = StyleSheet.create({
    cardContainer: {
        margin:20,
    },
    card: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
});