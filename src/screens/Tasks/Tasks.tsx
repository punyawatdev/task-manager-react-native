import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { TaskContext, Task } from '~/contexts/TaskContext'
import { FAButton } from '~/components'
import { alertConfirm, alertMessage } from '~/utils/alert'
import Colors from '~/theme/colors'

import AddTaskModal from './AddTaskModal'
import TaskItem from './TaskItem'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: Colors.BLACK,
        backgroundColor: Colors.WHITE,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    empty: {
        textAlign: 'center',
        marginTop: 8,
    },
})

export default function TodoListScreen() {
    const {
        tasks,
        activeTask,
        setActiveTask,
        setCurrentTask,
        deleteTask,
    } = useContext(TaskContext)!
    const [ tasksRef, setTasksRef ] = useState<FlatList<Task> | null>()
    const [ openAddTaskModal, setOpenAddTaskModal ] = useState(false)

    useEffect(() => {
        if (tasksRef && activeTask) {
            setTimeout(() => {
                scrollToIndex(tasksRef, tasks.indexOf(activeTask))
                setActiveTask(null)
            }, 500)
        }
    }, [ tasks, tasksRef, activeTask, setActiveTask ])

    const handleOpenAddTaskModal = () => setOpenAddTaskModal(open => !open)

    const scrollToIndex = (listRef: FlatList<Task>, index: number) => {
        if (index !== -1) {
            listRef.scrollToIndex({ index, viewOffset: 16, animated: true })
        }
        else {
            alertMessage({ title: 'Not found!!', message: 'Task not found in the list.' })
        }
    }
    const handleRemoveTask = (task: Task) => {
        const title = 'Are you sure?'
        const message = `Are you sure to delete this task "${task.title}" ?`
        const submit = () => deleteTask(task.id)
        alertConfirm({ title, message, submit })
    }
    const renderTask = ({ item: task }: { item: Task }) => (
        <TaskItem
            task={task}
            onEdit={() => {
                setCurrentTask(task)
                handleOpenAddTaskModal()
            }}
            onRemove={() => handleRemoveTask(task)}
        />
    )
    return (
        <View style={styles.container}>
            <AddTaskModal
                visible={openAddTaskModal}
                onClose={handleOpenAddTaskModal}
            />
            <FlatList
                ref={(ref) => setTasksRef(ref)}
                data={tasks}
                renderItem={(renderTask)}
                keyExtractor={(item: Task) => item.id}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name='sad-outline' size={30}/>
                        <Text style={styles.empty}>Tasks is empty</Text>
                    </View>
                }
            />
            <FAButton onPress={handleOpenAddTaskModal} />
        </View>
    )
}
