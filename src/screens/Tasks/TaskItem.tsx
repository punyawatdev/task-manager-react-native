import React, { useState } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { Task, Subtask } from '~/contexts/TaskContext'
import Colors from '~/theme/colors'
import { IconButton } from '~/components'
import { convertDateToStringFormat } from '~/utils/date'

import AddSubtask from './AddSubtask'
import SubtaskItem from './SubtaskItem'

interface TaskItemProps {
    task: Task
    onEdit: () => void
    onRemove: () => void
}

const styles = StyleSheet.create({
    contaier: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    card: {
        borderWidth: 1,
        borderRadius: 16,
        borderColor: Colors.BLACK,
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 16,
    },
    action: {
        marginRight: 6,
    },
    titleContaier: {
        flex: 1,
        flexDirection: 'row',
    },
    titleWrap: {
        flex: 1,
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.TEXT_PRIMARY,
        textTransform: 'capitalize',
    },
    description: {
        fontSize: 14,
        color: Colors.TEXT_INPUT_BOX,
        marginBottom: 8,
    },
    dateContaier: {
        flex: 1,
        flexDirection: 'row',
    },
    date: {
        fontSize: 12,
        color: Colors.TEXT_BLACK,
        textAlignVertical: 'center',
        paddingLeft: 4,
    },
    subtaskListContainer: {
        paddingLeft: 12,
        marginTop: 8,
        marginBottom: 16,
    },
})

export default function TaskItem({ task, onEdit, onRemove }: TaskItemProps) {
    const [ optionsVisible, setOptionsVisible ] = useState(false)
    const handleOptionVisible = () => setOptionsVisible(visible => !visible)
    const renderOptions = () => (
        optionsVisible ? (
            <>
                <IconButton
                    name='chevron-forward-circle'
                    size={24}
                    color={Colors.PRIMARY}
                    buttonStyle={styles.action}
                    onPress={handleOptionVisible}
                />
                <IconButton
                    name='create'
                    size={20}
                    color={Colors.YELLOW}
                    buttonStyle={styles.action}
                    onPress={onEdit}
                />
                <IconButton
                    name='trash'
                    size={20}
                    color={Colors.RED}
                    buttonStyle={styles.action}
                    onPress={onRemove}
                />
            </>
        ) : (
            <IconButton
                name='chevron-back-circle'
                size={24}
                color={Colors.PRIMARY}
                onPress={handleOptionVisible}
            />
        )
    )
    const renderSubtaskItem = ({ item: subtask }: { item: Subtask }) => (
        <SubtaskItem
            task={task}
            subtask={subtask}
        />
    )
    return (
        <View key={task.id} style={styles.contaier}>
            <View style={styles.card}>
                <View style={styles.titleContaier}>
                    <Text style={[ styles.title, styles.titleWrap ]} numberOfLines={1} ellipsizeMode='tail'>
                        {task.title}
                    </Text>
                    {renderOptions()}
                </View>
                {
                    task.description &&
                    <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>
                        {task.description}
                    </Text>
                }
                <FlatList
                    style={styles.subtaskListContainer}
                    data={task.subtasks}
                    renderItem={renderSubtaskItem}
                    keyExtractor={(item: Subtask) => item.id}
                    ListFooterComponent={<AddSubtask task={task} />}
                />
                <View style={styles.dateContaier}>
                    <Icon name='calendar-outline' size={15} color={Colors.BLACK} />
                    <Text style={styles.date}>
                        {convertDateToStringFormat(task.dueDate)}
                    </Text>
                </View>
            </View>
        </View>
    )
}
