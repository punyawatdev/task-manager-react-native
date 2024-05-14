import React, { useContext } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/Ionicons'

import { TaskContext, Task } from '~/contexts/TaskContext'
import { RootStackParamList, Pages } from '~/router'
import { convertDateToStringFormat } from '~/utils/date'
import Colors from '~/theme/colors'

type Props = NativeStackScreenProps<RootStackParamList, Pages.Summary>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderWidth: 1,
        backgroundColor: Colors.PRIMARY_LIGHT,
    },
    totalBox: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verticalDivider: {
        width: 1,
        backgroundColor: Colors.BLACK,
    },
    titleText: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.TEXT_BLACK,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.TEXT_BLACK,
    },
    tasksText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.TEXT_BLACK,
        padding: 16,
    },
    taskContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    taskCard: {
        borderWidth: 1,
        borderRadius: 16,
        borderColor: Colors.BLACK,
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 16,
        flexDirection: 'row',
    },
    taskTitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.TEXT_PRIMARY,
        textTransform: 'capitalize',
        flex: 1,
    },
    taskDateContaier: {
        flex: 0,
        flexDirection: 'row',
    },
    taskDateText: {
        fontSize: 14,
        color: Colors.TEXT_BLACK,
        textAlignVertical: 'center',
        paddingLeft: 4,
    },
})

function TaskSummaryScreen({ navigation }: Props) {
    const { tasks, setActiveTask } = useContext(TaskContext)!
    const sortedTasks = tasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    const tasksTotal = tasks.length
    const subtasksTotal = tasks.reduce((acc, task) => acc + task.subtasks.length, 0)
    const handleNavigateToTask = (task: Task) => {
        setActiveTask(task)
        navigation.navigate(Pages.Tasks)
    }
    const renderTask = ({ item: task }: { item: Task }) => (
        <TouchableOpacity
            onPress={() => handleNavigateToTask(task)}
            style={styles.taskContainer}
        >
            <View style={styles.taskCard}>
                <Text style={styles.taskTitleText}>{task.title}</Text>
                <View style={styles.taskDateContaier}>
                    <Icon name='calendar-outline' size={15} color={Colors.BLACK} />
                    <Text style={styles.taskDateText}>
                        {convertDateToStringFormat(task.dueDate)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
    return (
        <View style={styles.container}>
            <View style={styles.totalContainer}>
                <View style={styles.totalBox}>
                    <Text style={styles.titleText}>Tasks Total</Text>
                    <Text style={styles.totalText}>{tasksTotal}</Text>
                </View>
                <View style={styles.verticalDivider}/>
                <View style={styles.totalBox}>
                    <Text style={styles.titleText}>Subtasks Total</Text>
                    <Text style={styles.totalText}>{subtasksTotal}</Text>
                </View>
            </View>
            <Text style={styles.tasksText}>Task Due Date</Text>
            <FlatList
                data={sortedTasks}
                renderItem={renderTask}
                keyExtractor={(item: Task) => item.id}
            />
        </View>
    )
}

export default TaskSummaryScreen
