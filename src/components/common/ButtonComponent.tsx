import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { fontFamily } from '../../themes/typography'
import { colors } from '../../themes/colors'

const ButtonComponent = ({ handleNext, label }: { handleNext: () => void, label: string }) => {
    return (
        <TouchableOpacity onPress={handleNext} style={[styles.nextButton]} >
            <Text style={styles.nextButtonText}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonComponent

const styles = StyleSheet.create({
    nextButton: {
        backgroundColor: colors.blue,
        height: 56, borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    nextButtonText: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fontFamily.light,
    },
})