import React from 'react';
import {View} from 'react-native';
import { Title, Text } from '../styledComponents';

const GroupContainer = (props) => {
    return(
        <View>
            <Title>{props.title}</Title>
            { props.list ? (
                <>
                    {
                        props.list.map((value, index) => {
                            return <Text>{value}</Text>
                        })
                    }
                </>
                )
            :(
                <Text>{props.text}</Text>
            )}
        </View>
    )
}

export default GroupContainer