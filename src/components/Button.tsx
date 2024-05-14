import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { StyleProp, ViewStyle, TextStyle } from 'react-native'

import Colors, { blackOpacity } from '~/theme/colors'

interface ButtonProps {
    onPress: () => void
    text: string
    baseline?: boolean | undefined
    disabled?: boolean | undefined
    buttonStyle?: StyleProp<ViewStyle> | undefined
    textStyle?: StyleProp<TextStyle> | undefined
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.BLACK,
        backgroundColor: blackOpacity(5),
    },
    baselineAlign: {
        flex: 0,
        alignSelf: 'baseline',
    },
    text: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        color: Colors.TEXT_BLACK,
    },
    disabledButton: {
        backgroundColor: blackOpacity(10),
    },
})

export default function Button(props: ButtonProps) {
    const { onPress, text, baseline, disabled, buttonStyle, textStyle } = props
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.6}
            style={[
                styles.button,
                buttonStyle,
                baseline ? styles.baselineAlign : null,
                disabled ? styles.disabledButton : null,
            ]}
        >
            <Text style={[ styles.text, textStyle ]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}
