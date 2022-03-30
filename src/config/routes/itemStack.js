import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Items from '../../screens/items';
import DetailsItem from '../../screens/detailsItem';

const Stack = createNativeStackNavigator()

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: true }} name='Items' component={Items} />
      <Stack.Screen
        options={{ headerShown: true, title:"Details Item" }}
        name='DetailsItem'
        component={DetailsItem}
      />
    </Stack.Navigator>
  )
}

export default SettingStack