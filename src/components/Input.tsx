import React from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { TextInputProps } from 'react-native'
import Colors from '~/theme/colors'

export interface InputProps extends TextInputProps {
    label?: string | undefined
    multiLine?: boolean | undefined
    errorMessage?: string | null | undefined
}

const styles = StyleSheet.create({
    inputWrap: {
        flexDirection: 'row',
        position: 'relative',
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.BLACK,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 16,
        paddingVertical: 2,
        fontSize: 16,
        color: Colors.BLACK_33,
        width: '100%',
        flex: 1,
    },
    labelWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.TEXT_BLACK,
    },
    errorMessage: {
        fontSize: 14,
        color: Colors.TEXT_RED,
        marginTop: 2,
    },
    errorInput: {
        borderColor: Colors.TEXT_RED,
    },
    multiInput: {
        minHeight: 60,
    },
})

export default function InputCustomComponent(props: InputProps) {
    return (
        <>
            {
                props.label && (
                    <View style={styles.labelWrap}>
                        <Text style={styles.label}>
                            {props.label}
                        </Text>
                    </View>
                )
            }
            <View style={styles.inputWrap}>
                <TextInput
                    style={[
                        styles.input,
                        props.multiLine ? styles.multiInput : null,
                        props.errorMessage ? styles.errorInput : null,
                    ]}
                    placeholderTextColor={Colors.TEXT_INPUT_BOX}
                    {...props}
                    multiline={props.multiline || props.multiLine}
                />
            </View>
            {props.errorMessage && <Text style={styles.errorMessage}>{props.errorMessage}</Text>}
        </>
    )
}
