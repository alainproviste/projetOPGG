import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Title, TitlePage, LoadingMessage } from "../components/styledComponents";
import axios from 'axios';
import Grid from "../components/grid";
import { API_KEY } from '@env';
import readFavorite from "../utils/readFavorite";
import { useFocusEffect } from "@react-navigation/native";

const Champion = () => {

    const [champions, setChampions] = useState([]);
    const [championsRotation, setChampionsRotation] = useState([]);
    const [championsFavoris, setChampionFavoris] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const getChampions =  () => {
         axios({
            method: 'GET',
            url: 'http://ddragon.leagueoflegends.com/cdn/12.5.1/data/fr_FR/champion.json'
        })
        .then(response => {
            setChampions(response.data.data);
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
            setError(true);
        })
    }

    const getFavoris = async() => {
        const favChamps = await readFavorite()
        favChamps.forEach(id => {
            var champion = Object.values(champions).find(element => element.id == id.id)
            const index = championsFavoris.map(f => f.id).findIndex(itemId => itemId === champion.id)
            if(champion != undefined && index === -1){
                setChampionFavoris(championsFavoris => [...championsFavoris, champion])
            }
        })
    }

    const getChampionsRotation = () => {
        axios({
            method: 'GET',
            url: 'https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations',
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com/",
                "X-Riot-Token": API_KEY
            }
        })
        .then(response => {
            response.data.freeChampionIds.forEach(id => {
                var champion = Object.values(champions).find(element => element.key == id)
                if(champion != undefined){
                    setChampionsRotation(championsRotation => [...championsRotation, champion])
                }
            });
            setIsLoading(false)
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
            setError(true);
        })
    }

    useEffect(() => {
        getChampionsRotation();
    }, [champions])

    useEffect(() => {
        getChampions();
        getFavoris();
    }, [])

    useFocusEffect(() => {
        getFavoris();
    })

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
            <TitlePage>Page champions</TitlePage>
            {
                championsFavoris.length ?
                <View>
                    <Grid data={championsFavoris} keyName='title' title="Mes champions favoris" orientation={true} nbColumns='1' navigation="DetailsChampion" url="https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/" detailKey="id"/>
                </View>
                :
                <View>
                    <Title>Mes champions favoris</Title>
                    <Text>Vous n'avez pas de champion dans votre liste</Text>
                </View>
            }
            <View>
                <Grid data={championsRotation} keyName='blurb' title="Rotation de champions" orientation={true} nbColumns='1' navigation="DetailsChampion" url="https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/" detailKey="id"/>
            </View>
            <Grid data={champions} keyName='id' title='Liste des champions' orientation={false} nbColumns='2' navigation="DetailsChampion" url="https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/" detailKey="id"/>
        </ScrollView>
    )
}

export default Champion;