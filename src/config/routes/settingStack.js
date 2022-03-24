import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Settings from '../../screens/settings'

const Stack = createNativeStackNavigator()

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Settings' component={Settings} />
    </Stack.Navigator>
  )
}

export default SettingStack