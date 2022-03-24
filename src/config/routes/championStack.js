import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Champion from '../../screens/champion'
import DetailsChampion from '../../screens/detailsChampion'

const Stack = createNativeStackNavigator()

const ChampionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: true }}
        name='Champion'
        component={Champion}
      />
      <Stack.Screen
        options={{ headerShown: true, title:"Details Champion" }}
        name='DetailsChampion'
        component={DetailsChampion}
      />
    </Stack.Navigator>
  )
}

export default ChampionStack