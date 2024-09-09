import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import colors from "../../styles/colors";

const Ingresos = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text>Ingresos...</Text>
        </View>
    )
}

export default Ingresos;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.GRAY_BACKGROUND,
        height: '100%',
    },
});