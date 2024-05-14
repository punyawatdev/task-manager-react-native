import React, { useState, useContext } from 'react'
import { StyleSheet, View } from 'react-native'

import { TaskContext, Task } from '~/contexts/TaskContext'
import { Input, Button, IconButton } from '~/components'
import Colors from '~/theme/colors'

interface AddSubtaskProps {
    task: Task
}

const styles = StyleSheet.create({
    formContainer: {
        flexDirection: 'row',
    },
    form: {
        flex: 1,
        paddingRight: 8,
    },
    saveButton: {
        backgroundColor: Colors.PRIMARY,
    },
    saveButtonText: {
        color: Colors.TEXT_WHITE,
    },
    addSubtaskButton: {
        marginTop: 8,
    },
    addSubtaskButtonText: {
        color: Colors.TEXT_BLACK_33,
    },
})

export default function AddSubtask({ task }: AddSubtaskProps) {
    const { addSubtask } = useContext(TaskContext)!
    const [ text, setText ] = useState('')
    const [ isAddSubtask, setIsAddSubtask ] = useState(false)

    const handleAddSubtask = () => {
        if (text.trim()) {
            addSubtask(task.id, text)
            setText('')
        }
        setIsAddSubtask(isAdd => !isAdd)
    }

    return (
        <View style={task.subtasks.length > 0 && styles.addSubtaskButton}>
            {
                isAddSubtask ?
                    (
                        <View style={styles.formContainer}>
                            <View style={styles.form}>
                                <Input
                                    placeholder="Add Subtask"
                                    value={text}
                                    onChangeText={setText}
                                    autoCapitalize='none'
                                    multiline
                                />
                            </View>
                            <IconButton
                                name='checkmark-circle'
                                size={26}
                                color={Colors.GREEN}
                                onPress={handleAddSubtask}
                            />
                            <IconButton
                                name='close-circle'
                                size={26}
                                color={Colors.SECONDARY}
                                onPress={() => setIsAddSubtask(isAdd => !isAdd)}
                            />
                        </View>
                    )
                    :
                    (
                        <Button
                            text='+ Subtask'
                            onPress={() => setIsAddSubtask(preIsAddSubtask => !preIsAddSubtask)}
                            textStyle={styles.addSubtaskButtonText}
                            baseline
                        />
                    )
            }
        </View>
    )
}
