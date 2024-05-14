import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '~/theme/colors'

interface FAButtonProps {
    onPress?: () => void | undefined
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        zIndex: 1,
    },
    fabutton: {
        width: 40,
        height: 40,
        borderRadius: 25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        borderWidth: 1,
        borderColor: Colors.BLACK,
    },
})

export default function FAButton(props: FAButtonProps) {
    const [ isKeyboardVisible, setKeyboardVisible ] = useState(false)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true)
            },
        )

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false)
            },
        )

        return () => {
            keyboardDidHideListener.remove()
            keyboardDidShowListener.remove()
        }
    }, [])

    if (isKeyboardVisible) {
        return null
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}>
                <View style={styles.fabutton}>
                    <Icon name="add" size={28} color={Colors.WHITE} />
                </View>
            </TouchableOpacity>
        </View>
    )
}
