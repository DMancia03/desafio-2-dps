import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import colors from "../../styles/colors";

const Calificacion = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text>Calificación...</Text>
        </View>
    )
}

export default Calificacion;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.GRAY_BACKGROUND,
        height: '100%',
    },
});