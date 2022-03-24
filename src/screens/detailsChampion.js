import React, { useEffect, useState } from "react";
import {ScrollView, View} from 'react-native';
import axios from 'axios';
import styled from 'styled-components';
import GroupContainer from "../components/groupContainer";

const DetailsChampion = ({route}) => {

    const [data, setData] = useState({});
    const [champion, setChampion] = useState({});

    const {
        params: { id }
    } = route

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://ddragon.leagueoflegends.com/cdn/12.5.1/data/fr_FR/champion/' + id + ".json"
        })
        .then(response => {
            setData(response.data.data)
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        const test = data[Object.keys(data)[0]];
        if(test){
            setChampion(test)
        }
    }, [data])

    return(
        <ScrollView>
            <View>
                <ChampionImage
                    source={{ uri: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg` }}
                />
                <NomChampion>{champion.name}</NomChampion>
            </View>
            <GroupContainer title="Lore du champion" text={champion.lore}/>
            <GroupContainer title="Astuces" list={champion.allytips}/>
            <GroupContainer title="Jouer contre" list={champion.enemytips}/>
            
        </ScrollView>
    )
}

const ChampionImage = styled.Image`
    height: 250px;
`
const NomChampion = styled.Text`
    font-size: 40px;
    color: #FFF;
    position: absolute;
    bottom: 0;
`

export default DetailsChampion