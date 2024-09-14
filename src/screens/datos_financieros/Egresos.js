import React from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../styles/colors";

/*Aqui se realizara la Screen de Egresos*/