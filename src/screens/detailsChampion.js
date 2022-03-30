import React, { useEffect, useState } from "react";
import {ScrollView, View, Text} from 'react-native';
import axios from 'axios';
import styled from 'styled-components';
import GroupContainer from "../components/groupContainer";
import readFavorite from '../utils/readFavorite'
import addToFavorite from '../utils/addToFavorite'
import removeFromFavorite from '../utils/removeFromFavorite'
import { LoadingMessage } from "../components/styledComponents";

const DetailsChampion = ({route}) => {

    const [data, setData] = useState({});
    const [champion, setChampion] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    
    const {
        params: { name }
    } = route

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://ddragon.leagueoflegends.com/cdn/12.5.1/data/fr_FR/champion/' + name + ".json"
        })
        .then(response => {
            setData(response.data.data)
        })
        .catch(error => {
            setIsLoading(false);
            setError(true);
            console.log(error);
        })
    }, [])

    useEffect(() => {
        const test = data[Object.keys(data)[0]];
        if(test){
            setChampion(test)
        }
        setIsLoading(false);
        setError(false);
    }, [data])

    const checkFavorite = async item => {
        const allFav = await readFavorite()
        const index = allFav.map(f => f.id).findIndex(itemId => itemId === item.id)
        if (index === -1) {
            addToFavorite(item)
        } else {
            removeFromFavorite(item)
        }
    }

    if(isLoading){
        return(
            <LoadingMessage>Recherche des informations</LoadingMessage>
        )
    }

    if(error){
        return(
            <LoadingMessage>Une erreur est survenue !</LoadingMessage>
        )
    }

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
            <Button
                onPress={() => {
                    checkFavorite(champion)
                }}
            >
                <Text>Ajouter en favoris</Text>
            </Button>
        </ScrollView>
    )
}

const ChampionImage = styled.Image`
    height: 250px;
`

const Button = styled.TouchableOpacity``

const NomChampion = styled.Text`
    font-size: 40px;
    color: #FFF;
    position: absolute;
    bottom: 0;
`

export default DetailsChampion