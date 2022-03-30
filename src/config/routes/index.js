import React from 'react';
import { Image } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';

import HomeStack from './homeStack';
import ItemStack from './itemStack';
import ChampionStack from './championStack';

const BottomTab = createBottomTabNavigator();

const Routes = () => {
    return (
      <NavigationContainer>
        <BottomTab.Navigator>
          <BottomTab.Screen name='HomeStack' component={HomeStack}
            options={{
              title: 'Home',
              tabBarIcon: ({size,focused,color}) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={{
                      uri:
                        'https://cdn-icons-png.flaticon.com/512/25/25694.png',
                    }}
                  />
                );
              },
            }}
          />
          <BottomTab.Screen name='ChampionStack' component={ChampionStack}
            options={{
              title: 'Champion',
              headerShown: false,
              tabBarIcon: ({size,focused,color}) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={{
                      uri:
                        'https://support-leagueoflegends.riotgames.com/hc/en-us/article_attachments/202491014/Title_Assassin.png',
                    }}
                  />
                );
              },
            }}
          />
          <BottomTab.Screen name='ItemStack' component={ItemStack}
            options={{
              title: 'Item',
              headerShown: false,
              tabBarIcon: ({size,focused,color}) => {
                return (
                  <Image
                    style={{ width: size, height: size }}
                    source={{
                      uri:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/640px-Windows_Settings_app_icon.png',
                    }}
                  />
                );
              },
            }}
          />
        </BottomTab.Navigator>
        <FlashMessage position='top'/>
      </NavigationContainer>
    )
  }
  
  export default Routes