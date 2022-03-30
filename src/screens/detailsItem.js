import React, { useEffect, useState } from "react";
import {ScrollView, View, Text} from 'react-native';
import axios from 'axios';
import styled from 'styled-components';
import GroupContainer from "../components/groupContainer";
import { LoadingMessage } from "../components/styledComponents";

const DetailsItem = ({route}) => {

    const [data, setData] = useState({});
    const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const regex = /(<([^>]+)>)/ig;

    const {
        params: { name }
    } = route

    useEffect(() => {
        axios({
            method: 'GET',
            url: "http://ddragon.leagueoflegends.com/cdn/12.6.1/data/fr_FR/item.json"
        })
        .then(response => {
            setData(response.data.data)
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
            setError(true);
        })
    }, [])

    useEffect(() => {
        var findItem = Object.values(data).find(element => element.name == name);
        if(findItem != undefined){
            setItem(findItem);
        }
        setIsLoading(false);
    }, [data])

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
            {
                !item.image ?
                <Text></Text>
                :
                <View>
                    <ItemImage
                        source={{ uri: `http://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/${item.image.full}` }}
                    />
                    <NomItem>{item.name}</NomItem>
                </View>
            }

            {
                !item.image ?
                <Text></Text>
                :
                <View>
                    <GroupContainer title="Description" text={item.description.replace(regex, '')}/>
                    <GroupContainer title="Prix" text={`Prix d'achat: ${item.gold.base} gold.  Prix de vente: ${item.gold.sell}`}/>
                </View>
            }
        </ScrollView>
    )
}

const ItemImage = styled.Image`
    height: 250px;
`
const NomItem = styled.Text`
    font-size: 40px;
    color: #FFF;
    position: absolute;
    bottom: 0;
`

export default DetailsItem;