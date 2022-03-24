import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import axios from 'axios';
import Grid from "../components/grid";

const Champion = () => {

    const [champions, setChampions] = useState([]);
    const [championsRotation, setChampionsRotation] = useState([]);

    const getChampions = async () => {
        await axios({
            method: 'GET',
            url: 'http://ddragon.leagueoflegends.com/cdn/12.5.1/data/fr_FR/champion.json'
        })
        .then(response => {
            setChampions(response.data.data);
        })
        .catch(error => {
            console.log(error);
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
                "X-Riot-Token": "RGAPI-a33c3c30-c9f3-47ca-9ff2-17fb01d0a9f8"
            }
        })
        .then(response => {
            response.data.freeChampionIds.forEach(id => {
                var champion = Object.values(champions).find(element => element.key == id)
                if(champion != undefined){
                    setChampionsRotation(championsRotation => [...championsRotation, champion])
                }
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getChampions();
        getChampionsRotation();
    }, [])

    useEffect(() => {
        console.log(championsRotation);
    }, [championsRotation])

    return(
        <ScrollView>
            <View>
                <Grid data={championsRotation} title="Rotation de champions" orientation={true} nbColumns='1' navigation="DetailsChampion" url="https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/"/>
            </View>
            <Grid data={champions} title='Liste des champions' orientation={false} nbColumns='2' navigation="DetailsChampion" url="https://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/"/>
        </ScrollView>
    )
}

export default Champion;