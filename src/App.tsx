import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TaskProvider } from '~/contexts/TaskContext'

import AppNavigator from '~/router'

const App = () => {
    return (
        <TaskProvider>
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </TaskProvider>
    )
}

export default App
