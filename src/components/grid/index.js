import React, {useState,useEffect} from "react";
import { View, FlatList, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Title, TouchableSurface, TextCard } from "../styledComponents";

const Grid = (props) => {

    const navigation = useNavigation();

    return (
        <View>
            <Title>{props.title}</Title>
            <FlatList
                data={Object.values(props.data)}
                keyExtractor={item => item[`${props.keyName}`]}
                horizontal={props.orientation}
                numColumns={props.nbColumns}
                renderItem={({ item }) => (
                <TouchableSurface onPress={() => {
                    navigation.navigate(props.navigation, {
                        name: item[`${props.detailKey}`]
                    })
                }}>
                    <Image
                    style={{ height: 190, width: 170, margin: 5 }}
                    source={{ uri: `${props.url}${item.image.full}` }}
                    />
                    <TextCard>{item.name}</TextCard>
                </TouchableSurface>
                )}
            />
        </View>
    )
}

export default Grid;