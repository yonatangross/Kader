
import React, { useEffect, useReducer, useState } from 'react';
import { Text, StyleSheet, Modal, View, Image } from 'react-native';


const testImage = require('../../assets/images/test.png')
export interface MemberItemProps {
    profileImg?: string
}


const MemberItem = (props: MemberItemProps) => {
    return (
        <Image source={testImage} style={styles.img} />
    );
}

const styles = StyleSheet.create({
    img: {
        width: 40,
        height: 40,
        borderRadius: 15
        , paddingHorizontal: 10
    }

});

export default MemberItem;

