import React from 'react';
import { Title, Text, FieldSet } from '../styledComponents';

const RankingInfos = (props) => {
    return(
        <FieldSet>
            <Title>{props.title}</Title>
            <Text>
                {props.data.tier} {props.data.rank} { props.data.leaguePoints }
            </Text>
            <Text>
                Victoires: {props.data.wins} Défaites: {props.data.losses}
            </Text>
        </FieldSet>
    )
}

export default RankingInfos