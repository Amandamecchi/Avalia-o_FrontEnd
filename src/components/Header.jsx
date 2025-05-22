"use client"

import React from 'react';
import { View, Text } from 'react-native';
import Styles from "../styles/Header.module.css"

const Header = () => {
    return (
        <View style={{ padding: 20, backgroundColor: '#f8f8f8', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Animais</Text>
        </View>
    );
    }
export default Header;