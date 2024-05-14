import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { TaskContext, Task, Subtask } from '~/contexts/TaskContext'
import { Input, IconButton } from '~/components'
import Colors from '~/theme/colors'
import { alertConfirm } from '~/utils/alert'

interface SubTaskItemProps {
    task: Task
    subtask: Subtask
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    subtask: {
        fontSize: 16,
        color: Colors.TEXT_BLACK_33,
        paddingVertical: 4,
        paddingRight: 6,
    },
    formContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    form: {
        flex: 1,
        paddingRight: 8,
    },
})

export default function SubtaskItem({ task, subtask }: SubTaskItemProps) {
    const { updateSubtask, deleteSubtask } = useContext(TaskContext)!
    const [ isEditSubtask, setIsEditSubtask ] = useState(false)
    const [ text, setText ] = useState(subtask.text)

    useEffect(() => {
        if (isEditSubtask) {
            setText(subtask.text)
        }
    }, [ isEditSubtask, subtask ])

    const handleEditSubtask = () => {
        if (isEditSubtask && text.trim().length > 0) {
            updateSubtask(task.id, subtask.id, text)
            setText('')
        }
        setIsEditSubtask(visible => !visible)
    }
    const handleRemoveTask = () => {
        const title = 'Are you sure?'
        const message = `Are you sure to delete this subtask "${subtask.text.substring(0, 10)}" of "${task.title}"?`
        const submit = () => deleteSubtask(task.id, subtask.id)
        alertConfirm({ title, message, submit })
    }
    const handleRemoveSubtask = () => {
        if (isEditSubtask && task.id) {
            handleRemoveTask()
        }
        setIsEditSubtask(visible => !visible)
    }
    return (
        <View key={subtask.id} style={styles.container}>
            {
                isEditSubtask ?
                    (
                        <View style={styles.formContainer}>
                            <View style={styles.form}>
                                <Input
                                    placeholder="Subtask"
                                    value={text}
                                    onChangeText={setText}
                                    autoCapitalize='none'
                                    multiline
                                />
                            </View>
                            <IconButton
                                name='checkmark-circle'
                                size={26}
                                color={Colors.YELLOW}
                                onPress={handleEditSubtask}
                            />
                            <IconButton
                                name='remove-circle'
                                size={26}
                                color={Colors.RED}
                                onPress={handleRemoveSubtask}
                            />
                        </View>
                    )
                    :
                    (
                        <>
                            <Text
                                style={styles.subtask}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            >
                                - {subtask.text}
                            </Text>
                            <IconButton
                                name='create-outline'
                                size={18}
                                color={Colors.PRIMARY}
                                onPress={() => setIsEditSubtask(visible => !visible)}
                            />
                        </>
                    )
            }
        </View>
    )
}
