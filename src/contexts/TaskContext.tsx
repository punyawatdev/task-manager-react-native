import React, { createContext, useState } from 'react'
import getStringID from '~/utils/uuid'

export interface Subtask {
    id: string
    text: string
}

export interface Task {
    id: string
    title: string
    description?: string
    dueDate: Date
    subtasks: Subtask[]
}

export interface TodoContextType {
    tasks: Task[]
    setTasks: (tasks: Task[]) => void
    currentTask: Task | null
    setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>
    activeTask: Task | null
    setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>
    // Task
    addTask: (task: Task) => void
    updateTask: (task: Task) => void
    deleteTask: (id: string) => void
    // Subtask
    addSubtask: (taskId: string, text: string) => void
    updateSubtask: (taskId: string, subtaskId: string, newText: string) => void
    deleteSubtask: (taskId: string, subtaskId: string) => void
}

const TaskContext = createContext<TodoContextType | null>(null)

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [ tasks, setTasks ] = useState<Task[]>([
        {
            id: '1',
            title: 'task title',
            description: 'task description',
            dueDate: new Date(),
            subtasks: [
                {
                    id: '2',
                    text: 'subtaskssubta',
                },
                {
                    id: '3',
                    text: 'subtasks text 3',
                },
            ],
        },
    ])
    const [ currentTask, setCurrentTask ] = useState<Task | null>(null)
    const [ activeTask, setActiveTask ] = useState<Task | null>(null)

    const addTask = (task: Task) => {
        setTasks((prevTasks) => [ ...prevTasks, task ])
    }

    const updateTask = (task: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((prevTask) => (prevTask.id === task.id ? task : prevTask)),
        )
    }

    const deleteTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    }

    const addSubtask = (taskId: string, text: string) => {
        const newSubtaskId = getStringID()
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, subtasks: [ ...task.subtasks, { id: newSubtaskId, text } ] } : task,
            ),
        )
    }

    const updateSubtask = (taskId: string, subtaskId: string, newText: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        subtasks: task.subtasks.map((subtask) =>
                            subtask.id === subtaskId ? { ...subtask, text: newText } : subtask,
                        ),
                    }
                    : task,
            ),
        )
    }

    const deleteSubtask = (taskId: string, subtaskId: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, subtasks: task.subtasks.filter((subtask) => subtask.id !== subtaskId) } : task,
            ),
        )
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                setTasks,
                currentTask,
                setCurrentTask,
                activeTask,
                setActiveTask,
                addTask,
                updateTask,
                deleteTask,
                addSubtask,
                updateSubtask,
                deleteSubtask,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export { TaskContext, TaskProvider }
