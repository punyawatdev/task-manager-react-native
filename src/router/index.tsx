import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '~/theme/colors'

import TasksScreen from '@screens/Tasks'
import SummaryScreen from '@screens/Summary'

export enum Pages {
    Tasks = 'Tasks',
    Summary = 'Summary',
}

export type RootStackParamList = {
    [Pages.Tasks]: undefined
    [Pages.Summary]: undefined
}

const Tab = createBottomTabNavigator<RootStackParamList>()

export default function App() {
    const getIconName = (name: string, focused: boolean) => {
        switch (name) {
            case Pages.Tasks:
                return focused ? 'list' : 'list-outline'
            case Pages.Summary:
                return focused ? 'analytics' : 'analytics-outline'
            default:
                return 'home-outline'
        }
    }
    return (
        <NavigationContainer>
            <Tab.Navigator
                id='BottomTab'
                initialRouteName={Pages.Tasks}
                screenOptions={({ route }) => ({
                    headerShadowVisible: false,
                    tabBarActiveTintColor: Colors.PRIMARY,
                    tabBarStyle: { borderTopColor: Colors.BLACK },
                    tabBarIcon: ({ focused, size, color }) => {
                        const iconName = getIconName(route.name, focused)
                        return <Icon name={iconName} size={size} color={color} />
                    },
                })}
            >
                <Tab.Screen name={Pages.Tasks} component={TasksScreen} />
                <Tab.Screen name={Pages.Summary} component={SummaryScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
