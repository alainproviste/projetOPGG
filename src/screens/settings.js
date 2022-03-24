import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Settings = ({ navigation }) => {
  return (
    <>
      <TextStyled>Settings</TextStyled>
      <Button onPress={() => navigation.navigate('Home')}>
        <TextStyled>To Home</TextStyled>
      </Button>
    </>
  )
}

const TextStyled = styled.Text``
const Button = styled.TouchableOpacity``

Settings.propTypes = {}

export default Settings