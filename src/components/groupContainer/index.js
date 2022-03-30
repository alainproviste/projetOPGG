import React from 'react';
import { Title, Text, FieldSet } from '../styledComponents';

const GroupContainer = (props) => {
    return(
        <FieldSet>
            <Title>{props.title}</Title>
            { props.list ? (
                <>
                    {
                        props.list.map((value, index) => {
                            return <Text key={value}>{value}</Text>
                        })
                    }
                </>
                )
            :(
                <Text>{props.text}</Text>
            )}
        </FieldSet>
    )
}

export default GroupContainer