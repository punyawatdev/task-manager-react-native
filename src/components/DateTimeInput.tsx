import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Platform, TouchableOpacity } from 'react-native'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { convertDateToStringFormat } from '~/utils/date'
import Colors from '~/theme/colors'

import Input from './Input'

interface DateTimeInputProps {
    label?: string | undefined
    value?: Date | undefined
    onChange: (currentDate: Date) => void
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.TEXT_BLACK,
    },
})

export default function DateTimeInput({ label, value, onChange }: DateTimeInputProps) {
    const [ show, setShow ] = useState(false)
    const [ date, setDate ] = useState(new Date())

    useEffect(() => {
        if (value) {
            setDate(value)
        }
        else {
            setDate(new Date())
        }
    }, [ value ])

    useEffect(() => {
        if (Platform.OS === 'ios' && !show) {
            setShow(true)
        }
    }, [ show, setShow ])

    const onChangeEvent = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (show && selectedDate) {
            setShow(Platform.OS === 'ios')
            const currentDate = selectedDate || date
            setDate(currentDate)
            onChange(currentDate)
        }
        else {
            setShow(false)
        }
    }

    const renderPicker = () => (
        <RNDateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={onChangeEvent}
            minimumDate={new Date()}
        />
    )

    const renderIOS = () => (
        <>
            {label && <Text style={styles.label}>{label}</Text>}
            {renderPicker()}
        </>
    )

    const renderAndroid = () => (
        <>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => !show && setShow(true)}
            >
                <Input
                    label={label}
                    value={convertDateToStringFormat(date)}
                    editable={false}
                />
            </TouchableOpacity>
            {show && renderPicker()}
        </>
    )

    return Platform.OS === 'ios' ? renderIOS() : renderAndroid()
}
