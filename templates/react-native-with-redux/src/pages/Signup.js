import React from 'react';
import styled from "styled-components/native";
import { Text } from 'react-native'
import { H2 } from '../components'
import useCore from '../hooks/useCore'
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
    let { switchTheme } = useCore()
    const navigation = useNavigation();
    return (
        <ScrollView>
            <Container>
                <H2 onPress={() => navigation.push('Dashboard')}>Signup</H2>
                <Text onPress={switchTheme}>Welcome Signup Page</Text>
            </Container>
        </ScrollView>
    )
}

export default Signup

const ScrollView = styled.ScrollView`
    padding: 20px;
`;

const Container = styled.View`
    padding-top: 50px;
`;