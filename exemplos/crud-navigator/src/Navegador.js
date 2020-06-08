import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListarAluno from './screens/ListarAluno'
import CadastrarAluno from './screens/CadastrarAluno'

console.disableYellowBox = true;


const Stack = createStackNavigator();


function Navegador() {
   
    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen name="Home" 
                    component={ListarAluno}
                    options={{ title: 'Alunos' }}
                />
                <Stack.Screen name="Cadastrar" 
                    component={CadastrarAluno}
                    options={{ title: 'Cadastrar Aluno' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navegador;

