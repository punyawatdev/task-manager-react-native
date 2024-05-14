import { Alert } from 'react-native'

interface AlertProps {
    title: string
    message?: string
    submit?: (() => void) | undefined
    cancel?: (() => void) | undefined
}

export const alertConfirm = ({ title, message, submit, cancel }: AlertProps) =>
    Alert.alert(
        title,
        message, [
            {
                text: 'Cancel',
                onPress: cancel,
                style: 'cancel',
            },
            { text: 'OK', onPress: submit },
        ],
    )

export const alertMessage = ({ title, message }: AlertProps) =>
    Alert.alert(
        title,
        message,
    )
