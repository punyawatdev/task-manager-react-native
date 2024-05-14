import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { StyleProp, ViewStyle, ColorValue } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface IconButtonProps {
    onPress: () => void
    name?: string | undefined
    size?: number | undefined
    color?: number | ColorValue | undefined
    children?: React.ReactNode
    buttonStyle?: StyleProp<ViewStyle> | undefined
    forwardRef?: React.LegacyRef<TouchableOpacity> | undefined
}

export default function IconButton(props: IconButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                props.buttonStyle,
            ]}
            onPress={props.onPress}
            ref={props.forwardRef}
        >
            {
                props.name &&
                <Icon name={props.name} size={props.size} color={props.color} />
            }
            {props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})

