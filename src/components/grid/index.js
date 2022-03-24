import React, {useState,useEffect} from "react";
import { View, FlatList, Text, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Title, TouchableSurface } from "../styledComponents";

const Grid = (props) => {

    const navigation = useNavigation();

    return (
        <View>
            <Title>{props.title}</Title>
            <FlatList
                data={Object.values(props.data)}
                keyExtractor={item => item.id}
                horizontal={props.orientation}
                numColumns={props.nbColumns}
                renderItem={({ item }) => (
                <TouchableSurface onPress={() => {
                    navigation.navigate(props.navigation, {
                        id: item.id,
                        name: item.name
                    })
                }}>
                    <Image
                    style={{ height: 190, width: 190 }}
                    source={{ uri: `${props.url}${item.image.full}` }}
                    />
                    <Text>{item.name}</Text>
                </TouchableSurface>
                )}
            />
        </View>
    )
}

export default Grid;