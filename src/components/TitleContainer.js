import React from "react";
import colors from "../styles/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const TitleContainer = ({title}) => {
    return (
        <View style={styles.section_header}>
            <Text style={styles.section_title}>{title}</Text>
        </View>
    )
}

export default TitleContainer;

const styles = StyleSheet.create({
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
});