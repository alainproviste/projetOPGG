import React from "react";
import { View, FlatList, Text, Image } from 'react-native';

const Slider = (props) => {
    return (
        <View>
            <Text>fsqsdfsqf</Text>
            <FlatList
                data={Object.values(props.champions)}
                keyExtractor={item => item.id}
                horizontal={true}
                renderItem={({ item }) => (
                <View>
                    <Image
                    style={{ height: 200, width: 200 }}
                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${item.image.full}` }}
                    />
                    <Text>{item.name}</Text>
                </View>
                )}
            />
        </View>
    )
}

export default Slider;