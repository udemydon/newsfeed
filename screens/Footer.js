/**
 * Created by udemy.don on 2/22/17.
 */


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = (props) => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.text}>Load More</Text>
        </TouchableOpacity>
    </View>
);

export default Footer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderColor: '#8E8E8E',
        borderWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    text: {
        color: '#8E8E8E',
    },
});
