import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import { Logo, CenteredText, TextInput, LoadingMessage } from '../components/styledComponents';
import RankingInfos from '../components/rankingInfos';
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";
import { API_KEY } from '@env';

const Home = ({navigation}) => {

    const [summonerName, setSummonnerName] = useState();
    const [server, setServer] = useState();
    const [sumId, setSumId] = useState();
    const [error, setError] = useState(false);
    const [summonerData, setSummonerData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getSummonnerId = () => {
        axios({
            method: 'GET',
            url: `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com/",
                "X-Riot-Token": API_KEY
            }
        })
        .then(response => {
            setSumId(response.data.id);
            setError(false);
        })
        .catch(error => {
            setError(true);
            setIsLoading(false);
            console.log(error);
        })
    }

    const getSummonerData = () => {
        axios({
            method: 'GET',
            url: `https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}`,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
                "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "https://developer.riotgames.com/",
                "X-Riot-Token": API_KEY
            }
        })
        .then(response => {
            setSummonerData(response.data);
            setError(false);
            setIsLoading(false);
        })
        .catch(error => {
            setError(true);
            setIsLoading(false);
            console.log(error);
        })
    }

    useEffect(() => {
        getSummonerData();
    }, [sumId])

    const searchSummoner = () => {
        setIsLoading(true);
        getSummonnerId();
    }

    if(isLoading){
        return(
            <LoadingMessage>Recherche du summonner</LoadingMessage>
        )
    }

    return(
        <View>
            <Logo
                source={{ uri: 'https://s3-us-west-2.amazonaws.com/cbi-image-service-prd/modified/a296b300-77a0-4cdf-9229-6acd525e749e.png' }}
            />
            <RNPickerSelect
                onValueChange={(value) => setServer(value)}
                items={[
                    { label: 'Br', value: 'br1' },
                    { label: 'Eun', value: 'eun1' },
                    { label: 'Euw', value: 'euw1' },
                    { label: 'Jp', value: 'jp1' },
                    { label: 'Kr', value: 'kr' },
                    { label: 'Na', value: 'na1' },
                    { label: 'Oc', value: 'oc1' },
                    { label: 'Tr', value: 'tr1' },
                    { label: 'Ru', value: 'ru' },
                ]}
            />
            <TextInput
                onChangeText={textValue => setSummonnerName(textValue)}
                value={summonerName}
            />
            <Button
                title="Search"
                onPress={searchSummoner}
            />
            {
                error == true
                ?
                <CenteredText>Aucun joueur n'a été trouvé !</CenteredText>
                :
                <></>
            }

            {
                summonerData[Object.keys(summonerData)[0]]
                ?
                <>
                    <RankingInfos title="Ranked Solo Duo" data={summonerData[Object.keys(summonerData)[0]]}/>
                    <RankingInfos title="Ranked Flex" data={summonerData[Object.keys(summonerData)[2]]}/>
                </>
                :
                <></>
            }
        </View>
    )
}

export default Home;