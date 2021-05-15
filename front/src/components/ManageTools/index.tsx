import React, { useState } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';


export interface MangeToolsProps { }

const ManageTools = (props: MangeToolsProps) => {

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { }}
                    style={styles.manageIcons}
                >
                    <Image source={require('../../assets/images/leaveGroupIcon.png')} style={styles.floatingButtonStyle} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { }}
                    style={styles.manageIcons}
                >
                    <Image source={require('../../assets/images/deleteGroupIcon.png')} style={styles.floatingButtonStyle} />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => { }}
                    style={styles.manageIcons}
                >
                    <Image source={require('../../assets/images/settingsIcon.png')} style={styles.floatingButtonStyle} />
                </TouchableOpacity>

            </View>
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
    },
    manageIcons: {
        backgroundColor: 'white',
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        right: 15,
        bottom: 100,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
        borderColor: 'black',
        borderWidth: 0.8,

    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 32,
        height: 32,

    }

});


export default ManageTools;
