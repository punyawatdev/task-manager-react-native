import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Text, Modal } from 'react-native'

import { TaskContext } from '~/contexts/TaskContext'
import { Input, DateTimeInput, Button } from '~/components'
import Colors, { blackOpacity } from '~/theme/colors'
import getStringID from '~/utils/uuid'

interface AddTaskProps {
    visible?: boolean | undefined
    onClose?: () => void | undefined
}

interface InputErrorMessage {
    title: string | null
}

const initInputErrorMessage = {
    title: null,
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: blackOpacity(50),
    },
    container: {
        width: '86%',
        minHeight: 164,
        borderWidth: 1,
        borderRadius: 16,
        borderColor: Colors.BLACK,
        backgroundColor: Colors.WHITE,
    },
    titleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    title: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        color: Colors.TEXT_BLACK,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    formContainer: {
        flexGrow: 1,
        position: 'relative',
        paddingTop: 10,
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8,
    },
    button: {
        width: 120,
        marginHorizontal: 6,
    },
    addButtonText: {
        color: Colors.TEXT_WHITE,
    },
    addButton: {
        backgroundColor: Colors.PRIMARY,
    },
    editButton: {
        backgroundColor: Colors.YELLOW,
    },
    closeButton: {
        backgroundColor: Colors.GRAY,
    },
    input: {
        marginVertical: 8,
    },
})

export default function AddTaskModal({ visible, onClose }: AddTaskProps) {
    const { addTask, updateTask, currentTask, setCurrentTask } = useContext(TaskContext)!

    const [ taskTitle, setTaskTitle ] = useState('')
    const [ taskDescription, setTaskDescription ] = useState('')
    const [ selectedDate, setSelectedDate ] = useState(new Date())

    const [ errorMessage, setErrorMessage ] = useState<InputErrorMessage>(initInputErrorMessage)
    const modalVisible = (visible ? visible : false)
    const isEditTask = currentTask != null
    const displayTitle = isEditTask ? 'Edit Task' : 'Add Task'
    const submitButtonText = displayTitle

    useEffect(() => {
        if (visible) {
            setErrorMessage({ title: '' })
        }
    }, [ visible ])

    useEffect(() => {
        if (isEditTask) {
            setTaskTitle(currentTask.title)
            setTaskDescription(currentTask.description || '')
            setSelectedDate(currentTask.dueDate)
        }
    }, [ currentTask, isEditTask ])

    const handleAddTask = () => {
        if (handleValidation() && addTask) {
            const newTaskId = getStringID()
            addTask({
                id: newTaskId,
                title: taskTitle,
                description: taskDescription,
                dueDate: selectedDate,
                subtasks: [],
            })
            handleResetAndCloseModal()
        }
    }

    const handleEditTask = () => {
        if (handleValidation() && isEditTask) {
            updateTask({
                id: currentTask.id,
                title: taskTitle,
                description: taskDescription,
                dueDate: selectedDate,
                subtasks: currentTask.subtasks,
            })
            handleResetAndCloseModal()
        }
    }

    const handleResetAndCloseModal = () => {
        setTaskTitle('')
        setTaskDescription('')
        setSelectedDate(new Date())
        if (isEditTask) {
            setCurrentTask(null)
        }
        if (onClose) onClose()
    }

    const handleValidation = () => {
        let valid = true
        const message: InputErrorMessage = { ...initInputErrorMessage }
        if (taskTitle.trim().length === 0) {
            message.title = 'Please enter your task title.'
            valid = false
        }
        setErrorMessage(message)
        return valid
    }

    const renderFromInput = () => (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{displayTitle}</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.input}>
                    <Input
                        label='Title'
                        placeholder="Task Title"
                        value={taskTitle}
                        onChangeText={setTaskTitle}
                        errorMessage={errorMessage.title}
                    />
                </View>
                <View style={styles.input}>
                    <Input
                        label='Description'
                        placeholder="Task Description"
                        value={taskDescription}
                        onChangeText={setTaskDescription}
                        autoCapitalize="none"
                        multiLine={true}
                    />
                </View>
                <View style={styles.input}>
                    <DateTimeInput
                        label='Due Date'
                        value={selectedDate}
                        onChange={(newDate) => setSelectedDate(newDate)}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        text={submitButtonText}
                        onPress={isEditTask ? handleEditTask : handleAddTask}
                        buttonStyle={[
                            styles.button,
                            isEditTask ? styles.editButton : styles.addButton,
                        ]}
                        textStyle={styles.addButtonText}
                    />
                    <Button
                        text="Close"
                        onPress={(handleResetAndCloseModal)}
                        buttonStyle={[ styles.button, styles.closeButton ]}
                    />
                </View>
            </View>
        </View>
    )

    return (
        <Modal
            transparent
            animationType="none"
            visible={modalVisible}
        >
            <View style={styles.background}>
                {renderFromInput()}
            </View>
        </Modal>
    )
}
