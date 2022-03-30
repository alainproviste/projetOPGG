import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import axios from 'axios';
import Grid from "../components/grid";
import { Title, LoadingMessage } from "../components/styledComponents";

const Settings = () => {

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getItems =  () => {
    axios({
        method: 'GET',
        url: 'http://ddragon.leagueoflegends.com/cdn/12.6.1/data/fr_FR/item.json'
    })
    .then(response => {
        setItems(response.data.data);
        setIsLoading(false);
    })
    .catch(error => {
        setIsLoading(false);
        setError(true);
        console.log(error);
    })
  }

  useEffect(() => {
    getItems();
  }, [])

  if(isLoading){
    return(
        <LoadingMessage>Chargements des objets</LoadingMessage>
    )
  }

  if(error){
      return(
          <LoadingMessage>Une erreur est survenue !</LoadingMessage>
      )
  }

  return (
    <View>
      <Title>Page items</Title>
      <Grid data={items} keyName='name' title="Liste des items" orientation={false} nbColumns='2' navigation="DetailsItem" url="https://ddragon.leagueoflegends.com/cdn/12.6.1/img/item/" detailKey="name"/>
    </View>
  )
}

export default Settings;